import {
  Header,
  LotsFormContainer,
  StakingLotsField,
  ErrorText,
  BtnContainerSecondary,
  BuyLotButton,
  CancelLotButton,
  MaxButton,
  LotName,
  RightArrowContainer,
  RoyaAmount,
  LotAmountText,
  LoadingText,
} from "../style";
import { Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RightArrow } from "../../images";
import { useSelector, useDispatch } from "react-redux";
import { sellFroyaLot } from "../../logic/actions";
import { Loader } from "../../components";
import { getConfig, StakingLotModals, LotPrice } from "../../utils";

const initialValues = {
  lotAmount: "1",
  nftDiscount: "",
};

interface Props {
  closeModal: () => void;
}

const SellFroya = (props: Props) => {
  const { walletConnected, userAddress } = useSelector(
    (state: any) => state.user
  );

  const { lotOperation, totalFroyaLot } = useSelector(
    (state: any) => state.stakingLots
  );

  const dispatch = useDispatch();

  const { closeModal } = props;

  const handleSellFRoya = (values: any) => {
    const { lotAmount, nftDiscount } = values;

    if (walletConnected) {
      dispatch(sellFroyaLot(userAddress, parseInt(lotAmount), nftDiscount));
    }
  };

  const renderRoyaText = (value: string): string => {
    if (!isNaN(parseInt(value))) {
      const lotAmount = parseInt(value);
      if (lotAmount >= 1) {
        return `${(lotAmount * LotPrice.flushLot).toLocaleString()} ROYA`;
      }

      return "0 ROYA";
    } else {
      return "0 ROYA";
    }
  };

  const schema = Yup.object().shape({
    lotAmount: Yup.string()
      .required("Enter value")
      .test(
        "lowAmount",
        `Should be greater than or equal to 1`, //@ts-ignore
        (val) => parseFloat(val) >= 1
      )
      .test(
        "InsufficientFunds",
        `Insufficient Lot`, //@ts-ignore
        (val) => parseInt(val) <= parseInt(totalFroyaLot)
      ),
    nftDiscount: Yup.string(),
  });

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={handleSellFRoya}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <Header>UNSTAKE fROYA</Header>
          <LotsFormContainer>
            <StakingLotsField
              name="lotAmount"
              value={values.lotAmount}
              onValueChange={(vals: any) =>
                setFieldValue("lotAmount", vals.value)
              }
              decimalScale={"0"}
            />

            <LotName>fROYA</LotName>
            <RightArrowContainer>
              <img src={RightArrow.default} alt="arrow" />
            </RightArrowContainer>

            <RoyaAmount className="notranslate">
              {renderRoyaText(values.lotAmount)}
            </RoyaAmount>

            <MaxButton
              type="button"
              onClick={() => setFieldValue("lotAmount", totalFroyaLot)}
            >
              MAX
            </MaxButton>
          </LotsFormContainer>
          <ErrorText>
            <ErrorMessage name="lotAmount" />
          </ErrorText>
          <LotAmountText>
            Your Balance:{" "}
            <span className="notranslate">
              {!!totalFroyaLot && `${totalFroyaLot} fROYA`}{" "}
            </span>
          </LotAmountText>

          <BtnContainerSecondary>
            <BuyLotButton
              type="submit"
              disabled={lotOperation > StakingLotModals.closed}
            >
              {lotOperation === StakingLotModals.sellFlush ? (
                <Loader />
              ) : (
                "Unstake"
              )}
            </BuyLotButton>
            <CancelLotButton type="button" onClick={closeModal}>
              Cancel
            </CancelLotButton>
          </BtnContainerSecondary>
          {lotOperation === StakingLotModals.sellFlush && (
            <LoadingText>{getConfig().transactionText}</LoadingText>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default SellFroya;
