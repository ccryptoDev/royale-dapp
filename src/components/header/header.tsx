import { useState, useEffect } from "react";
import {
  HeaderWrapper,
  HeaderContainer,
  LinkContainers,
  Links,
  ConnectBtn,
  UserAddress,
  RightSideContent,
  EthBalance,
  EthBalanceText,
  RoyaBalance,
  Network,
} from "./style";
import { useHistory } from "react-router-dom";
import {
  fromRoya,
  Paths,
  renderTokenAmountText,
  StoreageKey,
  fromMroya,
  getConfig,
  getNetwork,
  getMainTokenSymbol,
  Networks,
} from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal";
import LoginModalContainer from "../login-modal";
import wallet from "../../utils/wallet";
import {
  getRoyaBalance,
  getEthBalance,
  getMroyaBalance,
} from "../../logic/actions";

const Header = () => {
  const { walletConnected, userAddress, ethBalance, network, mRoyaBalance } =
    useSelector((state: any) => state.user);

  const { userRoyaBalance } = useSelector((state: any) => state.royaReserve);

  const [show, setShow] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const closeModal = () => {
    setShow(false);
  };

  const handleWalletConnect = async () => {
    if (walletConnected) {
      try {
        await wallet.disconnect();
        localStorage.removeItem(StoreageKey.walletType);
      } catch (e) {
        console.log("something went wrong in logout wallet ", e);
      }
    } else {
      setShow(true);
    }
  };

  useEffect(() => {
    if (walletConnected) {
      dispatch(getRoyaBalance(userAddress));
      dispatch(getEthBalance(userAddress));
      dispatch(getMroyaBalance(userAddress));
    }
  }, [walletConnected, dispatch, userAddress]);

  const rendermRoyaBalance = () => {
    switch (network) {
      case Networks.mainnet:
      case Networks.ropsten:
        return (
          <RoyaBalance className="notranslate">
            {`${renderTokenAmountText(fromMroya(mRoyaBalance))} mROYA`}
          </RoyaBalance>
        );

      default:
        return null;
    }
  };

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <LinkContainers>
          <Links active={false}>
            <a
              href={getConfig().iGamingOperator}
              target="_blank"
              rel="noopener noreferrer"
            >
              &nbsp;
            </a>
          </Links>
        </LinkContainers>

        <RightSideContent>
          {!!network && (
            <Network network={network}>{getNetwork(network)}</Network>
          )}

          <RoyaBalance className="notranslate">{`${
            !!userRoyaBalance &&
            renderTokenAmountText(fromRoya(userRoyaBalance))
          } ROYA`}</RoyaBalance>

          {rendermRoyaBalance()}

          <EthBalance>
            <EthBalanceText className="notranslate">
              {!!ethBalance &&
                `${renderTokenAmountText(ethBalance)} ${getMainTokenSymbol(
                  network
                )}`}
            </EthBalanceText>

            {walletConnected && (
              <UserAddress>
                {userAddress[0]}
                {userAddress[1]}
                {userAddress[2]}
                {userAddress[3]}
                {userAddress[4]}
                {userAddress[5]}
                ...
                {userAddress[userAddress.length - 4]}
                {userAddress[userAddress.length - 3]}
                {userAddress[userAddress.length - 2]}
                {userAddress[userAddress.length - 1]}
              </UserAddress>
            )}
          </EthBalance>

          <ConnectBtn onClick={handleWalletConnect} connected={walletConnected}>
            <span data-text={walletConnected ? "Disconnect" : "Connect Wallet"}>{walletConnected ? "Disconnect" : "Connect Wallet"}</span>
          </ConnectBtn>

          {/*
            <UserIconContainer connected={walletConnected}>
            <img src={QuestionCircle.default} alt="user icon" />
          </UserIconContainer>

            */}
        </RightSideContent>
      </HeaderContainer>
      <Modal show={show} closeModal={closeModal}>
        <LoginModalContainer closeModal={closeModal} />
      </Modal>
    </HeaderWrapper>
  );
};

export default Header;
