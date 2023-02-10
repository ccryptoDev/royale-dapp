import {
  Header,
  Description,
  WarningText,
  BtnContainer,
  ConfirmBtn,
  CancelBtn,
  InputLabel,
  InputContainer,
  UnlockInputField,
  TokenContainer,
  ErrorText,
  MaxButton,
  LoadingText
} from "../../../style";
import { Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Loader } from "../../..";
import { useSelector, useDispatch } from "react-redux";
import { unstakeRpt } from "../../../../logic/actions";
import { getConfig, fromRtp, toRtp, renderTokenText } from "../../../../utils";

const initialValues = {
  rptAmount: "",
};

interface Props {
  closeModal: () => void;
}

const UnlockRptForm = (props: Props) => {
  const { closeModal } = props;

  const { walletConnected, userAddress } = useSelector(
    (state: any) => state.user
  );

  const { isUnstakingRtp, stakedRptBalance } = useSelector(
    (state: any) => state.rptStaking
  );

  const dispatch = useDispatch();

  const handleUnlock = (values: any) => {
    const { rptAmount } = values;

    if (walletConnected) {
      dispatch(unstakeRpt(userAddress, rptAmount));
    }
  };

  const schema = Yup.object().shape({
    rptAmount: Yup.string()
      .required("Enter value of token")
      .test(
        "lowAmount",
        `Should be greater than 0`, //@ts-ignore
        (val) => parseFloat(val) > 0
      )
      .test(
        "InsufficientFunds",
        `Insufficient Funds`, //@ts-ignore
        (val) => BigInt(toRtp(!!val ? val : "0")) <= BigInt(stakedRptBalance)
      ),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleUnlock}
    >
      {({ values, setFieldValue }) => {
        const handleMaxButton = () => {
          setFieldValue("rptAmount", fromRtp(stakedRptBalance));
        };

        return (
          <Form>
            <Header>
              UNLOCK RPT TOKENS TO STOP <br /> RECEIVING REWARDS
            </Header>
            <InputContainer>
              <InputLabel>Amount to unlock:</InputLabel>
              <UnlockInputField
                name="rptAmount"
                value={values.rptAmount}
                onValueChange={(vals: any) =>
                  setFieldValue("rptAmount", vals.value)
                }
                decimalScale={"18"}
              />
              <TokenContainer>RPT</TokenContainer>
              <MaxButton type="button" onClick={handleMaxButton}>
                MAX
              </MaxButton>
            </InputContainer>
            <ErrorText>
              <ErrorMessage name="rptAmount" />
            </ErrorText>
            <Description>
              Once your RPT are unlocked you will no longer receive liquidity
              mining rewards in {renderTokenText()}.
              <br />
              Once RPT is unlocked you will be able to withdraw your stablecoins
              from Royale liquidity pools.
            </Description>
            <WarningText>
              CLICK THE CONFIRM BUTTON BELOW AND THEN CONFIRM THE TRANSACTION TO
              UNLOCK YOUR RPT.
            </WarningText>
            <BtnContainer>
              <ConfirmBtn type="submit" disabled={isUnstakingRtp}>
                {isUnstakingRtp ? <Loader /> : "Confirm"}
              </ConfirmBtn>
              <CancelBtn onClick={closeModal} type="button">
                Cancel
              </CancelBtn>
            </BtnContainer>
            {isUnstakingRtp && <LoadingText>{getConfig().transactionText}</LoadingText>}
          </Form>
        );
      }}
    </Formik>
  );
};

export default UnlockRptForm;
