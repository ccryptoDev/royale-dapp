import { Fragment } from "react";
import { UnlockRptSteps } from "../../utils";
import { UnlockRptForm, Success } from "./components";
import { useSelector } from "react-redux";

interface Props {
  closeModal: () => void;
}

const UnlockRpt = (props: Props) => {
  const { closeModal } = props;

  const { unlockRptStep } = useSelector((state: any) => state.rptStaking);

  const renderStep = () => {
    switch (unlockRptStep) {
      case UnlockRptSteps.confirm:
        return <UnlockRptForm closeModal={closeModal} />;

      case UnlockRptSteps.success:
        return <Success closeModal={closeModal} />;

      default:
        return null;
    }
  };

  return <Fragment>{renderStep()}</Fragment>;
};

export default UnlockRpt;
