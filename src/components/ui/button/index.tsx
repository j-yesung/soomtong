"use client";

import * as S from "./style";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, onClick, ...props }: ButtonProps) {
  return (
    <S.Button type="button" onClick={onClick} {...props}>
      {children}
    </S.Button>
  );
}
