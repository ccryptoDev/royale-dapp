import { useSelector } from "react-redux";
import {
  RptStatsContainer,
  RptStatsHeader,
  RptInfoContainer,
  TotalRptBox,
  RptGraphBox,
  TotalRptHeader,
  TotalRptVal,
  RptStatsDivider,
  RptGraphWrapper,
  RptInfoIndicator,
  RptInfoIndicatorItem,
  RptDot,
  RptInfoIndicatorText,
} from "./style";
import { Theme, renderTokenAmountText, renderStats } from "../../../../utils";
import { PieChart } from "react-minimal-pie-chart";
import { CircleGreen, CirclePurple } from "../../../../images";

interface Props {
  network: string;
}

const RptStats = (props: Props) => {
  const { network } = props;

  const {
    ethereumStakedRpt,
    binanceStakedRpt,
    maticStakedRpt,
    ethereumSupplyRpt,
    binanceSupplyRpt,
    maticSupplyRpt,
  } = useSelector((state: any) => state.royaAnalytics);

  const { rptBalance, stakedRptBalance } =
    useSelector((state: any) => state.rptStaking);

  const getStakedRptPercent = () => {
    const result =
      (parseFloat(
        renderStats(
          network,
          ethereumStakedRpt,
          binanceStakedRpt,
          maticStakedRpt
        )
      ) /
        parseFloat(
          renderStats(
            network,
            ethereumSupplyRpt,
            binanceSupplyRpt,
            maticSupplyRpt
          )
        )) *
      100;

    if (isFinite(result)) return result.toFixed(2);

    return "0";
  };

  const getUnstakedRptPercent = () => {
    return 100 - parseFloat(getStakedRptPercent());
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

  return (
    <RptStatsContainer>
      <RptStatsHeader>RPT Stats</RptStatsHeader>
      <RptInfoContainer>
        <TotalRptBox>
          <TotalRptVal>
            {`${renderTokenAmountText(
              renderStats(
                network,
                ethereumSupplyRpt,
                binanceSupplyRpt,
                maticSupplyRpt
              )
            )} RPT`}
          </TotalRptVal>
          <TotalRptHeader>Total RPT</TotalRptHeader>
        </TotalRptBox>
        <RptGraphWrapper>
          <RptGraphBox>
            <PieChart
              lineWidth={100}
              segmentsShift={(index) => (index === 1 ? 6 : 0)}
              radius={46}
              data={[
                {
                  title: "Staked",
                  value: parseFloat(getStakedRptPercent()),
                  color: Theme.graphColorPrimary,
                },
                {
                  title: "Unstaked",
                  value: getUnstakedRptPercent(),
                  color: Theme.graphColorSecondary,
                },
              ]}
            />
          </RptGraphBox>
          <RptInfoIndicator>
            <RptInfoIndicatorItem>
			  <img src={CircleGreen.default} />
              <RptInfoIndicatorText>{`${renderStakedPercent()}% - `} Staked RPT</RptInfoIndicatorText>
            </RptInfoIndicatorItem>
            <RptInfoIndicatorItem>
			  <img src={CirclePurple.default} />
              <RptInfoIndicatorText>{`${renderUnStakedPercent()}% - `} Unstaked RPT</RptInfoIndicatorText>
            </RptInfoIndicatorItem>
          </RptInfoIndicator>
        </RptGraphWrapper>
      </RptInfoContainer>
    </RptStatsContainer>
  );
};

export default RptStats;
