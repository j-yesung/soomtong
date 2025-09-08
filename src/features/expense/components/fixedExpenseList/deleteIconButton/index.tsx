"use client";

import styled from "styled-components";

import { TrashIcon } from "@/assets/svg/interface";

const Button = styled.button`
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.danger};
  color: #fff;
  cursor: pointer;

  &:active {
    transform: scale(0.96);
  }
`;

export default function DeleteIconButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick}>
      <TrashIcon />
    </Button>
  );
}
