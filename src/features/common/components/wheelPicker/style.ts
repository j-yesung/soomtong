import Picker from "react-mobile-picker";
import styled from "styled-components";

export const PickerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
`;

export const StyledPicker = styled(Picker)`
  width: 100%;
  /* z-index: 10; */
`;

export const OverlayTop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  pointer-events: none;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0));
`;

export const OverlayBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  pointer-events: none;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0));
`;

export const CenterHighlight = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 40px;
  width: 100px;
  transform: translate(-50%, -50%);
  pointer-events: none;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.bg.secondary};
  border-radius: 10px;
  /* box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); */
`;
