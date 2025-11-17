import { Wallet } from "lucide-react";
import styled from "styled-components";

import { Button } from "@/components/ui";

type Props = {
  onClick: () => void;
};

export default function ExpenseQuickButton({ onClick }: Props) {
  return (
    <ButtonWrapper>
      <Button radius="pill" width={50} onClick={onClick}>
        <Wallet />
      </Button>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
`;
