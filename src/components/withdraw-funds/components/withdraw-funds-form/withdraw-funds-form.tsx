import { Fragment, useState } from "react";
import {
  Header,
  FormContainer,
  InputField,
  MaxButton,
  BalanceText,
  ErrorText,
  WithdrawBtn,
  CancelBtn,
  BtnContainer,
  DropContainer,
  RptText,
  ArrowContainer,
  Equivalent,
  LoadingText,
  WaringText,
} from "./style";
import { Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Dropdown, Loader } from "../../../../components";
import { useSelector, useDispatch } from "react-redux";
import { withdrawToken } from "../../../../logic/actions";
import {
  getConfig,
  fromRtp,
  getTokenAmount,
  renderTokenAmountText,
  setTokenIndex,
  toRtp,
  getTokenOptionList,
  getApiEndpoint,
} from "../../../../utils";
import { RightArrow } from "../../../../images";
import axios from "axios";
import BigNumber from "bignumber.js";
import { Description } from "../../../style";

const CancelToken = axios.CancelToken;
const DEFAULT_TOKEN = "USDT";
let cancel: any;

const initialValues = {
  amount: "",
  token: DEFAULT_TOKEN,
};

interface Props {
  closeModal: () => void;
}

const WithdrawFundsForm = (props: Props) => {
  const { closeModal } = props;

  const [equivalent, setEquivalent] = useState("0");

  const { userAddress, walletConnected } = useSelector(
    (state: any) => state.user
  );

  const { isWithdrawing } = useSelector((state: any) => state.stake);

  const { rptBalance } = useSelector((state: any) => state.rptStaking);

  const {
    royaleLiquidDai,
    royaleLiquidUsdc,
    royaleLiquidUsdt,
    royaleLiquidBusd,
  } = useSelector((state: any) => state.liquidityProvider);

  const dispatch = useDispatch();

  const handleWithdraw = (values: any) => {
    const { amount, token } = values;

    if (walletConnected) {
      dispatch(withdrawToken(token, amount, userAddress, equivalent));
    }
  };

  const renderMessage = (token: string, amount: string): boolean => {
    const value = parseFloat(amount.replace(/,/g, ""));

    if (token === "DAI") {
      if (value <= parseFloat(royaleLiquidDai)) {
        return true;
      }

      return false;
    } else if (token === "USDT") {
      if (value <= parseFloat(royaleLiquidUsdt)) {
        return true;
      }

      return false;
    } else if (token === "BUSD") {
      if (value <= parseFloat(royaleLiquidBusd)) {
        return true;
      }

      return false;
    } else {
      if (value <= parseFloat(royaleLiquidUsdc)) {
        return true;
      }

      return false;
    }
  };

  const schema = Yup.object().shape({
    amount: Yup.string()
      .required("Enter value of token") //@ts-ignore
      .test("lowAmount", `Should be greater than 0`, (val) => parseInt(val) > 0)
      .test(
        "InsufficientFunds",
        `Insufficient Funds`, //@ts-ignore
        (val) => BigInt(toRtp(!!val ? val : "0")) <= BigInt(rptBalance)
      ),
    token: Yup.string().required("Select a token type"),
  });

  return (
    <Fragment>
      <Header>WITHDRAW FUNDS</Header>

      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleWithdraw}
      >
        {({ setFieldValue, values }) => {
          const handleInputChange = async (vals: any) => {
            const rptAmount = vals.value;

            setFieldValue("amount", rptAmount);

            if (
              !isNaN(parseFloat(rptAmount)) &&
              rptAmount !== "" &&
              walletConnected
            ) {
              try {
                //@ts-ignore
                if (cancel !== undefined) {
                  //@ts-ignore
                  cancel();
                }
                const response = await axios.get(
                  `${getApiEndpoint()}/rptAmountWithdraw/${toRtp(
                    rptAmount
                  )}/${setTokenIndex(values.token)}`,
                  {
                    cancelToken: new CancelToken(function executor(c) {
                      cancel = c;
                    }),
                  }
                );

                const number = new BigNumber(response.data.slice(0, -1));

                const fixedNumber = number.toFixed();

                setEquivalent(
                  renderTokenAmountText(
                    getTokenAmount(values.token, fixedNumber.split(".")[0])
                  )
                );
              } catch (e) {
                setEquivalent("0");
              }
            } else {
              setEquivalent("0");
            }
          };

          const handleSelect = async (option: string) => {
            try {
              setFieldValue("token", option);

              const { amount } = values;

              if (
                !isNaN(parseFloat(amount)) &&
                parseFloat(amount) > 0 &&
                amount !== ""
              ) {
                if (cancel !== undefined) {
                  //@ts-ignore
                  cancel();
                }
                const response = await axios.get(
                  `${getApiEndpoint()}/rptAmountWithdraw/${toRtp(
                    amount
                  )}/${setTokenIndex(option)}`,
                  {
                    cancelToken: new CancelToken(function executor(c) {
                      cancel = c;
                    }),
                  }
                );

                const number = new BigNumber(response.data.slice(0, -1));

                const fixedNumber = number.toFixed();

                setEquivalent(
                  renderTokenAmountText(
                    getTokenAmount(option, fixedNumber.split(".")[0])
                  )
                );
              } else {
                setEquivalent("0");
              }
            } catch (e) {
              console.log("error in rptAmountWithdraw", e);
              setEquivalent("0");
            }
          };

          const handleMaxClick = () => {
            setFieldValue("amount", fromRtp(rptBalance));
          };

          const renderLiquidRptText = () => {
            return `${renderTokenAmountText(fromRtp(rptBalance))}`;
          };

          return (
            <Form>
              <FormContainer>
                <InputField
                  name="amount"
                  value={values.amount}
                  onValueChange={handleInputChange}
                  decimalScale={"18"}
                />
                <RptText>RPT</RptText>

                <MaxButton type="button" onClick={handleMaxClick}>
                  MAX
                </MaxButton>
              </FormContainer>
              <ArrowContainer>
                <img src={RightArrow.default} alt="arrow" />
              </ArrowContainer>
              <DropContainer>
                <Dropdown
                  initialValue={values.token}
                  handleSelect={handleSelect}
                  optionItems={getTokenOptionList()}
                />
                <Equivalent className="notranslate">{equivalent}</Equivalent>
              </DropContainer>

              <BalanceText>
                Your wallet balance:{" "}
                <span className="notranslate">
                  {`${renderLiquidRptText()} RPT`}{" "}
                </span>
              </BalanceText>
              <ErrorText>
                <ErrorMessage name="amount" />
              </ErrorText>
              {renderMessage(
                values.token,
                equivalent === "" ? "0" : equivalent
              ) ? (
                <Description>
                  By withdrawing liquidity from the Royale Liquidity Pool, the
                  RPT will be burned and the chosen stablecoins will be sent to
                  the requested withdrawal address.
                </Description>
              ) : (
                <WaringText>
                  Insufficient Royale LP Liquidity. There is insufficient
                  liquidity within the Royale LP to fulfil the withdrawal
                  request at this time. Upon confirming this transaction, the
                  RPT will be burned and thus stop accumulating rewards
                  immediately. The liquidity may take up to 8 days to be removed
                  from the optimisation strategy, after which you will be able
                  to claim the requested stablecoins from the Royale Web 3.0 App
                  LP page.
                </WaringText>
              )}

              <BtnContainer>
                <WithdrawBtn type="submit" disabled={isWithdrawing}>
                  {isWithdrawing ? <Loader /> : "Withdraw"}
                </WithdrawBtn>
                <CancelBtn type="button" onClick={closeModal}>
                  Cancel
                </CancelBtn>
              </BtnContainer>
              {isWithdrawing && (
                <LoadingText>{getConfig().transactionText}</LoadingText>
              )}
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default WithdrawFundsForm;
