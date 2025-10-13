"use client";

import styled from "styled-components";

import { GoogleLogo } from "@/assets/svg/logo";
import { Text } from "@/components/ui";
import { useLogin } from "@/features/auth/queries";

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
  const { mutate: login } = useLogin();

  return (
    <GoogleButton onClick={() => login()}>
      <GoogleLogo />
      <Text size={14}>구글 계정으로 로그인하기</Text>
    </GoogleButton>
  );
}
