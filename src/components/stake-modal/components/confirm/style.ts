import styled from "styled-components";
import { Theme, PrimaryButton, SecondaryButton } from "../../../../utils";

export const AmountContainer = styled.div`
  margin-top: 31px;
  font-size: 14px;
  line-height: 19px;
  color: ${Theme.textColorPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: break-all;
`;

export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 38px;
`;

export const TextContainer = styled.div`
  margin-top: 29px;
  font-size: 12px;
  line-height: 18px;
  color: ${Theme.textColorPrimary};
`;

export const WaringText = styled.div`
  margin-top: 14px;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  text-transform: uppercase;
  color: ${Theme.warning};
`;

export const BtnContainer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8%;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const ConfirmBtn = styled(PrimaryButton)`
  width: 144px;
  font-size: 14px;
  line-height: 19px;
`;

export const CancelBtn = styled(SecondaryButton)`
  width: 144px;

  @media (max-width: 500px) {
    margin-top: 20px;
  }
`;

