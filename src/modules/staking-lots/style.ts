import styled from "styled-components";
import { Theme, PrimaryButton, SecondaryButton, SecondaryGradientButton, PrimaryGradientButton } from "../../utils";

export const StakingContainer = styled.div`
  max-width: 1032px;
  margin: 5% auto;
  padding-top: 30px;

  @media (max-width: 1000px) {
    width: 90%;
    margin: 0 auto;
  }
`;

export const Title = styled.div`
  font-size: 32px;
  line-height: 40px;
  color: ${Theme.linkColor};
`;

export const SubTitle = styled.div`
  margin-top: 8px;
  font-size: 14px;
  line-height: 19px;
  color: ${Theme.textColorPrimary};
`;

export const Border = styled.div`
  border-radius: ${Theme.componentBorderRadius};
  padding: 1px;
  flex: 1;
  margin-right: 24px;
  height: fit-content;
  background: conic-gradient(from 215deg at 50% 50%, #EEEEEE 0deg, #FFFEE2 14.87deg, rgba(255, 255, 255, 0.950883) 25.67deg, rgba(255, 186, 255, 0.850701) 38.19deg, rgba(255, 255, 255, 0.815523) 53deg, #79A2F2 72.26deg, #20282E 122.18deg, #29353C 138.07deg, rgba(255, 255, 255, 0.596267) 145.34deg, #FFE978 162.04deg, #79A2F2 175.13deg, rgba(255, 255, 255, 0.741036) 186.54deg, #79A2F2 199.54deg, #85839C 222.78deg, #FFFFFF 247.79deg, #51555E 320.65deg, #699CFF 343.05deg, #FFFFFF 348.79deg, #79A2F2 354.77deg, #FFFFFF 360deg);

  &:last-child {
	  margin-right: 0;
  }

  @media screen and (max-width: 1000px) {
	  margin-right: 0;
	  margin-top: 12px;
  }
`;

export const RoyalsLotsItem = styled.div`
  background-color: ${Theme.headerBackground};
  padding: 32px 24px;
  border-radius: ${Theme.componentBorderRadius};

  &:last-child {
	  margin-right: 0 !important;
  }
`;

export const RoyaLotsContainer = styled.div`
  margin-top: 32px;
  display: flex;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const LotsHeading = styled.div`
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: ${Theme.textColorPrimary};
`;

export const LotsValue = styled.div`
  font-size: 24px;
  line-height: 40px;
  opacity: 0.8;
  text-align: center;
  margin-top: 16px;
  color: ${Theme.linkColor};
`;

export const LotsDesc = styled.div`
  margin-top: 8px;
  text-align: left;
  font-size: 16px;
  line-height: 24px;
  opacity: 0.8;
  color: ${Theme.textColorPrimary};
`;

export const BtnContainer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LotStakeButton = styled(SecondaryGradientButton)`
  width: 112px;
  height: 40px;
`;

export const BorderUnstakeBtn = styled.div`
  padding: 1px;
  background: linear-gradient(121.26deg, #1F50FE 0.42%, #C1C0C8 27.28%, #FFFFFF 60.1%, #E79BFE 96.11%);
  border-radius:${Theme.elementBorderRadius};
`;

export const LotUnstakeButton = styled(PrimaryGradientButton)`
  width: 112px;
  height: 40px;
  border-radius:${Theme.elementBorderRadius};
`;

export const LotsApy = styled.div`
  margin-top: 16px;
  font-size: 16px;
  line-height: 24px;
  color: ${Theme.linkColor};
  text-align: center;
`;

export const BottomContainer = styled.div`
  margin-top: 24px;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 1000px) {
    grid-template-columns: unset;
    grid-template-rows: 1fr 1fr;
  }
`;

export const TableRow = styled.div`
  padding: 5px 10px 5px 20px;
  background-color: ${Theme.primaryPageBg};
  display: flex;
  height: 40px;
  align-items: center;
  margin-top: 8px;
  border-radius: ${Theme.elementBorderRadius};

  @media (max-width: 1000px) {
    padding: 12px 10px 12px 17px;
  }
`;

export const TableRowContainer = styled.div`
  margin-top: 16px;
  ${TableRow}:not(:first-child) {
    margin-top: 8px;
  }
`;

export const AmountCol = styled.div`
  flex: 1;
  font-size: 14px;
  line-height: 19px;
  color: ${Theme.textColorSecondary};
  text-align: center;
`;

export const LotColumn = styled.div`
  flex: 1;
  font-size: 14px;
  line-height: 19px;
  color: ${Theme.textColorPrimary};
`;

export const ListContainer = styled.div`
  border-radius: ${Theme.componentBorderRadius};
  padding: 27px 23px 30px 23px;
  background-color: ${Theme.headerBackground};
`;

export const ClaimRoyaContainer = styled.div`
  border-radius: ${Theme.componentBorderRadius};
  padding: 27px 20px 23px 31px;
  background-color: ${Theme.headerBackground};
`;

export const ClaimRoyaLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${Theme.primaryPageBg};
`;

export const ClaimRoyaBottom = styled.div`
  padding: 12px 0 12px 31px;
  background-color: ${Theme.headerBackground};
`;

export const ClaimRoyaBottomText = styled.div`
  font-size: 12px;
  line-height: 18px;
  color: ${Theme.textColorTertiary};
`;

export const RewardRowDetail = styled.div`
  width: 55%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const RewardRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const RewardsContainer = styled.div`
  margin-top: 44px;

  ${RewardRow}:not(:first-child) {
    margin-top: 32px;
  }
`;

export const RewardType = styled.div`
  width: 60px;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: ${Theme.linkColor};
  text-align: left;

  @media (max-width: 800px) {
    text-align: center;
  }
`;

export const RewardDash = styled.div`
  width: 16px;
  height: 2px;
  margin-left: 32px;
  background-color: ${Theme.textColorPrimary};

  @media (max-width: 800px) {
    margin-top: 10px;
    margin-left: 0;
  }
`;

export const RewardAmount = styled.div`
  margin-left: 32px;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  color: ${Theme.linkColor};

  @media (max-width: 800px) {
    margin-top: 10px;
    margin-left: 0;
  }
`;

export const ClaimBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 36px;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ClaimAmount = styled.div`
  font-weight: 600;
  font-size: 28px;
  line-height: 38px;
  color: ${Theme.textColorPrimary};
  word-break: break-all;
  text-align: center;

  @media (max-width: 1000px) {
    font-size: 18px;
  }
`;

export const BorderClaimBtn = styled.div`
  padding: 1px;
  background: linear-gradient(121.26deg, #1F50FE 0.42%, #C1C0C8 27.28%, #FFFFFF 60.1%, #E79BFE 96.11%);
  border-radius:${Theme.elementBorderRadius};

  @media screen and (max-width: 1000px) {
	margin-top: 8px;
  }
`;

export const ClaimButton = styled(SecondaryButton)`
  width: 120px;
  font-size: 12px;
  line-height: 16px;
  float: right;
  background: #0A0F12;
  filter: none;

  @media (max-width: 800px) {
    margin-left: 0;
  }
`;

export const Header = styled.div`
  font-size: 20px;
  line-height: 24px;
  color: ${Theme.textColorPrimary};
`;

export const TableHeaderText = styled.div`
  flex: 1;
  font-size: 14px;
  line-height: 16px;
  color: ${Theme.linkColor};
`;

export const TableHeader = styled.div`
  margin-top: 24px;
  display: flex;
  padding-bottom: 16px;
  border-bottom: 1px solid ${Theme.primaryPageBg};
  display: flex;
  align-items: center;

  ${TableHeaderText}:not(:first-child) {
    text-align: center;
  }
`;

interface SuccessBoxProps {
  show: boolean;
}

export const SuccessBox = styled.div<SuccessBoxProps>`
  padding: 16px 18px 18px 19px;
  border: 1px solid ${Theme.linkColor};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
  background-color: ${Theme.headerBackground};
  position: fixed;
  top: 87px;
  right: 26px;
  display: flex;
  align-items: center;
  transition: 100ms all;
  opacity: ${(props) => (props.show ? "1" : "0")};
  pointer-events: ${(props) => (props.show ? "auto" : "none")};
  z-index: 10;

  @media (max-width: 600px) {
    right: 0;
  }
`;

export const CongratsText = styled.div`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: ${Theme.linkColor};
  text-transform: uppercase;
`;

export const SuccessText = styled.div`
  margin-left: 22px;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: ${Theme.textColorPrimary};
`;

export const CloseSuccess = styled.div`
  width: 24px;
  height: 24px;
  margin-left: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.div`
  margin-top: 8px;
  font-size: 12px;
  line-height: 16px;
  text-transform: capitalize;
  color: ${Theme.textColorTertiary};
`;

export const QueenNftContainer = styled.div`
  height: 200px;
  margin-top: 33px;
  background-color: ${Theme.headerBackground};
  padding: 24px 24px;
  border-radius: ${Theme.componentBorderRadius};
`;

export const QueenWrapper = styled.div`
  margin-top: 17px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const QueenInfo = styled.div`
  width: 135px;
`;

export const QueenIcon = styled.img`
  width: 100%;
  height: 140px;
`;

export const QueenTitle = styled.div`
  margin-top: 6px;
  font-size: 14px;
  line-height: 19px;
  color: ${Theme.textColorPrimary};
  text-align: center;
`;

export const QueenPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 14px;
  line-height: 19px;
  color: ${Theme.textColorTertiary};
`;

export const QueenBtnContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export const QueenBtn = styled(SecondaryButton)`
  width: 100px;
`;

export const QueenPriceText = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  text-align: right;
  color: ${Theme.linkColor};
`;
