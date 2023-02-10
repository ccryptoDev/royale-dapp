import styled from "styled-components";
import { Color, Theme } from "../../../../utils";

export const RoyaReserveInfoContainer = styled.div`
  max-width: 1032px;
  height: 180px;
  margin: 24px auto;
  background-color: ${Theme.sidebarBg};
  padding: 19px 0 45px 24px;
  border-radius: ${Theme.componentBorderRadius};

  @media (max-width: 1150px) {
    height: 100%;
  }
`;

export const RoyaReserveHeader = styled.div`
  font-size: 24px;
  line-height: 32px;
  color: ${Theme.textColorPrimary};

  @media screen and (max-width: 1135px) {
	  text-align: center;
  }
`;

export const RoyaReserMain = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  grid-template-columns: 50fr 25fr 25fr;
  align-items: center;

  @media screen and (max-width: 1135px) {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
  }
`;

export const RoyaReserveValueInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-right: 1px solid ${Theme.primaryPageBg};

  @media screen and (max-width: 1135px) {
	border-right: 0;
  }
`;

export const RoyaReserveValue = styled.div`
  font-size: 24px;
  line-height: 32px;
  color: ${Theme.linkColor};

  @media (max-width: 500px) {
    font-size: 22px;
  }
`;

export const RoyaReserveSubHeader = styled.div`
  margin-top: 8px;
  font-size: 16px;
  line-height: 20px;
  color: ${Theme.textColorPrimary};

  @media (max-width: 500px) {
    margin-top: 0px;
  }
`;

export const RoyaReserveInfo = styled.div`
  margin-top: 8px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 1150px) {
    grid-template-columns: unset;
    grid-template-rows: repeat(2, 1fr);
  }
`;

export const RoyaReserveInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1150px) {
    margin-top: 15px;
  }
`;

export const RoyaReserveInfoBoxHeader = styled.div`
  margin-top: 12px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: ${Theme.textColorPrimary};
`;

export const RoyaReserveInfoBoxVal = styled.div`
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  text-transform: uppercase;
  color: ${Theme.linkColor};

  @media (max-width: 500px) {
    font-size: 22px;
  }
`;
