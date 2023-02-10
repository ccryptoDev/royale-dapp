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
  GET_TOTAL_STAKED_ROYA_SUCCESS,
  STAKERS_COOLDOWN_SUCCESS,
} from "./constant";
import {
  RoyaReserveModal,
  toRoya,
  getRoyaTokenContract,
  getRoyaReserveContract,
  getRoyaReserveContractAddress,
} from "../../utils";
import { getMroyaBalance } from "./user.actions";

export const openRoyaReserveModal = (modalType: number) => ({
  type: OPEN_ROYA_RESERVE_MODAL,
  modalType,
});

export const closeRoyaReserveModal = () => ({
  type: CLOSED_ROYA_RESERVE_MODAL,
});

export const getRoyaStakeBalanceSuccess = (stakedRoyaBalance: string) => {
  return {
    type: GET_ROYA_STAKE_BALANCE_SUCCESS,
    stakedRoyaBalance,
  };
};

export const getUserRoyaBalanceSuccess = (userRoyaBalance: string) => {
  return {
    type: GET_ROYA_USER_BALANCE_SUCCESS,
    userRoyaBalance,
  };
};

export const getRoyaRewardBalanceSuccess = (rewardBalance: string) => {
  return {
    type: GET_REWARD_BALANCE_SUCCESS,
    rewardBalance,
  };
};

export const getRoyaReserveStakeBalance =
  (userAddress: string) => async (dispatch: any) => {
    try {
      const royaReserveStakeBalance = await getRoyaReserveContract()
        .methods.balanceOf(userAddress)
        .call();

      dispatch(getRoyaStakeBalanceSuccess(royaReserveStakeBalance));
    } catch (e) {
      console.log("something went wrong in get roya reserve staked balance");
    }
  };

export const getRoyaBalance =
  (userAddress: string) => async (dispatch: any) => {
    try {
      const royaBalance = await getRoyaTokenContract()
        .methods.balanceOf(userAddress)
        .call();

      dispatch(getUserRoyaBalanceSuccess(royaBalance));
    } catch (e) {
      console.log("something went wrong in get roya balance ", e);
    }
  };

export const getRoyaRewards = () => async (dispatch: any, getState: any) => {
  const { walletConnected, userAddress } = getState().user;

  if (walletConnected) {
    try {
      const rewardBalance = await getRoyaReserveContract()
        .methods.getTotalRewardsBalance(userAddress)
        .call();

      dispatch(getRoyaRewardBalanceSuccess(rewardBalance));
    } catch (e) {
      console.log("something went wrong in get roya rewards ", e);
    }
  }
};

export const royaReserveStakeStart = () => {
  return {
    type: ROYA_RESERVE_STAKE_START,
  };
};

export const royaReserveStakeSuccess = () => {
  return {
    type: ROYA_RESERVE_STAKE_SUCCESS,
  };
};

export const royaReserveStakeFailure = () => {
  return {
    type: ROYA_RESERVE_STAKE_FAILURE,
  };
};

export const stakeRoya =
  (royaAmount: string, userAddress: string) => async (dispatch: any) => {
    dispatch(royaReserveStakeStart());

    const approvedAmount = await getRoyaTokenContract()
      .methods.allowance(userAddress, getRoyaReserveContractAddress())
      .call();

    console.log("approvedAmount ", approvedAmount);

    if (approvedAmount === "0") {
      getRoyaTokenContract()
        .methods.approve(getRoyaReserveContractAddress(), toRoya(royaAmount))
        .send({ from: userAddress })
        .on("transactionHash", (hash: string) => {
          console.log("transactionHash roya reserve approve ", hash);
        })
        .on("receipt", (receipt: string) => {
          console.log("receipt roya reserve approve ", receipt);
        })
        .on("error", (error: any) => {
          console.log("error roya reserve approve ", error);
          dispatch(royaReserveStakeFailure());
        })
        .then(() => {
          getRoyaReserveContract()
            .methods.stake(userAddress, toRoya(royaAmount))
            .send({
              from: userAddress,
            })
            .on("transactionHash", (hash: string) => {
              console.log("transactionHash roya reserve stake ", hash);
            })
            .on("receipt", (receipt: string) => {
              console.log("receipt roya reserve stake ", receipt);
              dispatch(royaReserveStakeSuccess());
              dispatch(getRoyaReserveStakeBalance(userAddress));
              dispatch(getRoyaBalance(userAddress));
              dispatch(getRoyaRewards());
            })
            .on("error", (error: any) => {
              console.log("error roya reserve stake ", error);
              dispatch(royaReserveStakeFailure());
            });
        });
    } else {
      getRoyaReserveContract()
        .methods.stake(userAddress, approvedAmount)
        .send({
          from: userAddress,
        })
        .on("transactionHash", (hash: string) => {
          console.log("transactionHash roya reserve stake ", hash);
        })
        .on("receipt", (receipt: string) => {
          console.log("receipt roya reserve stake ", receipt);
          dispatch(royaReserveStakeSuccess());
          dispatch(getRoyaReserveStakeBalance(userAddress));
          dispatch(getRoyaBalance(userAddress));
          dispatch(getRoyaRewards());
        })
        .on("error", (error: any) => {
          console.log("error roya reserve stake ", error);
          dispatch(royaReserveStakeFailure());
        });
    }
  };

export const activateCooldownStart = () => ({
  type: ACTIVATE_COOLDOWN_START,
});

export const activateCooldownSuccess = () => ({
  type: ACTIVATE_COOLDOWN_SUCCESS,
});

export const activateCooldownFailure = () => ({
  type: ACTIVATE_COOLDOWN_FAILURE,
});

export const activateCoolDown = (userAddress: string) => (dispatch: any) => {
  dispatch(activateCooldownStart());

  getRoyaReserveContract()
    .methods.cooldown()
    .send({ from: userAddress })
    .on("transactionHash", (hash: string) => {
      console.log("transactionHash activate cooldown", hash);
    })
    .on("receipt", (receipt: string) => {
      console.log("receipt activate cooldown", receipt);
      dispatch(stakesCooldownSuccess(0));
      dispatch(activateCooldownSuccess());
      dispatch(openRoyaReserveModal(RoyaReserveModal.cooldownActivated));
      dispatch(getCoolDownStatus());
      dispatch(getStakerCooldown(userAddress));
    })
    .on("error", (error: any) => {
      console.log("error activate cooldown", error);
      dispatch(activateCooldownFailure());
    });
};

export const claimRoyaRewardStart = () => ({
  type: CLAIM_ROYA_REWARD_START,
});

export const claimRoyaRewardSuccess = () => ({
  type: CLAIM_ROYA_REWARD_SUCCESS,
});

export const claimRoyaRewardFailure = () => ({
  type: CLAIM_ROYA_REWARD_FAILURE,
});

export const claimRoyaRewards =
  (userAddress: string, amount: string) => (dispatch: any) => {
    dispatch(claimRoyaRewardStart());

    getRoyaReserveContract()
      .methods.claimRewards(userAddress, amount)
      .send({ from: userAddress })
      .on("transactionHash", (hash: string) => {
        console.log("transactionHash claimRewards", hash);
      })
      .on("receipt", (receipt: string) => {
        console.log("receipt claimRewards", receipt);
        dispatch(claimRoyaRewardSuccess());
        dispatch(getRoyaRewards());
        dispatch(getMroyaBalance(userAddress));
        dispatch(getRoyaBalance(userAddress));
      })
      .on("error", (error: any) => {
        console.log("error claimRewards", error);
        dispatch(claimRoyaRewardFailure());
      });
  };

export const royaReserveUnstakeStart = () => ({
  type: UNSTAKE_ROYA_RESERVE_START,
});

export const royaReserveUnstakeSuccess = () => ({
  type: UNSTAKE_ROYA_RESERVE_SUCCESS,
});

export const royaReserveUnstakeFailure = () => ({
  type: UNSTAKE_ROYA_RESERVE_FAILURE,
});

export const unstakeRoyaAmount =
  (userAddress: string, royaAmount: string) => (dispatch: any) => {
    dispatch(royaReserveUnstakeStart());

    getRoyaReserveContract()
      .methods.redeem(userAddress, toRoya(royaAmount))
      .send({ from: userAddress })
      .on("transactionHash", (hash: string) => {
        console.log("transactionHash redeem", hash);
      })
      .on("receipt", (receipt: string) => {
        console.log("receipt redeem", receipt);
        dispatch(royaReserveUnstakeSuccess());
        dispatch(getRoyaReserveStakeBalance(userAddress));
        dispatch(getRoyaBalance(userAddress));
        dispatch(getRoyaRewards());
      })
      .on("error", (error: any) => {
        console.log("error redeem", error);
        dispatch(royaReserveUnstakeFailure());
      });
  };

const getCoolDownStatusSuccess = (status: number) => ({
  type: GET_COOLDOWN_STATUS_SUCCESS,
  status,
});

export const getCoolDownStatus = () => async (dispatch: any, getState: any) => {
  const { walletConnected, userAddress } = getState().user;

  if (walletConnected) {
    try {
      const response = await getRoyaReserveContract()
        .methods.getStakersCooldowns(userAddress)
        .call();

      dispatch(getCoolDownStatusSuccess(response));
    } catch (e) {
      console.log("error in get cool down status ", e);
    }
  }
};

const stakesCooldownSuccess = (stakersCooldown: number) => ({
  type: STAKERS_COOLDOWN_SUCCESS,
  stakersCooldown,
});

export const getStakerCooldown =
  (userAddress: string) => async (dispatch: any) => {
    try {
      const response = await getRoyaReserveContract()
        .methods.stakersCooldowns(userAddress)
        .call();

      dispatch(stakesCooldownSuccess(parseFloat(response)));
    } catch (e) {
      console.log("error in get stakers cooldown ", e);
    }
  };

const getTotalStakedRoyaSuccess = (totalRoyaStaked: string) => ({
  type: GET_TOTAL_STAKED_ROYA_SUCCESS,
  totalRoyaStaked,
});

export const getTotalStakedRoya = () => async (dispatch: any) => {
  try {
    const totalRoyaStaked = await getRoyaReserveContract()
      .methods.totalSupply()
      .call();

    dispatch(getTotalStakedRoyaSuccess(totalRoyaStaked));
  } catch (e) {
    console.log("error in get total staked roya", e);
  }
};
