import axios from "axios";
import {
  setTokenIndex,
  fromRtp,
  setStakeAmount,
  setStakeContract,
  setTokenAmount,
  toRtp,
  WithdrawSteps,
  fromUsdt,
  fromUsdc,
  fromDai,
  getApiEndpoint,
  getRoyaleLpContract,
  getRoyaleLpContractAddress,
  getFetchBalancesRequest,
  getClaimableBalanceRequest,
  fromBusd,
  getRoyaleLpLiquidityRequest,
} from "../../utils";
import { getUserRpt } from "../actions";
import {
  STAKE_START,
  STAKE_SUCCESS,
  STAKE_SEND_START,
  STAKE_SEND_SUCCESS,
  STAKE_SEND_FAILURE,
  STAKE_APPROVE_START,
  STAKE_APPROVE_SUCCESS,
  STAKE_APPROVE_FAILURE,
  WITHDRAW_TOKEN_START,
  WITHDRAW_TOKEN_SUCCESS,
  WITHDRAW_TOKEN_FAILURE,
  FETCH_LIQUIDITY_PROVIDER_SUCCESS,
  UPDATE_DAI_BALANCE,
  UPDATE_USDC_BALANCE,
  UPDATE_USDT_BALANCE,
  FETCH_LIQUID_RPT_SUCCESS,
  SWITCH_WITHDRAW_STEP,
  GET_CONTRIBUTION_DYNAMICS_SUCCESS,
  CLAIM_TOKENS_START,
  CLAIM_TOKENS_FAILURE,
  CLAIM_TOKENS_SUCCESS,
  GET_ISCLAIMABLE_SUCCESS,
  GET_CLAIMABLE_BALANCE_SUCCESS,
  GET_ROYALE_LIQUID_SUCCESS,
  GET_RPT_TO_USD_SUCCESS,
  UPDATE_BUSD_BALANCE,
} from "./constant";

interface StakeProps {
  tokenAmount: string;
  token: string;
  rptAmount: string;
}

export const stakeStart = (payload: StakeProps) => {
  return {
    type: STAKE_START,
    payload,
  };
};

export const stakeSuccess = () => {
  return {
    type: STAKE_SUCCESS,
  };
};

export const stakeApproveStart = () => {
  return {
    type: STAKE_APPROVE_START,
  };
};

export const stakeApproveSuccess = () => {
  return {
    type: STAKE_APPROVE_SUCCESS,
  };
};

export const stakeApproveFailure = () => {
  return {
    type: STAKE_APPROVE_FAILURE,
  };
};

export const stakeSendStart = (transactionId: string) => {
  return {
    type: STAKE_SEND_START,
    transactionId,
  };
};

export const stakeSendSuccess = () => {
  return {
    type: STAKE_SEND_SUCCESS,
  };
};

export const stakeSendFailure = () => {
  return {
    type: STAKE_SEND_FAILURE,
  };
};

export const getContributionDynamicsSuccess = (payload: Array<any>) => ({
  type: GET_CONTRIBUTION_DYNAMICS_SUCCESS,
  payload,
});

export const getContributionDynamics =
  (userAddress: string) => async (dispatch: any) => {
    try {
      const response = await axios.get(
        `${getApiEndpoint()}/getByAddress/${userAddress}`
      );

      dispatch(getContributionDynamicsSuccess(response.data));
    } catch (e) {
      console.log("error inside get contribution dynamics ", e);
    }
  };

interface LiquidityProvider {
  userLiquidity?: string;
  lockedValue?: string;
  mRoyaPerDay?: string;
  optimiserLiquidity?: string;
  liquidityInIgaming?: string;
  totalLiquidityToIgaming?: string;
  providersLiquidity?: string;
}

const updateLiquidityProvider = (payload: LiquidityProvider) => {
  return {
    type: FETCH_LIQUIDITY_PROVIDER_SUCCESS,
    payload,
  };
};

export const fetchLiquidityData = () => async (dispatch: any) => {
  try {
    const requests = [
      getRoyaleLpContract().methods.YieldPoolBalance().call(),
      getRoyaleLpContract().methods.loanGiven().call(),
      getRoyaleLpContract().methods.liquidityProvidersAPY().call(),
    ];

    const responses = await Promise.all(requests);

    dispatch(
      updateLiquidityProvider({
        optimiserLiquidity: fromRtp(responses[0]),
        liquidityInIgaming: fromRtp(responses[1]),
        totalLiquidityToIgaming: "0",
        providersLiquidity: fromRtp(responses[2]),
      })
    );
  } catch (e) {
    console.log("error in fetch liquidity data ", e);
  }
};

export const stakeToken =
  (token: string, amount: string, userAddress: string) =>
  async (dispatch: any) => {
    const contract = setStakeContract(token);

    dispatch(stakeApproveStart());

    const approvedBalance = await contract.methods
      .allowance(userAddress, getRoyaleLpContractAddress())
      .call();

    if (approvedBalance === "0") {
      contract.methods
        .approve(getRoyaleLpContractAddress(), setStakeAmount(token, amount))
        .send({
          from: userAddress,
        })
        .on("transactionHash", (hash: string) => {
          console.log("transactionHash approve ", hash);
        })
        .on("receipt", (receipt: string) => {
          console.log("receipt approve", receipt);
          dispatch(stakeApproveSuccess());
        })
        .on("error", (error: any) => {
          console.log("error approve", error);
          dispatch(stakeApproveFailure());
        })
        .then(() => {
          getRoyaleLpContract()
            .methods.supply(setTokenAmount(token, amount), setTokenIndex(token))
            .send({
              from: userAddress,
            })
            .on("transactionHash", (hash: string) => {
              console.log("transactionHash supply ", hash);
              dispatch(stakeSendStart(hash));
            })
            .on("receipt", (receipt: any) => {
              console.log("receipt supply", receipt);
              dispatch(stakeSendSuccess());
              dispatch(fetchBalances(userAddress));
              dispatch(fetchLiquidityData());
              dispatch(getUserRpt(userAddress));
              dispatch(getContributionDynamics(userAddress));
              dispatch(getRoyaleLpLiquidity());
              dispatch(calcRptToUsd(userAddress));
            })
            .on("error", (error: any) => {
              console.log("error supply", error);
              dispatch(stakeSendFailure());
            });
        });
    } else {
      getRoyaleLpContract()
        .methods.supply(approvedBalance, setTokenIndex(token))
        .send({
          from: userAddress,
        })
        .on("transactionHash", (hash: string) => {
          console.log("transactionHash supply ", hash);
          dispatch(stakeSendStart(hash));
        })
        .on("receipt", (receipt: any) => {
          console.log("receipt supply", receipt);
          dispatch(stakeSendSuccess());
          dispatch(fetchBalances(userAddress));
          dispatch(fetchLiquidityData());
          dispatch(getUserRpt(userAddress));
          dispatch(getContributionDynamics(userAddress));
          dispatch(getRoyaleLpLiquidity());
          dispatch(calcRptToUsd(userAddress));
        })
        .on("error", (error: any) => {
          console.log("error supply", error);
          dispatch(stakeSendFailure());
        });
    }
  };

export const withdrawTokenStart = (token: string, equivalent: string) => {
  return {
    type: WITHDRAW_TOKEN_START,
    token,
    equivalent,
  };
};

export const withdrawTokenSuccess = (
  rptAmount: string,
  withdrawTxId: string
) => {
  return {
    type: WITHDRAW_TOKEN_SUCCESS,
    rptAmount,
    withdrawTxId,
  };
};

export const withdrawTokenFailure = () => {
  return {
    type: WITHDRAW_TOKEN_FAILURE,
  };
};

export const switchWithdrawStep = (step: number) => {
  return {
    type: SWITCH_WITHDRAW_STEP,
    step,
  };
};

export const withdrawToken =
  (token: string, rptAmount: string, userAddress: string, equivalent: string) =>
  (dispatch: any) => {
    dispatch(withdrawTokenStart(token, equivalent));

    getRoyaleLpContract()
      .methods.requestWithdrawWithRPT(toRtp(rptAmount), setTokenIndex(token))
      .send({
        from: userAddress,
      })
      .on("transactionHash", (hash: string) => {
        console.log("transactionHash withdrawToken ", hash);
      })
      .on("receipt", (receipt: any) => {
        console.log("receipt withdrawToken", receipt);
        dispatch(fetchBalances(userAddress));
        dispatch(fetchLiquidityData());
        dispatch(withdrawTokenSuccess(rptAmount, receipt.transactionHash));
        dispatch(getUserRpt(userAddress));
        dispatch(fetchLiquidRpt(userAddress));
        dispatch(switchWithdrawStep(WithdrawSteps.success));
        dispatch(getContributionDynamics(userAddress));
        dispatch(getRoyaleLpLiquidity());
        dispatch(calcRptToUsd(userAddress));
      })
      .on("error", (error: any) => {
        console.log("error withdrawToken", error);
        dispatch(withdrawTokenFailure());
      });
  };

export const updateUsdcBalance = (usdcBalance: string) => {
  return {
    type: UPDATE_USDC_BALANCE,
    usdcBalance,
  };
};

export const updateUsdtBalance = (usdtBalance: string) => {
  return {
    type: UPDATE_USDT_BALANCE,
    usdtBalance,
  };
};

export const updateDaiBalance = (daiBalance: string) => {
  return {
    type: UPDATE_DAI_BALANCE,
    daiBalance,
  };
};

const updateBusdBalance = (busdBalance: string) => ({
  type: UPDATE_BUSD_BALANCE,
  busdBalance,
});

export const fetchBalances = (userAddress: string) => async (dispatch: any) => {
  try {
    const responses = await Promise.all(getFetchBalancesRequest(userAddress));

    const [usdtBalance, usdcBalance, daiBalance, busdBalance] = responses;

    dispatch(updateUsdtBalance(usdtBalance));
    dispatch(updateUsdcBalance(usdcBalance));
    dispatch(updateDaiBalance(daiBalance));
    dispatch(updateBusdBalance(!!busdBalance ? busdBalance : "0"));
  } catch (e) {
    console.log("something went wrong in fetching balances ", e);
  }
};

const fetchLiquidRptSuccess = (availableLiquidRpt: string) => ({
  type: FETCH_LIQUID_RPT_SUCCESS,
  availableLiquidRpt,
});

export const fetchLiquidRpt =
  (userAddress: string) => async (dispatch: any) => {
    try {
      const availableLiquidRpt = await getRoyaleLpContract()
        .methods.availableLiquidity(userAddress, 0, true)
        .call();

      console.log("availableLiquidRpt ", availableLiquidRpt.RPT);

      dispatch(fetchLiquidRptSuccess(fromRtp(availableLiquidRpt.RPT)));
    } catch (e) {
      console.log("error in fetch liquid rpt ", e);
    }
  };

const claimTokensStart = () => ({
  type: CLAIM_TOKENS_START,
});

const claimTokensSuccess = () => ({
  type: CLAIM_TOKENS_SUCCESS,
});

const claimTokensFailure = () => ({
  type: CLAIM_TOKENS_FAILURE,
});

export const claimTokens = (userAddress: string) => (dispatch: any) => {
  dispatch(claimTokensStart());

  getRoyaleLpContract()
    .methods.claimTokens()
    .send({
      from: userAddress,
    })
    .on("transactionHash", (hash: string) => {
      console.log("transactionHash claim tokens ", hash);
    })
    .on("receipt", (receipt: any) => {
      console.log("receipt claim tokens ", receipt);
      dispatch(fetchBalances(userAddress));
      dispatch(claimTokensSuccess());
      dispatch(getIsClaimable(userAddress));
      dispatch(getClaimableBalance(userAddress));
      dispatch(getContributionDynamics(userAddress));
    })
    .on("error", (error: any) => {
      console.log("error claim tokens ", error);
      dispatch(claimTokensFailure());
    });
};

const getIsClaimableSuccess = (isClaimable: boolean) => ({
  type: GET_ISCLAIMABLE_SUCCESS,
  isClaimable,
});

export const getIsClaimable =
  (userAddress: string) => async (dispatch: any) => {
    try {
      const isClaimable = await getRoyaleLpContract()
        .methods.reserveRecipients(userAddress)
        .call();

      dispatch(getIsClaimableSuccess(isClaimable));

      console.log("getIsClaimable ", isClaimable);
    } catch (e) {
      console.log("error in get is claimable ", e);
    }
  };

const getClaimableBalanceSuccess = (
  claimableDai: string,
  claimableUsdc: string,
  claimableUsdt: string,
  claimableBusd: string
) => ({
  type: GET_CLAIMABLE_BALANCE_SUCCESS,
  claimableDai,
  claimableUsdc,
  claimableUsdt,
  claimableBusd,
});

export const getClaimableBalance =
  (userAddress: string) => async (dispatch: any) => {
    try {
      const responses = await Promise.all(
        getClaimableBalanceRequest(userAddress)
      );

      const [claimableDai, claimableUsdc, claimableUsdt, claimableBusd] =
        responses;

      dispatch(
        getClaimableBalanceSuccess(
          fromDai(claimableDai),
          fromUsdc(claimableUsdc),
          fromUsdt(claimableUsdt),
          fromBusd(!!claimableBusd ? claimableBusd : "0")
        )
      );
    } catch (e) {
      console.log("error in get claimable balance ", e);
    }
  };

export const getRoyaleLpLiquiditySuccess = (
  royaleLiquidDai: string,
  royaleLiquidUsdc: string,
  royaleLiquidUsdt: string,
  royaleLiquidBusd: string
) => ({
  type: GET_ROYALE_LIQUID_SUCCESS,
  royaleLiquidDai,
  royaleLiquidUsdc,
  royaleLiquidUsdt,
  royaleLiquidBusd,
});

export const getRoyaleLpLiquidity = () => async (dispatch: any) => {
  try {
    const responses = await Promise.all(getRoyaleLpLiquidityRequest());

    const [liquidDai, liquidUsdc, liquidUsdt, liuidBusd] = responses;

    dispatch(
      getRoyaleLpLiquiditySuccess(
        fromDai(liquidDai),
        fromUsdc(liquidUsdc),
        fromUsdt(liquidUsdt),
        fromBusd(!!liuidBusd ? liuidBusd : "0")
      )
    );
  } catch (e) {
    console.log("error in get royale lp liquidity ", e);
  }
};

const getRptToUsdSuccess = (rptToUsd: number) => ({
  type: GET_RPT_TO_USD_SUCCESS,
  rptToUsd,
});

export const calcRptToUsd = (userAddress: string) => async (dispatch: any) => {
  try {
    const { data } = await axios.get(
      `${getApiEndpoint()}/totalRPTAmount/${userAddress}`
    );

    if (!isNaN(data)) {
      dispatch(getRptToUsdSuccess(data));
    }
  } catch (e) {
    console.log("error calc rpt to usdt ", e);
  }
};
