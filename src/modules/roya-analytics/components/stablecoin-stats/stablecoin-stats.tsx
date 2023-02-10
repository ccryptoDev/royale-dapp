import { useSelector } from "react-redux";
import {
  StableCoinContainer,
  StableCoinHeader,
  StableCoinInfo,
  StableCoinInfoBox,
  StableCoinInfoBoxVal,
  StableCoinInfoBoxHeader,
} from "./style";
import {
  renderTokenAmountText,
  renderStats,
  thousandSeparator,
  getTotalValueLocked,
  calculateRptRewardApy,
} from "../../../../utils";

interface Props {
  network: string;
}

const StablecoinStats = (props: Props) => {
  const { network } = props;

  const {
    ethereumStableCoin,
    binanceStableCoin,
    maticStableCoin,
    currentPrice,
    ethereumGaming,
    binanceGaming,
    maticGaming,
    ethereumOptimiser,
    binanceOptimiser,
    maticOptimiser,
    daysLeftEthereum,
    daysLeftBinance,
    daysLeftMatic,
    ethereumStakedRptUsd,
    binanceStakedRptUsd,
    maticStakedRptUsd,
    ethereumRewardRate,
    binanceRewardRate,
    maticRewardRate,
  } = useSelector((state: any) => state.royaAnalytics);

  return (
    <StableCoinContainer>
      <StableCoinHeader>Stablecoin Liquidity</StableCoinHeader>
      <StableCoinInfo>
        <StableCoinInfoBox>
          <StableCoinInfoBoxVal>
            {`${renderTokenAmountText(
              getTotalValueLocked(
                renderStats(
                  network,
                  ethereumStableCoin,
                  binanceStableCoin,
                  maticStableCoin
                ),
                renderStats(network, ethereumGaming, binanceGaming, maticGaming)
              )
            )} USD`}
          </StableCoinInfoBoxVal>
          <StableCoinInfoBoxHeader>TVL in Stablecoins</StableCoinInfoBoxHeader>
        </StableCoinInfoBox>
        <StableCoinInfoBox>
          <StableCoinInfoBoxVal>
            {thousandSeparator(
              calculateRptRewardApy(
                renderStats(
                  network,
                  ethereumStakedRptUsd,
                  binanceStakedRptUsd,
                  maticStakedRptUsd
                ),
                currentPrice,
                renderStats(
                  network,
                  daysLeftEthereum,
                  daysLeftBinance,
                  daysLeftMatic
                ),
                renderStats(
                  network,
                  ethereumRewardRate,
                  binanceRewardRate,
                  maticRewardRate
                )
              )
            )}
          </StableCoinInfoBoxVal>
          <StableCoinInfoBoxHeader>APY in ROYA</StableCoinInfoBoxHeader>
        </StableCoinInfoBox>
        <StableCoinInfoBox>
          <StableCoinInfoBoxVal>
            {`${renderTokenAmountText(
              renderStats(
                network,
                ethereumOptimiser,
                binanceOptimiser,
                maticOptimiser
              )
            )} USD`}
          </StableCoinInfoBoxVal>
          <StableCoinInfoBoxHeader>
            Liquidity in Optimiser
          </StableCoinInfoBoxHeader>
        </StableCoinInfoBox>
        <StableCoinInfoBox>
          <StableCoinInfoBoxVal>
            {`${renderTokenAmountText(
              renderStats(network, ethereumGaming, binanceGaming, maticGaming)
            )} USD`}
          </StableCoinInfoBoxVal>
          <StableCoinInfoBoxHeader>Liquidity in Gaming</StableCoinInfoBoxHeader>
        </StableCoinInfoBox>
      </StableCoinInfo>
    </StableCoinContainer>
  );
};

export default StablecoinStats;
