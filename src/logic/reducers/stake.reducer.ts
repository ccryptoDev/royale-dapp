import {
  STAKE_START,
  STAKE_SUCCESS,
  STAKE_APPROVE_START,
  STAKE_APPROVE_SUCCESS,
  STAKE_APPROVE_FAILURE,
  STAKE_SEND_START,
  STAKE_SEND_SUCCESS,
  STAKE_SEND_FAILURE,
  WITHDRAW_TOKEN_START,
  WITHDRAW_TOKEN_FAILURE,
  WITHDRAW_TOKEN_SUCCESS,
  SWITCH_WITHDRAW_STEP,
} from "../actions";
import { StakeSteps, WithdrawSteps } from "../../utils";

const initialState = {
  tokenAmount: 0,
  token: "USDT",
  rptAmount: "0",
  step: StakeSteps.confirm,
  transactionId: "",
  loading: false,
  isWithdrawing: false,
  withdrawTxId: "",
  equivalent: "",
  withdrawToken: "",
  withdrawSteps: WithdrawSteps.confirm,
  withdrawRptAmount: "",
};

const stakeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case STAKE_START:
      return {
        ...state,
        tokenAmount: action.payload.tokenAmount,
        token: action.payload.token,
        rptAmount: action.payload.rptAmount,
        step: StakeSteps.confirm,
      };

    case STAKE_SUCCESS:
      return {
        ...state,
        tokenAmount: 0,
        token: "USDT",
        rptAmount: "0",
      };

    case STAKE_APPROVE_START:
      return {
        ...state,
        loading: true,
      };

    case STAKE_APPROVE_SUCCESS:
      return {
        ...state,
      };

    case STAKE_APPROVE_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case STAKE_SEND_START:
      return {
        ...state,
        transactionId: action.transactionId,
        step: StakeSteps.processing,
      };

    case STAKE_SEND_SUCCESS:
      return {
        ...state,
        step: StakeSteps.success,
        loading: false,
      };

    case STAKE_SEND_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case WITHDRAW_TOKEN_START:
      return {
        ...state,
        isWithdrawing: true,
        withdrawRptAmount: "",
        withdrawTxId: "",
        withdrawToken: action.token,
        equivalent: action.equivalent,
      };

    case WITHDRAW_TOKEN_SUCCESS:
      return {
        ...state,
        isWithdrawing: false,
        withdrawRptAmount: action.rptAmount,
        withdrawTxId: action.withdrawTxId,
      };

    case WITHDRAW_TOKEN_FAILURE:
      return {
        ...state,
        isWithdrawing: false,
        withdrawRptAmount: "",
        withdrawTxId: "",
      };

    case SWITCH_WITHDRAW_STEP:
      return {
        ...state,
        withdrawSteps: action.step,
      };

    default:
      return state;
  }
};

export default stakeReducer;
