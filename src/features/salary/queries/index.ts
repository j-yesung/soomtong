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
    mutationFn: (params: { salary: number; day: number }) => insertUserSalary(params.salary, params.day),
    onSuccess: () => router.push("/expense"),
  });
}
