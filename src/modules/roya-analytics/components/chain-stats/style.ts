import styled from "styled-components";
import { Color, Theme } from "../../../../utils";

export const ChainStatsContainer = styled.div`
  max-width: 1032px;
  margin: 80px auto;
  padding-top: 80px;
  border-top: 1px solid ${Theme.sidebarBg};
`;

export const ChainStatsLine = styled.div`
  width: 90%;
  height: 2px;
  background-color: ${Theme.primaryBackground};
  margin: 0 auto;
`;

export const ChainStatsHeader = styled.div`
  font-size: 32px;
  line-height: 40px;
  color: ${Theme.linkColor};
`;

export const ChainStatsBoxContainer = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 32px;

  @media (max-width: 1150px) {
    grid-template-columns: unset;
    grid-template-rows: repeat(3, 1fr);
  }
`;

export const ChainStatsBoxItem = styled.div`
  background-color: ${Theme.sidebarBg};
  padding: 24px 24px 32px 24px;
  border-radius: ${Theme.componentBorderRadius};
`;

export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ImageBox = styled.div`
  width: 56px;
  height: 56px;

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 500px) {
    margin-top: 15px;
  }
`;

export const ImageText = styled.div`
  font-size: 24px;
  line-height: 32px;
  text-transform: uppercase;
  color: ${Theme.textColorPrimary};
`;

export const StatsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 28px;
`;

export const StatsValue = styled.div`
  font-size: 24px;
  line-height: 32px;
  text-transform: uppercase;
  color: ${Theme.linkColor};

  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

export const LabelContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LabelValue = styled.div`
  font-size: 16px;
  line-height: 20px;
  text-transform: uppercase;
  color: ${Theme.textColorPrimary};
`;

export const ViewMore = styled.a`
  margin-top: 16px;
  font-size: 14px;
  display: block;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #79A2F2;
`;
