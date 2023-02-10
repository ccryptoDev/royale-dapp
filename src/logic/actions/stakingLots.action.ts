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
  GET_USER_TOTAL_LOTS_SUCCESS,
  GET_USER_LOT_REWARD,
  CLOSE_SUCCESS_MSG,
  CLAIM_QLOT_REWARD_START,
  CLAIM_QLOT_REWARD_SUCCESS,
  CLAIM_QLOT_REWARD_FAILURE,
  CLAIM_KLOT_REWARD_START,
  CLAIM_KLOT_REWARD_SUCCESS,
  CLAIM_KLOT_REWARD_FAILURE,
  CLAIM_FLOT_REWARD_START,
  CLAIM_FLOT_REWARD_SUCCESS,
  CLAIM_FLOT_REWARD_FAILURE,
  GET_NFT_BALANCE_SUCCESS,
  SET_NFT_ID,
  BUY_DISCOUNTED_QROYA_LOT_START,
  GET_LOCKED_NFT_SUCCESS,
  SELL_LOCKED_QUEEN_NFT_START,
  GET_DISCOUNTED_QUEEN_LOT_SUCCESS,
} from "../actions";
import {
  toRoya,
  LotPrice,
  getKingLotContract,
  getQueenLotContract,
  getFlushLotContract,
  getRoyaNftContract,
  getApiEndpoint,
  getRoyaTokenContract,
  getQueenLotContractAddress,
  getKingLotContractAddress,
  getFlushLotContractAddress,
} from "../../utils";
import { getRoyaBalance } from "../actions";
import axios from "axios";

export const setNftId = (nftId: number) => ({
  type: SET_NFT_ID,
  nftId,
});

export const closeSuccessMsg = () => ({
  type: CLOSE_SUCCESS_MSG,
});

const buyQroyaLotStart = () => ({
  type: BUY_QROYA_LOT_START,
});

const buyQroyaLotSuccess = (lotAmount: number) => ({
  type: BUY_QROYA_LOT_SUCCESS,
  lotAmount,
});

const buyQroyaLotFailure = () => ({
  type: BUY_QROYA_LOT_FAILURE,
});

const buyDiscountQroyaLotStart = () => ({
  type: BUY_DISCOUNTED_QROYA_LOT_START,
});

export const buyQroyaLot =
  (
    userAddress: string,
    lot: number,
    nftDiscount: string,
    closeModal?: () => void
  ) =>
  (dispatch: any) => {
    if (!!nftDiscount) {
      dispatch(buyDiscountQroyaLotStart());

      getRoyaTokenContract()
        .methods.approve(
          getQueenLotContractAddress(),
          toRoya(((LotPrice.queenLot - 2800) * lot).toString())
        )
        .send({
          from: userAddress,
        })
        .on("transactionHash", (hash: string) => {
          console.log("transactionHash approve queenlot", hash);
        })
        .on("receipt", (receipt: string) => {
          console.log("receipt approve queenlot", receipt);
        })
        .on("error", (error: any) => {
          console.log("error approve queenlot", error);
          dispatch(buyQroyaLotFailure());
        })
        .then(() => {
          getRoyaNftContract()
            .methods.setApprovalForAll(getQueenLotContractAddress(), true)
            .send({
              from: userAddress,
            })
            .on("transactionHash", (hash: string) => {
              console.log("transactionHash approve queenlot nft", hash);
            })
            .on("receipt", (receipt: string) => {
              console.log("receipt approve queenlot nft", receipt);
            })
            .on("error", (error: any) => {
              console.log("error approve queenlot nft", error);
              dispatch(buyQroyaLotFailure());
            })
            .then(() => {
              getQueenLotContract()
                .methods.buyWithNFT(lot, parseInt(nftDiscount))
                .send({
                  from: userAddress,
                })
                .on("transactionHash", (hash: string) => {
                  console.log("transactionHash buy  queenlot nft", hash);
                })
                .on("receipt", (receipt: string) => {
                  console.log("receipt buy queenlot nft", receipt);
                  dispatch(buyQroyaLotSuccess(lot));
                  dispatch(getUserTotalLots(userAddress));
                  dispatch(getRoyaBalance(userAddress));
                  dispatch(getUSerLotReward(userAddress));
                  dispatch(getNftBalance(userAddress));
                  dispatch(getLockedNFTs(userAddress));
                  dispatch(getDiscountedQueenLots(userAddress));

                  if (closeModal) {
                    closeModal();
                  }
                })
                .on("error", (error: any) => {
                  console.log("error buy queenlot nft", error);
                  dispatch(buyQroyaLotFailure());
                });
            });
        });
    } else {
      dispatch(buyQroyaLotStart());

      getRoyaTokenContract()
        .methods.approve(
          getQueenLotContractAddress(),
          toRoya((LotPrice.queenLot * lot).toString())
        )
        .send({
          from: userAddress,
        })
        .on("transactionHash", (hash: string) => {
          console.log("transactionHash approve queenlot", hash);
        })
        .on("receipt", (receipt: string) => {
          console.log("receipt approve queenlot", receipt);
        })
        .on("error", (error: any) => {
          console.log("error approve queenlot", error);
          dispatch(buyQroyaLotFailure());
        })
        .then(() => {
          getQueenLotContract()
            .methods.buy(lot)
            .send({
              from: userAddress,
            })
            .on("transactionHash", (hash: string) => {
              console.log("transactionHash buy  queenlot", hash);
            })
            .on("receipt", (receipt: string) => {
              console.log("receipt buy queenlot", receipt);
              dispatch(buyQroyaLotSuccess(lot));
              dispatch(getUserTotalLots(userAddress));
              dispatch(getRoyaBalance(userAddress));
              dispatch(getUSerLotReward(userAddress));
            })
            .on("error", (error: any) => {
              console.log("error buy queenlot", error);
              dispatch(buyQroyaLotFailure());
            });
        });
    }
  };

const buyKroyaLotStart = () => ({
  type: BUY_KROYA_LOT_START,
});

const buyKroyaLotSuccess = (lotAmount: number) => ({
  type: BUY_KROYA_LOT_SUCCESS,
  lotAmount,
});

const buyKroyaLotFailure = () => ({
  type: BUY_KROYA_LOT_FAILURE,
});

export const buyKroyaLot =
  (userAddress: string, lot: number, nftDiscount: string) =>
  (dispatch: any) => {
    dispatch(buyKroyaLotStart());

    if (!!nftDiscount) {
      console.log("with nft discount");

      getRoyaTokenContract()
        .methods.approve(
          getKingLotContractAddress(),
          toRoya((LotPrice.kingLot * lot).toString())
        )
        .send({
          from: userAddress,
        })
        .on("transactionHash", (hash: string) => {
          console.log("transactionHash approve kingLot", hash);
        })
        .on("receipt", (receipt: string) => {
          console.log("receipt approve kingLot", receipt);
        })
        .on("error", (error: any) => {
          console.log("error approve kingLot", error);
          dispatch(buyKroyaLotFailure());
        })
        .then(() => {
          getRoyaNftContract()
            .methods.setApprovalForAll(getKingLotContractAddress(), true)
            .send({
              from: userAddress,
            })
            .on("transactionHash", (hash: string) => {
              console.log("transactionHash approve kingLot nft", hash);
            })
            .on("receipt", (receipt: string) => {
              console.log("receipt approve kingLot nft", receipt);
            })
            .on("error", (error: any) => {
              console.log("error approve kingLot nft", error);
              dispatch(buyKroyaLotFailure());
            })
            .then(() => {
              getKingLotContract()
                .methods.buyWithNFT(lot, parseInt(nftDiscount))
                .send({
                  from: userAddress,
                })
                .on("transactionHash", (hash: string) => {
                  console.log("transactionHash buy  kingLot nft", hash);
                })
                .on("receipt", (receipt: string) => {
                  console.log("receipt buy kingLot nft", receipt);
                  dispatch(buyKroyaLotSuccess(lot));
                  dispatch(getUserTotalLots(userAddress));
                  dispatch(getRoyaBalance(userAddress));
                  dispatch(getUSerLotReward(userAddress));
                })
                .on("error", (error: any) => {
                  console.log("error buy kingLot nft", error);
                  dispatch(buyKroyaLotFailure());
                });
            });
        });
    } else {
      console.log("without nft discount");

      getRoyaTokenContract()
        .methods.approve(
          getKingLotContractAddress(),
          toRoya((LotPrice.kingLot * lot).toString())
        )
        .send({
          from: userAddress,
        })
        .on("transactionHash", (hash: string) => {
          console.log("transactionHash approve kinglot", hash);
        })
        .on("receipt", (receipt: string) => {
          console.log("receipt approve kinglot", receipt);
        })
        .on("error", (error: any) => {
          console.log("error approve kinglot", error);
          dispatch(buyKroyaLotFailure());
        })
        .then(() => {
          getKingLotContract()
            .methods.buy(lot)
            .send({
              from: userAddress,
            })
            .on("transactionHash", (hash: string) => {
              console.log("transactionHash buy kinglot", hash);
            })
            .on("receipt", (receipt: string) => {
              console.log("receipt buy kinglot", receipt);
              dispatch(buyKroyaLotSuccess(lot));
              dispatch(getUserTotalLots(userAddress));
              dispatch(getRoyaBalance(userAddress));
              dispatch(getUSerLotReward(userAddress));
            })
            .on("error", (error: any) => {
              console.log("error buy kinglot", error);
              dispatch(buyKroyaLotFailure());
            });
        });
    }
  };

const buyFroyaLotStart = () => ({
  type: BUY_FROYA_LOT_START,
});

const buyFroyaLotSuccess = (lotAmount: number) => ({
  type: BUY_FROYA_LOT_SUCCESS,
  lotAmount,
});

const buyFroyaLotFailure = () => ({
  type: BUY_FROYA_LOT_FAILURE,
});

export const buyFroyaLot =
  (userAddress: string, lot: number, nftDiscount: string) =>
  (dispatch: any) => {
    dispatch(buyFroyaLotStart());

    if (!!nftDiscount) {
      console.log("with discount");

      getRoyaTokenContract()
        .methods.approve(
          getFlushLotContractAddress(),
          toRoya((LotPrice.flushLot * lot).toString())
        )
        .send({
          from: userAddress,
        })
        .on("transactionHash", (hash: string) => {
          console.log("transactionHash approve flushlot", hash);
        })
        .on("receipt", (receipt: string) => {
          console.log("receipt approve flushlot", receipt);
        })
        .on("error", (error: any) => {
          console.log("error approve flushlot", error);
          dispatch(buyFroyaLotFailure());
        })
        .then(() => {
          getRoyaNftContract()
            .methods.setApprovalForAll(getFlushLotContractAddress(), true)
            .send({
              from: userAddress,
            })
            .on("transactionHash", (hash: string) => {
              console.log("transactionHash approve flushlot nft", hash);
            })
            .on("receipt", (receipt: string) => {
              console.log("receipt approve flushlot nft", receipt);
            })
            .on("error", (error: any) => {
              console.log("error approve flushlot nft", error);
              dispatch(buyFroyaLotFailure());
            })
            .then(() => {
              getFlushLotContract()
                .methods.buyWithNFT(lot, parseInt(nftDiscount))
                .send({
                  from: userAddress,
                })
                .on("transactionHash", (hash: string) => {
                  console.log("transactionHash buy  flushlot nft", hash);
                })
                .on("receipt", (receipt: string) => {
                  console.log("receipt buy flushlot nft", receipt);
                  dispatch(buyFroyaLotSuccess(lot));
                  dispatch(getUserTotalLots(userAddress));
                  dispatch(getRoyaBalance(userAddress));
                  dispatch(getUSerLotReward(userAddress));
                })
                .on("error", (error: any) => {
                  console.log("error buy flushlot nft", error);
                  dispatch(buyFroyaLotFailure());
                });
            });
        });
    } else {
      console.log("without discount");

      getRoyaTokenContract()
        .methods.approve(
          getFlushLotContractAddress(),
          toRoya((LotPrice.flushLot * lot).toString())
        )
        .send({
          from: userAddress,
        })
        .on("transactionHash", (hash: string) => {
          console.log("transactionHash approve flushlot", hash);
        })
        .on("receipt", (receipt: string) => {
          console.log("receipt approve flushlot", receipt);
        })
        .on("error", (error: any) => {
          console.log("error approve flushlot", error);
          dispatch(buyFroyaLotFailure());
        })
        .then(() => {
          getFlushLotContract()
            .methods.buy(lot)
            .send({
              from: userAddress,
            })
            .on("transactionHash", (hash: string) => {
              console.log("transactionHash buy flushlot", hash);
            })
            .on("receipt", (receipt: string) => {
              console.log("receipt buy flushlot", receipt);
              dispatch(buyFroyaLotSuccess(lot));
              dispatch(getUserTotalLots(userAddress));
              dispatch(getRoyaBalance(userAddress));
              dispatch(getUSerLotReward(userAddress));
            })
            .on("error", (error: any) => {
              console.log("error buy flushlot", error);
              dispatch(buyFroyaLotFailure());
            });
        });
    }
  };

const sellQroyaLotStart = () => ({
  type: SELL_QROYA_LOT_START,
});

const sellQroyaLotSuccess = (lotAmount: number) => ({
  type: SELL_QROYA_LOT_SUCCESS,
  lotAmount,
});

const sellQroyaLotFailure = () => ({
  type: SELL_QROYA_LOT_FAILURE,
});

const sellLockedQueenNftStart = (nftId: string) => ({
  type: SELL_LOCKED_QUEEN_NFT_START,
  nftId,
});

export const sellQroyaLot =
  (userAddress: string, lot: number, nftDiscount: string) =>
  (dispatch: any) => {
    if (!!nftDiscount) {
      console.log("sell with nftdiscount qroya");

      dispatch(sellLockedQueenNftStart(nftDiscount));

      getQueenLotContract()
        .methods.sellWithNFT(lot, parseFloat(nftDiscount))
        .send({
          from: userAddress,
        })
        .on("transactionHash", (hash: string) => {
          console.log("transactionHash sell queenlot nftid", hash);
        })
        .on("receipt", (receipt: string) => {
          console.log("receipt sell queenlot nftid", receipt);
          dispatch(sellQroyaLotSuccess(lot));
          dispatch(getUserTotalLots(userAddress));
          dispatch(getRoyaBalance(userAddress));
          dispatch(getUSerLotReward(userAddress));
          dispatch(getNftBalance(userAddress));
          dispatch(getLockedNFTs(userAddress));
          dispatch(getDiscountedQueenLots(userAddress));
        })
        .on("error", (error: any) => {
          console.log("error sell queenlot nftid", error);
          dispatch(sellQroyaLotFailure());
        });
    } else {
      dispatch(sellQroyaLotStart());

      getQueenLotContract()
        .methods.sell(lot)
        .send({
          from: userAddress,
        })
        .on("transactionHash", (hash: string) => {
          console.log("transactionHash sell queenlot", hash);
        })
        .on("receipt", (receipt: string) => {
          console.log("receipt sell queenlot", receipt);
          dispatch(sellQroyaLotSuccess(lot));
          dispatch(getUserTotalLots(userAddress));
          dispatch(getRoyaBalance(userAddress));
          dispatch(getUSerLotReward(userAddress));
        })
        .on("error", (error: any) => {
          console.log("error sell queenlot", error);
          dispatch(sellQroyaLotFailure());
        });
    }
  };

const sellKroyaLotStart = () => ({
  type: SELL_KROYA_LOT_START,
});

const sellKroyaLotSuccess = (lotAmount: number) => ({
  type: SELL_KROYA_LOT_SUCCESS,
  lotAmount,
});

const sellKroyaLotFailure = () => ({
  type: SELL_KROYA_LOT_FAILURE,
});

export const sellKroyaLot =
  (userAddress: string, lot: number, nftDiscount: string) =>
  (dispatch: any) => {
    dispatch(sellKroyaLotStart());

    if (!!nftDiscount) {
      console.log("sell with nftdiscount kroya");

      getKingLotContract()
        .methods.sellWithNFT(lot, parseFloat(nftDiscount))
        .send({
          from: userAddress,
        })
        .on("transactionHash", (hash: string) => {
          console.log("transactionHash sell kinglot", hash);
        })
        .on("receipt", (receipt: string) => {
          console.log("receipt sell kinglot", receipt);
          dispatch(sellKroyaLotSuccess(lot));
          dispatch(getUserTotalLots(userAddress));
          dispatch(getRoyaBalance(userAddress));
          dispatch(getUSerLotReward(userAddress));
        })
        .on("error", (error: any) => {
          console.log("error sell kinglot", error);
          dispatch(sellKroyaLotFailure());
        });
    } else {
      getKingLotContract()
        .methods.sell(lot)
        .send({
          from: userAddress,
        })
        .on("transactionHash", (hash: string) => {
          console.log("transactionHash sell kinglot", hash);
        })
        .on("receipt", (receipt: string) => {
          console.log("receipt sell kinglot", receipt);
          dispatch(sellKroyaLotSuccess(lot));
          dispatch(getUserTotalLots(userAddress));
          dispatch(getRoyaBalance(userAddress));
          dispatch(getUSerLotReward(userAddress));
        })
        .on("error", (error: any) => {
          console.log("error sell kinglot", error);
          dispatch(sellKroyaLotFailure());
        });
    }
  };

const sellFroyaLotStart = () => ({
  type: SELL_FROYA_LOT_START,
});

const sellFroyaLotSuccess = (lotAmount: number) => ({
  type: SELL_FROYA_LOT_SUCCESS,
  lotAmount,
});

const sellFroyaLotFailure = () => ({
  type: SELL_FROYA_LOT_FAILURE,
});

export const sellFroyaLot =
  (userAddress: string, lot: number, nftDiscount: string) =>
  (dispatch: any) => {
    dispatch(sellFroyaLotStart());

    if (!!nftDiscount) {
      console.log("sell with nftdiscount froya");

      getFlushLotContract()
        .methods.sellWithNFT(lot, parseFloat(nftDiscount))
        .send({
          from: userAddress,
        })
        .on("transactionHash", (hash: string) => {
          console.log("transactionHash sell flushlot", hash);
        })
        .on("receipt", (receipt: string) => {
          console.log("receipt sell flushlot", receipt);
          dispatch(sellFroyaLotSuccess(lot));
          dispatch(getUserTotalLots(userAddress));
          dispatch(getRoyaBalance(userAddress));
          dispatch(getUSerLotReward(userAddress));
        })
        .on("error", (error: any) => {
          console.log("error sell flushlot", error);
          dispatch(sellFroyaLotFailure());
        });
    } else {
      getFlushLotContract()
        .methods.sell(lot)
        .send({
          from: userAddress,
        })
        .on("transactionHash", (hash: string) => {
          console.log("transactionHash sell flushlot", hash);
        })
        .on("receipt", (receipt: string) => {
          console.log("receipt sell flushlot", receipt);
          dispatch(sellFroyaLotSuccess(lot));
          dispatch(getUserTotalLots(userAddress));
          dispatch(getRoyaBalance(userAddress));
          dispatch(getUSerLotReward(userAddress));
        })
        .on("error", (error: any) => {
          console.log("error sell flushlot", error);
          dispatch(sellFroyaLotFailure());
        });
    }
  };

const getUserTotalLotsSuccess = (qLot: string, kLot: string, fLot: string) => ({
  type: GET_USER_TOTAL_LOTS_SUCCESS,
  qLot,
  kLot,
  fLot,
});

export const getUserTotalLots =
  (userAddress: string) => async (dispatch: any) => {
    try {
      const requests = [
        getQueenLotContract().methods.balanceOf(userAddress).call(),
        getKingLotContract().methods.balanceOf(userAddress).call(),
        getFlushLotContract().methods.balanceOf(userAddress).call(),
      ];

      const responses = await Promise.all(requests);

      const [queenLot, kingLot, flushLot] = responses;

      dispatch(getUserTotalLotsSuccess(queenLot, kingLot, flushLot));
    } catch (e) {
      console.log("error in get user total lots", e);
    }
  };

const getUserLotRewardSuccess = (
  queenLotReward: string,
  kinglotReward: string,
  flushLotReward: string
) => ({
  type: GET_USER_LOT_REWARD,
  queenLotReward,
  kinglotReward,
  flushLotReward,
});

export const getUSerLotReward =
  (userAddress: string) => async (dispatch: any) => {
    try {
      const requests = [
        getQueenLotContract().methods.profitOf(userAddress).call(),
        getKingLotContract().methods.profitOf(userAddress).call(),
        getFlushLotContract().methods.profitOf(userAddress).call(),
      ];

      const responses = await Promise.all(requests);

      const [queenLotReward, kinglotReward, flushLotReward] = responses;

      dispatch(
        getUserLotRewardSuccess(queenLotReward, kinglotReward, flushLotReward)
      );
    } catch (e) {
      console.log("error in get user lot reward");
    }
  };

const claimQroyaRewardStart = () => ({
  type: CLAIM_QLOT_REWARD_START,
});

const claimQroyaRewardSuccess = () => ({
  type: CLAIM_QLOT_REWARD_SUCCESS,
});

const claimQroyaRewardFailure = () => ({
  type: CLAIM_QLOT_REWARD_FAILURE,
});

export const claimQroyaRewards = (userAddress: string) => (dispatch: any) => {
  dispatch(claimQroyaRewardStart());

  getQueenLotContract()
    .methods.claimProfit()
    .send({
      from: userAddress,
    })
    .on("transactionHash", (hash: string) => {
      console.log("transactionHash claimProfit queenlot", hash);
    })
    .on("receipt", (receipt: string) => {
      console.log("receipt claimProfit queenlot", receipt);
      dispatch(claimQroyaRewardSuccess());
      dispatch(getUSerLotReward(userAddress));
    })
    .on("error", (error: any) => {
      console.log("error claimProfit queenlot", error);
      dispatch(claimQroyaRewardFailure());
    });
};

const claimKroyaRewardStart = () => ({
  type: CLAIM_KLOT_REWARD_START,
});

const claimKroyaRewardSuccess = () => ({
  type: CLAIM_KLOT_REWARD_SUCCESS,
});

const claimKroyaRewardFailure = () => ({
  type: CLAIM_KLOT_REWARD_FAILURE,
});

export const claimKroyaRewards = (userAddress: string) => (dispatch: any) => {
  dispatch(claimKroyaRewardStart());

  getKingLotContract()
    .methods.claimProfit()
    .send({
      from: userAddress,
    })
    .on("transactionHash", (hash: string) => {
      console.log("transactionHash claimProfit kinglot", hash);
    })
    .on("receipt", (receipt: string) => {
      console.log("receipt claimProfit kinglot", receipt);
      dispatch(claimKroyaRewardSuccess());
      dispatch(getUSerLotReward(userAddress));
    })
    .on("error", (error: any) => {
      console.log("error claimProfit kinglot", error);
      dispatch(claimKroyaRewardFailure());
    });
};

const claimFroyaRewardStart = () => ({
  type: CLAIM_FLOT_REWARD_START,
});

const claimFroyaRewardSuccess = () => ({
  type: CLAIM_FLOT_REWARD_SUCCESS,
});

const claimFroyaRewardFailure = () => ({
  type: CLAIM_FLOT_REWARD_FAILURE,
});

export const claimFroyaRewards = (userAddress: string) => (dispatch: any) => {
  dispatch(claimFroyaRewardStart());

  getFlushLotContract()
    .methods.claimProfit()
    .send({
      from: userAddress,
    })
    .on("transactionHash", (hash: string) => {
      console.log("transactionHash claimProfit flushlot", hash);
    })
    .on("receipt", (receipt: string) => {
      console.log("receipt claimProfit flushlot", receipt);
      dispatch(claimFroyaRewardSuccess());
      dispatch(getUSerLotReward(userAddress));
    })
    .on("error", (error: any) => {
      console.log("error claimProfit flushlot", error);
      dispatch(claimFroyaRewardFailure());
    });
};

const getNftBalanceSuccess = (queenNft: number[]) => ({
  type: GET_NFT_BALANCE_SUCCESS,
  queenNft,
});

export const getNftBalance = (userAddress: string) => async (dispatch: any) => {
  try {
    const {
      data: {
        queen: { ids },
      },
    } = await axios.get(`${getApiEndpoint()}/getNFTBalances/${userAddress}`);

    dispatch(getNftBalanceSuccess(ids));
  } catch (e) {
    console.log("error in get nft balance ", e);
  }
};

const getLockedNftSuccess = (lockedNfts: Array<string>) => ({
  type: GET_LOCKED_NFT_SUCCESS,
  lockedNfts,
});

export const getLockedNFTs = (userAddress: string) => async (dispatch: any) => {
  try {
    const response = await getQueenLotContract()
      .methods.getLockedNFTs(userAddress)
      .call();

    const lockedNfts = response.filter((v: string) => v !== "0");

    dispatch(getLockedNftSuccess(lockedNfts));
  } catch (e) {
    console.log("error in get discounted lots ", e);
  }
};

const getDiscountedQueenLotSuccess = (totalDiscountedQueenLot: string) => ({
  type: GET_DISCOUNTED_QUEEN_LOT_SUCCESS,
  totalDiscountedQueenLot,
});

export const getDiscountedQueenLots =
  (userAddress: string) => async (dispatch: any) => {
    try {
      const response = await getQueenLotContract()
        .methods.discountedLots(userAddress)
        .call();

      dispatch(getDiscountedQueenLotSuccess(response));

      console.log("discountedLots ", response);
    } catch (e) {
      console.log("error in get discounted lots ", e);
    }
  };
