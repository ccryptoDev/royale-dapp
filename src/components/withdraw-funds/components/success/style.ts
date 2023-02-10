import styled from "styled-components";
import { Theme } from "../../../../utils";

export const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 23px;
`;

export const EtherscanLink = styled.a`
  font-size: 12px;
  line-height: 16px;
  color: ${Theme.linkColor};
  text-decoration: none;
`;

export const WithdrawalText = styled.div`
  margin-top: 32px;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: ${Theme.textColorPrimary};
`;
