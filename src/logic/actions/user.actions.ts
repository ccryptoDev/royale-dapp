import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  GET_ETH_BALANCE_SUCCESS,
  GET_MROYA_BALANCE_SUCCESS,
} from "./constant";
import wallet from "../../utils/wallet";
import { fromEth, Networks } from "../../utils";
import { getMroyaTokenContract } from "../../utils";

interface User {
  address: string;
}

export const login = (user: User, network: string) => {
  return {
    type: LOGIN_SUCCESS,
    address: user.address,
    network,
  };
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const getEthBalanceSuccess = (ethBalance: string) => {
  return {
    type: GET_ETH_BALANCE_SUCCESS,
    ethBalance,
  };
};

export const getEthBalance = (userAddress: string) => async (dispatch: any) => {
  try {
    const balance = await wallet.web3.eth.getBalance(userAddress);

    dispatch(getEthBalanceSuccess(fromEth(balance)));
  } catch (e) {
    console.log("error in get eth balance ", e);
  }
};

const getMroyaBalanceSuccess = (mRoyaBalance: string) => {
  return {
    type: GET_MROYA_BALANCE_SUCCESS,
    mRoyaBalance,
  };
};

export const getMroyaBalance =
  (userAddress: string) => async (dispatch: any, getState: () => any) => {
    const { network } = getState().user;

    if (network === Networks.ropsten || network === Networks.mainnet) {
      try {
        const balance = await getMroyaTokenContract()
          .methods.balanceOf(userAddress)
          .call();

        dispatch(getMroyaBalanceSuccess(balance));
      } catch (e) {
        console.log("error in get mRoya balance ", e);
      }
    }
  };
