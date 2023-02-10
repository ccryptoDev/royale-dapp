import {
  Header,
  InputContainerSecondary,
  RoyaUnstakeField,
  RoyaText,
  MaxButton,
  AmountText,
  WarningTextCenter,
  BuyLotButton,
  CancelLotButton,
  BtnContainerSecondary,
  ErrorText,
  LoadingText,
} from "../style";
import { Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { unstakeRoyaAmount } from "../../logic/actions";
import { Loader } from "../../components";
import { renderTokenAmountText, fromRoya, toRoya, getConfig } from "../../utils";

const initialValues = {
  royaAmount: "",
};

interface Props {
  closeModal: () => void;
}

const RoyaReserveUnstake = (props: Props) => {
  const { closeModal } = props;

  const dispatch = useDispatch();

  const handleUnstakeRoya = (values: any) => {
    const { royaAmount } = values;

    if (walletConnected) {
      dispatch(unstakeRoyaAmount(userAddress, royaAmount));
    }
  };

  const { walletConnected, userAddress } = useSelector(
    (state: any) => state.user
  );

  const { isUnstaking, stakedRoyaBalance } = useSelector(
    (state: any) => state.royaReserve
  );

  const schema = Yup.object().shape({
    royaAmount: Yup.string()
      .required("Enter value")
      .test(
        "royaAmount",
        `Should be greater than or equal to 0`, //@ts-ignore
        (val) => parseFloat(val) >= 1
      )
      .test(
        "InsufficientFunds",
        `Insufficient Funds`, //@ts-ignore
        (val) => BigInt(toRoya(!!val ? val : "0")) <= BigInt(stakedRoyaBalance)
      ),
  });

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={handleUnstakeRoya}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <Header>UNSTAKE ROYA</Header>
          <InputContainerSecondary>
            <RoyaUnstakeField
              name="royaAmount"
              value={values.royaAmount}
              onValueChange={(vals: any) =>
                setFieldValue("royaAmount", vals.value)
              }
              decimalScale={"18"}
            />

            <RoyaText>ROYA</RoyaText>

            <MaxButton
              type="button"
              onClick={() =>
                setFieldValue("royaAmount", fromRoya(stakedRoyaBalance))
              }
            >
              MAX
            </MaxButton>
          </InputContainerSecondary>

          <ErrorText>
            <ErrorMessage name="royaAmount" />
          </ErrorText>

          <AmountText className="notranslate">
            Available to unstake:{" "}
            {!!stakedRoyaBalance &&
              renderTokenAmountText(fromRoya(stakedRoyaBalance))}
          </AmountText>

          <WarningTextCenter>
            Attention! If you choose to withdraw more ROYA halfway through the
            cooldown period from the Royale Reserve. the timer will reset to 8
            days.
          </WarningTextCenter>

          <BtnContainerSecondary>
            <BuyLotButton
              type="submit"
              disabled={isUnstaking || stakedRoyaBalance === "0"}
            >
              {isUnstaking ? <Loader /> : "Unstake"}
            </BuyLotButton>
            <CancelLotButton type="button" onClick={closeModal}>
              Cancel
            </CancelLotButton>
          </BtnContainerSecondary>
          {isUnstaking && <LoadingText>{getConfig().transactionText}</LoadingText>}
        </Form>
      )}
    </Formik>
  );
};

export default RoyaReserveUnstake;
