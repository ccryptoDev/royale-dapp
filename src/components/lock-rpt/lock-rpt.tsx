import { Fragment } from "react";
import { useSelector } from "react-redux";
import { LockRptSteps } from "../../utils";
import { LockRptForm, Success } from "./components";

interface Props {
  closeModal: () => void;
}

const LockRpt = (props: Props) => {
  const { closeModal } = props;

  const { lockRptStep } = useSelector((state: any) => state.rptStaking);

  const renderSteps = () => {
    switch (lockRptStep) {
      case LockRptSteps.confirm:
        return <LockRptForm closeModal={closeModal} />;

      case LockRptSteps.success:
        return <Success closeModal={closeModal} />;

      default:
        return null;
    }
  };

  return <Fragment>{renderSteps()}</Fragment>;
};

export default LockRpt;
