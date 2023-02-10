import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getMroyaBalance, swapMroyaToken } from "../../logic/actions";
import { Loader } from "../../components";
import { ConvertArrow } from "../../images";
import { TokenHolderLayout } from "../../layouts";
import {
  renderTokenAmountText,
  fromMroya,
  SwapProcess,
  toMroya,
} from "../../utils";
import {
  MroyaWrapper,
  MroyaContainer,
  MroyaHeader,
  InfoContainer,
  BalanceContainer,
  BalanceContainerHeader,
  BalanceContainerVal,
  RightArrowWrapper,
  ArrowLine,
  RightArrowContainer,
  RoyaEquivalentContainer,
  SwapContainer,
  SwapContainerRight,
  SwapContainerHeader,
  SwapContainerHeaderText,
  MaxButton,
  ErrorText,
  BtnContainer,
  SwapBtn,
  MyNumberInput,
} from "./style";
import { useEffect } from "react";

const initialValues = {
  mRoyaAmount: "",
  stakeRoya: true,
};

const ConvertMroya = () => {
  const dispatch = useDispatch();

  const { walletConnected, userAddress, mRoyaBalance, process } = useSelector(
    (state: any) => state.user
  );

  useEffect(() => {
    if (walletConnected) {
      dispatch(getMroyaBalance(userAddress));
    }
  }, [walletConnected, userAddress, dispatch]);

  const schema = Yup.object().shape({
    mRoyaAmount: Yup.string()
      .required("Enter value of token")
      .test(
        "lowAmount",
        `Should be greater than 0`, //@ts-ignore
        (val) => parseFloat(val) > 0
      )
      .test(
        "InsufficientFunds",
        `Insufficient Funds`, //@ts-ignore
        (val) => BigInt(toMroya(!!val ? val : "0")) <= BigInt(mRoyaBalance)
      ),
  });

  const handleSubmit = (values: any) => {
    const { mRoyaAmount, stakeRoya } = values;

    if (walletConnected) {
      dispatch(swapMroyaToken(userAddress, mRoyaAmount, stakeRoya));
    }
  };

  return (
    <TokenHolderLayout>
      <MroyaWrapper>
        <MroyaContainer>
          <MroyaHeader>Swap mROYA for ROYA</MroyaHeader>
          <InfoContainer>
            <BalanceContainer>
              <BalanceContainerHeader>mROYA Balance</BalanceContainerHeader>
              <BalanceContainerVal className="no-translate">
                {renderTokenAmountText(fromMroya(mRoyaBalance))}
              </BalanceContainerVal>
            </BalanceContainer>
            <RightArrowWrapper>
              <ArrowLine />
              <RightArrowContainer>
                <img src={ConvertArrow.default} alt="arrow" />
              </RightArrowContainer>
              <ArrowLine />
            </RightArrowWrapper>
            <BalanceContainer>
              <RoyaEquivalentContainer>
                <BalanceContainerHeader>ROYA</BalanceContainerHeader>
                <BalanceContainerVal className="no-translate">
                  {renderTokenAmountText(fromMroya(mRoyaBalance))}
                </BalanceContainerVal>
              </RoyaEquivalentContainer>
            </BalanceContainer>
          </InfoContainer>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values, handleSubmit }) => {
              const handleMaxButton = () => {
                setFieldValue("mRoyaAmount", fromMroya(mRoyaBalance));
              };

              return (
                <Form>
                  <SwapContainer>
                    <SwapContainerRight>
                      <SwapContainerHeader>
                        <SwapContainerHeaderText>
                          Transfer Amount
                        </SwapContainerHeaderText>
                        <MaxButton type="button" onClick={handleMaxButton}>
                          MAX
                        </MaxButton>
                      </SwapContainerHeader>
                      <MyNumberInput
                        placeholder="0"
                        name="mRoyaAmount"
                        value={values.mRoyaAmount}
                        onValueChange={(vals: any) =>
                          setFieldValue("mRoyaAmount", vals.value)
                        }
                        decimalScale={"18"}
                      />
                      <ErrorText>
                        <ErrorMessage name="mRoyaAmount" />
                      </ErrorText>
                    </SwapContainerRight>
                  </SwapContainer>
                  <BtnContainer>
                    <SwapBtn
                      type="button"
                      disabled={
                        mRoyaBalance === "0" || process > SwapProcess.idle
                      }
                      onClick={() => {
                        setFieldValue("stakeRoya", true, false);
                        handleSubmit();
                      }}
                    >
                      {process === SwapProcess.stakeRoya ? (
                        <Loader />
                      ) : (
                        "STAKE IN ROYA RESERVE"
                      )}
                    </SwapBtn>
                    <SwapBtn
                      type="button"
                      disabled={
                        mRoyaBalance === "0" || process > SwapProcess.idle
                      }
                      onClick={() => {
                        setFieldValue("stakeRoya", false, false);
                        handleSubmit();
                      }}
                    >
                      {process === SwapProcess.inWallet ? (
                        <Loader />
                      ) : (
                        "WITHDRAW TO WALLET"
                      )}
                    </SwapBtn>
                  </BtnContainer>
                </Form>
              );
            }}
          </Formik>
        </MroyaContainer>
      </MroyaWrapper>
    </TokenHolderLayout>
  );
};

export default ConvertMroya;
