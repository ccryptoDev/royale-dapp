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
  GET_RPT_REWARDS_SUCCESS,
  GET_REWARDS_DAYS_LEFT_SUCCESS,
  GET_STAKED_RPT_USDC,
  GET_REWARD_RATE_SUCCESS,
} from "../actions";

const initialState = {
  ethereumQueenLot: "0",
  ethereumKingLot: "0",
  ethereumFlushLot: "0",
  binanceQueenLot: "0",
  binanceKingLot: "0",
  binanceFlushLot: "0",
  maticQueenLot: "0",
  maticKingLot: "0",
  maticFlushLot: "0",
  currentPrice: 0,
  priceChange: 0,
  deltaVolume: 0,
  deltaRelativeLiquidity: 0,
  ethereumStableCoin: "0",
  binanceStableCoin: "0",
  maticStableCoin: "0",
  ethereumRoyaHolder: 0,
  ethereumRoyaTransactions: 0,
  binanceRoyaHolder: 0,
  binanceRoyaTransactions: 0,
  maticRoyaHolder: 0,
  maticRoyaTransactions: 0,
  totalMroya: "0",
  ethereumSupplyRpt: "0",
  ethereumStakedRpt: "0",
  binanceSupplyRpt: "0",
  binanceStakedRpt: "0",
  maticSupplyRpt: "0",
  maticStakedRpt: "0",
  ethereumRoyaStaked: "0",
  binanceRoyaStaked: "0",
  maticRoyaStaked: "0",
  royaPriceHistory: [0],
  ethereumOptimiser: "0",
  binanceOptimiser: "0",
  maticOptimiser: "0",
  ethereumGaming: "0",
  binanceGaming: "0",
  maticGaming: "0",
  ethereumQueenValue: "0",
  ethereumKingValue: "0",
  ethereumFlushValue: "0",
  binanceQueenValue: "0",
  binanceKingValue: "0",
  binanceFlushValue: "0",
  maticQueenValue: "0",
  maticKingValue: "0",
  maticFlushValue: "0",
  ethereumLotTotalValue: "0",
  binanceLotTotalValue: "0",
  maticLotTotalValue: "0",
  stakingLotsTotalRoyaValue: "0",
  globalRoyaStaked: "0",
  globalStableCoin: "0",
  dailyVolume: "0",
  dailyMarketCap: "0",
  ethereumRptReward: 0,
  binanceRptReward: 0,
  maticRptReward: 0,
  daysLeftEthereum: 0,
  daysLeftBinance: 0,
  daysLeftMatic: 0,
  ethereumStakedRptUsd: 0,
  binanceStakedRptUsd: 0,
  maticStakedRptUsd: 0,
  ethereumRewardRate: "0",
  binanceRewardRate: "0",
  maticRewardRate: "0",
};

const royaAnalyticsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_NETWORK_LOT_SUCCESS:
      return {
        ...state,
        ethereumQueenLot: action.ethereumQueenLot,
        ethereumKingLot: action.ethereumKingLot,
        ethereumFlushLot: action.ethereumFlushLot,
        binanceQueenLot: action.binanceQueenLot,
        binanceKingLot: action.binanceKingLot,
        binanceFlushLot: action.binanceFlushLot,
        maticQueenLot: action.maticQueenLot,
        maticKingLot: action.maticKingLot,
        maticFlushLot: action.maticFlushLot,
        ethereumQueenValue: action.ethereumQueenValue,
        ethereumKingValue: action.ethereumKingValue,
        ethereumFlushValue: action.ethereumFlushValue,
        binanceQueenValue: action.binanceQueenValue,
        binanceKingValue: action.binanceKingValue,
        binanceFlushValue: action.binanceFlushValue,
        maticQueenValue: action.maticQueenValue,
        maticKingValue: action.maticKingValue,
        maticFlushValue: action.maticFlushValue,
        ethereumLotTotalValue: action.ethereumLotTotalValue,
        binanceLotTotalValue: action.binanceLotTotalValue,
        maticLotTotalValue: action.maticLotTotalValue,
        stakingLotsTotalRoyaValue: action.stakingLotsTotalRoyaValue,
      };

    case GET_ROYA_STATS_SUCCESS:
      return {
        ...state,
        currentPrice: action.currentPrice,
        priceChange: action.priceChange,
        royaPriceHistory: action.royaPriceHistory,
        dailyVolume: action.dailyVolume,
        dailyMarketCap: action.dailyMarketCap,
        deltaVolume: action.deltaVolume,
        deltaRelativeLiquidity: action.deltaRelativeLiquidity,
      };

    case GET_TOTAL_STABLE_COIN_SUCCESS:
      return {
        ...state,
        ethereumStableCoin: action.ethereumStableCoin,
        binanceStableCoin: action.binanceStableCoin,
        maticStableCoin: action.maticStableCoin,
      };

    case GET_TOTAL_ROYA_HOLDERS_SUCCESS:
      return {
        ...state,
        ethereumRoyaHolder: action.ethereumRoyaHolder,
        ethereumRoyaTransactions: action.ethereumRoyaTransactions,
        binanceRoyaHolder: action.binanceRoyaHolder,
        binanceRoyaTransactions: action.binanceRoyaTransactions,
        maticRoyaHolder: action.maticRoyaHolder,
        maticRoyaTransactions: action.maticRoyaTransactions,
      };

    case GET_TOTAL_MROYA_SUCCESS:
      return {
        ...state,
        totalMroya: action.totalMroya,
      };

    case GET_RPT_DYNAMICS_SUCCESS:
      return {
        ...state,
        ethereumSupplyRpt: action.ethereumSupplyRpt,
        ethereumStakedRpt: action.ethereumStakedRpt,
        binanceSupplyRpt: action.binanceSupplyRpt,
        binanceStakedRpt: action.binanceStakedRpt,
        maticSupplyRpt: action.maticSupplyRpt,
        maticStakedRpt: action.maticStakedRpt,
      };

    case GET_ROYA_DYNAMICS_SUCCESS:
      return {
        ...state,
        ethereumRoyaStaked: action.ethereumRoyaStaked,
        binanceRoyaStaked: action.binanceRoyaStaked,
        maticRoyaStaked: action.maticRoyaStaked,
      };

    case GET_OPTIMISER_LIQUIDITY_SUCCESS:
      return {
        ...state,
        ethereumOptimiser: action.ethereumOptimiser,
        binanceOptimiser: action.binanceOptimiser,
        maticOptimiser: action.maticOptimiser,
      };

    case GET_GAMING_LIQUIDITY_SUCCESS:
      return {
        ...state,
        ethereumGaming: action.ethereumGaming,
        binanceGaming: action.binanceGaming,
        maticGaming: action.maticGaming,
      };

    case GET_GLOBAL_ROYA_PROTOCOL_SUCCESS:
      return {
        ...state,
        globalRoyaStaked: action.globalRoyaStaked,
        globalStableCoin: action.globalStableCoin,
      };

    case GET_RPT_REWARDS_SUCCESS:
      return {
        ...state,
        ethereumRptReward: action.ethereumRptReward,
        binanceRptReward: action.binanceRptReward,
        maticRptReward: action.maticRptReward,
      };

    case GET_REWARDS_DAYS_LEFT_SUCCESS:
      return {
        ...state,
        daysLeftEthereum: action.daysLeftEthereum,
        daysLeftBinance: action.daysLeftBinance,
        daysLeftMatic: action.daysLeftMatic,
      };

    case GET_STAKED_RPT_USDC:
      return {
        ...state,
        ethereumStakedRptUsd: action.ethereumStakedRptUsd,
        binanceStakedRptUsd: action.binanceStakedRptUsd,
        maticStakedRptUsd: action.maticStakedRptUsd,
      };

    case GET_REWARD_RATE_SUCCESS:
      return {
        ...state,
        ethereumRewardRate: action.ethereumRewardRate,
        binanceRewardRate: action.binanceRewardRate,
        maticRewardRate: action.maticRewardRate,
      };

    default:
      return state;
  }
};

export default royaAnalyticsReducer;
