import styled from "styled-components";

import { TrashIcon } from "@/assets/svg/interface";
import { Button } from "@/components/ui";

const DeleteButton = styled(Button)`
  pointer-events: auto;
  border: 0;
  padding: 0;

  &:active {
    transform: scale(0.96);
  }
`;

export default function DeleteIconButton({ onClick }: { onClick: () => void }) {
  return (
    <DeleteButton onClick={onClick} width={40} height={40} color="danger" radius="pill">
      <TrashIcon />
    </DeleteButton>
  );
}
