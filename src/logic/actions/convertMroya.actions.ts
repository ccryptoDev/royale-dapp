import { getMroyaBalance } from "./user.actions";
import {
  getRoyaReserveStakeBalance,
  getRoyaBalance,
} from "./royaReserve.actions";
import {
  getMroyaTokenContract,
  getSwapTokenContract,
  getTokenSwapContractAddress,
  SwapProcess,
  toMroya,
} from "../../utils";
import {
  SWAP_MROYA_TOKEN_START,
  SWAP_MROYA_TOKEN_SUCCESS,
  SWAP_MROYA_TOKEN_FAILURE,
} from "./constant";

const swapMroyaTokenStart = (process: number) => ({
  type: SWAP_MROYA_TOKEN_START,
  process,
});

const swapMroyaTokenSuccess = () => ({
  type: SWAP_MROYA_TOKEN_SUCCESS,
});

const swapMroyaTokenFailure = () => ({
  type: SWAP_MROYA_TOKEN_FAILURE,
});

export const swapMroyaToken =
  (userAddress: string, mroyaAmount: string, stakeRoya: boolean) =>
  async (dispatch: any) => {

    dispatch(
      swapMroyaTokenStart(
        stakeRoya ? SwapProcess.stakeRoya : SwapProcess.inWallet
      )
    );

    const approvedAmount = await getMroyaTokenContract()
      .methods.allowance(userAddress, getTokenSwapContractAddress())
      .call();

    if (approvedAmount === "0") {
      getMroyaTokenContract()
        .methods.approve(getTokenSwapContractAddress(), toMroya(mroyaAmount))
        .send({ from: userAddress })
        .on("transactionHash", (hash: string) => {
          console.log("transaction hash approve mroya token ", hash);
        })
        .on("receipt", (receipt: string) => {
          console.log("receipt approve mroya token ", receipt);
          dispatch(getMroyaBalance(userAddress));
        })
        .on("error", (error: string) => {
          console.log("error approve mroya token ", error);
          dispatch(swapMroyaTokenFailure());
        })
        .then(() => {
          getSwapTokenContract()
            .methods.swapTokens(toMroya(mroyaAmount), stakeRoya)
            .send({
              from: userAddress,
            })
            .on("transactionHash", (hash: string) => {
              console.log("transaction hash swap mroya token ", hash);
            })
            .on("receipt", (receipt: string) => {
              console.log("receipt stake swap mroya token ", receipt);
              dispatch(getMroyaBalance(userAddress));
              dispatch(getRoyaReserveStakeBalance(userAddress));
              dispatch(getRoyaBalance(userAddress));
              dispatch(swapMroyaTokenSuccess());
            })
            .on("error", (error: string) => {
              console.log("error in swap mroya token ", error);
              dispatch(swapMroyaTokenFailure());
            });
        });
    } else {
      getSwapTokenContract()
        .methods.swapTokens(approvedAmount, stakeRoya)
        .send({
          from: userAddress,
        })
        .on("transactionHash", (hash: string) => {
          console.log("transaction hash swap mroya token ", hash);
        })
        .on("receipt", (receipt: string) => {
          console.log("receipt stake swap mroya token ", receipt);
          dispatch(getMroyaBalance(userAddress));
          dispatch(swapMroyaTokenSuccess());
          dispatch(getRoyaReserveStakeBalance(userAddress));
          dispatch(getRoyaBalance(userAddress));
        })
        .on("error", (error: string) => {
          console.log("error in swap mroya token ", error);
          dispatch(swapMroyaTokenFailure());
        });
    }
  };
