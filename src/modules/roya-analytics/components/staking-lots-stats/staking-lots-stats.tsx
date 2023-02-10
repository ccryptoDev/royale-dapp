import { useSelector } from "react-redux";
import {
  StakingLotsContainer,
  StakingLotHeader,
  StakingLotsValue,
  StakingLotSubHeader,
  LotsTypeContainer,
  LotsTypeItem,
  QueenIcon,
  KingIcon,
  FlushIcon,
  LotsTypeItemHeader,
  LotsTypeItemValue,
  LotsTypeItemSecondaryHeader,
  LotsTypeItemRoyaValue,
  LotsTypeItemBar,
  StakingLots
} from "./style";
import {
  KingLotIcon,
  RoyaleQueenImg,
  RoyaleFlushImg,
} from "../../../../images";
import { renderStats, renderTokenAmountText } from "../../../../utils";

interface Props {
  network: string;
}

const StakingLotsStats = (props: Props) => {
  const { network } = props;

  const {
    ethereumQueenLot,
    ethereumKingLot,
    ethereumFlushLot,
    binanceQueenLot,
    binanceKingLot,
    binanceFlushLot,
    maticQueenLot,
    maticKingLot,
    maticFlushLot,
    ethereumQueenValue,
    ethereumKingValue,
    ethereumFlushValue,
    binanceQueenValue,
    binanceKingValue,
    binanceFlushValue,
    maticQueenValue,
    maticKingValue,
    maticFlushValue,
    ethereumLotTotalValue,
    binanceLotTotalValue,
    maticLotTotalValue,
  } = useSelector((state: any) => state.royaAnalytics);

  return (
    <StakingLotsContainer>
      <StakingLotHeader>Staking Lots</StakingLotHeader>
      <LotsTypeContainer>
		<StakingLots>
			<StakingLotsValue>
				{`${renderTokenAmountText(
				renderStats(
					network,
					ethereumLotTotalValue,
					binanceLotTotalValue,
					maticLotTotalValue
				)
				)} ROYA`}
			</StakingLotsValue>
			<StakingLotSubHeader>Total Roya Staked</StakingLotSubHeader>
		</StakingLots>
        <LotsTypeItem>
          <QueenIcon>
            <img src={RoyaleQueenImg.default} alt="queen" />
          </QueenIcon>
          <LotsTypeItemValue>
            {renderStats(
              network,
              ethereumQueenLot,
              binanceQueenLot,
              maticQueenLot
            )}
          </LotsTypeItemValue>
          <LotsTypeItemSecondaryHeader>
            Total ROYA Locked
          </LotsTypeItemSecondaryHeader>
          <LotsTypeItemRoyaValue>
            {`${renderTokenAmountText(
              renderStats(
                network,
                ethereumQueenValue,
                binanceQueenValue,
                maticQueenValue
              )
            )} ROYA`}
          </LotsTypeItemRoyaValue>
        </LotsTypeItem>
        <LotsTypeItem>
          <KingIcon>
            <img src={KingLotIcon.default} alt="king" />
          </KingIcon>
          <LotsTypeItemValue>
            {renderStats(
              network,
              ethereumKingLot,
              binanceKingLot,
              maticKingLot
            )}
          </LotsTypeItemValue>
          <LotsTypeItemSecondaryHeader>
            Total ROYA Locked
          </LotsTypeItemSecondaryHeader>
          <LotsTypeItemRoyaValue>
            {`${renderTokenAmountText(
              renderStats(
                network,
                ethereumKingValue,
                binanceKingValue,
                maticKingValue
              )
            )} ROYA`}
          </LotsTypeItemRoyaValue>
        </LotsTypeItem>
        <LotsTypeItem>
          <FlushIcon>
            <img src={RoyaleFlushImg.default} alt="flush" />
          </FlushIcon>
          <LotsTypeItemValue>
            {renderStats(
              network,
              ethereumFlushLot,
              binanceFlushLot,
              maticFlushLot
            )}
          </LotsTypeItemValue>
          <LotsTypeItemSecondaryHeader>
            Total ROYA Locked
          </LotsTypeItemSecondaryHeader>
          <LotsTypeItemRoyaValue>
            {`${renderTokenAmountText(
              renderStats(
                network,
                ethereumFlushValue,
                binanceFlushValue,
                maticFlushValue
              )
            )} ROYA`}
          </LotsTypeItemRoyaValue>
        </LotsTypeItem>
      </LotsTypeContainer>
    </StakingLotsContainer>
  );
};

export default StakingLotsStats;
