import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Box } from "@/shared/ui";
import { getServerUser } from "@/shared/lib/auth/get-server-user";
import GoogleLoginButton from "@/features/auth/components/googleLoginButton";

interface LoginPageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;
  const cookieStore = await cookies();
  const hasSupabaseCookie = cookieStore
    .getAll()
    .some((cookie) => cookie.name.startsWith("sb-") || cookie.name.startsWith("supabase-"));
  const user = hasSupabaseCookie ? await getServerUser() : null;

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
