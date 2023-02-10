import styled from "styled-components";
import { Theme, SecondaryGradientButton } from "../../utils";
import { GroupIcon } from "../../images";

interface Props {
  show: boolean;
}

export const ModalWrapper = styled.div<Props>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: ${(props) => (props.show ? "3" : "-3")};
  opacity: ${(props) => (props.show ? "1" : "0")};
  backdrop-filter: blur(14px);
`;

export const ModalBorder = styled.div`
  background: conic-gradient(from 215deg at 50% 50%, #EEEEEE 0deg, #FFFEE2 14.87deg, rgba(255, 255, 255, 0.950883) 25.67deg, rgba(255, 186, 255, 0.850701) 38.19deg, rgba(255, 255, 255, 0.815523) 53deg, #79A2F2 72.26deg, #20282E 122.18deg, #29353C 138.07deg, rgba(255, 255, 255, 0.596267) 145.34deg, #FFE978 162.04deg, #79A2F2 175.13deg, rgba(255, 255, 255, 0.741036) 186.54deg, #79A2F2 199.54deg, #85839C 222.78deg, #FFFFFF 247.79deg, #51555E 320.65deg, #699CFF 343.05deg, #FFFFFF 348.79deg, #79A2F2 354.77deg, #FFFFFF 360deg);
  position: relative;
  padding: 1px;
  width 605px;
  border-radius: 12px;
  margin: 165px auto 0;
`;

export const ModalContainer = styled.div`
  width: 603px;
  padding: 52px;
  background: #0A0F12;
  box-shadow: ${Theme.modalShadow};
  border-radius: 12px;
  position: relative;
  backdrop-filter: blur(14px);

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

export const ModalHeader = styled.div`
  font-size: 24px;
  color: #fff;
  line-height: 40px;
  font-family: Work Sans;
  padding-bottom: 24px;
  border-bottom: 1px solid #444444;
`;

export const ModalBody = styled.div`
  padding-top: 37px;
  font-family: Work Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #FFFFFF;
  width: 456px;
`;

export const InputTitle = styled.div`
  font-family: Work Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #FFFFFF;
`;

export const InputBox = styled.input.attrs(({ type, id }) => ({
  type:  type || "file",
  id: id || "file-upload"
}))`
  display: none
`;

export const CustomInput = styled.div`
  margin-top: 14px;
  width: 456px;
  height: 40px;
  background: #23272E;
  border-radius: 6px;
  padding: 12px 17px;
  color: #fff;
  border: none;
`;

export const CustomInputBox = styled.label`
  width: 100%;
  display: flex;
`;

export const StatusBox = styled.div`
  margin-top: 37px;
`;

export const WhitelistBox = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StatusBtn = styled.div`
  width: 68px;
  height: 39px;
  background: #23272E;
  border-radius: 86px;
  padding: 2px;
`;

export const SaveButton = styled(SecondaryGradientButton)`
  width: 164px;
  height: 40px;
  margin: 56px auto 0;
  font-size: 16px;
  font-weight: bold;

  @media (max-width: 700px) {
    margin: 15px 0 0 0;
  }
`;
export const ButtonField = styled.div`
  text-align: center;
`;