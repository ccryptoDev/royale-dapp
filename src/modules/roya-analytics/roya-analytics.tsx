import { useEffect, useState } from "react";
import { TokenHolderLayout } from "../../layouts";
import {
  ChainStats,
  StakingLotsStats,
  RoyaReserveStats,
  StablecoinStats,
  NetworkSelect,
  RptStats,
  GlobalStats,
  RoyaStats,
} from "./components";
import { AnalyticsWrapper, BackgroundWrapper } from "./style";
import { useDispatch } from "react-redux";
import {
  getRoyaStats,
  getTotalLots,
  getTotalStakedStableCoin,
  getTotalRoyaHolders,
  getTotalMroya,
  getRptDynamics,
  getRoyaDynamics,
  getOptimiserLiquidity,
  getGamingLiquidity,
  getGlobalRoyaProtocolStats,
  getRewardDistributionDaysLeft,
  getStakedRptInUsdc,
  getRewardRate,
} from "../../logic/actions";
import { NetworkOptions } from "../../utils";

const RoyaAnalytics = () => {
  const [network, setNetwork] = useState(NetworkOptions.ethereum);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoyaStats());
    dispatch(getTotalLots());
    dispatch(getTotalStakedStableCoin());
    dispatch(getTotalRoyaHolders());
    dispatch(getTotalMroya());
    dispatch(getRptDynamics());
    dispatch(getRoyaDynamics());
    dispatch(getOptimiserLiquidity());
    dispatch(getGamingLiquidity());
    dispatch(getGlobalRoyaProtocolStats());
    dispatch(getRewardDistributionDaysLeft());
    dispatch(getStakedRptInUsdc());
    dispatch(getRewardRate());
  }, [dispatch]);

  const handleNetworkChange = (network: string) => {
    setNetwork(network);
  };

  return (
    <TokenHolderLayout pageTitle="Network Stats">
      <AnalyticsWrapper>
        <BackgroundWrapper>
          <GlobalStats />
          <RoyaStats />
        </BackgroundWrapper>
        <NetworkSelect
          network={network}
          handleNetworkChange={handleNetworkChange}
        />
        <StablecoinStats network={network} />
        <RptStats network={network} />
        <RoyaReserveStats network={network} />
        <StakingLotsStats network={network} />
        <ChainStats />
      </AnalyticsWrapper>
    </TokenHolderLayout>
  );
};

export default RoyaAnalytics;
