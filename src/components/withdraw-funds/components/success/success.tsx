import { Fragment } from "react";
import { EtherscanLink, WithdrawalText, LinkContainer } from "./style";
import { Header, ThanksBtnCont, ThanksBtn } from "../../../style";
import { useDispatch, useSelector } from "react-redux";
import { switchWithdrawStep } from "../../../../logic/actions";
import {
  WithdrawSteps,
  thousandSeparator,
  getEtherScanLink,
} from "../../../../utils";

interface Props {
  closeModal: () => void;
}

const Success = (props: Props) => {
  const { closeModal } = props;

  const dispatch = useDispatch();

  const { withdrawRptAmount, withdrawTxId, equivalent, withdrawToken } =
    useSelector((state: any) => state.stake);

  const { royaleLiquidDai, royaleLiquidUsdc, royaleLiquidUsdt } = useSelector(
    (state: any) => state.liquidityProvider
  );

  const renderMessage = (token: string, amount: string): boolean => {
    const value = parseFloat(amount.replace(/,/g, ""));

    if (token === "DAI") {
      if (value <= parseFloat(royaleLiquidDai)) {
        return true;
      }

      return false;
    } else if (token === "USDT") {
      if (value <= parseFloat(royaleLiquidUsdt)) {
        return true;
      }

      return false;
    } else {
      if (value <= parseFloat(royaleLiquidUsdc)) {
        return true;
      }

      return false;
    }
  };

  const handleThanksBtn = () => {
    closeModal();
    dispatch(switchWithdrawStep(WithdrawSteps.confirm));
  };

  return (
    <Fragment>
      <Header>WITHDRAWAL WAS SUCCESSFUL</Header>
      <WithdrawalText>
        {renderMessage(withdrawToken, equivalent) ? (
          <>
            <span className="notranslate">
              {!!withdrawRptAmount &&
                `${thousandSeparator(withdrawRptAmount)} RPT `}
            </span>
            were withdrawn from your account and burned in return for
            <span className="notranslate">
              {" "}
              {equivalent} {withdrawToken}.
            </span>
          </>
        ) : (
          <>
            {" "}
            <span className="notranslate">
              {!!withdrawRptAmount &&
                `${thousandSeparator(withdrawRptAmount)} RPT `}
            </span>
            were withdrawn from your account and burned. The stablecoin balance
            of
            <span className="notranslate">
              {" "}
              {equivalent} {withdrawToken} will be available to claim after 8
              days.
            </span>
          </>
        )}
      </WithdrawalText>
      <ThanksBtnCont>
        <ThanksBtn onClick={handleThanksBtn}>Thanks</ThanksBtn>
      </ThanksBtnCont>
      <LinkContainer>
        <EtherscanLink
          href={`${getEtherScanLink()}/tx/${withdrawTxId}`}
          target="_blank"
        >
          View details on Etherscan
        </EtherscanLink>
      </LinkContainer>
    </Fragment>
  );
};

export default Success;
