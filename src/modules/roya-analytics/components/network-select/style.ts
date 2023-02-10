import styled from "styled-components";
import { Color, Theme } from "../../../../utils";

export const SelectWrapper = styled.div`
  max-width: 1032px;
  margin: 76px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 600px) {
	  flex-direction: column;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const HeaderLine = styled.div`
  max-width: 1032px;
  margin: 80px auto;
  flex: 1;
  height: 2px;
  background-color: ${Theme.sidebarBg};
`;

export const HeaderText = styled.div`
  font-size: 32px;
  line-height: 40px;
  text-align: center;
  text-transform: uppercase;
  color: ${Theme.linkColor};

  @media (max-width: 600px) {
    font-size: 24px;
    margin: 0 5px;
  }
`;

export const SelectBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const SelectBoxText = styled.div`
  margin-right: 16px;
  font-size: 16px;
  line-height: 24px;
  color: ${Theme.textColorPrimary};

  @media (max-width: 800px) {
    margin-right: 0;
  }
`;

export const NetworkDropdownWrapper = styled.div`
  position: relative;
  width: 307px;
  margin-left: 26px;

  @media (max-width: 800px) {
    margin-left: 0;
    margin-top: 15px;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const Border = styled.div`
  width: 100%;
  padding: 1px;
  background: ${Theme.sidebarBg};
  border-radius: ${Theme.componentBorderRadius};
  background-image: conic-gradient(from 215deg at 50% 50%, #EEEEEE 0deg, #FFFEE2 14.87deg, rgba(255, 255, 255, 0.950883) 25.67deg, rgba(255, 186, 255, 0.850701) 38.19deg, rgba(255, 255, 255, 0.815523) 53deg, #79A2F2 76.15deg, #009FFF 115.75deg, #009FFF 132.26deg, rgba(255, 255, 255, 0.596267) 145.34deg, #FFE978 162.04deg, #79A2F2 175.13deg, rgba(255, 255, 255, 0.741036) 186.54deg, #79A2F2 199.54deg, #85839C 222.78deg, #FFFFFF 247.79deg, #51555E 320.65deg, #699CFF 343.05deg, #FFFFFF 348.79deg, #79A2F2 354.77deg, #FFFFFF 360deg);
`;

export const NetworkDropdown = styled.div`
  width: 100%;
  padding: 20px 24px;
  background: ${Theme.sidebarBg};
  border-radius: ${Theme.componentBorderRadius};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const NetworkIcon = styled.div`
  width: 27px;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    user-select: none;
  }
`;

export const NetworkText = styled.div`
  margin-left: 16px;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  text-transform: capitalize;
  letter-spacing: 0.3px;
  color: ${Theme.linkColor};
  user-select: none;
`;

interface DropdownArrowProps {
  open: boolean;
}

export const DropdownArrow = styled.div<DropdownArrowProps>`
  margin-left: auto;

  img {
    transform: ${(props) => (props.open ? "rotate(180deg)" : "rotate(0deg)")};
    transition: 300ms transform;
    user-select: none;
  }
`;

export const NetworkDropdownList = styled.div`
  position: absolute;
  top: 82px;
  width: 100%;
`;
