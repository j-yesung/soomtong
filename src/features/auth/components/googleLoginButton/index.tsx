"use client";

import styled from "styled-components";

import { GoogleLogo } from "@/shared/assets/svg/logo";
import { createClient } from "@/shared/lib/supabase/client";
import { Text } from "@/shared/ui";

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
  const handleLogin = async () => {
    const supabase = createClient();
    const response = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback`, queryParams: {} },
    });

    if (response.error) throw response.error;
  };

  return (
    <GoogleButton onClick={handleLogin}>
      <GoogleLogo />
      <Text size={14}>구글 계정으로 로그인하기</Text>
    </GoogleButton>
  );
}
