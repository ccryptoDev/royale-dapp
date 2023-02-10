import { RewardsPerBlock, Networks, Config, NetworkOptions } from "./constants";
import {
  getBusdContract,
  getDaiContract,
  getRoyaleLpContract,
  getUsdcContract,
  getUsdtContract,
} from "./contracts";
import { ContractAddress } from "./address";
import web3 from "web3";
import store from "../logic/reducers";
import { ArrowRed, ArrowGreen, GraphLineGreen, GraphLineRed } from "../images";

export const toUsdt = (amount: string): string => {
  const { network } = store.getState().user;

  if (network === Networks.bscMainnet || network === Networks.bscTestnet) {
    return web3.utils.toWei(amount, "ether");
  }

  return web3.utils.toWei(amount, "mwei");
};

export const toUsdc = (amount: string): string => {
  const { network } = store.getState().user;

  if (network === Networks.bscMainnet || network === Networks.bscTestnet) {
    return web3.utils.toWei(amount, "ether");
  }

  return web3.utils.toWei(amount, "mwei");
};

export const toDai = (amount: string): string => {
  return web3.utils.toWei(amount, "ether");
};

export const toRtp = (amount: string): string => {
  return web3.utils.toWei(amount, "ether");
};

export const toRoya = (amount: string): string => {
  return web3.utils.toWei(amount, "ether");
};

export const toMroya = (amount: string): string => {
  return web3.utils.toWei(amount.toString(), "ether");
};

export const toGwei = (amount: string): string => {
  return web3.utils.toWei(amount, "gwei");
};

export const toBusd = (amount: string): string => {
  return web3.utils.toWei(amount, "ether");
};

export const setStakeContract = (token: string) => {
  if (token === "USDT") {
    return getUsdtContract();
  } else if (token === "USDC") {
    return getUsdcContract();
  } else if (token === "BUSD") {
    return getBusdContract();
  } else {
    return getDaiContract();
  }
};

export const setStakeAmount = (token: string, amount: string): string => {
  if (token === "USDT") {
    return toUsdt(amount);
  } else if (token === "USDC") {
    return toUsdc(amount);
  } else if (token === "BUSD") {
    return toBusd(amount);
  } else {
    return toDai(amount);
  }
};

export const setSuppyAmount = (
  token: string,
  amount: string
): Array<string> => {
  if (token === "USDT") {
    return ["0", "0", toUsdt(amount)];
  } else if (token === "USDC") {
    return ["0", toUsdc(amount), "0"];
  } else {
    return [toDai(amount), "0", "0"];
  }
};

export const fromUsdt = (amount: string): string => {
  const { network } = store.getState().user;

  if (network === Networks.bscMainnet || network === Networks.bscTestnet) {
    return web3.utils.fromWei(amount, "ether");
  }

  return web3.utils.fromWei(amount, "mwei");
};

export const fromUsdc = (amount: string): string => {
  const { network } = store.getState().user;

  if (network === Networks.bscMainnet || network === Networks.bscTestnet) {
    return web3.utils.fromWei(amount, "ether");
  }

  return web3.utils.fromWei(amount, "mwei");
};

export const fromDai = (amount: string): string => {
  return web3.utils.fromWei(amount, "ether");
};

export const fromRtp = (amount: string): string => {
  return web3.utils.fromWei(amount, "ether");
};

export const fromRoya = (amount: string): string => {
  return web3.utils.fromWei(amount, "ether");
};

export const fromEth = (amount: string): string => {
  return web3.utils.fromWei(amount, "ether");
};

export const fromMroya = (amount: string): string => {
  return web3.utils.fromWei(amount, "ether");
};

export const fromBusd = (amount: string): string => {
  return web3.utils.fromWei(amount, "ether");
};

export const setGasLimit = (gasLimit: number): string => {
  return web3.utils.toHex(gasLimit);
};

export const setTokenIndex = (token: string): number => {
  const { network } = store.getState().user;

  if (network === Networks.bscMainnet || network === Networks.bscTestnet) {
    if (token === "DAI") return 0;
    else if (token === "BUSD") return 1;
    else if (token === "USDC") return 2;
    else return 3;
  } else {
    if (token === "DAI") return 0;
    else if (token === "USDC") return 1;
    else return 2;
  }
};

export const setTokenAmount = (token: string, amount: string): string => {
  if (token === "USDT") {
    return toUsdt(amount);
  } else if (token === "USDC") {
    return toUsdc(amount);
  } else if (token === "BUSD") {
    return toBusd(amount);
  } else {
    return toDai(amount);
  }
};

export const getTokenAmount = (token: string, amount: string): string => {
  if (token === "USDT") {
    return fromUsdt(amount);
  } else if (token === "USDC") {
    return fromUsdc(amount);
  } else if (token === "BUSD") {
    return fromBusd(amount);
  } else {
    return fromDai(amount);
  }
};

export const thousandSeparator = (num: string): string => {
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
};

export const renderTokenAmountText = (amount: string): string => {
  const token = amount.replace(/,/g, "");

  if (!isNaN(parseFloat(token))) {
    return parseFloat(token).toLocaleString("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  }

  return "0";
};

export const copyTextToClipboard = (value: string): void => {
  const el = document.createElement("textarea");
  el.value = value;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

export const getNetworkArgs = (network: string): string => {
  switch (network) {
    case Networks.mainnet:
      return "ethereum";

    case Networks.bscMainnet:
      return "binance";

    case Networks.maticMainnet:
      return "matic";

    default:
      return "ethereum";
  }
};

export const calculateNetworkRptApy = (
  ethereumStableCoin: string,
  binanceStableCoin: string,
  maticStableCoin: string,
  ethereumGaming: string,
  binanceGaming: string,
  maticGaming: string,
  network: string,
  royaPrice: number
): string => {
  const totalValueOfProtocol =
    parseFloat(ethereumStableCoin) +
    parseFloat(binanceStableCoin) +
    parseFloat(maticStableCoin) +
    parseFloat(ethereumGaming) +
    parseFloat(binanceGaming) +
    parseFloat(maticGaming);

  let totalValueOfNetwork = 0;

  if (network === "ethereum") {
    totalValueOfNetwork =
      parseFloat(ethereumStableCoin) + parseFloat(ethereumGaming);
  } else if (network === "binance") {
    totalValueOfNetwork =
      parseFloat(binanceStableCoin) + parseFloat(binanceGaming);

    const apy =
      (2.055921052631579 / totalValueOfNetwork) * 6400 * 365 * 100 * royaPrice;

    if (isFinite(apy)) return `${apy.toFixed(2)} %`;

    return "0 %";
  } else {
    totalValueOfNetwork = parseFloat(maticStableCoin) + parseFloat(maticGaming);
  }

  const royaPerBlock =
    RewardsPerBlock.rpt * (totalValueOfNetwork / totalValueOfProtocol);

  const result =
    (royaPerBlock / totalValueOfProtocol) * 6400 * 365 * 100 * royaPrice;

  if (isFinite(result)) return `${result.toFixed(2)} %`;

  return "0 %";
};

export const calculateRptRewardApy = (
  rptStakedUsd: number,
  currentPrice: number,
  endDateTimeStamp: number,
  rewardRate: string
): string => {
  const secondsRemaing = endDateTimeStamp - Math.floor(Date.now() / 1000);

  const royaLeftToDistribute =
    parseFloat(fromRoya(rewardRate)) * secondsRemaing;

  const royaUsdValue = royaLeftToDistribute * currentPrice;

  const annualRoyaUsdValue = (royaUsdValue / secondsRemaing) * 31540000;

  const apy = (annualRoyaUsdValue / rptStakedUsd) * 100;

  if (isFinite(apy)) {
    return `${apy.toFixed(2)} %`;
  }

  return "0 %";
};

export const calculateRoyaApy = (totalStakedRoya: string): string => {
  const result =
    (RewardsPerBlock.roya / parseFloat(totalStakedRoya)) * 6400 * 365 * 100;

  if (isFinite(result)) return `${result.toFixed(2)} %`;

  return "0 %";
};

export const addNetworkToEndpoint = (network: string): string => {
  switch (network) {
    case Networks.mainnet:
    case Networks.ropsten:
      return "ethereum";

    case Networks.bscMainnet:
    case Networks.bscTestnet:
      return "binance";

    case Networks.maticMainnet:
    case Networks.maticTestnet:
      return "matic";

    default:
      return "ethereum";
  }
};

export const getMainTokenSymbol = (network: string): string => {
  switch (network) {
    case Networks.mainnet:
    case Networks.ropsten:
      return "ETH";

    case Networks.bscMainnet:
    case Networks.bscTestnet:
      return "BNB";

    case Networks.maticMainnet:
    case Networks.maticTestnet:
      return "MATIC";

    default:
      return "ETH";
  }
};

export const getRoyaleLpContractAddress = (): string => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.mainnet:
      return ContractAddress.mainnet.royaleLP;

    case Networks.ropsten:
      return ContractAddress.ropsten.royaleLP;

    case Networks.bscMainnet:
      return ContractAddress.bscMainnet.royaleLP;

    case Networks.bscTestnet:
      return ContractAddress.bscTestnet.royaleLP;

    case Networks.maticMainnet:
      return ContractAddress.maticMainnet.royaleLP;

    case Networks.maticTestnet:
      return ContractAddress.maticTestnet.royaleLP;

    default:
      return ContractAddress.mainnet.royaleLP;
  }
};

const constuctEndpoint = (network: string): string => {
  const testEndpoint = Config.ropsten.apiUrl;

  const mainEndpoint = Config.mainnet.apiUrl;

  switch (network) {
    case Networks.ropsten:
    case Networks.bscTestnet:
    case Networks.maticTestnet:
      return testEndpoint;

    case Networks.mainnet:
    case Networks.bscMainnet:
    case Networks.maticMainnet:
      return mainEndpoint;

    default:
      return mainEndpoint;
  }
};

export const getApiEndpoint = (): string => {
  const { network } = store.getState().user;

  return `${constuctEndpoint(network)}/${addNetworkToEndpoint(network)}`;
};

export const getNetwork = (network: string): string => {
  switch (network) {
    case Networks.mainnet:
      return "Ethereum Mainnet";

    case Networks.ropsten:
      return "Ropsten";

    case Networks.rinkeby:
      return "Rinkeby";

    case Networks.goerli:
      return "Goerli";

    case Networks.kovan:
      return "Kovan";

    case Networks.moonBaseAlpha:
      return "Moonbase Alpha";

    case Networks.bscTestnet:
      return "BSC Testnet";

    case Networks.bscMainnet:
      return "BSC Mainnet";

    case Networks.maticTestnet:
      return "Matic Testnet";

    case Networks.maticMainnet:
      return "Matic Mainnet";

    default:
      return "Unknown";
  }
};

export const getTokenOptionList = (): string[] => {
  const { network } = store.getState().user;

  if (network === Networks.bscMainnet || network === Networks.bscTestnet) {
    return ["USDT", "USDC", "DAI", "BUSD"];
  }

  return ["USDT", "USDC", "DAI"];
};

export const getFetchBalancesRequest = (userAddress: string) => {
  const { network } = store.getState().user;

  if (network === Networks.bscMainnet || network === Networks.bscTestnet) {
    return [
      getUsdtContract().methods.balanceOf(userAddress).call(),
      getUsdcContract().methods.balanceOf(userAddress).call(),
      getDaiContract().methods.balanceOf(userAddress).call(),
      getBusdContract().methods.balanceOf(userAddress).call(),
    ];
  }

  return [
    getUsdtContract().methods.balanceOf(userAddress).call(),
    getUsdcContract().methods.balanceOf(userAddress).call(),
    getDaiContract().methods.balanceOf(userAddress).call(),
  ];
};

export const getRptStakingContractAddress = (): string => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.mainnet:
      return ContractAddress.mainnet.rptStaking;

    case Networks.ropsten:
      return ContractAddress.ropsten.rptStaking;

    case Networks.bscMainnet:
      return ContractAddress.bscMainnet.rptStaking;

    case Networks.bscTestnet:
      return ContractAddress.bscTestnet.rptStaking;

    case Networks.maticTestnet:
      return ContractAddress.maticTestnet.rptStaking;

    case Networks.maticMainnet:
      return ContractAddress.maticMainnet.rptStaking;

    default:
      return ContractAddress.mainnet.rptStaking;
  }
};

export const getRoyaReserveContractAddress = (): string => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.mainnet:
      return ContractAddress.mainnet.royaReserve;

    case Networks.ropsten:
      return ContractAddress.ropsten.royaReserve;

    case Networks.bscMainnet:
      return ContractAddress.bscMainnet.royaReserve;

    case Networks.bscTestnet:
      return ContractAddress.bscTestnet.royaReserve;

    case Networks.maticTestnet:
      return ContractAddress.maticTestnet.royaReserve;

    case Networks.maticMainnet:
      return ContractAddress.maticMainnet.royaReserve;

    default:
      return ContractAddress.mainnet.royaReserve;
  }
};

export const getQueenLotContractAddress = (): string => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.mainnet:
      return ContractAddress.mainnet.queenLot;

    case Networks.ropsten:
      return ContractAddress.ropsten.queenLot;

    case Networks.bscMainnet:
      return ContractAddress.bscMainnet.queenLot;

    case Networks.bscTestnet:
      return ContractAddress.bscTestnet.queenLot;

    case Networks.maticTestnet:
      return ContractAddress.maticTestnet.queenLot;

    case Networks.maticMainnet:
      return ContractAddress.maticMainnet.queenLot;

    default:
      return ContractAddress.mainnet.queenLot;
  }
};

export const getKingLotContractAddress = (): string => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.mainnet:
      return ContractAddress.mainnet.kingLot;

    case Networks.ropsten:
      return ContractAddress.ropsten.kingLot;

    case Networks.bscMainnet:
      return ContractAddress.bscMainnet.kingLot;

    case Networks.bscTestnet:
      return ContractAddress.bscTestnet.kingLot;

    case Networks.maticTestnet:
      return ContractAddress.maticTestnet.kingLot;

    case Networks.maticMainnet:
      return ContractAddress.maticMainnet.kingLot;

    default:
      return ContractAddress.mainnet.kingLot;
  }
};

export const getFlushLotContractAddress = (): string => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.mainnet:
      return ContractAddress.mainnet.royaleFlushLot;

    case Networks.ropsten:
      return ContractAddress.ropsten.royaleFlushLot;

    case Networks.bscMainnet:
      return ContractAddress.bscMainnet.royaleFlushLot;

    case Networks.bscTestnet:
      return ContractAddress.bscTestnet.royaleFlushLot;

    case Networks.maticTestnet:
      return ContractAddress.maticTestnet.royaleFlushLot;

    case Networks.maticMainnet:
      return ContractAddress.maticMainnet.royaleFlushLot;

    default:
      return ContractAddress.mainnet.royaleFlushLot;
  }
};

export const getClaimableBalanceRequest = (userAddress: string) => {
  const { network } = store.getState().user;

  if (network === Networks.bscMainnet || network === Networks.bscTestnet) {
    return [
      getRoyaleLpContract().methods.amountWithdraw(userAddress, 0).call(),
      getRoyaleLpContract().methods.amountWithdraw(userAddress, 2).call(),
      getRoyaleLpContract().methods.amountWithdraw(userAddress, 3).call(),
      getRoyaleLpContract().methods.amountWithdraw(userAddress, 1).call(),
    ];
  }

  return [
    getRoyaleLpContract().methods.amountWithdraw(userAddress, 0).call(),
    getRoyaleLpContract().methods.amountWithdraw(userAddress, 1).call(),
    getRoyaleLpContract().methods.amountWithdraw(userAddress, 2).call(),
  ];
};

export const getRoyaleLpLiquidityRequest = () => {
  const { network } = store.getState().user;

  if (network === Networks.bscMainnet || network === Networks.bscTestnet) {
    return [
      getRoyaleLpContract().methods.getBalances(0).call(),
      getRoyaleLpContract().methods.getBalances(2).call(),
      getRoyaleLpContract().methods.getBalances(3).call(),
      getRoyaleLpContract().methods.getBalances(1).call(),
    ];
  }

  return [
    getRoyaleLpContract().methods.getBalances(0).call(),
    getRoyaleLpContract().methods.getBalances(1).call(),
    getRoyaleLpContract().methods.getBalances(2).call(),
  ];
};

export const getEtherScanLink = (): string => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.ropsten:
      return "https://ropsten.etherscan.io";

    case Networks.mainnet:
      return "https://etherscan.io";

    case Networks.bscTestnet:
      return "https://testnet.bscscan.com";

    case Networks.bscMainnet:
      return "https://bscscan.com";

    case Networks.maticTestnet:
      return "http://mumbai-explorer.matic.today";

    case Networks.maticMainnet:
      return "https://polygonscan.com";

    default:
      return "https://etherscan.io";
  }
};

export const renderTokenText = (): string => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.ropsten:
    case Networks.mainnet:
      return "mROYA";

    case Networks.bscTestnet:
    case Networks.bscMainnet:
    case Networks.maticTestnet:
    case Networks.maticMainnet:
      return "ROYA";

    default:
      return "mROYA";
  }
};

export const getRoyaTokenAddress = (): string => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.mainnet:
      return ContractAddress.mainnet.royaToken;

    case Networks.ropsten:
      return ContractAddress.ropsten.royaToken;

    case Networks.bscMainnet:
      return ContractAddress.bscMainnet.royaToken;

    case Networks.bscTestnet:
      return ContractAddress.bscTestnet.royaToken;

    case Networks.maticTestnet:
      return ContractAddress.maticTestnet.royaToken;

    case Networks.maticMainnet:
      return ContractAddress.maticMainnet.royaToken;

    default:
      return ContractAddress.mainnet.royaToken;
  }
};

export const getTokenSwapContractAddress = (): string => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.ropsten:
      return ContractAddress.ropsten.tokenSwap;

    case Networks.mainnet:
      return ContractAddress.mainnet.tokenSwap;

    default:
      return ContractAddress.mainnet.tokenSwap;
  }
};

export const renderStats = (
  network: string,
  ethereumOption: any,
  binanceOption: any,
  maticOption: any
): any => {
  switch (network) {
    case NetworkOptions.ethereum:
      return ethereumOption;

    case NetworkOptions.binance:
      return binanceOption;

    case NetworkOptions.matic:
      return maticOption;

    default:
      return ethereumOption;
  }
};

export const renderArrow = (change: number): string => {
  if (change >= 0) return ArrowGreen.default;

  return ArrowRed.default;
};

export const renderGraphColor = (change: number): string => {
  if (change >= 0) return GraphLineGreen.default;

  return GraphLineRed.default;
};

export const getTotalValueLocked = (
  lockedInContract: string,
  loanGiven: string
): string => {
  const result: number = parseFloat(lockedInContract) + parseFloat(loanGiven);

  if (isFinite(result)) return result.toFixed(2);

  return "0";
};

export const calculateStablecoinTvl = (
  ethereumStableCoin: string,
  binanceStableCoin: string,
  maticStableCoin: string,
  ethereumGaming: string,
  binanceGaming: string,
  maticGaming: string
): string => {
  const result: number =
    parseFloat(ethereumStableCoin) +
    parseFloat(binanceStableCoin) +
    parseFloat(maticStableCoin) +
    parseFloat(ethereumGaming) +
    parseFloat(binanceGaming) +
    parseFloat(maticGaming);

  if (isFinite(result)) return result.toFixed(2);

  return "0";
};

export const getTokenPrecision = (token: string): string => {
  const { network } = store.getState().user;

  switch (network) {
    case Networks.bscMainnet:
    case Networks.bscTestnet:
      return "18";

    case Networks.mainnet:
    case Networks.ropsten:
    case Networks.maticTestnet:
    case Networks.maticMainnet:
    default:
      if (token === "DAI") {
        return "18";
      }
      return "6";
  }
};
