import styled from "styled-components";
import { Theme } from "../../../../utils";

export const RoyaContainer = styled.div`
  max-width: 1032px;
  margin: 48px auto;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1150px) {
	width: 90%;
    flex-direction: column;
  }
`;

export const Border = styled.div`
  width: 56.03%;
  background: ${Theme.sidebarBg};
  border-radius: ${Theme.componentBorderRadius};
  padding: 1px;
  position: relative;
  background-image: conic-gradient(from 180deg at 50% 50%, #EEEEEE 0deg, #FFFEE2 14.87deg, rgba(255, 255, 255, 0.950883) 25.67deg, rgba(255, 186, 255, 0.850701) 38.19deg, rgba(255, 255, 255, 0.815523) 53deg, #79A2F2 72.26deg, #FFE978 122.18deg, rgba(255, 186, 255, 0.850701) 138.07deg, rgba(255, 255, 255, 0.596267) 145.34deg, #FFE978 162.04deg, #79A2F2 175.13deg, rgba(255, 255, 255, 0.741036) 186.54deg, #79A2F2 199.54deg, rgba(255, 233, 120, 0.23) 222.78deg, #2B2A2A 247.79deg, rgba(133, 174, 255, 0.109315) 320.65deg, #699CFF 343.05deg, #FFFFFF 348.79deg, #79A2F2 354.77deg, #FFFFFF 360deg);

  @media (max-width: 1150px) {
    width: 100%;
	height: 38vh;
  }
`;

export const RoyaGraphContainer = styled.div`
  width: 100%;
  background: ${Theme.sidebarBg};
  border-radius: ${Theme.componentBorderRadius};
  padding-top: 31px;
  height: 100%;
  position: relative;

  @media (max-width: 1150px) {
    width: 100%;
  }
`;

export const RoyaGraphHeader = styled.div`
  padding-left: 24px;
  font-size: 16px;
  line-height: 24px;
  text-transform: uppercase;
  color: ${Theme.textColorPrimary};
`;

export const RoyaPriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

export const RoyaPrice = styled.div`
  padding-left: 24px;
  font-weight: 600;
  font-size: 36px;
  line-height: 49px;
  text-transform: uppercase;
  color: ${Theme.textColorPrimary};
`;

interface RoyaChangeBoxProps {
  change: number;
}

export const RoyaChangeBox = styled.div<RoyaChangeBoxProps>`
  display: flex;
  align-items: center;
  margin-left: 29px;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) =>
    props.change >= 0 ? Theme.graphColorPrimary : Theme.error};

  img {
    margin-right: 5px;
  }
`;

export const RoyaGraph = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

export const RoyaInfoValueBox = styled.div`
  padding: 24px 30px 30px 30px;
  height: 128px;
  background: ${Theme.sidebarBg};
  border-radius: ${Theme.componentBorderRadius};
  display: flex;
  justify-content: space-between;

  @media (max-width: 500px) {
    padding: 10px;
    flex-direction: column;
    align-items: center;
	height: 100%;
  }
`;

export const RoyaInfoContainer = styled.div`
  width: 40.49%;

  ${RoyaInfoValueBox}:not(:first-child) {
    margin-top: 24px;
  }

  @media (max-width: 1150px) {
    width: 100%;
    margin-top: 33px;
  }
`;

export const RoyaInfoValueWrapper = styled.div`
  padding-top: 5px;
`;

export const RoyaInfoHeader = styled.div`
  font-size: 24px;
  line-height: 32px;
  text-transform: uppercase;
  color: ${Theme.linkColor};

  @media (max-width: 500px) {
    font-size: 22px;
    text-align: center;
  }
`;

export const RoyaInfoValue = styled.div`
  margin-top: 16px;
  font-size: 14px;
  line-height: 20px;
  color: ${Theme.textColorPrimary};

  @media (max-width: 500px) {
    text-align: center;
  }
`;

export const RoyaInfoGraph = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 80px;
    height: 31px;
  }

  @media (max-width: 500px) {
    margin-top: 15px;
  }
`;

export const RoyaInfoGraphChange = styled.div<RoyaChangeBoxProps>`
  margin-top: 27px;
  display: flex;
  align-items: center;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: ${(props) =>
    props.change >= 0 ? Theme.graphColorPrimary : Theme.error};

  img {
    width: 7px;
    height: 8px;
    margin-right: 5px;
  }
`;

export const GraphPlaceHolder = styled.div`
  width: 1px;
  height: 80px;
`;
