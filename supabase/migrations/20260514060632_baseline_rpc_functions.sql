-- Baseline snapshot of the RPC functions currently deployed in Supabase.
-- Adding this file to the repository has no runtime effect by itself.
-- Apply it only when you intentionally want to recreate or synchronize these
-- database functions in a Supabase project.

CREATE OR REPLACE FUNCTION public.add_expense(
  _user uuid,
  _amount bigint,
  _category text,
  _spent_at timestamp with time zone DEFAULT NULL::timestamp with time zone
)
RETURNS TABLE(
  id bigint,
  user_id uuid,
  amount bigint,
  category text,
  spent_at timestamp with time zone,
  created_at timestamp with time zone
)
LANGUAGE sql
AS $function$
  insert into expenses (user_id, amount, category, spent_at)
  values (
    _user,
    _amount,
    _category,
    coalesce(_spent_at, now())
  )
  returning id, user_id, amount, category, spent_at, created_at;
$function$;

CREATE OR REPLACE FUNCTION public.add_fixed_item(_user uuid, _item jsonb)
RETURNS SETOF fixed_expenses
LANGUAGE sql
AS $function$
  INSERT INTO public.fixed_expenses (user_id, items)
  VALUES (_user, jsonb_build_array(_item))
  ON CONFLICT (user_id)
  DO UPDATE SET items = fixed_expenses.items || _item
  RETURNING *;
$function$;

CREATE OR REPLACE FUNCTION public.get_current_month_amount_summary(_user uuid)
RETURNS TABLE(
  _budget numeric,
  _fixed_total numeric,
  _total_variable numeric,
  _amount_available numeric,
  _billing_start date,
  _billing_end date
)
LANGUAGE plpgsql
STABLE
AS $function$
DECLARE
  tz text := 'Asia/Seoul';
  v_budget numeric := 0;
  v_fixed numeric := 0;
  v_variable numeric := 0;
  payday int := 25;
  items_json jsonb := '[]'::jsonb;
  local_today date := (now() AT TIME ZONE tz)::date;
  local_dom int := EXTRACT(DAY FROM local_today);
  this_month_last_day int;
  prev_month_last_day int;
  this_month_payday int;
  prev_month_payday int;
  this_month_start date;
  prev_month_start date;
  billing_start date;
  billing_end date;
  start_ts timestamptz;
  end_ts_excl timestamptz;
BEGIN
  -- Reads budget and payday from user_profile.
  SELECT COALESCE(up.budget, 0)::numeric, COALESCE(up.salary_day, 25)
  INTO v_budget, payday
  FROM public.user_profile up
  WHERE up.user_id = _user;

  -- Reads the fixed expense item list from fixed_expenses.
  SELECT COALESCE(fe.items, '[]'::jsonb)
  INTO items_json
  FROM public.fixed_expenses fe
  WHERE fe.user_id = _user;

  -- Calculates the billing window and expense totals.
  this_month_last_day := EXTRACT(DAY FROM (date_trunc('month', local_today)::date + INTERVAL '1 month - 1 day'));
  prev_month_last_day := EXTRACT(DAY FROM ((date_trunc('month', local_today)::date - INTERVAL '1 month') + INTERVAL '1 month - 1 day'));
  this_month_payday := LEAST(payday, this_month_last_day);
  prev_month_payday := LEAST(payday, prev_month_last_day);
  this_month_start := (date_trunc('month', local_today)::date + (this_month_payday - 1));
  prev_month_start := ((date_trunc('month', local_today)::date - INTERVAL '1 month')::date + (prev_month_payday - 1));

  IF local_dom >= this_month_payday THEN
    billing_start := this_month_start;
  ELSE
    billing_start := prev_month_start;
  END IF;

  billing_end := ((billing_start + INTERVAL '1 month')::date - 1);
  _billing_start := billing_start;
  _billing_end := billing_end;
  start_ts := (billing_start::timestamp AT TIME ZONE tz);
  end_ts_excl := ((billing_end + 1)::timestamp AT TIME ZONE tz);

  SELECT COALESCE(SUM((elem->>'amount')::numeric), 0) INTO v_fixed FROM jsonb_array_elements(items_json) AS elem;

  SELECT COALESCE(SUM(e.amount)::numeric, 0)
  INTO v_variable
  FROM public.expenses e
  WHERE e.user_id = _user
    AND e.created_at >= start_ts
    AND e.created_at < end_ts_excl;

  _budget := v_budget;
  _fixed_total := v_fixed;
  _total_variable := v_variable;
  _amount_available := (v_budget - v_fixed - v_variable);

  RETURN NEXT;
END;
$function$;

CREATE OR REPLACE FUNCTION public.remove_fixed_item(
  _user uuid,
  _tag text,
  _created_at text
)
RETURNS SETOF fixed_expenses
LANGUAGE sql
AS $function$
  UPDATE public.fixed_expenses fe
  SET items = COALESCE(
    (
      SELECT jsonb_agg(elem)
      FROM jsonb_array_elements(fe.items) elem
      WHERE NOT (
        elem->>'tag' = _tag AND elem->>'createdAt' = _created_at
      )
    ),
    '[]'::jsonb
  )
  WHERE fe.user_id = _user
  RETURNING *;
$function$;

CREATE OR REPLACE FUNCTION public.update_fixed_item(
  _user uuid,
  _created_at text,
  _item jsonb
)
RETURNS SETOF fixed_expenses
LANGUAGE sql
SECURITY DEFINER
AS $function$
  UPDATE public.fixed_expenses fe
  SET items = COALESCE(
    (
      SELECT jsonb_agg(
        CASE
          -- Replaces only the item whose createdAt value matches.
          WHEN elem->>'createdAt' = _created_at
            THEN _item
          ELSE elem
        END
      )
      FROM jsonb_array_elements(fe.items) elem
    ),
    '[]'::jsonb
  )
  WHERE fe.user_id = _user
  RETURNING *;
$function$;

CREATE OR REPLACE FUNCTION public.update_user_settings(
  _user_id uuid,
  _budget bigint,
  _day integer
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  UPDATE public.user_profile
  SET budget = _budget,
      salary_day = _day,
      updated_at = now()
  WHERE user_id = _user_id;

  IF NOT FOUND THEN
    INSERT INTO public.user_profile (user_id, budget, salary_day)
    VALUES (_user_id, _budget, _day);
  END IF;
END;
$function$;
