import styled from "styled-components";
import { Theme } from "../../utils";

interface Props {
  show: boolean;
}

export const ModalWrapper = styled.div<Props>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${Theme.modalBg};
  z-index: ${(props) => (props.show ? "3" : "-3")};
  opacity: ${(props) => (props.show ? "1" : "0")};
`;

export const ModalBorder = styled.div`
  background-image: conic-gradient(from 215deg at 37.23% 50%, #EEEEEE 0deg, #FFFEE2 14.87deg, rgba(255, 255, 255, 0.950883) 25.67deg, rgba(255, 186, 255, 0.850701) 38.19deg, rgba(255, 255, 255, 0.815523) 53deg, #79A2F2 72.26deg, #20282E 122.18deg, #29353C 138.07deg, rgba(255, 255, 255, 0.596267) 145.34deg, #FFE978 162.04deg, #79A2F2 175.13deg, rgba(255, 255, 255, 0.741036) 186.54deg, #79A2F2 199.54deg, #85839C 222.78deg, #FFFFFF 247.79deg, #51555E 320.65deg, #699CFF 343.05deg, #FFFFFF 348.79deg, #79A2F2 354.77deg, #FFFFFF 360deg);
  position: relative;
  padding: 1px;
  width 432px;
  border-radius: 12px;
  margin: 165px auto 0;
`;

export const ModalContainer = styled.div`
  width: 430px;
  padding: 27px 30px 41px 30px;
  background: ${Theme.headerBackground};
  box-shadow: ${Theme.modalShadow};
  border-radius: ${Theme.componentBorderRadius};
  position: relative;

  @media (max-width: 600px) {
    width: 90%;
    margin: 10px auto 0 auto;
    padding: 50px 30px 41px 30px;
  }

  @media (max-width: 500px) {
    max-height: 90%;
    overflow-y: auto;
  }
`;

export const CrossIconContainer = styled.div`
  position: absolute;
  top: -25px;
  right: -30px;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (max-width: 600px) {
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;
