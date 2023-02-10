import styled from "styled-components";
import { Theme } from "../../../../utils";

export const RptStatsContainer = styled.div`
  max-width: 1032px;
  height: 180px;
  margin: 24px auto;
  background-color: ${Theme.sidebarBg};
  padding: 19px 0px 20px 24px;
  border-radius: ${Theme.componentBorderRadius};

  @media (max-width: 1150px) {
    height: 100%;
  }
`;

export const RptStatsHeader = styled.div`
  font-size: 24px;
  line-height: 32px;
  color: ${Theme.textColorPrimary};

  @media (max-width: 1150px) {
    text-align: center;
  }
`;

export const RptInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;

  @media (max-width: 1150px) {
	  margin-top: 12px;
    display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
  }
`;

export const TotalRptBox = styled.div`
  position: relative;
  border-right: 1px solid ${Theme.primaryPageBg};

  @media screen and (max-width: 1135px) {
	border-right: 0;
  }
`;

export const RptStatsDivider = styled.div`
    position: absolute;
    top: 11px;
    right: 1px;
    width: 2px;
    height: 80px;
    background-color: ${Theme.primaryBackground};

    @media (max-width: 1150px) {
      display: none;
    }
`;

export const TotalRptHeader = styled.div`
  margin-top: 8px;
  font-size: 16px;
  line-height: 20px;
  color: ${Theme.textColorPrimary};
`;

export const TotalRptVal = styled.div`
  font-size: 24px;
  line-height: 32px;
  color: ${Theme.linkColor};

  @media (max-width: 500px) {
    font-size: 22px;
  }
`;

export const RptGraphWrapper = styled.div`
  padding-left: 76px;
  display: flex;
  align-items: center;
  justify-content: space-space-around;

  @media (max-width: 1150px) {
    padding: 0 20px;
	margin-top: 12px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const RptGraphBox = styled.div`
  width: 137px;
  height: 121px;
`;

export const RptInfoIndicatorItem = styled.div`
  display: flex;
  align-items: center;
`;

export const RptInfoIndicator = styled.div`
  margin-left: 67px;
  ${RptInfoIndicatorItem}:not(:first-child) {
    margin-top: 24px;
  }

  @media (max-width: 600px) {
    margin-top: 15px;
	margin-left: 0;
  }
`;

interface RptDotProps {
  bg: string;
}

export const RptDot = styled.div<RptDotProps>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => props.bg};
`;

export const RptInfoIndicatorText = styled.div`
  font-size: 14px;
  line-height: 19px;
  margin-left: 16px;
  color: ${Theme.linkColor};
`;
