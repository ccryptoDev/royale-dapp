import styled from "styled-components";
import { Theme, PrimaryButton, SecondaryGradientButton, PrimaryGradientButton } from "../../utils";
import { CustomNumberInput } from "../../components";

export const Container = styled.div`
  max-width: 1032px;
  margin: 5% auto;
  padding-top: 30px;

  @media (max-width: 1000px) {
    width: 90%;
    margin: 0 auto;
  }
`;

export const WhiteHeader = styled.div`
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;
  color: ${Theme.linkColor};
  padding-top: 32px;
`;

export const SubHeader = styled.div`
  padding-top: 8px;
  font-size: 16px;
  line-height: 24px;
  color: ${Theme.textColorPrimary};

  span {
    text-decoration: underline;
  }
`;

export const RoyaContainer = styled.div`
  margin-top: 32px;

  form {
    width: 62.61%;
  }

  @media (max-width: 1000px) {
    form {
      width: 100%;
    }
  }
`;

export const StakeRoyaContainer = styled.div`
  background-color: ${Theme.sidebarBg};
  padding: 24px 176px 32px 176px;
  height: 176px;
  width: 100%;
  border-radius: ${Theme.componentBorderRadius};

  @media screen and (max-width: 860px) {
	height: 100%;
  }

  @media screen and (max-width: 600px) {
	height: 100%;
	padding: 24px 12px 32px 12px;
  }
`;

export const RoyaContainerHeader = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: ${Theme.linkColor};
`;

export const RoyaContainerSubHeader = styled.div`
  text-align: center;
  font-size: 14px;
  line-height: 19px;
  color: ${Theme.textColorPrimary};
  margin-top: 13px;
`;

export const RoyaInfoContainer = styled.div`
  margin-top: 24px;
  width: 100%;

  @media (max-width: 1000px) {
    margin-top: 30px;
    width: 100%;
  }
`;

export const RoyaInfoBox = styled.div`
  width: 240px;
  height: 220px;
  padding: 24px 24px 0px 24px;
  background-color: ${Theme.sidebarBg};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: ${Theme.componentBorderRadius};

  @media (max-width: 1355px) {
	width: 45%;
  }

  @media (max-width: 600px) {
    width: 100%;

	&:last-child {
		margin-left: 0 !important;
		margin-top: 12px !important;
	}
  }
`;

export const RoyaInfo = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1355px) {
	flex-direction: column;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const RoyaInfoLeft = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 600px) {
		flex-direction: column;
	}

	${RoyaInfoBox}:not(:first-child) {
		margin-left: 24px;
	}
`;

export const RoyaInfoDetail = styled.div`
	width: 504px;
	background-color: ${Theme.sidebarBg};
	border-radius: ${Theme.componentBorderRadius};
	padding: 24px 24px 0 24px;

	@media screen and (max-width: 1355px) {
		margin-top: 12px;
		width: 100%;
	}

	@media (max-width: 1000px) {
		width: 100%;
	}
`;

export const RoyaInfoBoxText = styled.div`
  font-size: 32px;
  line-height: 40px;
  letter-spacing: 0.01em;
  color: ${Theme.linkColor};
  margin-top: 24px;
  min-height: 38px;
  text-align: center;
  word-break: break-all;
`;

export const Border = styled.div`
  padding: 1px;
  background-image: conic-gradient(from 180deg at 50% 50%, #EEEEEE 0deg, #FFFEE2 14.87deg, rgba(255, 255, 255, 0.950883) 25.67deg, rgba(255, 186, 255, 0.850701) 38.19deg, rgba(255, 255, 255, 0.815523) 53deg, #79A2F2 72.26deg, #20282E 122.18deg, #29353C 138.07deg, rgba(255, 255, 255, 0.596267) 145.34deg, #FFE978 162.04deg, #79A2F2 175.13deg, rgba(255, 255, 255, 0.741036) 186.54deg, #79A2F2 199.54deg, #FFE978 222.78deg, #FFFFFF 247.79deg, #51555E 320.65deg, #699CFF 343.05deg, #FFFFFF 348.79deg, #79A2F2 354.77deg, #FFFFFF 360deg);
  border-radius: 12px;

`;

export const RoyaInfoBoxHeader = styled.div`
  text-align: center;
  font-size: 16px;
  line-height: 20px;
  color: ${Theme.textColorPrimary};
`;

export const RoyaInfoSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #23272E;
  padding: 24px 0;

  &:first-child {
	padding-top: 0 !important;
  }

  &:last-child {
	border-bottom: 0 !important;
  }

  div {
    font-size: 14px;
    line-height: 19px;
    color: ${Theme.textColorPrimary};
  }

  span {
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    color: ${Theme.linkColor};
    text-align: right;
    word-break: break-all;
  }

  @media (max-width: 600px) {
    flex-direction: column;

    span {
      margin-top: 10px;
    }
  }
`;

export const RoyaInfoBottom = styled.div`
  width: 100%;
  background-color: ${Theme.headerBackground};
  margin-top: 20px;
  padding: 25px 30px 90px 30px;

  ${RoyaInfoSummary}:not(:first-child) {
    margin-top: 14px;
  }

  @media (max-width: 1000px) {
    margin-top: 30px;
  }
`;

export const BorderBtn = styled.div`
  padding: 1px;
  border-radius: 6px;
  margin-top: 24px;
  background: linear-gradient(121.26deg, #1F50FE 0.42%, #C1C0C8 27.28%, #FFFFFF 60.1%, #E79BFE 96.11%);
`;

export const MaxBorderBtn = styled.div`
  padding: 1px;
  border-radius: 6px;
  background: linear-gradient(121.26deg, #1F50FE 0.42%, #C1C0C8 27.28%, #FFFFFF 60.1%, #E79BFE 96.11%);
`;

export const RoyaInfoButton = styled(PrimaryGradientButton)`
  width: 192px;
  height: 40px;
  background: #0A0F12;
`;

export const StakeButton = styled(SecondaryGradientButton)`
  width: 156px;
  height: 40px;
  margin-left: 43px;

  @media screen and (max-width: 950px) {
	padding: 7px 8px;
  }
  @media screen and (max-width: 600px) {
	margin-left: 0;
	margin-top: 12px;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
`;

export const InputWrapper = styled.div`
  margin: 24px auto 0 auto;

  @media (max-width: 600px) {
    width: 90%;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const AmountText = styled.div`
  margin-top: 8px;
  font-size: 12px;
  line-height: 16px;
  color: ${Theme.textColorTertiary};

  @media (max-width: 600px) {
    margin-top: 15px;
  }
`;

export const InputField = styled(CustomNumberInput)`
  width: 372px;
  height: 40px;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const InputText = styled.div`
  margin: 0 8px;
  font-size: 14px;
  line-height: 19px;
  text-transform: uppercase;
  color: ${Theme.linkColor};

  @media (max-width: 600px) {
    margin: 15px;
  }
`;

export const MaxButton = styled(PrimaryGradientButton)`
  width: 56px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${Theme.linkColor};
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: ${Theme.linkColor};
  background: ${Theme.sidebarBg};

  @media (max-width: 600px) {
    width: 100%;
	padding-left: 12px;
	padding-right: 12px;
  }
`;

export const ErrorText = styled.div`
  color: ${Theme.error};
  margin-top: 5px;
  font-size: 14px;
  line-height: 19px;
`;

export const UnstakeBtnContainer = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
`;

export const LoadingText = styled.div`
  margin-top: 8px;
  font-size: 12px;
  line-height: 16px;
  color: ${Theme.textColorTertiary};
  min-height: 16px;
`;

export const ToUsd = styled.div`
  margin-top: 15px;
  font-size: 16px;
  line-height: 18px;
  color: ${Theme.textColorTertiary};
`;
