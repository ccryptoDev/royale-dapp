import axios from "axios";
import { getConfig, getApiEndpoint } from "../../utils";
import {
  GET_NETWORK_LOT_SUCCESS,
  GET_ROYA_STATS_SUCCESS,
  GET_TOTAL_STABLE_COIN_SUCCESS,
  GET_TOTAL_ROYA_HOLDERS_SUCCESS,
  GET_TOTAL_MROYA_SUCCESS,
  GET_RPT_DYNAMICS_SUCCESS,
  GET_ROYA_DYNAMICS_SUCCESS,
  GET_OPTIMISER_LIQUIDITY_SUCCESS,
  GET_GAMING_LIQUIDITY_SUCCESS,
  GET_GLOBAL_ROYA_PROTOCOL_SUCCESS,
  GET_REWARDS_DAYS_LEFT_SUCCESS,
  GET_STAKED_RPT_USDC,
  GET_REWARD_RATE_SUCCESS,
} from "./constant";

const getRoyaStatSuccess = (
  currentPrice: number,
  priceChange: number,
  royaPriceHistory: Array<number>,
  dailyVolume: string,
  dailyMarketCap: string,
  deltaVolume: number,
  deltaRelativeLiquidity: number
) => ({
  type: GET_ROYA_STATS_SUCCESS,
  currentPrice,
  priceChange,
  royaPriceHistory,
  dailyVolume,
  dailyMarketCap,
  deltaVolume,
  deltaRelativeLiquidity,
});

export const getRoyaStats = () => async (dispatch: any) => {
  try {
    const requests = [
      axios.get(`${getConfig().coinGeckoApi}/royale`),
      axios.get(
        `${
          getConfig().coinGeckoApi
        }/royale/market_chart?vs_currency=usd&days=30&interval=daily`
      ),
      axios.get(
        `${
          getConfig().coinGeckoApi
        }/royale/market_chart?vs_currency=usd&days=1&interval=daily`
      ),
    ];

    const responses = await Promise.all(requests);

    const { data } = responses[0];

    const royaPriceHistory = responses[1].data.prices.map(
      (v: Array<number>) => v[1]
    );

    const dailyVolume = responses[2].data.total_volumes[1][1].toString();
    const dailyMarketCap = responses[2].data.market_caps[1][1].toString();

    const prevVolumne = responses[2].data.total_volumes[0][1];
    const currentVolumne = responses[2].data.total_volumes[1][1];

    const deltaVolume = ((currentVolumne - prevVolumne) / prevVolumne) * 100;

    const prevMarketCap = responses[2].data.market_caps[0][1];
    const currentMarketCap = responses[2].data.market_caps[1][1];

    const currentRelativeLiquidity = (currentVolumne / currentMarketCap) * 100;
    const prevRelativeLiquidity = (prevVolumne / prevMarketCap) * 100;

    const deltaRelativeLiquidity =
      ((currentRelativeLiquidity - prevRelativeLiquidity) /
        prevRelativeLiquidity) *
      100;

    dispatch(
      getRoyaStatSuccess(
        data.market_data.current_price.usd,
        data.market_data.price_change_percentage_24h,
        royaPriceHistory,
        dailyVolume,
        dailyMarketCap,
        deltaVolume,
        deltaRelativeLiquidity
      )
    );
  } catch (e) {
    console.log("error in get roya stats", e);
  }
};

const getTotalLotsSuccess = (
  ethereumQueenLot: string,
  ethereumKingLot: string,
  ethereumFlushLot: string,
  binanceQueenLot: string,
  binanceKingLot: string,
  binanceFlushLot: string,
  maticQueenLot: string,
  maticKingLot: string,
  maticFlushLot: string,
  ethereumQueenValue: string,
  ethereumKingValue: string,
  ethereumFlushValue: string,
  binanceQueenValue: string,
  binanceKingValue: string,
  binanceFlushValue: string,
  maticQueenValue: string,
  maticKingValue: string,
  maticFlushValue: string,
  ethereumLotTotalValue: string,
  binanceLotTotalValue: string,
  maticLotTotalValue: string,
  stakingLotsTotalRoyaValue: string
) => ({
  type: GET_NETWORK_LOT_SUCCESS,
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
  stakingLotsTotalRoyaValue,
});

const getTotalStakingLotsRoyaValue = (
  ethereumQueenValue: string,
  ethereumKingValue: string,
  ethereumFlushValue: string,
  binanceQueenValue: string,
  binanceKingValue: string,
  binanceFlushValue: string,
  maticQueenValue: string,
  maticKingValue: string,
  maticFlushValue: string
): string => {
  const result =
    parseFloat(ethereumQueenValue) +
    parseFloat(ethereumKingValue) +
    parseFloat(ethereumFlushValue) +
    parseFloat(binanceQueenValue) +
    parseFloat(binanceKingValue) +
    parseFloat(binanceFlushValue) +
    parseFloat(maticQueenValue) +
    parseFloat(maticKingValue) +
    parseFloat(maticFlushValue);

  if (isFinite(result)) return result.toFixed(2);

  return "0";
};

export const getTotalLotsValue = (
  queenLot: string,
  kingLot: string,
  flushLot: string
): string => {
  const result =
    parseFloat(queenLot) + parseFloat(kingLot) + parseFloat(flushLot);

  if (isFinite(result)) return result.toFixed(2);

  return "0";
};

export const getTotalLots = () => async (dispatch: any) => {
  try {
    const requests = [
      axios.get(`${getConfig().apiUrl}/ethereum/lotsInfo`),
      axios.get(`${getConfig().apiUrl}/binance/lotsInfo`),
      axios.get(`${getConfig().apiUrl}/matic/lotsInfo`),
    ];

    const responses = await Promise.all(requests);

    const ethereumQueenLot = !!responses[0].data.queen
      ? responses[0].data.queen
      : "0";
    const ethereumKingLot = !!responses[0].data.king
      ? responses[0].data.king
      : "0";
    const ethereumFlushLot = !!responses[0].data.flush
      ? responses[0].data.flush
      : "0";

    const ethereumQueenValue = !!responses[0].data.queenValue
      ? responses[0].data.queenValue
      : "0";
    const ethereumKingValue = !!responses[0].data.kingValue
      ? responses[0].data.kingValue
      : "0";
    const ethereumFlushValue = !!responses[0].data.flushValue
      ? responses[0].data.flushValue
      : "0";

    const binanceQueenLot = !!responses[1].data.queen
      ? responses[1].data.queen
      : "0";
    const binanceKingLot = !!responses[1].data.king
      ? responses[1].data.king
      : "0";
    const binanceFlushLot = !!responses[1].data.flush
      ? responses[1].data.flush
      : "0";

    const binanceQueenValue = !!responses[1].data.queenValue
      ? responses[1].data.queenValue
      : "0";
    const binanceKingValue = !!responses[1].data.kingValue
      ? responses[1].data.kingValue
      : "0";
    const binanceFlushValue = !!responses[1].data.flushValue
      ? responses[1].data.flushValue
      : "0";

    const maticQueenLot = !!responses[1].data.queen
      ? responses[2].data.queen
      : "0";
    const maticKingLot = !!responses[1].data.king
      ? responses[2].data.king
      : "0";
    const maticFlushLot = !!responses[1].data.flush
      ? responses[2].data.flush
      : "0";

    const maticQueenValue = !!responses[1].data.queenValue
      ? responses[2].data.queenValue
      : "0";
    const maticKingValue = !!responses[1].data.kingValue
      ? responses[2].data.kingValue
      : "0";
    const maticFlushValue = !!responses[1].data.flushValue
      ? responses[2].data.flushValue
      : "0";

    const stakingLotsTotalRoyaValue = getTotalStakingLotsRoyaValue(
      ethereumQueenValue,
      ethereumKingValue,
      ethereumFlushValue,
      binanceQueenValue,
      binanceKingValue,
      binanceFlushValue,
      maticQueenValue,
      maticKingValue,
      maticFlushValue
    );

    const ethereumLotTotalValue = getTotalLotsValue(
      ethereumQueenValue,
      ethereumKingValue,
      ethereumFlushValue
    );

    const binanceLotTotalValue = getTotalLotsValue(
      binanceQueenValue,
      binanceKingValue,
      binanceFlushValue
    );

    const maticLotTotalValue = getTotalLotsValue(
      maticQueenValue,
      maticKingValue,
      maticFlushValue
    );

    dispatch(
      getTotalLotsSuccess(
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
        stakingLotsTotalRoyaValue
      )
    );
  } catch (e) {
    console.log("error in get total lots ", e);
  }
};

const getTotalStableCoinSuccess = (
  ethereumStableCoin: string,
  binanceStableCoin: string,
  maticStableCoin: string
) => ({
  type: GET_TOTAL_STABLE_COIN_SUCCESS,
  ethereumStableCoin,
  binanceStableCoin,
  maticStableCoin,
});

export const getTotalStakedStableCoin = () => async (dispatch: any) => {
  try {
    const requests = [
      axios.get(`${getConfig().apiUrl}/ethereum/totalLockedValue`),
      axios.get(`${getConfig().apiUrl}/binance/totalLockedValue`),
      axios.get(`${getConfig().apiUrl}/matic/totalLockedValue`),
    ];

    const responses = await Promise.all(requests);

    const ethereumStableCoin = !!responses[0].data
      ? responses[0].data.toString()
      : "0";

    const binanceStableCoin = !!responses[1].data
      ? responses[1].data.toString()
      : "0";

    const maticStableCoin = !!responses[2].data
      ? responses[2].data.toString()
      : "0";

    dispatch(
      getTotalStableCoinSuccess(
        ethereumStableCoin,
        binanceStableCoin,
        maticStableCoin
      )
    );
  } catch (e) {
    console.log("error in get total staked ", e);
  }
};

const getTotalRoyaHolderSuccess = (
  ethereumRoyaHolder: number,
  ethereumRoyaTransactions: number,
  binanceRoyaHolder: number,
  binanceRoyaTransactions: number,
  maticRoyaHolder: number,
  maticRoyaTransactions: number
) => ({
  type: GET_TOTAL_ROYA_HOLDERS_SUCCESS,
  ethereumRoyaHolder,
  ethereumRoyaTransactions,
  binanceRoyaHolder,
  binanceRoyaTransactions,
  maticRoyaHolder,
  maticRoyaTransactions,
});

export const getTotalRoyaHolders = () => async (dispatch: any) => {
  try {
    const requests = [
      axios.get(`${getConfig().apiUrl}/ethereum/royaInfo`),
      axios.get(`${getConfig().apiUrl}/binance/royaInfo`),
      axios.get(`${getConfig().apiUrl}/matic/royaInfo`),
    ];

    const responses = await Promise.all(requests);

    const ethereumRoyaHolder = responses[0].data.holders;
    const ethereumRoyaTransactions = responses[0].data.transactions;
    const binanceRoyaHolder = responses[1].data.holders;
    const binanceRoyaTransactions = responses[1].data.transactions;
    const maticRoyaHolder = responses[2].data.holders;
    const maticRoyaTransactions = responses[2].data.transactions;

    dispatch(
      getTotalRoyaHolderSuccess(
        !!ethereumRoyaHolder ? ethereumRoyaHolder : 0,
        !!ethereumRoyaTransactions ? ethereumRoyaTransactions : 0,
        !!binanceRoyaHolder ? binanceRoyaHolder : 0,
        !!binanceRoyaTransactions ? binanceRoyaTransactions : 0,
        !!maticRoyaHolder ? maticRoyaHolder : 0,
        !!maticRoyaTransactions ? maticRoyaTransactions : 0
      )
    );
  } catch (e) {
    console.log("error in get total roya holders ", e);
  }
};

const getTotalMroyaSuccess = (totalMroya: string) => ({
  type: GET_TOTAL_MROYA_SUCCESS,
  totalMroya,
});

export const getTotalMroya = () => async (dispatch: any) => {
  try {
    const { data } = await axios.get(`${getApiEndpoint()}/totalSupplyMroya`);

    dispatch(getTotalMroyaSuccess(data.toString()));
  } catch (e) {
    console.log("error in get total mroya ", e);
  }
};

const getRptDynamicSuccess = (
  ethereumSupplyRpt: string,
  ethereumStakedRpt: string,
  binanceSupplyRpt: string,
  binanceStakedRpt: string,
  maticSupplyRpt: string,
  maticStakedRpt: string
) => ({
  type: GET_RPT_DYNAMICS_SUCCESS,
  ethereumSupplyRpt,
  ethereumStakedRpt,
  binanceSupplyRpt,
  binanceStakedRpt,
  maticSupplyRpt,
  maticStakedRpt,
});

export const getRptDynamics = () => async (dispatch: any) => {
  try {
    const requests = [
      axios.get(`${getConfig().apiUrl}/ethereum/totalSupplyRpt`),
      axios.get(`${getConfig().apiUrl}/ethereum/totalStakedRpt`),
      axios.get(`${getConfig().apiUrl}/binance/totalSupplyRpt`),
      axios.get(`${getConfig().apiUrl}/binance/totalStakedRpt`),
      axios.get(`${getConfig().apiUrl}/matic/totalSupplyRpt`),
      axios.get(`${getConfig().apiUrl}/matic/totalStakedRpt`),
    ];

    const responses = await Promise.all(requests);

    const ethereumSupplyRpt = !!responses[0].data
      ? responses[0].data.toString()
      : "0";
    const ethereumStakedRpt = !!responses[1].data
      ? responses[1].data.toString()
      : "0";

    const binanceSupplyRpt = !!responses[2].data
      ? responses[2].data.toString()
      : "0";

    const binanceStakedRpt = !!responses[3].data
      ? responses[3].data.toString()
      : "0";

    const maticSupplyRpt = !!responses[4].data
      ? responses[4].data.toString()
      : "0";
    const maticStakedRpt = !!responses[5].data
      ? responses[5].data.toString()
      : "0";

    dispatch(
      getRptDynamicSuccess(
        ethereumSupplyRpt,
        ethereumStakedRpt,
        binanceSupplyRpt,
        binanceStakedRpt,
        maticSupplyRpt,
        maticStakedRpt
      )
    );
  } catch (e) {
    console.log("error ", e);
  }
};

const getRoyaDynamicSuccess = (
  ethereumRoyaStaked: string,
  binanceRoyaStaked: string,
  maticRoyaStaked: string
) => ({
  type: GET_ROYA_DYNAMICS_SUCCESS,
  ethereumRoyaStaked,
  binanceRoyaStaked,
  maticRoyaStaked,
});

export const getRoyaDynamics = () => async (dispatch: any) => {
  try {
    const requests = [
      axios.get(`${getConfig().apiUrl}/ethereum/totalRoyaStaked`),
      axios.get(`${getConfig().apiUrl}/binance/totalRoyaStaked`),
      axios.get(`${getConfig().apiUrl}/matic/totalRoyaStaked`),
    ];

    const responses = await Promise.all(requests);

    const ethereumRoyaStaked = !!responses[0].data
      ? responses[0].data.toString()
      : "0";

    const binanceRoyaStaked = !!responses[1].data
      ? responses[1].data.toString()
      : "0";

    const maticRoyaStaked = !!responses[2].data
      ? responses[2].data.toString()
      : "0";

    dispatch(
      getRoyaDynamicSuccess(
        ethereumRoyaStaked,
        binanceRoyaStaked,
        maticRoyaStaked
      )
    );
  } catch (e) {
    console.log("Error in get roya dynamics");
  }
};

const getOptimiserLiquiditySuccess = (
  ethereumOptimiser: string,
  binanceOptimiser: string,
  maticOptimiser: string
) => ({
  type: GET_OPTIMISER_LIQUIDITY_SUCCESS,
  ethereumOptimiser,
  binanceOptimiser,
  maticOptimiser,
});

export const getOptimiserLiquidity = () => async (dispatch: any) => {
  try {
    const requests = [
      axios.get(`${getConfig().apiUrl}/ethereum/optimiser`),
      axios.get(`${getConfig().apiUrl}/binance/optimiser`),
      axios.get(`${getConfig().apiUrl}/matic/optimiser`),
    ];

    const responses = await Promise.all(requests);

    const ethereumOptimiser = !!responses[0].data
      ? responses[0].data.toString()
      : "0";

    const binanceOptimiser = !!responses[1].data
      ? responses[1].data.toString()
      : "0";

    const maticOptimiser = !!responses[2].data
      ? responses[2].data.toString()
      : "0";

    dispatch(
      getOptimiserLiquiditySuccess(
        ethereumOptimiser,
        binanceOptimiser,
        maticOptimiser
      )
    );
  } catch (e) {
    console.log("error in get optimiser liquidity ", e);
  }
};

const getGamingLiquiditySuccess = (
  ethereumGaming: string,
  binanceGaming: string,
  maticGaming: string
) => ({
  type: GET_GAMING_LIQUIDITY_SUCCESS,
  ethereumGaming,
  binanceGaming,
  maticGaming,
});

export const getGamingLiquidity = () => async (dispatch: any) => {
  try {
    const requests = [
      axios.get(`${getConfig().apiUrl}/ethereum/igaming `),
      axios.get(`${getConfig().apiUrl}/binance/igaming `),
      axios.get(`${getConfig().apiUrl}/matic/igaming `),
    ];

    const responses = await Promise.all(requests);

    const ethereumGaming = !!responses[0].data
      ? responses[0].data.toString()
      : "0";

    const binanceGaming = !!responses[1].data
      ? responses[1].data.toString()
      : "0";

    const maticGaming = !!responses[2].data
      ? responses[2].data.toString()
      : "0";

    dispatch(
      getGamingLiquiditySuccess(ethereumGaming, binanceGaming, maticGaming)
    );
  } catch (e) {
    console.log("Error in get gaming liquidity ", e);
  }
};

const getGlobalRoyaProtocolStatSuccess = (
  globalRoyaStaked: string,
  globalStableCoin: string
) => ({
  type: GET_GLOBAL_ROYA_PROTOCOL_SUCCESS,
  globalRoyaStaked,
  globalStableCoin,
});

export const getGlobalRoyaProtocolStats = () => async (dispatch: any) => {
  try {
    const requests = [
      axios.get(`${getConfig().apiUrl}/all/totalRoyaStaked`),
      axios.get(`${getConfig().apiUrl}/all/totalLockedValue`),
    ];

    const responses = await Promise.all(requests);

    const globalRoyaStaked = !!responses[0].data
      ? responses[0].data.toString()
      : "0";

    const globalStableCoin = !!responses[1].data
      ? responses[1].data.toString()
      : "0";

    dispatch(
      getGlobalRoyaProtocolStatSuccess(globalRoyaStaked, globalStableCoin)
    );
  } catch (e) {
    console.log("error in get global roya protocol stats ", e);
  }
};

const getRewardDistributionDaysLeftSuccess = (
  daysLeftEthereum: number,
  daysLeftBinance: number,
  daysLeftMatic: number
) => ({
  type: GET_REWARDS_DAYS_LEFT_SUCCESS,
  daysLeftEthereum,
  daysLeftBinance,
  daysLeftMatic,
});

export const getRewardDistributionDaysLeft = () => async (dispatch: any) => {
  try {
    const requests = [
      axios.get(`${getConfig().apiUrl}/ethereum/rptDaysLeft`),
      axios.get(`${getConfig().apiUrl}/binance/rptDaysLeft`),
      axios.get(`${getConfig().apiUrl}/matic/rptDaysLeft`),
    ];

    const responses = await Promise.all(requests);

    const daysLeftEthereum = !!responses[0].data ? responses[0].data : 0;
    const daysLeftBinance = !!responses[1].data ? responses[1].data : 0;
    const daysLeftMatic = !!responses[2].data ? responses[2].data : 0;

    dispatch(
      getRewardDistributionDaysLeftSuccess(
        daysLeftEthereum,
        daysLeftBinance,
        daysLeftMatic
      )
    );
  } catch (e) {
    console.log("error in get rewards distribution days left ", e);
  }
};

const getStakedRptInUsdcSuccess = (
  ethereumStakedRptUsd: number,
  binanceStakedRptUsd: number,
  maticStakedRptUsd: number
) => ({
  type: GET_STAKED_RPT_USDC,
  ethereumStakedRptUsd,
  binanceStakedRptUsd,
  maticStakedRptUsd,
});

export const getStakedRptInUsdc = () => async (dispatch: any) => {
  try {
    const requests = [
      axios.get(`${getConfig().apiUrl}/ethereum/totalStakedRptUSDC`),
      axios.get(`${getConfig().apiUrl}/binance/totalStakedRptUSDC`),
      axios.get(`${getConfig().apiUrl}/matic/totalStakedRptUSDC`),
    ];

    const responses = await Promise.all(requests);

    const ethereumStakedRptUsd = !!responses[0].data ? responses[0].data : 0;
    const binanceStakedRptUsd = !!responses[1].data ? responses[1].data : 0;
    const maticStakedRptUsd = !!responses[2].data ? responses[2].data : 0;

    dispatch(
      getStakedRptInUsdcSuccess(
        ethereumStakedRptUsd,
        binanceStakedRptUsd,
        maticStakedRptUsd
      )
    );
  } catch (e) {
    console.log("error in get staked rpt in usdc ", e);
  }
};

const getRewardRateSuccess = (
  ethereumRewardRate: string,
  binanceRewardRate: string,
  maticRewardRate: string
) => ({
  type: GET_REWARD_RATE_SUCCESS,
  ethereumRewardRate,
  binanceRewardRate,
  maticRewardRate,
});

export const getRewardRate = () => async (dispatch: any) => {
  try {
    const requests = [
      axios.get(`${getConfig().apiUrl}/ethereum/rewardRate`),
      axios.get(`${getConfig().apiUrl}/binance/rewardRate`),
      axios.get(`${getConfig().apiUrl}/matic/rewardRate`),
    ];

    const responses = await Promise.all(requests);

    const ethereumRewardRate = !!responses[0].data
      ? responses[0].data.toString()
      : "0";
    const binanceRewardRate = !!responses[1].data
      ? responses[1].data.toString()
      : "0";
    const maticRewardRate = !!responses[2].data
      ? responses[2].data.toString()
      : "0";

    dispatch(
      getRewardRateSuccess(
        ethereumRewardRate,
        binanceRewardRate,
        maticRewardRate
      )
    );
  } catch (e) {
    console.log("error in get Reward Rate ", e);
  }
};
