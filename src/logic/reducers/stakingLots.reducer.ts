import {
  SELL_QROYA_LOT_START,
  SELL_QROYA_LOT_SUCCESS,
  SELL_QROYA_LOT_FAILURE,
  SELL_KROYA_LOT_START,
  SELL_KROYA_LOT_SUCCESS,
  SELL_KROYA_LOT_FAILURE,
  SELL_FROYA_LOT_START,
  SELL_FROYA_LOT_SUCCESS,
  SELL_FROYA_LOT_FAILURE,
  BUY_QROYA_LOT_SUCCESS,
  BUY_QROYA_LOT_START,
  BUY_QROYA_LOT_FAILURE,
  BUY_KROYA_LOT_START,
  BUY_KROYA_LOT_SUCCESS,
  BUY_KROYA_LOT_FAILURE,
  BUY_FROYA_LOT_START,
  BUY_FROYA_LOT_SUCCESS,
  BUY_FROYA_LOT_FAILURE,
  GET_USER_LOT_REWARD,
  GET_USER_TOTAL_LOTS_SUCCESS,
  CLAIM_QLOT_REWARD_START,
  CLAIM_QLOT_REWARD_SUCCESS,
  CLAIM_QLOT_REWARD_FAILURE,
  CLAIM_KLOT_REWARD_START,
  CLAIM_KLOT_REWARD_SUCCESS,
  CLAIM_KLOT_REWARD_FAILURE,
  CLAIM_FLOT_REWARD_START,
  CLAIM_FLOT_REWARD_SUCCESS,
  CLAIM_FLOT_REWARD_FAILURE,
  CLOSE_SUCCESS_MSG,
  LOGOUT_SUCCESS,
  GET_NFT_BALANCE_SUCCESS,
  SET_NFT_ID,
  BUY_DISCOUNTED_QROYA_LOT_START,
  GET_LOCKED_NFT_SUCCESS,
  SELL_LOCKED_QUEEN_NFT_START,
  GET_DISCOUNTED_QUEEN_LOT_SUCCESS,
} from "../actions";

import {
  SuccessMsgType,
  StakingLotModals,
  LotRewardProcess,
} from "../../utils";

const initialState = {
  totalQroyaLot: "0",
  totalKroyaLot: "0",
  totalFroyaLot: "0",
  queenLotReward: "0",
  kinglotReward: "0",
  flushLotReward: "0",
  lotTypeBought: "",
  lotAmountBought: 0,
  lotTypeSold: "",
  lotAmountSold: 0,
  successMsgType: SuccessMsgType.hide,
  lotOperation: StakingLotModals.closed,
  claimingProcess: LotRewardProcess.idle,
  queenNft: [],
  nftId: 0,
  lockedNfts: [],
  sellQueenLotNftId: "",
  totalDiscountedQueenLot: "0",
};

const stakingLotsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SELL_QROYA_LOT_START:
      return {
        ...state,
        lotTypeSold: "",
        lotAmountSold: 0,
        successMsgType: SuccessMsgType.hide,
        lotOperation: StakingLotModals.sellQueen,
      };

    case SELL_LOCKED_QUEEN_NFT_START:
      return {
        ...state,
        lotTypeSold: "",
        lotAmountSold: 0,
        successMsgType: SuccessMsgType.hide,
        lotOperation: StakingLotModals.queenLockedNft,
        sellQueenLotNftId: action.nftId,
      };

    case SELL_QROYA_LOT_SUCCESS:
      return {
        ...state,
        lotTypeSold: "qROYA",
        lotAmountSold: action.lotAmount,
        successMsgType: SuccessMsgType.showSellSuccess,
        lotOperation: StakingLotModals.closed,
        sellQueenLotNftId: "",
      };

    case SELL_QROYA_LOT_FAILURE:
      return {
        ...state,
        lotTypeSold: "",
        lotAmountSold: 0,
        successMsgType: SuccessMsgType.hide,
        lotOperation: StakingLotModals.closed,
        sellQueenLotNftId: "",
      };

    case SELL_KROYA_LOT_START:
      return {
        ...state,
        lotTypeSold: "",
        lotAmountSold: 0,
        successMsgType: SuccessMsgType.hide,
        lotOperation: StakingLotModals.sellKing,
      };

    case SELL_KROYA_LOT_SUCCESS:
      return {
        ...state,
        lotTypeSold: "kROYA",
        lotAmountSold: action.lotAmount,
        successMsgType: SuccessMsgType.showSellSuccess,
        lotOperation: StakingLotModals.closed,
      };

    case SELL_KROYA_LOT_FAILURE:
      return {
        ...state,
        lotTypeSold: "",
        lotAmountSold: 0,
        successMsgType: SuccessMsgType.hide,
        lotOperation: StakingLotModals.closed,
      };

    case SELL_FROYA_LOT_START:
      return {
        ...state,
        lotTypeSold: "",
        lotAmountSold: 0,
        successMsgType: SuccessMsgType.hide,
        lotOperation: StakingLotModals.sellFlush,
      };

    case SELL_FROYA_LOT_SUCCESS:
      return {
        ...state,
        lotTypeSold: "fROYA",
        lotAmountSold: action.lotAmount,
        successMsgType: SuccessMsgType.showSellSuccess,
        lotOperation: StakingLotModals.closed,
      };

    case SELL_FROYA_LOT_FAILURE:
      return {
        ...state,
        lotTypeSold: "",
        lotAmountSold: 0,
        successMsgType: SuccessMsgType.hide,
        lotOperation: StakingLotModals.closed,
      };

    case BUY_QROYA_LOT_START:
      return {
        ...state,
        lotTypeBought: "",
        lotAmountBought: 0,
        successMsgType: SuccessMsgType.hide,
        lotOperation: StakingLotModals.buyQueen,
      };

    case BUY_DISCOUNTED_QROYA_LOT_START:
      return {
        ...state,
        lotTypeBought: "",
        lotAmountBought: 0,
        successMsgType: SuccessMsgType.hide,
        lotOperation: StakingLotModals.queenDiscount,
      };

    case BUY_QROYA_LOT_SUCCESS:
      return {
        ...state,
        lotTypeBought: "qROYA",
        lotAmountBought: action.lotAmount,
        successMsgType: SuccessMsgType.showBuySuccess,
        lotOperation: StakingLotModals.closed,
      };

    case BUY_QROYA_LOT_FAILURE:
      return {
        ...state,
        successMsgType: SuccessMsgType.hide,
        lotTypeBought: "",
        lotAmountBought: 0,
        lotOperation: StakingLotModals.closed,
      };

    case BUY_KROYA_LOT_START:
      return {
        ...state,
        successMsgType: SuccessMsgType.hide,
        lotTypeBought: "",
        lotAmountBought: 0,
        lotOperation: StakingLotModals.buyKing,
      };

    case BUY_KROYA_LOT_SUCCESS:
      return {
        ...state,
        successMsgType: SuccessMsgType.showBuySuccess,
        lotTypeBought: "kROYA",
        lotAmountBought: action.lotAmount,
        lotOperation: StakingLotModals.closed,
      };

    case BUY_KROYA_LOT_FAILURE:
      return {
        ...state,
        successMsgType: SuccessMsgType.hide,
        lotTypeBought: "",
        lotAmountBought: 0,
        lotOperation: StakingLotModals.closed,
      };

    case BUY_FROYA_LOT_START:
      return {
        ...state,
        successMsgType: SuccessMsgType.hide,
        lotTypeBought: "",
        lotAmountBought: 0,
        lotOperation: StakingLotModals.BuyFlush,
      };

    case BUY_FROYA_LOT_SUCCESS:
      return {
        ...state,
        successMsgType: SuccessMsgType.showBuySuccess,
        lotTypeBought: "fROYA",
        lotAmountBought: action.lotAmount,
        lotOperation: StakingLotModals.closed,
      };

    case BUY_FROYA_LOT_FAILURE:
      return {
        ...state,
        lotTypeBought: "",
        lotAmountBought: 0,
        successMsgType: SuccessMsgType.hide,
        lotOperation: StakingLotModals.closed,
      };

    case GET_USER_LOT_REWARD:
      return {
        ...state,
        queenLotReward: action.queenLotReward,
        kinglotReward: action.kinglotReward,
        flushLotReward: action.flushLotReward,
      };

    case GET_USER_TOTAL_LOTS_SUCCESS:
      return {
        ...state,
        totalQroyaLot: action.qLot,
        totalKroyaLot: action.kLot,
        totalFroyaLot: action.fLot,
      };

    case CLOSE_SUCCESS_MSG:
      return {
        ...state,
        successMsgType: SuccessMsgType.hide,
      };

    case CLAIM_QLOT_REWARD_START:
      return {
        ...state,
        claimingProcess: LotRewardProcess.qlotReward,
      };

    case CLAIM_QLOT_REWARD_SUCCESS:
      return {
        ...state,
        claimingProcess: LotRewardProcess.idle,
      };

    case CLAIM_QLOT_REWARD_FAILURE:
      return {
        ...state,
        claimingProcess: LotRewardProcess.idle,
      };

    case CLAIM_KLOT_REWARD_START:
      return {
        ...state,
        claimingProcess: LotRewardProcess.klotReward,
      };

    case CLAIM_KLOT_REWARD_SUCCESS:
      return {
        ...state,
        claimingProcess: LotRewardProcess.idle,
      };

    case CLAIM_KLOT_REWARD_FAILURE:
      return {
        ...state,
        claimingProcess: LotRewardProcess.idle,
      };

    case CLAIM_FLOT_REWARD_START:
      return {
        ...state,
        claimingProcess: LotRewardProcess.flotReward,
      };

    case CLAIM_FLOT_REWARD_SUCCESS:
      return {
        ...state,
        claimingProcess: LotRewardProcess.idle,
      };

    case CLAIM_FLOT_REWARD_FAILURE:
      return {
        ...state,
        claimingProcess: LotRewardProcess.idle,
      };

    case GET_NFT_BALANCE_SUCCESS:
      return {
        ...state,
        queenNft: action.queenNft,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        totalQroyaLot: "0",
        totalKroyaLot: "0",
        totalFroyaLot: "0",
        queenLotReward: "0",
        kinglotReward: "0",
        flushLotReward: "0",
        queenNft: [],
        nftId: 0,
      };

    case SET_NFT_ID:
      return {
        ...state,
        nftId: action.nftId,
      };

    case GET_LOCKED_NFT_SUCCESS:
      return {
        ...state,
        lockedNfts: action.lockedNfts,
      };

    case GET_DISCOUNTED_QUEEN_LOT_SUCCESS:
      return {
        ...state,
        totalDiscountedQueenLot: action.totalDiscountedQueenLot,
      };

    default:
      return state;
  }
};

export default stakingLotsReducer;
