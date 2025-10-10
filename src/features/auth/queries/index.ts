import { useQuery } from "@tanstack/react-query";

import { UserInfo } from "@/features/auth/types";
import { getUserInfo } from "@/supabase/auth";

export const authQuerykeys = {
  info: () => ["info"],
};

export function useUserQuery() {
  return useQuery({
    queryKey: authQuerykeys.info(),
    queryFn: () => getUserInfo(),
    initialData: {} as UserInfo,
  });
}
