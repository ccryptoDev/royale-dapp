import {
  Header,
  Description,
  BtnContainer,
  ConfirmBtn,
  CancelBtn,
} from "../style";
import Loader from "../loader";
import { claimTokens } from "../../logic/actions";
import { useSelector, useDispatch } from "react-redux";
import { RewardRow, RewardType, RewardDash, RewardAmount } from "./style";
import { renderTokenAmountText, Networks } from "../../utils";
import { Fragment } from "react";

interface Props {
  closeModal: () => void;
}

const ClaimStableCoins = (props: Props) => {
  const { closeModal } = props;

  const {
    isClaiming,
    isClaimable,
    claimableUsdc,
    claimableUsdt,
    claimableDai,
    claimableBusd,
  } = useSelector((state: any) => state.liquidityProvider);

  const { userAddress, walletConnected, network } = useSelector(
    (state: any) => state.user
  );

  const dispatch = useDispatch();

  const handleClaim = () => {
    if (walletConnected) {
      dispatch(claimTokens(userAddress));
    }
  };

  const renderClaimableBusd = () => {
    if (network === Networks.bscMainnet || network === Networks.bscTestnet) {
      return (
        <Fragment>
          <RewardRow>
            <RewardType>BUSD</RewardType>
            <RewardDash />
            <RewardAmount>{renderTokenAmountText(claimableBusd)}</RewardAmount>
          </RewardRow>
        </Fragment>
      );
    }

    return null;
  };

  return (
    <>
      <Header>CLAIM STABLE COINS</Header>
      <RewardRow>
        <RewardType>USDC</RewardType>
        <RewardDash />
        <RewardAmount>{renderTokenAmountText(claimableUsdc)}</RewardAmount>
      </RewardRow>
      <RewardRow>
        <RewardType>USDT</RewardType>
        <RewardDash />
        <RewardAmount>{renderTokenAmountText(claimableUsdt)}</RewardAmount>
      </RewardRow>
      <RewardRow>
        <RewardType>DAI</RewardType>
        <RewardDash />
        <RewardAmount>{renderTokenAmountText(claimableDai)}</RewardAmount>
      </RewardRow>
      {renderClaimableBusd()}
      <Description>
        You are now claiming your stablecoin liquidity which has been removed
        from the optimisation strategy to fulfil your withdrawal request.
      </Description>
      <BtnContainer>
        <ConfirmBtn disabled={isClaiming || !isClaimable} onClick={handleClaim}>
          {isClaiming ? <Loader /> : "Claim"}
        </ConfirmBtn>
        <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
      </BtnContainer>
    </>
  );
};

export default ClaimStableCoins;
