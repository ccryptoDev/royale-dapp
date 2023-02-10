import { RoyaReserveModal } from "../../utils";
import {
  ROYA_RESERVE_STAKE_START,
  ROYA_RESERVE_STAKE_SUCCESS,
  ROYA_RESERVE_STAKE_FAILURE,
  GET_ROYA_STAKE_BALANCE_SUCCESS,
  GET_ROYA_USER_BALANCE_SUCCESS,
  GET_REWARD_BALANCE_SUCCESS,
  ACTIVATE_COOLDOWN_START,
  ACTIVATE_COOLDOWN_SUCCESS,
  ACTIVATE_COOLDOWN_FAILURE,
  CLAIM_ROYA_REWARD_START,
  CLAIM_ROYA_REWARD_SUCCESS,
  CLAIM_ROYA_REWARD_FAILURE,
  UNSTAKE_ROYA_RESERVE_START,
  UNSTAKE_ROYA_RESERVE_SUCCESS,
  UNSTAKE_ROYA_RESERVE_FAILURE,
  OPEN_ROYA_RESERVE_MODAL,
  CLOSED_ROYA_RESERVE_MODAL,
  GET_COOLDOWN_STATUS_SUCCESS,
  LOGOUT_SUCCESS,
  GET_TOTAL_STAKED_ROYA_SUCCESS,
  STAKERS_COOLDOWN_SUCCESS,
} from "../actions";

const initialState = {
  isStaking: false,
  stakedRoyaBalance: "0",
  userRoyaBalance: "0",
  rewardBalance: "0",
  isActivating: false,
  isClaiming: false,
  isUnstaking: false,
  activeModal: RoyaReserveModal.closed,
  coolDownStatus: "",
  totalRoyaStaked: "0",
  stakersCooldown: 0,
};

const royaReserveReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ROYA_RESERVE_STAKE_START:
      return {
        ...state,
        isStaking: true,
      };

    case ROYA_RESERVE_STAKE_SUCCESS:
      return {
        ...state,
        isStaking: false,
      };

    case ROYA_RESERVE_STAKE_FAILURE:
      return {
        ...state,
        isStaking: false,
      };

    case GET_ROYA_STAKE_BALANCE_SUCCESS:
      return {
        ...state,
        stakedRoyaBalance: action.stakedRoyaBalance,
      };

    case GET_ROYA_USER_BALANCE_SUCCESS:
      return {
        ...state,
        userRoyaBalance: action.userRoyaBalance,
      };

    case GET_REWARD_BALANCE_SUCCESS:
      return {
        ...state,
        rewardBalance: action.rewardBalance,
      };

    case ACTIVATE_COOLDOWN_START:
      return {
        ...state,
        isActivating: true,
      };

    case ACTIVATE_COOLDOWN_SUCCESS:
      return {
        ...state,
        isActivating: false,
      };

    case ACTIVATE_COOLDOWN_FAILURE:
      return {
        ...state,
        isActivating: false,
      };

    case CLAIM_ROYA_REWARD_START:
      return {
        ...state,
        isClaiming: true,
      };

    case CLAIM_ROYA_REWARD_SUCCESS:
      return {
        ...state,
        isClaiming: false,
      };

    case CLAIM_ROYA_REWARD_FAILURE:
      return {
        ...state,
        isClaiming: false,
      };

    case UNSTAKE_ROYA_RESERVE_START:
      return {
        ...state,
        isUnstaking: true,
      };

    case UNSTAKE_ROYA_RESERVE_SUCCESS:
      return {
        ...state,
        isUnstaking: false,
      };

    case UNSTAKE_ROYA_RESERVE_FAILURE:
      return {
        ...state,
        isUnstaking: false,
      };

    case OPEN_ROYA_RESERVE_MODAL:
      return {
        ...state,
        activeModal: action.modalType,
      };

    case CLOSED_ROYA_RESERVE_MODAL:
      return {
        ...state,
        activeModal: RoyaReserveModal.closed,
      };

    case GET_COOLDOWN_STATUS_SUCCESS:
      return {
        ...state,
        coolDownStatus: action.status,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        stakedRoyaBalance: "0",
        userRoyaBalance: "0",
        rewardBalance: "0",
        totalRoyaStaked: "0",
        stakersCooldown: 0,
        coolDownStatus: "",
      };

    case GET_TOTAL_STAKED_ROYA_SUCCESS:
      return {
        ...state,
        totalRoyaStaked: action.totalRoyaStaked,
      };

    case STAKERS_COOLDOWN_SUCCESS:
      return {
        ...state,
        stakersCooldown: action.stakersCooldown,
      };

    default:
      return state;
  }
};

export default royaReserveReducer;
