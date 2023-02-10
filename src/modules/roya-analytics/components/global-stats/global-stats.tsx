import { useSelector } from "react-redux";
import {
  TvlContainer,
  TvlTotal,
  TvlHeader,
  TvlValue,
  SubHeader,
  GlobalInfoBox,
  GlobalInfoBoxItem,
  GlobalInfoBoxVal,
  InfoBoxTitle
} from "./style";
import {
  renderTokenAmountText,
  calculateStablecoinTvl,
} from "../../../../utils";

const GlobalStats = () => {
  const {
    globalRoyaStaked,
    stakingLotsTotalRoyaValue,
    currentPrice,
    ethereumStableCoin,
    binanceStableCoin,
    maticStableCoin,
    ethereumGaming,
    binanceGaming,
    maticGaming,
  } = useSelector((state: any) => state.royaAnalytics);

  const calculateTotalValueLocked = (): string => {
    const result =
      parseFloat(
        calculateStablecoinTvl(
          ethereumStableCoin,
          binanceStableCoin,
          maticStableCoin,
          ethereumGaming,
          binanceGaming,
          maticGaming
        )
      ) +
      currentPrice * parseFloat(globalRoyaStaked) +
      currentPrice * parseFloat(stakingLotsTotalRoyaValue);

    if (isFinite(result)) return result.toFixed(2);

    return "0";
  };

  return (
    <TvlContainer>
	  <TvlTotal>
		<TvlHeader>TOTAL VALUE LOCKED</TvlHeader>
		<TvlValue>
			{`$ ${renderTokenAmountText(calculateTotalValueLocked())}`}
		</TvlValue>
		<SubHeader>All pools and staking</SubHeader>
	  </TvlTotal>
      <GlobalInfoBox>
        <GlobalInfoBoxItem>
          <InfoBoxTitle>Stablecoin TVL</InfoBoxTitle>
          <GlobalInfoBoxVal>
            {renderTokenAmountText(
              calculateStablecoinTvl(
                ethereumStableCoin,
                binanceStableCoin,
                maticStableCoin,
                ethereumGaming,
                binanceGaming,
                maticGaming
              )
            )}
          </GlobalInfoBoxVal>
        </GlobalInfoBoxItem>
        <GlobalInfoBoxItem>
          <InfoBoxTitle>Roya Reserve</InfoBoxTitle>
          <GlobalInfoBoxVal>
            {renderTokenAmountText(globalRoyaStaked)}
          </GlobalInfoBoxVal>
        </GlobalInfoBoxItem>
        <GlobalInfoBoxItem>
          <InfoBoxTitle>Staking Lots</InfoBoxTitle>
          <GlobalInfoBoxVal>
            {renderTokenAmountText(stakingLotsTotalRoyaValue)}
          </GlobalInfoBoxVal>
        </GlobalInfoBoxItem>
      </GlobalInfoBox>
    </TvlContainer>
  );
};

export default GlobalStats;
