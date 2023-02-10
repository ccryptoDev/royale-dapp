import { Fragment } from "react";
import {
  Header,
  RptAmountSuccess,
  RptsuccessText,
  ThanksBtnCont,
  ThanksBtn,
} from "../../../style";
import { switchRptStakeStep } from "../../../../logic/actions";
import { LockRptSteps, thousandSeparator } from "../../../../utils";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  closeModal: () => void;
}

const Success = (props: Props) => {
  const { closeModal } = props;

  const dispatch = useDispatch();

  const { stakeRptAmount } = useSelector((state: any) => state.rptStaking);

  const handleThanksBtn = () => {
    closeModal();
    dispatch(switchRptStakeStep(LockRptSteps.confirm));
  };

  return (
    <Fragment>
      <Header>SUCCESS</Header>
      <RptAmountSuccess className="notranslate">
        {!!stakeRptAmount && thousandSeparator(stakeRptAmount)}
      </RptAmountSuccess>
      <RptsuccessText>RPT has been staked</RptsuccessText>
      <ThanksBtnCont>
        <ThanksBtn onClick={handleThanksBtn}>Thanks!</ThanksBtn>
      </ThanksBtnCont>
    </Fragment>
  );
};

export default Success;
