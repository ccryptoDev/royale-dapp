import {
  CLAIM_MROYA_START,
  CLAIM_MROYA_SUCCESS,
  CLAIM_MROYA_FAILURE,
  UNSTAKE_RTP_START,
  UNSTAKE_RTP_SUCCESS,
  UNSTAKE_RTP_FAILURE,
  STAKE_RTP_START,
  STAKE_RTP_SUCCESS,
  STAKE_RTP_FAILURE,
  SWITCH_RPT_STAKE_STEP,
  GET_USER_RPT,
  GET_USER_STAKED_RPT,
  GET_USER_RPT_REWARD,
  SWITCH_RPT_UNSTAKE_STEP,
  LOGOUT_SUCCESS,
  GET_TOTAL_RPT_SUPPLY_SUCCESS,
  GET_RPT_SUPPLY_SUCCESS,
} from "../actions";
import { LockRptSteps, UnlockRptSteps } from "../../utils";

const initialState = {
  rptBalance: "0",
  stakedRptBalance: "0",
  accumulatedMRoya: "0",
  isClaimingMroya: false,
  isUnstakingRtp: false,
  isStakingRtp: false,
  lockRptStep: LockRptSteps.confirm,
  unlockRptStep: UnlockRptSteps.confirm,
  stakeRptAmount: "",
  unStakeRptAmount: "",
  totalRptSupply: "0",
  rptSupply: "0",
};

const rptStakingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_USER_RPT:
      return {
        ...state,
        rptBalance: action.userBalance,
      };

    case GET_USER_STAKED_RPT:
      return {
        ...state,
        stakedRptBalance: action.userStakedBalance,
      };

    case GET_USER_RPT_REWARD:
      return {
        ...state,
        accumulatedMRoya: action.rewardBalance,
      };

    case CLAIM_MROYA_START:
      return {
        ...state,
        isClaimingMroya: true,
      };

    case CLAIM_MROYA_SUCCESS:
      return {
        ...state,
        isClaimingMroya: false,
      };

    case CLAIM_MROYA_FAILURE:
      return {
        ...state,
        isClaimingMroya: false,
      };

    case UNSTAKE_RTP_START:
      return {
        ...state,
        isUnstakingRtp: true,
        unStakeRptAmount: "",
      };

    case UNSTAKE_RTP_SUCCESS:
      return {
        ...state,
        isUnstakingRtp: false,
        unStakeRptAmount: action.unStakeRptAmount,
      };

    case UNSTAKE_RTP_FAILURE:
      return {
        ...state,
        isUnstakingRtp: false,
        unStakeRptAmount: "",
      };

    case SWITCH_RPT_UNSTAKE_STEP:
      return {
        ...state,
        unlockRptStep: action.page,
      };

    case STAKE_RTP_START:
      return {
        ...state,
        isStakingRtp: true,
        stakeRptAmount: "",
      };

    case STAKE_RTP_SUCCESS:
      return {
        ...state,
        lockRptStep: LockRptSteps.success,
        isStakingRtp: false,
        stakeRptAmount: action.stakeRptAmount,
      };

    case SWITCH_RPT_STAKE_STEP:
      return {
        ...state,
        lockRptStep: action.step,
      };

    case STAKE_RTP_FAILURE:
      return {
        ...state,
        isStakingRtp: false,
        stakeRptAmount: "",
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        rptBalance: "0",
        stakedRptBalance: "0",
        accumulatedMRoya: "0",
      };

    case GET_TOTAL_RPT_SUPPLY_SUCCESS:
      return {
        ...state,
        totalRptSupply: action.totalRptSupply,
      };

    case GET_RPT_SUPPLY_SUCCESS:
      return {
        ...state,
        rptSupply: action.rptSupply,
      };

    default:
      return state;
  }
};

export default rptStakingReducer;
