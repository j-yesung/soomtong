CREATE OR REPLACE FUNCTION public.reset_financial_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  current_user_id uuid := auth.uid();
BEGIN
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;

  DELETE FROM public.fixed_expense_payments WHERE user_id = current_user_id;
  DELETE FROM public.expenses WHERE user_id = current_user_id;
  DELETE FROM public.fixed_expenses WHERE user_id = current_user_id;
  DELETE FROM public.user_profile WHERE user_id = current_user_id;
END;
$function$;

REVOKE ALL ON FUNCTION public.reset_financial_data() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.reset_financial_data() TO authenticated;
