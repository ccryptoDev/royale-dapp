import { Fragment } from "react";
import { Header } from "../style";
import { BtnContainer, WarningText, UnderStandBtn } from "./style";

interface Props {
  closeModal: () => void;
}

const CooldownActivated = (props: Props) => {
  const { closeModal } = props;

  return (
    <Fragment>
      <Header>COOLDOWN ACTIVATED</Header>
      <WarningText>
        ATTENTION! <br />
        FOLLOWING THE 10 DAY COOLDOWN, YOU WILL HAVE 48 HOURS TO UNSTAKE YOUR
        ROYA. IF IT IS NOT UNSTAKED WITHIN THE 48 HOUR WINDOW YOU WILL NEED TO
        REACTIVATE 10 DAY THE COOLDOWN PERIOD.
      </WarningText>
      <BtnContainer>
        <UnderStandBtn onClick={closeModal}>I understand</UnderStandBtn>
      </BtnContainer>
    </Fragment>
  );
};

export default CooldownActivated;
