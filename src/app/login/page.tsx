"use client";

import { Box } from "@/components/ui";
import GoogleLoginButton from "@/features/auth/components/googleLoginButton";

export const dynamic = "force-static";
export const revalidate = 0;

export default function LoginPage() {
  return (
    <Box centerScreen>
      <GoogleLoginButton />
    </Box>
  );
}
