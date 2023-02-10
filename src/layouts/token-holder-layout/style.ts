import styled from "styled-components";
import { Theme, PrimaryGradientButton } from "../../utils";
import { GradientBorder, CircleYellow } from "../../images";

export const Wrapper = styled.div`
  display: flex;
  background-color: ${Theme.primaryPageBg};
`;

export const ContentBox = styled.div`
  height: 100vh;
  flex: 1;
  background-color: ${Theme.primaryPageBg};
  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const RoyaleLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding-top: 50px;
  padding-bottom: 62px;
`;

interface BorderProps {
  active: boolean;
}

export const MenuItem = styled.div`
  padding: 5px;
  height: 56px;
  margin: 16px 22px 0 22px;
  border-radius: 8px;
  background: linear-gradient(
    180deg,rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.135369) 32.32%,rgba(0,0,0,0.0816706) 59.16%,rgba(0,0,0,0) 100%),linear-gradient(
    90deg,#23272E 0%,#0A0F12 100%);
`;

export const Border = styled.div<BorderProps>`
  height: 46px;
  padding: 1px;
  border-radius: 6px;
  background-image: ${(props) =>
    props.active ? "conic-gradient(from 180deg at 50% 50%, #EEEEEE 0deg, #FFFEE2 14.87deg, rgba(255, 255, 255, 0.950883) 25.67deg, rgba(255, 186, 255, 0.850701) 38.19deg, rgba(255, 255, 255, 0.815523) 53deg, #79A2F2 72.26deg, #FFE978 122.18deg, rgba(255, 186, 255, 0.850701) 138.07deg, rgba(255, 255, 255, 0.596267) 145.34deg, #FFE978 162.04deg, #79A2F2 175.13deg, rgba(255, 255, 255, 0.741036) 186.54deg, #79A2F2 199.54deg, rgba(255, 233, 120, 0.23) 222.78deg, #2B2A2A 247.79deg, rgba(133, 174, 255, 0.109315) 320.65deg, #699CFF 343.05deg, #FFFFFF 348.79deg, #79A2F2 354.77deg, #FFFFFF 360deg)" : "transparent" };
`;



interface LinkContainerProps {
  active: boolean;
}

export const LinkContainer = styled.div<LinkContainerProps>`
  height: 44px;
  font-weight: 600;
  font-size: 18px;
  padding: 8px 21px 8px 24px;
  line-height: 20px;
  color: ${(props) =>
	props.active ? Theme.buttonPrimaryColor : Theme.textColorPrimary};
  background: ${(props) =>
	props.active ? "linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.135369) 32.32%, rgba(0, 0, 0, 0.0816706) 59.16%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, #23272E 0%, #0A0F12 100%)" : "transparent" };
  border-radius: 6px;
  cursor: pointer;
  transition: 300ms all;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  &:after {
	  background-image: url(${CircleYellow.default});
  }

  a {
    text-decoration: none;
    font-weight: 600;
    font-size: 18px;
    line-height: 20px;
    color: ${Theme.textColorPrimary};
  }

  @media (max-width: 600px) {
    text-align: center;
    padding: 7px 8px;
  }
`;

interface SideBarProps {
  show: boolean;
}

export const SideBar = styled.div<SideBarProps>`
  height: 100vh;
  width: 320px;
  background-color: ${Theme.sidebarBg};
  transition: 300ms all;

  @media (max-width: 1200px) {
    width: ${(props) => (props.show ? "100%" : "0")};
    opacity: ${(props) => (props.show ? "1" : "0")};
    z-index: 100;
  }
`;

interface ContentBoxHeadProps {
  backgroundColor: string;
}

export const ContentBoxHead = styled.div<ContentBoxHeadProps>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: ${(props) => props.backgroundColor};

  img {
    cursor: pointer;
    display: none;
    pointer-events: none;
    transition: 300ms all;
  }

  @media (max-width: 1200px) {
    padding: 23px 35px 0 35px;

    img {
      display: block;
      pointer-events: auto;
    }
  }
`;

export const LinkGroup = styled.div`
  width: 100%;
  height: 30px;
  padding: 7px 0 7px 65px;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: ${Theme.textColorPrimary};
  background-color: ${Theme.sidebarBg};
  border-right: 2px solid ${Theme.sidebarBg};
  cursor: pointer;
  margin-top: 20px;
  transition: 300ms all;
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: ${Theme.textColorPrimary};
  }

  @media (max-width: 600px) {
    text-align: center;
    padding: 7px 0;
    justify-content: center;
  }
`;

interface LinkImgProps {
  open: boolean;
}

export const LinkImg = styled.img<LinkImgProps>`
  margin-left: 10px;
  transform: ${(props) => (props.open ? "rotate(180deg)" : "rotate(0deg)")};
  transition: 300ms all;
`;
