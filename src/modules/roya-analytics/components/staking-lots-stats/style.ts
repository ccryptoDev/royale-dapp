import styled from "styled-components";
import { Color, Theme } from "../../../../utils";

export const StakingLotsContainer = styled.div`
  max-width: 1032px;
  margin: 24px auto;
  background-color: ${Theme.sidebarBg};
  height: 331px;
  border-radius: ${Theme.componentBorderRadius};
  padding: 21px 0 49px 24px;

  @media (max-width: 1150px) {
    height: 100%;
  }
`;

export const StakingLotHeader = styled.div`
  font-size: 24px;
  line-height: 32px;
  color: ${Theme.textColorPrimary};

  @media screen and (max-width: 1135px) {
	  text-align: center;
  }
`;

export const StakingLots = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-right: 1px solid ${Theme.primaryPageBg};

  @media screen and (max-width: 1135px) {
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  border-right: 0;
  }
`;

export const StakingLotsValue = styled.div`
  font-size: 24px;
  line-height: 32px;
  color: ${Theme.linkColor};

  @media (max-width: 500px) {
    font-size: 22px;
  }
`;

export const StakingLotSubHeader = styled.div`
  margin-top: 8px;
  font-size: 16px;
  line-height: 20px;
  color: ${Theme.textColorPrimary};

  @media (max-width: 500px) {
    margin-top: 0px;
  }
`;

export const LotsTypeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 31px;

  @media (max-width: 1150px) {
    display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
  }
`;

export const QueenIcon = styled.div`
  /* width: 75px; */
  /* height: 60px; */
`;

export const KingIcon = styled.div`
  /* width: 75px; */
  /* height: 60px; */
`;

export const FlushIcon = styled.div`
  /* width: 75px; */
  /* height: 60px; */
`;

export const LotsTypeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border-right: 1px solid ${Theme.primaryPageBg};

  &:last-child {
	border-right: 0 !important;
  }

  @media (max-width: 1150px) {
    margin-top: 15px;
	border-right: 0;
  }
`;

export const LotsTypeItemBar = styled.div`
  position: absolute;
  top: 30px;
  right: -1px;
  background: #293A99;
  width: 2px;
  height: 150px;

  @media (max-width: 1150px) {
    opacity: 0;
  }
`;

export const LotsTypeItemHeader = styled.div`
  margin-top: 10px;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  text-transform: uppercase;
  color: ${Theme.linkColor};
`;

export const LotsTypeItemValue = styled.div`
  margin-top: 8px;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  color: ${Theme.linkColor};
`;

export const LotsTypeItemSecondaryHeader = styled.div`
  margin-top: 24px;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: ${Theme.textColorPrimary};
`;

export const LotsTypeItemRoyaValue = styled.div`
  margin-top: 8px;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.01em;
  text-align: center;
  color: ${Theme.linkColor};
`;
