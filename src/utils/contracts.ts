import store from "../logic/reducers";
import wallet from "./wallet";
import { getContractAddress, ContractAddress } from "./address";
import { Networks } from "./constants";
const usdcAbi = require("./abis/usdc.json");
const royaleLp = require("./abis/royalelp.json");
const royaleLpBinanceAbi = require("./abis/royaleLpBinance.json");
const usdtAbi = require("./abis/usdt.json");
const daiAbi = require("./abis/dai.json");
const rptokenAbi = require("./abis/rptoken.json");
const rptStakingAbi = require("./abis/rptStaking.json");
const royaTokenAbi = require("./abis/royaToken.json");
const royaReserveAbi = require("./abis/royaReserve.json");
const allStakingLotsAbi = require("./abis/allStakingLots.json");
const royaNftAbi = require("./abis/royaNft.json");
const bscTokenAbi = require("./abis/bscToken.json");
const mRoyaTestnetAbi = require("./abis/mRoyaTestnet.json");
const mRoyaMainnetAbi = require("./abis/mRoyaMainnet.json");
const swapTokenAbi = require("./abis/swapToken.json");

export const usdcContract = new wallet.web3.eth.Contract(
  usdcAbi["abi"],
  getContractAddress().mUsdc
);

export const usdtContract = new wallet.web3.eth.Contract(
  usdtAbi["abi"],
  getContractAddress().mUsdt
);

export const daiContract = new wallet.web3.eth.Contract(
  daiAbi["abi"],
  getContractAddress().mDai
);

export const royaleLpContract = new wallet.web3.eth.Contract(
  royaleLp["abi"],
  getContractAddress().royaleLP
);

export const rptTokenContract = new wallet.web3.eth.Contract(
  rptokenAbi["abi"],
  getContractAddress().rpToken
);

export const rptStakingContract = new wallet.web3.eth.Contract(
  rptStakingAbi["abi"],
  getContractAddress().rptStaking
);

export const royaTokenContract = new wallet.web3.eth.Contract(
  royaTokenAbi["abi"],
  getContractAddress().royaToken
);

export const royReserveContract = new wallet.web3.eth.Contract(
  royaReserveAbi["abi"],
  getContractAddress().royaReserve
);

export const queenLotContract = new wallet.web3.eth.Contract(
  allStakingLotsAbi["abi"],
  getContractAddress().queenLot
);

export const kingLotContract = new wallet.web3.eth.Contract(
  allStakingLotsAbi["abi"],
  getContractAddress().kingLot
);

export const flushLotContract = new wallet.web3.eth.Contract(
  allStakingLotsAbi["abi"],
  getContractAddress().royaleFlushLot
);

export const royaNftContract = new wallet.web3.eth.Contract(
  royaNftAbi["abi"],
  getContractAddress().royaNFT
);

export const getDaiContract = () => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.ropsten:
      return new wallet.web3.eth.Contract(
        daiAbi["abi"],
        ContractAddress.ropsten.mDai
      );

    case Networks.mainnet:
      return new wallet.web3.eth.Contract(
        daiAbi["abi"],
        ContractAddress.mainnet.mDai
      );

    case Networks.bscTestnet:
      return new wallet.web3.eth.Contract(
        bscTokenAbi["abi"],
        ContractAddress.bscTestnet.mDai
      );

    case Networks.bscMainnet:
      return new wallet.web3.eth.Contract(
        bscTokenAbi["abi"],
        ContractAddress.bscMainnet.mDai
      );

    case Networks.maticTestnet:
      return new wallet.web3.eth.Contract(
        daiAbi["abi"],
        ContractAddress.maticTestnet.mDai
      );

    case Networks.maticMainnet:
      return new wallet.web3.eth.Contract(
        daiAbi["abi"],
        ContractAddress.maticMainnet.mDai
      );

    default:
      return new wallet.web3.eth.Contract(
        daiAbi["abi"],
        ContractAddress.mainnet.mDai
      );
  }
};

export const getUsdcContract = () => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.ropsten:
      return new wallet.web3.eth.Contract(
        usdcAbi["abi"],
        ContractAddress.ropsten.mUsdc
      );

    case Networks.mainnet:
      return new wallet.web3.eth.Contract(
        usdcAbi["abi"],
        ContractAddress.mainnet.mUsdc
      );

    case Networks.bscTestnet:
      return new wallet.web3.eth.Contract(
        bscTokenAbi["abi"],
        ContractAddress.bscTestnet.mUsdc
      );

    case Networks.bscMainnet:
      return new wallet.web3.eth.Contract(
        bscTokenAbi["abi"],
        ContractAddress.bscMainnet.mUsdc
      );

    case Networks.maticTestnet:
      return new wallet.web3.eth.Contract(
        usdcAbi["abi"],
        ContractAddress.maticTestnet.mUsdc
      );

    case Networks.maticMainnet:
      return new wallet.web3.eth.Contract(
        usdcAbi["abi"],
        ContractAddress.maticMainnet.mUsdc
      );

    default:
      return new wallet.web3.eth.Contract(
        usdcAbi["abi"],
        ContractAddress.mainnet.mUsdc
      );
  }
};

export const getUsdtContract = () => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.ropsten:
      return new wallet.web3.eth.Contract(
        usdtAbi["abi"],
        ContractAddress.ropsten.mUsdt
      );

    case Networks.mainnet:
      return new wallet.web3.eth.Contract(
        usdtAbi["abi"],
        ContractAddress.mainnet.mUsdt
      );

    case Networks.bscTestnet:
      return new wallet.web3.eth.Contract(
        bscTokenAbi["abi"],
        ContractAddress.bscTestnet.mUsdt
      );

    case Networks.bscMainnet:
      return new wallet.web3.eth.Contract(
        bscTokenAbi["abi"],
        ContractAddress.bscMainnet.mUsdt
      );

    case Networks.maticTestnet:
      return new wallet.web3.eth.Contract(
        usdtAbi["abi"],
        ContractAddress.maticTestnet.mUsdt
      );

    case Networks.maticMainnet:
      return new wallet.web3.eth.Contract(
        usdtAbi["abi"],
        ContractAddress.maticMainnet.mUsdt
      );

    default:
      return new wallet.web3.eth.Contract(
        usdtAbi["abi"],
        ContractAddress.mainnet.mUsdt
      );
  }
};

export const getBusdContract = () => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.bscTestnet:
      return new wallet.web3.eth.Contract(
        bscTokenAbi["abi"],
        ContractAddress.bscTestnet.busd
      );

    case Networks.bscMainnet:
      return new wallet.web3.eth.Contract(
        bscTokenAbi["abi"],
        ContractAddress.bscMainnet.busd
      );

    default:
      return new wallet.web3.eth.Contract(
        bscTokenAbi["abi"],
        ContractAddress.bscMainnet.busd
      );
  }
};

export const getRoyaleLpContract = () => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.ropsten:
      return new wallet.web3.eth.Contract(
        royaleLp["abi"],
        ContractAddress.ropsten.royaleLP
      );

    case Networks.mainnet:
      return new wallet.web3.eth.Contract(
        royaleLp["abi"],
        ContractAddress.mainnet.royaleLP
      );

    case Networks.bscTestnet:
      return new wallet.web3.eth.Contract(
        royaleLpBinanceAbi["abi"],
        ContractAddress.bscTestnet.royaleLP
      );

    case Networks.bscMainnet:
      return new wallet.web3.eth.Contract(
        royaleLpBinanceAbi["abi"],
        ContractAddress.bscMainnet.royaleLP
      );

    case Networks.maticTestnet:
      return new wallet.web3.eth.Contract(
        royaleLp["abi"],
        ContractAddress.maticTestnet.royaleLP
      );

    case Networks.maticMainnet:
      return new wallet.web3.eth.Contract(
        royaleLp["abi"],
        ContractAddress.maticMainnet.royaleLP
      );

    default:
      return new wallet.web3.eth.Contract(
        royaleLp["abi"],
        ContractAddress.mainnet.royaleLP
      );
  }
};

export const getRptTokenContract = () => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.ropsten:
      return new wallet.web3.eth.Contract(
        rptokenAbi["abi"],
        ContractAddress.ropsten.rpToken
      );

    case Networks.mainnet:
      return new wallet.web3.eth.Contract(
        rptokenAbi["abi"],
        ContractAddress.mainnet.rpToken
      );

    case Networks.bscTestnet:
      return new wallet.web3.eth.Contract(
        rptokenAbi["abi"],
        ContractAddress.bscTestnet.rpToken
      );

    case Networks.bscMainnet:
      return new wallet.web3.eth.Contract(
        rptokenAbi["abi"],
        ContractAddress.bscMainnet.rpToken
      );

    case Networks.maticTestnet:
      return new wallet.web3.eth.Contract(
        rptokenAbi["abi"],
        ContractAddress.maticTestnet.rpToken
      );

    case Networks.maticMainnet:
      return new wallet.web3.eth.Contract(
        rptokenAbi["abi"],
        ContractAddress.maticMainnet.rpToken
      );

    default:
      return new wallet.web3.eth.Contract(
        rptokenAbi["abi"],
        ContractAddress.mainnet.rpToken
      );
  }
};

export const getRptStakingContract = () => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.ropsten:
      return new wallet.web3.eth.Contract(
        rptStakingAbi["abi"],
        ContractAddress.ropsten.rptStaking
      );

    case Networks.mainnet:
      return new wallet.web3.eth.Contract(
        rptStakingAbi["abi"],
        ContractAddress.mainnet.rptStaking
      );

    case Networks.bscTestnet:
      return new wallet.web3.eth.Contract(
        rptStakingAbi["abi"],
        ContractAddress.bscTestnet.rptStaking
      );

    case Networks.bscMainnet:
      return new wallet.web3.eth.Contract(
        rptStakingAbi["abi"],
        ContractAddress.bscMainnet.rptStaking
      );

    case Networks.maticTestnet:
      return new wallet.web3.eth.Contract(
        rptStakingAbi["abi"],
        ContractAddress.maticTestnet.rptStaking
      );

    case Networks.maticMainnet:
      return new wallet.web3.eth.Contract(
        rptStakingAbi["abi"],
        ContractAddress.maticMainnet.rptStaking
      );

    default:
      return new wallet.web3.eth.Contract(
        rptStakingAbi["abi"],
        ContractAddress.mainnet.rptStaking
      );
  }
};

export const getRoyaTokenContract = () => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.ropsten:
      return new wallet.web3.eth.Contract(
        royaTokenAbi["abi"],
        ContractAddress.ropsten.royaToken
      );

    case Networks.mainnet:
      return new wallet.web3.eth.Contract(
        royaTokenAbi["abi"],
        ContractAddress.mainnet.royaToken
      );

    case Networks.bscTestnet:
      return new wallet.web3.eth.Contract(
        royaTokenAbi["abi"],
        ContractAddress.bscTestnet.royaToken
      );

    case Networks.bscMainnet:
      return new wallet.web3.eth.Contract(
        royaTokenAbi["abi"],
        ContractAddress.bscMainnet.royaToken
      );

    case Networks.maticTestnet:
      return new wallet.web3.eth.Contract(
        royaTokenAbi["abi"],
        ContractAddress.maticTestnet.royaToken
      );

    case Networks.maticMainnet:
      return new wallet.web3.eth.Contract(
        royaTokenAbi["abi"],
        ContractAddress.maticMainnet.royaToken
      );

    default:
      return new wallet.web3.eth.Contract(
        royaTokenAbi["abi"],
        ContractAddress.mainnet.royaToken
      );
  }
};

export const getRoyaReserveContract = () => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.ropsten:
      return new wallet.web3.eth.Contract(
        royaReserveAbi["abi"],
        ContractAddress.ropsten.royaReserve
      );

    case Networks.mainnet:
      return new wallet.web3.eth.Contract(
        royaReserveAbi["abi"],
        ContractAddress.mainnet.royaReserve
      );

    case Networks.bscTestnet:
      return new wallet.web3.eth.Contract(
        royaReserveAbi["abi"],
        ContractAddress.bscTestnet.royaReserve
      );

    case Networks.bscMainnet:
      return new wallet.web3.eth.Contract(
        royaReserveAbi["abi"],
        ContractAddress.bscMainnet.royaReserve
      );

    case Networks.maticTestnet:
      return new wallet.web3.eth.Contract(
        royaReserveAbi["abi"],
        ContractAddress.maticTestnet.royaReserve
      );

    case Networks.maticMainnet:
      return new wallet.web3.eth.Contract(
        royaReserveAbi["abi"],
        ContractAddress.maticMainnet.royaReserve
      );

    default:
      return new wallet.web3.eth.Contract(
        royaReserveAbi["abi"],
        ContractAddress.mainnet.royaReserve
      );
  }
};

export const getKingLotContract = () => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.ropsten:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.ropsten.kingLot
      );

    case Networks.mainnet:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.mainnet.kingLot
      );

    case Networks.bscTestnet:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.bscTestnet.kingLot
      );

    case Networks.bscMainnet:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.bscMainnet.kingLot
      );

    case Networks.maticTestnet:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.maticTestnet.kingLot
      );

    case Networks.maticMainnet:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.maticMainnet.kingLot
      );

    default:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.mainnet.kingLot
      );
  }
};

export const getQueenLotContract = () => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.ropsten:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.ropsten.queenLot
      );

    case Networks.mainnet:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.mainnet.queenLot
      );

    case Networks.bscTestnet:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.bscTestnet.queenLot
      );

    case Networks.bscMainnet:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.bscMainnet.queenLot
      );

    case Networks.maticTestnet:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.maticTestnet.queenLot
      );

    case Networks.maticMainnet:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.maticMainnet.queenLot
      );

    default:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.mainnet.queenLot
      );
  }
};

export const getFlushLotContract = () => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.ropsten:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.ropsten.royaleFlushLot
      );

    case Networks.mainnet:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.mainnet.royaleFlushLot
      );

    case Networks.bscTestnet:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.bscTestnet.royaleFlushLot
      );

    case Networks.bscMainnet:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.bscMainnet.royaleFlushLot
      );

    case Networks.maticTestnet:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.maticTestnet.royaleFlushLot
      );

    case Networks.maticMainnet:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.maticMainnet.royaleFlushLot
      );

    default:
      return new wallet.web3.eth.Contract(
        allStakingLotsAbi["abi"],
        ContractAddress.mainnet.royaleFlushLot
      );
  }
};

export const getRoyaNftContract = () => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.ropsten:
      return new wallet.web3.eth.Contract(
        royaNftAbi["abi"],
        ContractAddress.ropsten.royaNFT
      );

    case Networks.mainnet:
      return new wallet.web3.eth.Contract(
        royaNftAbi["abi"],
        ContractAddress.mainnet.royaNFT
      );

    case Networks.bscTestnet:
      return new wallet.web3.eth.Contract(
        royaNftAbi["abi"],
        ContractAddress.bscTestnet.royaNFT
      );

    case Networks.bscMainnet:
      return new wallet.web3.eth.Contract(
        royaNftAbi["abi"],
        ContractAddress.bscMainnet.royaNFT
      );

    case Networks.maticTestnet:
      return new wallet.web3.eth.Contract(
        royaNftAbi["abi"],
        ContractAddress.maticTestnet.royaNFT
      );

    case Networks.maticMainnet:
      return new wallet.web3.eth.Contract(
        royaNftAbi["abi"],
        ContractAddress.maticMainnet.royaNFT
      );

    default:
      return new wallet.web3.eth.Contract(
        royaNftAbi["abi"],
        ContractAddress.mainnet.royaNFT
      );
  }
};

export const getMroyaTokenContract = () => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.ropsten:
      return new wallet.web3.eth.Contract(
        mRoyaTestnetAbi["abi"],
        ContractAddress.ropsten.mRoya
      );

    case Networks.mainnet:
      return new wallet.web3.eth.Contract(
        mRoyaMainnetAbi["abi"],
        ContractAddress.mainnet.mRoya
      );

    default:
      return new wallet.web3.eth.Contract(
        mRoyaMainnetAbi["abi"],
        ContractAddress.mainnet.mRoya
      );
  }
};

export const getSwapTokenContract = () => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.ropsten:
      return new wallet.web3.eth.Contract(
        swapTokenAbi["abi"],
        ContractAddress.ropsten.tokenSwap
      );

    case Networks.mainnet:
      return new wallet.web3.eth.Contract(
        swapTokenAbi["abi"],
        ContractAddress.mainnet.tokenSwap
      );

    default:
      return new wallet.web3.eth.Contract(
        swapTokenAbi["abi"],
        ContractAddress.mainnet.tokenSwap
      );
  }
};
