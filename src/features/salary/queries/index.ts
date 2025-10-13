import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { insertUserSalary } from "@/supabase/salary";

export const salaryQuerykeys = {
  salary: () => ["salary"],
};

export function useSalaryMutation() {
  const router = useRouter();

  return useMutation({
    mutationKey: salaryQuerykeys.salary(),
    mutationFn: (salary: number) => insertUserSalary(salary),
    onSuccess: () => router.push("/expense"),
  });
}
