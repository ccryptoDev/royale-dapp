import {
  FETCH_LIQUIDITY_PROVIDER_SUCCESS,
  FETCH_LIQUID_RPT_SUCCESS,
  GET_CONTRIBUTION_DYNAMICS_SUCCESS,
  LOGOUT_SUCCESS,
  CLAIM_TOKENS_START,
  CLAIM_TOKENS_SUCCESS,
  CLAIM_TOKENS_FAILURE,
  GET_ISCLAIMABLE_SUCCESS,
  GET_CLAIMABLE_BALANCE_SUCCESS,
  GET_ROYALE_LIQUID_SUCCESS,
  GET_RPT_TO_USD_SUCCESS,
} from "../actions";

const initialState = {
  userLiquidity: "",
  lockedValue: "",
  mRoyaPerDay: "",
  optimiserLiquidity: "",
  liquidityInIgaming: "",
  totalLiquidityToIgaming: "",
  providersLiquidity: "",
  availableLiquidRpt: "",
  dynamics: [],
  isClaiming: false,
  isClaimable: false,
  claimableUsdc: "0",
  claimableUsdt: "0",
  claimableDai: "0",
  claimableBusd: "0",
  royaleLiquidDai: "0",
  royaleLiquidUsdc: "0",
  royaleLiquidUsdt: "0",
  royaleLiquidBusd: "0",
  rptToUsd: 0,
};

const liquidityProviderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_LIQUIDITY_PROVIDER_SUCCESS: {
      return {
        ...state,
        userLiquidity: !!action.payload.userLiquidity
          ? action.payload.userLiquidity
          : "",
        lockedValue: !!action.payload.lockedValue
          ? action.payload.lockedValue
          : "",
        mRoyaPerDay: !!action.payload.mRoyaPerDay
          ? action.payload.mRoyaPerDay
          : "",
        optimiserLiquidity: !!action.payload.optimiserLiquidity
          ? action.payload.optimiserLiquidity
          : "",
        liquidityInIgaming: !!action.payload.liquidityInIgaming
          ? action.payload.liquidityInIgaming
          : "",
        totalLiquidityToIgaming: !!action.payload.totalLiquidityToIgaming
          ? action.payload.totalLiquidityToIgaming
          : "",
        providersLiquidity: !!action.payload.providersLiquidity
          ? action.payload.providersLiquidity
          : "",
      };
    }

    case FETCH_LIQUID_RPT_SUCCESS:
      return {
        ...state,
        availableLiquidRpt: action.availableLiquidRpt,
      };

    case GET_CONTRIBUTION_DYNAMICS_SUCCESS:
      return {
        ...state,
        dynamics: action.payload,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        userLiquidity: "",
        lockedValue: "",
        mRoyaPerDay: "",
        optimiserLiquidity: "",
        liquidityInIgaming: "",
        totalLiquidityToIgaming: "",
        providersLiquidity: "",
        availableLiquidRpt: "",
        dynamics: [],
        claimableUsdc: "0",
        claimableUsdt: "0",
        claimableDai: "0",
        claimableBusd: "0",
        royaleLiquidDai: "0",
        royaleLiquidUsdc: "0",
        royaleLiquidUsdt: "0",
        royaleLiquidBusd: "0",
        rptToUsd: 0,
      };

    case CLAIM_TOKENS_START:
      return {
        ...state,
        isClaiming: true,
      };

    case CLAIM_TOKENS_SUCCESS:
      return {
        ...state,
        isClaiming: false,
      };

    case CLAIM_TOKENS_FAILURE:
      return {
        ...state,
        isClaiming: false,
      };

    case GET_ISCLAIMABLE_SUCCESS:
      return {
        ...state,
        isClaimable: action.isClaimable,
      };

    case GET_CLAIMABLE_BALANCE_SUCCESS:
      return {
        ...state,
        claimableDai: action.claimableDai,
        claimableUsdc: action.claimableUsdc,
        claimableUsdt: action.claimableUsdt,
        claimableBusd: action.claimableBusd,
      };

    case GET_ROYALE_LIQUID_SUCCESS:
      return {
        ...state,
        royaleLiquidDai: action.royaleLiquidDai,
        royaleLiquidUsdc: action.royaleLiquidUsdc,
        royaleLiquidUsdt: action.royaleLiquidUsdt,
        royaleLiquidBusd: action.royaleLiquidBusd,
      };

    case GET_RPT_TO_USD_SUCCESS:
      return {
        ...state,
        rptToUsd: action.rptToUsd,
      };

    default:
      return state;
  }
};

export default liquidityProviderReducer;
