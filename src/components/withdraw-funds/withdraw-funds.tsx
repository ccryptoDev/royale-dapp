import { Fragment } from "react";
import { useSelector } from "react-redux";
import { WithdrawSteps } from "../../utils";
import { WithdrawFundsForm, Success } from "./components";

interface Props {
  closeModal: () => void;
}

const WithdrawFunds = (props: Props) => {
  const { closeModal } = props;

  const { withdrawSteps } = useSelector((state: any) => state.stake);

  const renderSteps = () => {
    switch (withdrawSteps) {
      case WithdrawSteps.confirm:
        return <WithdrawFundsForm closeModal={closeModal} />;

      case WithdrawSteps.success:
        return <Success closeModal={closeModal} />;

      default:
        return null;
    }
  };

  return <Fragment>{renderSteps()}</Fragment>;
};

export default WithdrawFunds;
