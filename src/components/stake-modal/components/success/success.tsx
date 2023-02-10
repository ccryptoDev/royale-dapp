import { useState } from "react";
import { Header } from "../../style";
import { RightArrow, CopyIcon } from "../../../../images";
import { AmountContainer, ImgContainer } from "../confirm/style";
import {
  WaitText,
  TrxId,
  CopyIconContainer,
  CopySuccess,
  StakeModalContainer,
  TrxIdContainer,
} from "../processing/style";
import { WarningText } from "./style";
import { copyTextToClipboard } from "../../../../utils";
import { ThanksBtnCont, ThanksBtn } from "../../../style";

interface Props {
  tokenAmount: string;
  token: string;
  rptAmount: number;
  transactionId: string;
  closeModal: () => void;
}

const Success = (props: Props) => {
  const { tokenAmount, token, rptAmount, transactionId, closeModal } = props;

  const [show, setShow] = useState(false);

  const handleCopyClick = () => {
    copyTextToClipboard(transactionId);
    if (!show) {
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  };

  return (
    <StakeModalContainer>
      <Header>Deposit: success</Header>
      <AmountContainer className="notranslate">
        {tokenAmount} {token}
        <ImgContainer>
          <img src={RightArrow.default} alt="arrow" />
        </ImgContainer>
        {rptAmount} RPT
      </AmountContainer>
      <WaitText>
        Your funds have beed succcessfully deposited! You now have a share in
        the pool’s P&amp;L!
      </WaitText>
      <TrxIdContainer>
        <TrxId>{transactionId}</TrxId>
        <CopyIconContainer onClick={handleCopyClick}>
          <img src={CopyIcon.default} alt="copy" />
        </CopyIconContainer>
        <CopySuccess show={show}>Copied to clipboard</CopySuccess>
      </TrxIdContainer>
      <WarningText>
        Withdrawals will only be available after 14 days
      </WarningText>
      <ThanksBtnCont>
        <ThanksBtn onClick={closeModal}>Thanks</ThanksBtn>
      </ThanksBtnCont>
    </StakeModalContainer>
  );
};

export default Success;
