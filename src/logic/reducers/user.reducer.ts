import { SwapProcess } from "../../utils";
import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_DAI_BALANCE,
  UPDATE_USDC_BALANCE,
  UPDATE_USDT_BALANCE,
  GET_ETH_BALANCE_SUCCESS,
  GET_MROYA_BALANCE_SUCCESS,
  UPDATE_BUSD_BALANCE,
  SWAP_MROYA_TOKEN_START,
  SWAP_MROYA_TOKEN_SUCCESS,
  SWAP_MROYA_TOKEN_FAILURE,
} from "../actions";

const initialState = {
  walletConnected: false,
  userAddress: "",
  usdcBalance: "0",
  usdtBalance: "0",
  daiBalance: "0",
  busdBalance: "0",
  ethBalance: "0",
  mRoyaBalance: "0",
  network: "",
  process: SwapProcess.idle,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        walletConnected: true,
        userAddress: action.address,
        network: action.network,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        walletConnected: false,
        userAddress: "",
        usdcBalance: "0",
        usdtBalance: "0",
        daiBalance: "0",
        ethBalance: "0",
        busdBalance: "0",
        network: "",
      };

    case UPDATE_DAI_BALANCE:
      return {
        ...state,
        daiBalance: action.daiBalance,
      };

    case UPDATE_USDC_BALANCE:
      return {
        ...state,
        usdcBalance: action.usdcBalance,
      };

    case UPDATE_USDT_BALANCE:
      return {
        ...state,
        usdtBalance: action.usdtBalance,
      };

    case UPDATE_BUSD_BALANCE:
      return {
        ...state,
        busdBalance: action.busdBalance,
      };

    case GET_ETH_BALANCE_SUCCESS:
      return {
        ...state,
        ethBalance: action.ethBalance,
      };

    case GET_MROYA_BALANCE_SUCCESS:
      return {
        ...state,
        mRoyaBalance: action.mRoyaBalance,
      };

    case SWAP_MROYA_TOKEN_START:
      return {
        ...state,
        process: action.process,
      };

    case SWAP_MROYA_TOKEN_SUCCESS:
      return {
        ...state,
        process: SwapProcess.idle,
      };

    case SWAP_MROYA_TOKEN_FAILURE:
      return {
        ...state,
        process: SwapProcess.idle,
      };

    default:
      return state;
  }
};

export default userReducer;
