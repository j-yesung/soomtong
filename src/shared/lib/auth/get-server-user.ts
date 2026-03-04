import { cache } from "react";

import { createClient } from "@/shared/lib/supabase/server";

export const getServerUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return user;
});
