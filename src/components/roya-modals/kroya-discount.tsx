import { Header, DiscountText } from "./style";
import {
  WarningTextCenter,
  BtnContainerSecondary,
  BuyLotButton,
  CancelLotButton,
  LotAmountText,
  ErrorText,
} from "../style";
import {
  StakingLotModals,
  renderTokenAmountText,
  fromRoya,
  toRoya,
} from "../../utils";
import { Loader } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { buyQroyaLot } from "../../logic/actions";

interface Props {
  closeModal: () => void;
}

const KroyaDiscount = (props: Props) => {
  const { closeModal } = props;

  const { lotOperation, nftId } = useSelector(
    (state: any) => state.stakingLots
  );

  const { walletConnected, userAddress } = useSelector(
    (state: any) => state.user
  );

  const { userRoyaBalance } = useSelector((state: any) => state.royaReserve);

  const dispatch = useDispatch();

  const initialValues = {
    lotAmount: 1,
    nftDiscount: nftId.toString(),
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
        `Insufficient Funds`, //@ts-ignore
        (val) =>
          BigInt(userRoyaBalance) >=
          BigInt(toRoya((parseInt(val as string) * 7200).toString()))
      ),
    nftDiscount: Yup.string(),
  });

  const handleDiscountedQroya = (values: any) => {
    const { lotAmount, nftDiscount } = values;

    if (walletConnected) {
      dispatch(buyQroyaLot(userAddress, lotAmount, nftDiscount, closeModal));
    }
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={handleDiscountedQroya}
      enableReinitialize
    >
      {() => (
        <Form>
          <Header>qROYA STAKING LOT</Header>
          <DiscountText className="notranslate">1 x 7,200 ROYA</DiscountText>
          <LotAmountText>
            Available:{" "}
            <span className="notranslate">
              {`${
                !!userRoyaBalance &&
                renderTokenAmountText(fromRoya(userRoyaBalance))
              } ROYA`}
            </span>
          </LotAmountText>
          <WarningTextCenter>
            ATTENTION!
            <br />
            YOUR QUEEN OF QUEENS NFT ENTITLES YOU TO A DISCOUNT OF 2,800 ROYA
            AND UPON STAKING BOTH THE NFT AND YOUR ROYA WILL BE LOCKED TOGETHER.
            A STAKING LOT CREATES AN 8 DAY LOCK UP PERIOD, AFTER WHICH YOU WILL
            BE ABLE TO WITHDRAW BOTH THE NFT AND YOUR STAKED ROYA.
          </WarningTextCenter>

          <ErrorText>
            <ErrorMessage name="lotAmount" />
          </ErrorText>

          <BtnContainerSecondary>
            <BuyLotButton
              type="submit"
              disabled={lotOperation > StakingLotModals.closed}
            >
              {lotOperation === StakingLotModals.queenDiscount ? (
                <Loader />
              ) : (
                "Stake"
              )}
            </BuyLotButton>
            <CancelLotButton type="button" onClick={closeModal}>
              Cancel
            </CancelLotButton>
          </BtnContainerSecondary>
        </Form>
      )}
    </Formik>
  );
};

export default KroyaDiscount;
