import styled from "styled-components";
import { Theme, PrimaryButton, SecondaryButton, PrimaryGradientButton, SecondaryGradientButton } from "../../utils";
import { CustomNumberInput } from "../../components";

export const ErrorText = styled.div`
  color: ${Theme.error};
  margin-top: 5px;
  font-size: 14px;
  line-height: 19px;
`;

export const DashboardPage = styled.div`
  min-height: 100vh;
  background-color: ${Theme.primaryPageBg};
`;

export const PageContainer = styled.div`
  max-width: 1032px;
  margin: 5% auto;
  padding-top: 30px;

  @media (max-width: 1250px) {
    width: 90%;
    margin: 0 auto;
  }
`;

export const TokenContainer = styled.div``;

export const DepositWrapper = styled.div`
  background: ${Theme.headerBackground};
  border-radius: ${Theme.componentBorderRadius};
  padding: 24px 0 56px 24px;
  border-radius: 12px;
  /* border: 1px solid ${Theme.linkColor}; */

  @media (max-width: 1050px) {
    padding: 24px 49px 56px 24px;
  }
`;

export const DepositContainer = styled.div`
  width: 100%;
  display: flex;

  ${TokenContainer}:not(:first-child) {
    margin-left: 45px;
  }

  @media (max-width: 1050px) {
    flex-direction: column;

    ${TokenContainer}:not(:first-child) {
      margin-left: 0;
      margin-top: 30px;
    }
  }
`;

export const PrimaryHeaderText = styled.div`
  font-size: 20px;
  line-height: 24px;
  color: ${Theme.linkColor};
`;

export const InputContainer = styled.div`
  margin-top: 24px;
  display: flex;

  @media (max-width: 650px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const InputField = styled(CustomNumberInput)``;

export const CustomDropdown = styled.div`
  margin-left: 8px;

  @media (max-width: 650px) {
    margin: 15px 0 15px 0;
  }
`;

export const RtpToken = styled.div`
  font-size: 14px;
  line-height: 16px;
  text-transform: uppercase;
  color: ${Theme.linkColor};
  margin-left: 20px;
  display: flex;
  align-items: center;

  @media (max-width: 650px) {
    margin: 15px 0 0 0;
  }
`;

export const BalanceText = styled.div`
  margin-top: 8px;
  font-size: 12px;
  line-height: 16px;
  text-transform: capitalize;
  color: ${Theme.textColorTertiary};
`;

export const HistoryContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  background: ${Theme.headerBackground};
  border-radius: ${Theme.componentBorderRadius};
  padding: 28px 74px 60px 64px;
`;

export const HistoryPrimaryHeader = styled.div`
  font-size: 20px;
  line-height: 24px;
  color: ${Theme.linkColor};
`;

export const HistoryBoxItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HistoryBoxItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: start;

  @media (max-width: 985px) {
	margin-top: 16px;
  }
`;

export const HistoryBoxItemAmount = styled.div`
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;
  min-height: 38px;
  text-align: center;
  margin-left: 16px;
  color: ${Theme.linkColor};
  word-break: break-all;
`;

export const HistoryBoxIcon = styled.div`
  display: flex;
  justify-content: center;

  img {
	  width: 48px;
	  height: 48px;
  }
`;

export const HistoryBoxText = styled.div`
  margin-top: 16px;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: ${Theme.textColorPrimary};

  @media (max-width: 985px) {
    margin-top: 8px;
  }
`;

export const HistoryBox = styled.div`
  display: flex;
  margin-top: 48px;

  @media (max-width: 1000px) {
    flex-direction: column;

    ${HistoryBoxItem}:not(:first-child) {
      margin-left: 0;
      margin-top: 15px;
    }
  }
`;

export const MidContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const RewardsAndTable = styled.div`
  display: flex;
  width: 100%;
  margin-top: 24px;
  justify-content: space-between;

  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const RewardsContainer = styled.div`
  width: 328px;

  background: ${Theme.headerBackground};
  border-radius: ${Theme.componentBorderRadius};

  @media (max-width: 1100px) {
    width: 100%;
  }
`;

export const RewardsTop = styled.div`
  padding: 24px 10px 24px 10px;
`;

export const RewardsBottom = styled.div`
  padding: 24px 10px 32px 10px;
`;

export const RewardLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #23272E;
`;

export const RewardValue = styled.div`
  margin-top: 17px;
  text-align: center;
  font-weight: 600;
  font-size: 28px;
  line-height: 38px;
  color: ${Theme.textColorPrimary};
`;

export const TableContainer = styled.div`
  width: 680px;
  background: ${Theme.headerBackground};
  border-radius: ${Theme.componentBorderRadius};
  padding: 24px 40px 0 36px;

  @media (max-width: 1100px) {
    margin-top: 20px;
    width: 100%;
  }
`;

export const HistoryTable = styled.div`
  width: 100%;
  overflow-x: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
`;

export const TableWrapper = styled.div`
  width: 100%;
  height: 275px;
  margin-top: 24px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: blue;
    background-color: ${Theme.primaryPageBg};
    border-radius: 20px;
  }
`;

interface ApyTdProps {
  operation: string;
}

const setApyTdColor = (operation: string): string => {
  if (operation === "Contribution") {
    return Theme.textColorSecondary;
  }

  return Theme.error;
};

export const ApyTd = styled.td<ApyTdProps>`
  color: ${(props) => setApyTdColor(props.operation)} !important;
  word-break: break-all;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5em;
  width: 100%;
  min-width: 490px;

  thead tr {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 10px;
    border-bottom: 1px solid ${Theme.primaryPageBg};
  }

  thead th {
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: ${Theme.textColorPrimary};
    padding: 0px 0px 7px 15px;
    text-align: left;

	&:first-child {
		padding: 0px 0px 0px 0px !important;
	}
  }

  tbody tr td {
    font-size: 14px;
    line-height: 19px;
    color: #ffffff;
    padding: 6.5px 15px 7.5px 15px;
    background: ${Theme.primaryPageBg};
  }

  tbody tr td:first-child {
    border-top-left-radius: ${Theme.componentBorderRadius};
    border-bottom-left-radius: ${Theme.componentBorderRadius};
  }

  tbody tr td:last-child {
    border-top-right-radius: ${Theme.componentBorderRadius};
    border-bottom-right-radius: ${Theme.componentBorderRadius};
  }
`;

export const ClaimRoya = styled.div`
  margin-top: 11px;
  display: flex;
  justify-content: center;
`;

export const ClaimRoyaBtn = styled(PrimaryButton)`
  width: 174px;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
`;

export const Withdraw = styled.div`
  margin-top: 21px;
  display: flex;
  justify-content: center;
  border-radius: ${Theme.componentBorderRadius};
  background-color: ${Theme.headerBackground};
  padding: 39px 0;
`;

export const WithdrawBtn = styled(PrimaryButton)``;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PrimaryHeader = styled.div`
  font-size: 20px;
  line-height: 24px;
  color: ${Theme.linkColor};

  @media screen and (max-width: 1100px) {
	  display: none;
  }
`;

export const ClaimRewardCont = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
`;

export const WithdrawsBtn = styled(SecondaryGradientButton)`
	width: 156px;
	height: 40px;
	border-radius: ${Theme.elementBorderRadius};
`;

export const BorderClaimBtn = styled.div`
  padding: 1px;
  background: linear-gradient(121.26deg, #1F50FE 0.42%, #C1C0C8 27.28%, #FFFFFF 60.1%, #E79BFE 96.11%);
  border-radius:${Theme.elementBorderRadius};
`;

export const ClaimRewardsBtn = styled(PrimaryGradientButton)`
	width: 156px;
	height: 40px;
	border-radius: ${Theme.elementBorderRadius};
`;

export const RightArrowBox = styled.div`
  margin-left: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 650px) {
    margin: 15px 0 0 0;
  }
`;

export const DepositBtn = styled(SecondaryGradientButton)`
  width: 146px;
  font-size: 14px;
  line-height: 19px;
  margin-left: 60px;

  @media (max-width: 650px) {
	height: 40px;
    margin: 15px 0 0 0;
  }
`;

export const TotalRpt = styled.div`
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  min-height: 38px;
  text-align: center;
  text-transform: uppercase;
  color: ${Theme.linkColor};
  word-break: break-all;
  margin-top: 16px;
`;

export const AvailableRpt = styled.div`
  font-weight: 600;
  font-size: 48px;
  line-height: 56px;
  min-height: 38px;
  text-align: center;
  text-transform: uppercase;
  color: ${Theme.textColorPrimary};
  word-break: break-all;
  margin-top: 16px;
`;

export const BorderMaxBtn = styled.div`
  padding: 1px;
  border-radius: 6px;
  margin-left: 8px;
  border: 1px solid;
  background: linear-gradient(121.26deg, #1F50FE 0.42%, #C1C0C8 27.28%, #FFFFFF 60.1%, #E79BFE 96.11%);
`;

export const MaxButton = styled.button`
  width: 56px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${Theme.linkColor};
  border-radius: 6px;
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: ${Theme.linkColor};
  background: #0A0F12;

  @media (max-width: 650px) {
    margin-left: 0;
  }
`;

export const ProgressContainer = styled.div`
  width: 68px;
  height: 2px;
  border-radius: 4px;
  background-color: ${Theme.headerBackground};
  margin: 0 auto;
`;

interface ProgressBarProps {
  days: number;
}

export const ProgressBar = styled.div<ProgressBarProps>`
  width: ${(props) => `${(props.days / 14) * 100}%`};
  height: 2px;
  border-radius: 4px;
  background-color: ${Theme.linkColor};
`;

export const Days = styled.div`
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  text-align: center;
  margin-bottom: 3px;
  color: ${Theme.textColorPrimary};
`;

export const ClaimButton = styled(SecondaryButton)`
  width: 76px;
  height: 22px;
  margin: 0 auto;
`;

export const RptToUsd = styled.div`
  margin-top: 4px;
  font-size: 14px;
  line-height: 16px;
  color: ${Theme.textColorTertiary};
  text-align: center;
`;

export const Border = styled.div`
  padding: 1px;
  border-radius: 12px;
  border: 1px solid;
  background: conic-gradient(from 180deg at 50% 50%, #EEEEEE 0deg, #FFFEE2 14.87deg, rgba(255, 255, 255, 0.950883) 25.67deg, rgba(255, 186, 255, 0.850701) 38.19deg, rgba(255, 255, 255, 0.815523) 53deg, #79A2F2 72.26deg, #20282E 122.18deg, #29353C 138.07deg, rgba(255, 255, 255, 0.596267) 145.34deg, #FFE978 162.04deg, #79A2F2 175.13deg, rgba(255, 255, 255, 0.741036) 186.54deg, #79A2F2 199.54deg, #FFE978 222.78deg, #FFFFFF 247.79deg, #51555E 320.65deg, #699CFF 343.05deg, #FFFFFF 348.79deg, #79A2F2 354.77deg, #FFFFFF 360deg);
`;
