import { redirect } from "next/navigation";

import { Box } from "@/shared/ui";
import { createClient } from "@/shared/lib/supabase/server";
import GoogleLoginButton from "@/features/auth/components/googleLoginButton";

interface LoginPageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const nextPath = next?.startsWith("/") ? next : "/dashboard";
    redirect(nextPath === "/login" ? "/dashboard" : nextPath);
  }

  return (
    <Box centerScreen>
      <GoogleLoginButton />
    </Box>
  );
}
