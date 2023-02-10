import {
  STAKE_RTP_START,
  STAKE_RTP_SUCCESS,
  STAKE_RTP_FAILURE,
  UNSTAKE_RTP_START,
  UNSTAKE_RTP_SUCCESS,
  UNSTAKE_RTP_FAILURE,
  CLAIM_MROYA_START,
  CLAIM_MROYA_SUCCESS,
  CLAIM_MROYA_FAILURE,
  GET_USER_RPT,
  GET_USER_STAKED_RPT,
  GET_USER_RPT_REWARD,
  SWITCH_RPT_STAKE_STEP,
  SWITCH_RPT_UNSTAKE_STEP,
  GET_TOTAL_RPT_SUPPLY_SUCCESS,
  GET_RPT_SUPPLY_SUCCESS,
  getRoyaBalance,
} from "../actions";
import {
  toRtp,
  LockRptSteps,
  UnlockRptSteps,
  fromRtp,
  getRptStakingContract,
  getRptTokenContract,
  getRptStakingContractAddress,
} from "../../utils";
import { getMroyaBalance } from "./user.actions";

const getUserRptSuccess = (userBalance: string) => ({
  type: GET_USER_RPT,
  userBalance,
});

const getUserStakedRptSuccess = (userStakedBalance: string) => ({
  type: GET_USER_STAKED_RPT,
  userStakedBalance,
});

const getRptRewardsSuccess = (rewardBalance: string) => ({
  type: GET_USER_RPT_REWARD,
  rewardBalance,
});

export const getUserRpt = (userAddress: string) => async (dispatch: any) => {
  try {
    const balance = await getRptTokenContract()
      .methods.balanceOf(userAddress)
      .call();

    dispatch(getUserRptSuccess(balance));
  } catch (e) {
    console.log("error in get user rpt ", e);
  }
};

export const getUserStakedRpt =
  (userAddress: string) => async (dispatch: any) => {
    try {
      const balance = await getRptStakingContract()
        .methods.balanceOf(userAddress)
        .call();

      dispatch(getUserStakedRptSuccess(balance));
    } catch (e) {
      console.log("error in get user staked rpt ", e);
    }
  };

export const getRptRewards = () => async (dispatch: any, getState: any) => {
  const { walletConnected, userAddress } = getState().user;

  if (walletConnected) {
    try {
      const rewardsBalance = await getRptStakingContract()
        .methods.earned(userAddress)
        .call();

      dispatch(getRptRewardsSuccess(rewardsBalance));
    } catch (e) {
      console.log("error in get staked rpt rewards balance ", e);
    }
  }
};

const stakeRptStart = () => ({
  type: STAKE_RTP_START,
});

const stakeRptSuccess = (stakeRptAmount: string) => ({
  type: STAKE_RTP_SUCCESS,
  stakeRptAmount,
});

const stakeRptFailure = () => ({
  type: STAKE_RTP_FAILURE,
});

export const switchRptStakeStep = (step: number) => ({
  type: SWITCH_RPT_STAKE_STEP,
  step,
});

export const stakeRpt =
  (userAddress: string, rptAmount: string) => async (dispatch: any) => {
    dispatch(stakeRptStart());

    const approvedAmount = await getRptTokenContract()
      .methods.allowance(userAddress, getRptStakingContractAddress())
      .call();

    if (approvedAmount === "0") {
      getRptTokenContract()
        .methods.approve(getRptStakingContractAddress(), toRtp(rptAmount))
        .send({
          from: userAddress,
        })
        .on("transactionHash", (hash: string) => {
          console.log("transaction hash stake rpt approve ", hash);
        })
        .on("receipt", (receipt: string) => {
          console.log("receipt stake rpt approve ", receipt);
        })
        .on("error", (error: any) => {
          console.log("error in stake rpt approve ", error);
          dispatch(stakeRptFailure());
        })
        .then(() => {
          getRptStakingContract()
            .methods.stake(toRtp(rptAmount))
            .send({
              from: userAddress,
            })
            .on("transactionHash", (hash: string) => {
              console.log("transaction hash stake rpt stake ", hash);
            })
            .on("receipt", (receipt: string) => {
              console.log("receipt stake rpt stake ", receipt);
              dispatch(stakeRptSuccess(rptAmount));
              dispatch(getUserRpt(userAddress));
              dispatch(getUserStakedRpt(userAddress));
              dispatch(getRptRewards());
              dispatch(switchRptStakeStep(LockRptSteps.success));
            })
            .on("error", (error: string) => {
              console.log("error in stake rpt stake ", error);
              dispatch(stakeRptFailure());
            });
        });
    } else {
      getRptStakingContract()
        .methods.stake(approvedAmount)
        .send({
          from: userAddress,
        })
        .on("transactionHash", (hash: string) => {
          console.log("transaction hash stake rpt stake ", hash);
        })
        .on("receipt", (receipt: string) => {
          console.log("receipt stake rpt stake ", receipt);
          dispatch(stakeRptSuccess(fromRtp(approvedAmount)));
          dispatch(getUserRpt(userAddress));
          dispatch(getUserStakedRpt(userAddress));
          dispatch(getRptRewards());
          dispatch(switchRptStakeStep(LockRptSteps.success));
        })
        .on("error", (error: string) => {
          console.log("error in stake rpt stake ", error);
          dispatch(stakeRptFailure());
        });
    }
  };

const unstakeRptStart = () => ({
  type: UNSTAKE_RTP_START,
});

const unstakeRptSuccess = (unStakeRptAmount: string) => ({
  type: UNSTAKE_RTP_SUCCESS,
  unStakeRptAmount,
});

const unstakeRptFailure = () => ({
  type: UNSTAKE_RTP_FAILURE,
});

export const switchRptUnstakeStep = (page: number) => ({
  type: SWITCH_RPT_UNSTAKE_STEP,
  page,
});

export const unstakeRpt =
  (userAddress: string, rptAmount: string) => (dispatch: any) => {
    dispatch(unstakeRptStart());

    getRptStakingContract()
      .methods.withdraw(toRtp(rptAmount))
      .send({
        from: userAddress,
      })
      .on("transactionHash", (hash: string) => {
        console.log("transaction hash unstake rpt ", hash);
      })
      .on("receipt", (receipt: string) => {
        console.log("receipt unstake rpt ", receipt);
        dispatch(unstakeRptSuccess(rptAmount));
        dispatch(getRptRewards());
        dispatch(getUserRpt(userAddress));
        dispatch(getUserStakedRpt(userAddress));
        dispatch(switchRptUnstakeStep(UnlockRptSteps.success));
      })
      .on("error", (error: any) => {
        console.log("error in unstake rpt ", error);
        dispatch(unstakeRptFailure());
      });
  };

const claimRptRewardStart = () => ({
  type: CLAIM_MROYA_START,
});

const claimRptRewardSuccess = () => ({
  type: CLAIM_MROYA_SUCCESS,
});

const claimRptRewardFailure = () => ({
  type: CLAIM_MROYA_FAILURE,
});

export const claimRptReward = (userAddress: string) => (dispatch: any) => {
  dispatch(claimRptRewardStart());

  getRptStakingContract()
    .methods.getReward()
    .send({
      from: userAddress,
    })
    .on("transactionHash", (hash: string) => {
      console.log("transaction hash claim rpt reward ", hash);
    })
    .on("receipt", (receipt: string) => {
      console.log("receipt claim rpt reward ", receipt);
      dispatch(claimRptRewardSuccess());
      dispatch(getRptRewards());
      dispatch(getMroyaBalance(userAddress));
      dispatch(getRoyaBalance(userAddress))
    })
    .on("error", (error: any) => {
      console.log("error in claim rpt reward ", error);
      dispatch(claimRptRewardFailure());
    });
};

const getTotalStakedRptSupplySuccess = (totalRptSupply: string) => ({
  type: GET_TOTAL_RPT_SUPPLY_SUCCESS,
  totalRptSupply,
});

export const getTotalStakedRptSupply = () => async (dispatch: any) => {
  try {
    const totalSupply = await getRptStakingContract()
      .methods.totalSupply()
      .call();

    dispatch(getTotalStakedRptSupplySuccess(fromRtp(totalSupply)));
  } catch (e) {
    console.log("error in get rpt staked by everyone");
  }
};

const getRptSupplySuccess = (rptSupply: string) => ({
  type: GET_RPT_SUPPLY_SUCCESS,
  rptSupply,
});

export const getTotalRptSupply = () => async (dispatch: any) => {
  try {
    const totalRptSupply = await getRptTokenContract()
      .methods.totalSupply()
      .call();

    console.log("total rpt supply ", fromRtp(totalRptSupply));

    dispatch(getRptSupplySuccess(totalRptSupply));
  } catch (e) {
    console.log("error in get total rpt supply");
  }
};
