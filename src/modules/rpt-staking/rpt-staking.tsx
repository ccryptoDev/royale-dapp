import { TokenHolderLayout } from "../../layouts";
import { useState, useEffect } from "react";
import {
  RtpContainer,
  RtpInfoContainer,
  PrimaryHeader,
  RptDynamics,
  RptTotal,
  TotalMRoyaBox,
  Line,
  DivideLine,
  TotalMRoyaBoxTop,
  RtpBoxHeader,
  BtnContainer,
  Value,
  RtpBoxButton,
  RptTotalTop,
  RptTotalBottom,
  UnstakeRptButton,
  RptDynamicsTop,
  RptDynamicsBottom,
  GraphContainer,
  PercentContainer,
  PercentageWrapper,
  PercentCircle,
  PercentText,
  Graph,
  LoadingText,
  ApyPercentAge,
  ToUsd,
  Border,
  BorderBtn
} from "./style";
import { Modal, LockRpt, UnlockRpt, Loader } from "../../components";
import {
  RtpStakingModal,
  Theme,
  renderTokenAmountText,
  fromRtp,
  fromMroya,
  getConfig,
  thousandSeparator,
  renderTokenText,
  getNetworkArgs,
  calculateRptRewardApy,
  renderStats,
} from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  claimRptReward,
  getRewardDistributionDaysLeft,
  getRoyaStats,
  getStakedRptInUsdc,
} from "../../logic/actions";
import { PieChart } from "react-minimal-pie-chart";
import {
  getUserRpt,
  getUserStakedRpt,
  getRptRewards,
  getTotalStakedRptSupply,
  getRewardRate,
} from "../../logic/actions";
import { CircleGreen, CirclePurple } from "../../images";

const RptStaking = () => {
  const [modalStatus, setModalStatus] = useState(RtpStakingModal.closed);

  const { walletConnected, userAddress, network } = useSelector(
    (state: any) => state.user
  );

  const { rptBalance, stakedRptBalance, accumulatedMRoya, isClaimingMroya } =
    useSelector((state: any) => state.rptStaking);

  const {
    ethereumStakedRptUsd,
    binanceStakedRptUsd,
    maticStakedRptUsd,
    currentPrice,
    daysLeftEthereum,
    daysLeftBinance,
    daysLeftMatic,
    ethereumRewardRate,
    binanceRewardRate,
    maticRewardRate,
  } = useSelector((state: any) => state.royaAnalytics);

  const dispatch = useDispatch();

  useEffect(() => {
    if (walletConnected) {
      dispatch(getUserRpt(userAddress));
      dispatch(getUserStakedRpt(userAddress));
      dispatch(getRptRewards());
      dispatch(getTotalStakedRptSupply());
      dispatch(getRoyaStats());
      dispatch(getRewardDistributionDaysLeft());
      dispatch(getStakedRptInUsdc());
      dispatch(getRewardRate());
    }
  }, [walletConnected, userAddress, dispatch]);

  useEffect(() => {
    const fetchRptRewards = () => {
      dispatch(getRptRewards());
    };

    const fetchRptRewardsId = setInterval(fetchRptRewards, 10000);

    return () => {
      clearInterval(fetchRptRewardsId);
    };
  }, [userAddress, dispatch]);

  const closeModal = () => {
    setModalStatus(RtpStakingModal.closed);
  };

  const handleModalOpen = (modalType: number) => {
    setModalStatus(modalType);
  };

  const handleClaimMroya = () => {
    if (walletConnected) {
      dispatch(claimRptReward(userAddress));
    }
  };

  const renderStakedPercent = () => {
    const balance = parseFloat(rptBalance.replace(/,/g, ""));
    const stakedBalance = parseFloat(stakedRptBalance.replace(/,/g, ""));

    const percent = (stakedBalance / (balance + stakedBalance)) * 100;

    if (!isNaN(percent)) return percent.toFixed(1);

    return "0";
  };

  const renderUnStakedPercent = () => {
    const balance = parseFloat(rptBalance.replace(/,/g, ""));
    const stakedBalance = parseFloat(stakedRptBalance.replace(/,/g, ""));

    const percent = (balance / (balance + stakedBalance)) * 100;

    if (!isNaN(percent)) return percent.toFixed(1);

    return "0";
  };

  const renderMRoyaToDollar = () => {
    const result = currentPrice * parseFloat(fromMroya(accumulatedMRoya));

    if (isFinite(result)) return result.toFixed(2);

    return "0";
  };

  return (
    <TokenHolderLayout pageTitle={"RPT staking"}>
      <RtpContainer>
        <PrimaryHeader>RPT Staking</PrimaryHeader>
        <RtpInfoContainer>
          <Border>
            <RptTotal>
              <RptTotalTop>
                <RtpBoxHeader>TOTAL UNSTAKED RPT</RtpBoxHeader>
                <Value className="notranslate">
                  {!!rptBalance &&
                    `${renderTokenAmountText(fromRtp(rptBalance))}`}
                </Value>
                <RtpBoxButton
                  onClick={() => handleModalOpen(RtpStakingModal.lockRtp)}
                  disabled={rptBalance === "0"}
                >
                  <span data-text="Stake RPT">Stake RPT</span>
                </RtpBoxButton>
              </RptTotalTop>
              <Line />
              <RptTotalBottom>
                <RtpBoxHeader>Available to Withdraw</RtpBoxHeader>
                <Value className="notranslate">
                  {!!stakedRptBalance &&
                    `${renderTokenAmountText(fromRtp(stakedRptBalance))}`}
                </Value>
                <BorderBtn>
                  <UnstakeRptButton
                    onClick={() => handleModalOpen(RtpStakingModal.unlockRtp)}
                    disabled={stakedRptBalance === "0"}
                  >
                    Unstake RPT
                  </UnstakeRptButton>
                </BorderBtn>
              </RptTotalBottom>
            </RptTotal>
          </Border>
          <RptDynamics>
            <RptDynamicsTop>
              <RtpBoxHeader>YOUR RPT DYNAMICS</RtpBoxHeader>
              <GraphContainer>
                <PercentageWrapper>
                  <PercentContainer>
                    <PercentCircle color={Theme.graphColorPrimary}>
						<img src={CircleGreen.default} />
					</PercentCircle>
                    <PercentText className="notranslate">
                      {`${renderStakedPercent()}% - `} Staked RPT
                    </PercentText>
                  </PercentContainer>
                  <PercentContainer className="notranslate">
                    <PercentCircle color={Theme.graphColorSecondary}>
						<img src={CirclePurple.default} />
					</PercentCircle>
                    <PercentText>
                      {`${renderUnStakedPercent()}% - `} Unstaked RPT
                    </PercentText>
                  </PercentContainer>
                </PercentageWrapper>
                <Graph>
                  <PieChart
                    lineWidth={15}
                    rounded
                    data={[
                      {
                        title: "Unstaked",
                        value: parseFloat(renderUnStakedPercent()),
                        color: Theme.graphColorSecondary,
                      },
                      {
                        title: "Staked",
                        value: parseFloat(renderStakedPercent()),
                        color: Theme.graphColorPrimary,
                      },
                    ]}
                  />
                </Graph>
              </GraphContainer>
            </RptDynamicsTop>
            <DivideLine />
            <RptDynamicsBottom>
              You will receive {renderTokenText()} for staking your RPT
              <ApyPercentAge>
                APY -{" "}
                {thousandSeparator(
                  calculateRptRewardApy(
                    renderStats(
                      getNetworkArgs(network),
                      ethereumStakedRptUsd,
                      binanceStakedRptUsd,
                      maticStakedRptUsd
                    ),
                    currentPrice,
                    renderStats(
                      getNetworkArgs(network),
                      daysLeftEthereum,
                      daysLeftBinance,
                      daysLeftMatic
                    ),
                    renderStats(
                      getNetworkArgs(network),
                      ethereumRewardRate,
                      binanceRewardRate,
                      maticRewardRate
                    )
                  )
                )}
              </ApyPercentAge>
            </RptDynamicsBottom>
          </RptDynamics>
        </RtpInfoContainer>

        <TotalMRoyaBox>
          <TotalMRoyaBoxTop>
            <RtpBoxHeader>
			Accumulated {renderTokenText()} from RPT Staking
            </RtpBoxHeader>

            <BtnContainer>
              <Value id="claim-mroya-value" className="notranslate">
                {accumulatedMRoya &&
                  `${renderTokenAmountText(
                    fromMroya(accumulatedMRoya)
                  )} ${renderTokenText()}`}
              </Value>
              <RtpBoxButton
                disabled={
                  isClaimingMroya ||
                  accumulatedMRoya === "" ||
                  accumulatedMRoya === "0"
                }
                onClick={handleClaimMroya}
              >
                <span data-text={isClaimingMroya ? <Loader /> : `Claim ${renderTokenText()}`}>{isClaimingMroya ? <Loader /> : `Claim ${renderTokenText()}`}</span>
              </RtpBoxButton>
            </BtnContainer>
            <ToUsd>$ {thousandSeparator(renderMRoyaToDollar())}</ToUsd>
            {isClaimingMroya && (
              <LoadingText>{getConfig().transactionText}</LoadingText>
            )}
          </TotalMRoyaBoxTop>
        </TotalMRoyaBox>
      </RtpContainer>
      {/* <Modal
        show={modalStatus === RtpStakingModal.lockRtp}
        closeModal={closeModal}
      >
        <LockRpt closeModal={closeModal} />
      </Modal>
      <Modal
        show={modalStatus === RtpStakingModal.unlockRtp}
        closeModal={closeModal}
      >
        <UnlockRpt closeModal={closeModal} />
      </Modal> */}
    </TokenHolderLayout>
  );
};

export default RptStaking;
