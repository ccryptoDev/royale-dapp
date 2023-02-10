import styled from "styled-components";
import { Theme } from "../../../../utils";

export const StableCoinContainer = styled.div`
  max-width: 1032px;
  margin: 32px auto;
  background-color: ${Theme.sidebarBg};
  padding: 24px 0 32px 24px;
  border-radius: ${Theme.componentBorderRadius};
`;

export const StableCoinHeader = styled.div`
  font-size: 24px;
  line-height: 32px;
  color: ${Theme.textColorPrimary};
  @media screen and (max-width: 1135px) {
	  text-align: center;
  }
`;

export const StableCoinInfo = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media screen and (max-width: 1135px) {
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
  }
`;

export const StableCoinInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-right: 1px solid ${Theme.primaryPageBg};
  margin-left: 36px;

  &:first-child {
	margin-left: 0 !important;
  }

  &:last-child {
	border-right: 0 !important;
  }

  @media (max-width: 1150px) {
    margin-top: 15px;
	border-right: 0;
  	margin-left: 0;
  }
`;

export const StableCoinInfoBoxHeader = styled.div`
  margin-top: 8px;
  font-size: 14px;
  line-height: 20px;
  text-transform: uppercase;
  color: ${Theme.textColorPrimary};
`;

export const StableCoinInfoBoxVal = styled.div`
  font-size: 24px;
  line-height: 32px;
  text-transform: uppercase;
  color: ${Theme.linkColor};

  @media (max-width: 500px) {
    font-size: 22px;
  }
`;
