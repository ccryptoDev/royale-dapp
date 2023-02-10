import {
  Header,
  Description,
  WarningText,
  BtnContainer,
  ConfirmBtn,
  CancelBtn,
  InputContainer,
  InputLabel,
  LockInputField,
  TokenContainer,
  ErrorText,
  MaxButton,
  LoadingText,
} from "../../../style";
import { Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Loader } from "../../..";
import { getConfig, fromRtp, toRtp, renderTokenText } from "../../../../utils";
import { useSelector, useDispatch } from "react-redux";
import { stakeRpt } from "../../../../logic/actions";

const initialValues = {
  rptAmount: "",
};

interface Props {
  closeModal: () => void;
}

const LockRptForm = (props: Props) => {
  const { closeModal } = props;

  const { walletConnected, userAddress } = useSelector(
    (state: any) => state.user
  );

  const { isStakingRtp, rptBalance } = useSelector(
    (state: any) => state.rptStaking
  );

  const dispatch = useDispatch();

  const handleLockRpt = (values: any) => {
    const { rptAmount } = values;

    if (walletConnected) {
      dispatch(stakeRpt(userAddress, rptAmount));
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
        (val) => BigInt(toRtp(!!val ? val : "0")) <= BigInt(rptBalance)
      ),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleLockRpt}
    >
      {({ values, setFieldValue }) => {
        const handleMaxButton = () => {
          console.log("from rpt ", fromRtp(rptBalance));
          setFieldValue("rptAmount", fromRtp(rptBalance));
        };

        return (
          <Form>
            <Header>LOCK RPT TOKENS TO RECEIVE {renderTokenText()}.</Header>
            <InputContainer>
              <InputLabel>Amount to lock:</InputLabel>
              <LockInputField
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
              If you have provided liquidity to one of the pools at Royale, you
              are now holding Royale Pool Tokens (RPT), you can lock your RPT to
              begin receiving liquidity mining rewards in {renderTokenText()}.
            </Description>
            <WarningText>
              CLICK THE CONFIRM BUTTON BELOW AND THEN CONFIRM THE TRANSACTION TO
              LOCK YOUR RPT
            </WarningText>
            <BtnContainer>
              <ConfirmBtn
                type="submit"
                disabled={isStakingRtp || rptBalance === "0"}
              >
                {isStakingRtp ? <Loader /> : "Confirm"}
              </ConfirmBtn>
              <CancelBtn type="button" onClick={closeModal}>
                Cancel
              </CancelBtn>
            </BtnContainer>
            {isStakingRtp && (
              <LoadingText>{getConfig().transactionText}</LoadingText>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default LockRptForm;
