"use client";

import { createBrowserClient } from "@supabase/ssr";
import styled from "styled-components";

import { GoogleLogo } from "@/assets/svg/logo";
import { Text } from "@/components/ui";

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 12px;
  height: 40px;
  vertical-align: middle;
  gap: 10px;
  border: 1px solid #dfe1e5;
  border-radius: 20px;

  svg {
    height: 20px;
    width: auto;
    display: block;
    flex-shrink: 0;
  }
`;

export default function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      );

      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/salary`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GoogleButton onClick={handleGoogleLogin}>
      <GoogleLogo />
      <Text size={14}>구글 계정으로 로그인하기</Text>
    </GoogleButton>
  );
}
