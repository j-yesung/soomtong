ALTER TABLE public.fixed_expense_payments
  ALTER COLUMN paid_at DROP NOT NULL;

DROP POLICY IF EXISTS fixed_expense_payments_owner_update
  ON public.fixed_expense_payments;

CREATE POLICY fixed_expense_payments_owner_update
  ON public.fixed_expense_payments
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
