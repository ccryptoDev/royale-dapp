import styled from "styled-components";
import { Theme, PrimaryButton } from "../../utils";

export const BtnContainer = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;
export const UnderStandBtn = styled(PrimaryButton)`
  width: 266px;
  font-size: 14px;
  line-height: 19px;
`;

export const WarningText = styled.div`
  margin-top: 30px;
  color: ${Theme.warning};
  text-align: center;
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
  text-transform: uppercase;
`;
