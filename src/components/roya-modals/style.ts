import styled from "styled-components";
import { Theme } from "../../utils";

export const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Header = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-transform: uppercase;
  color: ${Theme.linkColor};
  text-align: center;
`;

export const WarningText = styled.div`
  margin-top: 38px;
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
  text-transform: uppercase;
  color: ${Theme.warning};
`;

export const DiscountText = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: ${Theme.textColorPrimary};
`;
