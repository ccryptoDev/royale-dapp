import { Fragment } from "react";
import {
  Header,
  RptAmountSuccess,
  RptsuccessText,
  ThanksBtnCont,
  ThanksBtn,
} from "../../../style";
import { useDispatch, useSelector } from "react-redux";
import { switchRptUnstakeStep } from "../../../../logic/actions";
import { UnlockRptSteps, thousandSeparator } from "../../../../utils";

interface Props {
  closeModal: () => void;
}

const Success = (props: Props) => {
  const { closeModal } = props;

  const dispatch = useDispatch();

  const { unStakeRptAmount } = useSelector((state: any) => state.rptStaking);

  const handleThanksBtn = () => {
    closeModal();
    dispatch(switchRptUnstakeStep(UnlockRptSteps.confirm));
  };

  return (
    <Fragment>
      <Header>SUCCESS</Header>
      <RptAmountSuccess className="notranslate">
        {!!unStakeRptAmount && thousandSeparator(unStakeRptAmount)}
      </RptAmountSuccess>
      <RptsuccessText>RPT has been unstaked</RptsuccessText>
      <ThanksBtnCont>
        <ThanksBtn onClick={handleThanksBtn}>Thanks!</ThanksBtn>
      </ThanksBtnCont>
    </Fragment>
  );
};

export default Success;
