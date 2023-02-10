import styled from "styled-components";
import { Theme, PrimaryButton, SecondaryButton } from "../../../../utils";
import CustomNumberInput from "../../../custom-number-input";

export const Header = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  color: ${Theme.linkColor};
  text-transform: uppercase;
`;

export const FormContainer = styled.div`
  margin-top: 34px;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const DropContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

export const InputField = styled(CustomNumberInput)`
  width: 275px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const RptText = styled.div`
  margin-left: 7px;
  font-size: 14px;
  line-height: 19px;
  color: ${Theme.textColorPrimary};

  @media (max-width: 600px) {
    margin-left: 0;
    margin-top: 15px;
  }
`;

export const ArrowContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 25px 0;

  img {
    transform: rotate(90deg);
  }

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

export const Equivalent = styled.div`
  font-size: 14px;
  line-height: 19px;
  color: ${Theme.textColorPrimary};
  word-break: break-all;
  margin-left: 20px;
`;

export const Dropdown = styled.div`
  width: 80px;
  height: 40px;
  background: ${Theme.primaryPageBg};
  border-radius: ${Theme.componentBorderRadius};
  padding: 6px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  line-height: 19px;
  text-transform: uppercase;
  color: ${Theme.textColorPrimary};
  position: relative;

  img {
    position: absolute;
    right: 10px;
    top: 12px;
    width: 10px;
    height: 10px;
  }

  @media (max-width: 650px) {
    margin: 15px 0 0 0;
  }
`;

export const MaxButton = styled.button`
  width: 52px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${Theme.linkColor};
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: ${Theme.linkColor};
  background: transparent;
  margin-left: 10px;

  @media (max-width: 600px) {
    width: 100%;
    margin-top: 15px;
    margin-left: 0;
  }
`;

export const BalanceText = styled.div`
  margin-top: 8px;
  font-size: 12px;
  line-height: 16px;
  text-transform: capitalize;
  color: ${Theme.textColorTertiary};
`;

export const ErrorText = styled.div`
  color: ${Theme.error};
  margin-top: 5px;
  font-size: 14px;
  line-height: 19px;
`;

export const WaringText = styled.div`
  margin-top: 22px;
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
  text-transform: uppercase;
  color: ${Theme.warning};
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 52px;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const WithdrawBtn = styled(PrimaryButton)`
  width: 144px;
  font-size: 14px;
  line-height: 19px;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const CancelBtn = styled(SecondaryButton)`
  width: 144px;

  @media (max-width: 500px) {
    margin-top: 20px;
    width: 100%;
  }
`;

export const LoadingText = styled.div`
  margin-top: 8px;
  font-size: 12px;
  line-height: 16px;
  text-transform: capitalize;
  color: ${Theme.textColorTertiary};
`;
