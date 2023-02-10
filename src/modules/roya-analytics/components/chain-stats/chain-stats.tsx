import { useSelector } from "react-redux";
import {
  ChainStatsContainer,
  ChainStatsHeader,
  ChainStatsLine,
  ChainStatsBoxContainer,
  ChainStatsBoxItem,
  ImageWrapper,
  ImageBox,
  ImageText,
  StatsWrapper,
  StatsValue,
  LabelContainer,
  LabelValue,
  ViewMore,
} from "./style";
import { EtherScanIcon, BscScanIcon, MaticScanIcon } from "../../../../images";
import {
  renderTokenAmountText,
  EtherscanLinks,
  ContractAddress,
} from "../../../../utils";

const ChainStats = () => {
  const {
    ethereumRoyaHolder,
    ethereumRoyaTransactions,
    binanceRoyaHolder,
    binanceRoyaTransactions,
    maticRoyaHolder,
    maticRoyaTransactions,
  } = useSelector((state: any) => state.royaAnalytics);

  return (
    <ChainStatsContainer>
      <ChainStatsHeader>On Chain Network Stats</ChainStatsHeader>
      <ChainStatsBoxContainer>
        <ChainStatsBoxItem>
          <ImageWrapper>
            <ImageText>EtherscaN</ImageText>
            <ImageBox>
              <img src={EtherScanIcon.default} alt="etherscan link" />
            </ImageBox>
          </ImageWrapper>
          <StatsWrapper>
            <StatsValue>
              {renderTokenAmountText(ethereumRoyaTransactions.toString())}
            </StatsValue>
            <StatsValue>
              {renderTokenAmountText(ethereumRoyaHolder.toString())}
            </StatsValue>
          </StatsWrapper>
          <LabelContainer>
            <LabelValue>TRANSACTIONS</LabelValue>
            <LabelValue>HOLDERS</LabelValue>
          </LabelContainer>
          <ViewMore
            href={`${EtherscanLinks.ethereum}/token/${ContractAddress.mainnet.royaToken}`}
            target="blank"
            rel="noopener noreferrer"
          >
            View more
          </ViewMore>
        </ChainStatsBoxItem>
        <ChainStatsBoxItem>
          <ImageWrapper>
            <ImageText>BSCSCAN</ImageText>
            <ImageBox>
              <img src={BscScanIcon.default} alt="bscscan link" />
            </ImageBox>
          </ImageWrapper>
          <StatsWrapper>
            <StatsValue>
              {renderTokenAmountText(binanceRoyaTransactions.toString())}
            </StatsValue>
            <StatsValue>
              {renderTokenAmountText(binanceRoyaHolder.toString())}
            </StatsValue>
          </StatsWrapper>
          <LabelContainer>
            <LabelValue>TRANSACTIONS</LabelValue>
            <LabelValue>HOLDERS</LabelValue>
          </LabelContainer>
          <ViewMore
            href={`${EtherscanLinks.binance}/token/${ContractAddress.bscMainnet.royaToken}`}
            target="blank"
            rel="noopener noreferrer"
          >
            View more
          </ViewMore>
        </ChainStatsBoxItem>
        <ChainStatsBoxItem>
          <ImageWrapper>
            <ImageText>MATIC</ImageText>
            <ImageBox>
              <img src={MaticScanIcon.default} alt="Polygonscan link" />
            </ImageBox>
          </ImageWrapper>
          <StatsWrapper>
            <StatsValue>
              {renderTokenAmountText(maticRoyaTransactions.toString())}
            </StatsValue>
            <StatsValue>
              {renderTokenAmountText(maticRoyaHolder.toString())}
            </StatsValue>
          </StatsWrapper>
          <LabelContainer>
            <LabelValue>TRANSACTIONS</LabelValue>
            <LabelValue>HOLDERS</LabelValue>
          </LabelContainer>
          <ViewMore
            href={`${EtherscanLinks.matic}/token/${ContractAddress.maticMainnet.royaToken}`}
            target="blank"
            rel="noopener noreferrer"
          >
            View more
          </ViewMore>
        </ChainStatsBoxItem>
      </ChainStatsBoxContainer>
    </ChainStatsContainer>
  );
};

export default ChainStats;
