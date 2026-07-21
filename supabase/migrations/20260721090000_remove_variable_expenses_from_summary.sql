DROP FUNCTION IF EXISTS public.get_current_month_amount_summary(uuid);

CREATE FUNCTION public.get_current_month_amount_summary(_user uuid)
RETURNS TABLE(
  _budget numeric,
  _fixed_total numeric,
  _amount_available numeric
)
LANGUAGE sql
STABLE
AS $function$
  WITH totals AS (
    SELECT
      COALESCE((
        SELECT up.budget
        FROM public.user_profile up
        WHERE up.user_id = _user
      ), 0)::numeric AS budget,
      COALESCE((
        SELECT SUM((item->>'amount')::numeric)
        FROM public.fixed_expenses fe
        CROSS JOIN LATERAL jsonb_array_elements(COALESCE(fe.items, '[]'::jsonb)) AS item
        WHERE fe.user_id = _user
      ), 0)::numeric AS fixed_total
  )
  SELECT
    budget,
    fixed_total,
    budget - fixed_total
  FROM totals;
$function$;

DROP FUNCTION IF EXISTS public.add_expense(uuid, bigint, text, timestamp with time zone);
