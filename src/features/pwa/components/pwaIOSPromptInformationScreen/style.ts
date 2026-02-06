import styled from "styled-components";

export const CircleNumberIcon = styled.span`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.text.lightBlue};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
`;

export const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 0 12px;

  img {
    width: 100%;
    border-radius: 12px;
    object-fit: cover;
    height: auto;
    display: block;
    object-position: center;
  }
`;
