import { useState, useEffect } from "react";
import { TokenHolderLayout } from "../../layouts";
import {
  DashboardPage,
  PageContainer,
  DepositContainer,
  HistoryContainer,
  RewardsAndTable,
  RewardsContainer,
  TableContainer,
  PrimaryHeader,
  HeaderContainer,
  HistoryPrimaryHeader,
  HistoryBox,
  HistoryBoxItem,
  HistoryBoxItemInfo,
  HistoryBoxItemAmount,
  HistoryBoxIcon,
  HistoryBoxText,
  ClaimRewardCont,
  WithdrawsBtn,
  WithdrawBtn,
  ClaimRewardsBtn,
  RewardsTop,
  RewardsBottom,
  RewardLine,
  TokenContainer,
  InputContainer,
  InputField,
  RightArrowBox,
  RtpToken,
  DepositBtn,
  BalanceText,
  TableWrapper,
  Table,
  HistoryTable,
  ErrorText,
  DepositWrapper,
  CustomDropdown,
  TotalRpt,
  AvailableRpt,
  MaxButton,
  ApyTd,
  ProgressContainer,
  ProgressBar,
  Days,
  RptToUsd,
  Border,
  BorderMaxBtn,
  BorderClaimBtn,
  PrimaryHeaderText
} from "./style";
import {
  HistoryIcon1,
  HistoryIcon2,
  HistoryIcon3,
  RightArrowWhite,
} from "../../images";
import {
  ModalTypes,
  setTokenIndex,
  fromRtp,
  renderTokenAmountText,
  setTokenAmount,
  fromUsdc,
  fromDai,
  fromUsdt,
  toUsdt,
  toUsdc,
  toDai,
  thousandSeparator,
  getApiEndpoint,
  getTokenOptionList,
  fromBusd,
  toBusd,
  getEtherScanLink,
  getNetworkArgs,
  getTokenPrecision,
  renderStats,
  calculateRptRewardApy,
} from "../../utils";
import {
  Modal,
  StakeModal,
  WithdrawFunds,
  Dropdown,
  ClaimStableCoins,
} from "../../components";
import { Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  stakeStart,
  fetchBalances,
  getUserRpt,
  getContributionDynamics,
  fetchLiquidityData,
  getUserStakedRpt,
  fetchLiquidRpt,
  getIsClaimable,
  getClaimableBalance,
  getRoyaleLpLiquidity,
  getTotalStakedRptSupply,
  calcRptToUsd,
  getRoyaStats,
  getRewardDistributionDaysLeft,
  getStakedRptInUsdc,
  getRewardRate,
} from "../../logic/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const CancelToken = axios.CancelToken;
const DEFAULT_TOKEN = "USDT";
let cancel: any;

const initialValues = {
  amount: "",
  token: "USDT",
  rptAmount: "",
};

const LiquidityProvider = () => {
  const [modalStatus, setModalStatus] = useState(ModalTypes.closed);

  const {
    userAddress,
    walletConnected,
    usdcBalance,
    usdtBalance,
    daiBalance,
    busdBalance,
    network,
  } = useSelector((state: any) => state.user);

  const {
    currentPrice,
    ethereumStakedRptUsd,
    binanceStakedRptUsd,
    maticStakedRptUsd,
    daysLeftEthereum,
    daysLeftBinance,
    daysLeftMatic,
    ethereumRewardRate,
    binanceRewardRate,
    maticRewardRate,
  } = useSelector((state: any) => state.royaAnalytics);

  const { loading } = useSelector((state: any) => state.stake);

  const {
    optimiserLiquidity,
    liquidityInIgaming,
    availableLiquidRpt,
    dynamics,
    isClaimable,
    rptToUsd,
  } = useSelector((state: any) => state.liquidityProvider);

  const { rptBalance, stakedRptBalance } = useSelector(
    (state: any) => state.rptStaking
  );

  const dispatch = useDispatch();

  const [selectedToken, setSelectedToken] = useState(DEFAULT_TOKEN);

  useEffect(() => {
    if (walletConnected) {
      dispatch(fetchBalances(userAddress));
      dispatch(getUserRpt(userAddress));
      dispatch(getContributionDynamics(userAddress));
      dispatch(getUserStakedRpt(userAddress));
      dispatch(fetchLiquidRpt(userAddress));
      dispatch(fetchLiquidityData());
      dispatch(getIsClaimable(userAddress));
      dispatch(getClaimableBalance(userAddress));
      dispatch(getRoyaleLpLiquidity());
      dispatch(getTotalStakedRptSupply());
      dispatch(calcRptToUsd(userAddress));
      dispatch(getRoyaStats());
      dispatch(getRewardDistributionDaysLeft());
      dispatch(getStakedRptInUsdc());
      dispatch(getRewardRate());
    }
  }, [walletConnected, dispatch, userAddress]);

  const handleStake = async (values: any) => {
    const { amount, rptAmount, token } = values;

    if (!loading) {
      dispatch(
        stakeStart({
          tokenAmount: amount,
          token,
          rptAmount: rptAmount,
        })
      );
    }

    setModalStatus(ModalTypes.stake);
  };

  const closeModal = () => {
    setModalStatus(ModalTypes.closed);
  };

  const renderBalanceText = () => {
    if (selectedToken === "USDT") {
      return `${renderTokenAmountText(fromUsdt(usdtBalance))} USDT`;
    } else if (selectedToken === "USDC") {
      return `${renderTokenAmountText(fromUsdc(usdcBalance))} USDC`;
    } else if (selectedToken === "BUSD") {
      return `${renderTokenAmountText(fromBusd(busdBalance))} BUSD`;
    } else {
      return `${renderTokenAmountText(fromDai(daiBalance))} DAI`;
    }
  };

  const renderDate = (timeStamp: number) => {
    let date = new Date(timeStamp);

    return (
      <>
        {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
        <br />
        {`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
      </>
    );
  };

  const renderDaysRemaining = (operation: string, time: number) => {
    if (operation === "Contribution") {
      if (time - Date.now() > 0) {
        let days = Math.ceil((time - Date.now()) / 86400000);

        if (days > 14) {
          days = 14;
        }

        return (
          <div>
            <Days>{days > 1 ? `${days} days` : `${days} day`}</Days>

            <ProgressContainer>
              <ProgressBar days={days} />
            </ProgressContainer>
          </div>
        );
      } else {
        return null;
      }
    }

    return null;
  };

  const renderTotalRpt = () => {
    let total =
      parseFloat(fromRtp(rptBalance).replace(/,/g, "")) +
      parseFloat(fromRtp(stakedRptBalance).replace(/,/g, ""));

    if (!isNaN(total)) {
      return total.toLocaleString("en-US", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
      });
    }

    return "0";
  };

  const schema = Yup.object().shape({
    token: Yup.string().required("Select a token type"),
    amount: Yup.mixed()
      .required("Enter value of token")
      .test(
        "lowAmount",
        `Should be greater than 0`, //@ts-ignore
        (val) => parseFloat(val) > 0
      )
      .test({
        name: "InsufficientFunds",
        exclusive: false,
        params: { selectedToken },
        message: "Insufficient funds",
        test: (val) => {
          if (selectedToken === "USDT") {
            return BigInt(toUsdt(val ? val : "0")) <= BigInt(usdtBalance);
          } else if (selectedToken === "USDC") {
            return BigInt(toUsdc(val ? val : "0")) <= BigInt(usdcBalance);
          } else if (selectedToken === "BUSD") {
            return BigInt(toBusd(val ? val : "0")) <= BigInt(busdBalance);
          } else {
            return BigInt(toDai(val ? val : "0")) <= BigInt(daiBalance);
          }
        },
      }),
    rptAmount: Yup.string(),
  });

  const openEtherScan = (trxId: string) => {
    window.open(`${getEtherScanLink()}/tx/${trxId}`, "_blank");
  };

  const renderAmount = (value: string) => {
    const [amount, token] = value.split(" ");

    return `${thousandSeparator(amount)} ${token}`;
  };

  return (
    <TokenHolderLayout pageTitle="Liquidity Provider">
      <DashboardPage>
        <PageContainer>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleStake}
          >
            {({ setFieldValue, values }) => {
              const handleInputChange = async (vals: any) => {
                const tokenAmount = vals.value;
                setFieldValue("amount", tokenAmount);

                if (
                  !isNaN(parseFloat(tokenAmount)) &&
                  parseFloat(tokenAmount) > 0 &&
                  tokenAmount !== ""
                ) {
                  try {
                    //@ts-ignore
                    if (cancel !== undefined) {
                      //@ts-ignore
                      cancel();
                    }
                    const response = await axios.get(
                      `${getApiEndpoint()}/rptAmount/${setTokenAmount(
                        values.token,
                        tokenAmount
                      )}/${setTokenIndex(values.token)}`,
                      {
                        cancelToken: new CancelToken(function executor(c) {
                          cancel = c;
                        }),
                      }
                    );

                    setFieldValue(
                      "rptAmount",
                      renderTokenAmountText(fromRtp(response.data.slice(0, -1)))
                    );
                  } catch (e) {
                    console.log("Error ", e);
                    setFieldValue("rptAmount", 0);
                  }
                } else {
                  setFieldValue("rptAmount", 0);
                }
              };

              const handleSelect = async (option: string) => {
                //setFieldValue("amount", "1")
                setSelectedToken(option);
                setFieldValue("token", option);
                const { amount } = values;
                if (
                  !isNaN(parseFloat(amount)) &&
                  parseFloat(amount) > 0 &&
                  amount !== ""
                ) {
                  try {
                    //@ts-ignore
                    if (cancel !== undefined) {
                      //@ts-ignore
                      cancel();
                    }
                    const response = await axios.get(
                      `${getApiEndpoint()}/rptAmount/${setTokenAmount(
                        option,
                        amount
                      )}/${setTokenIndex(option)}`,
                      {
                        cancelToken: new CancelToken(function executor(c) {
                          cancel = c;
                        }),
                      }
                    );

                    setFieldValue(
                      "rptAmount",
                      renderTokenAmountText(fromRtp(response.data.slice(0, -1)))
                    );
                  } catch (e) {
                    console.log("something went wrong ", e);
                    setFieldValue("rptAmount", 0);
                  }
                }
              };

              const handleMaxButton = () => {
                if (values.token === "USDT") {
                  setFieldValue("amount", fromUsdt(usdtBalance));
                } else if (values.token === "USDC") {
                  setFieldValue("amount", fromUsdc(usdcBalance));
                } else if (values.token === "BUSD") {
                  setFieldValue("amount", fromBusd(busdBalance));
                } else {
                  setFieldValue("amount", fromDai(daiBalance));
                }
              };

              return (
                <Border>
                  <Form>
                    <DepositWrapper>
                      <DepositContainer>
                        <TokenContainer>
                          <PrimaryHeaderText>
                            Amount for providing to the pool:
                          </PrimaryHeaderText>
                          <InputContainer>
                            <InputField
                              name="amount"
                              onValueChange={handleInputChange}
                              value={values.amount}
                              decimalScale={getTokenPrecision(selectedToken)}
                            />

                            <CustomDropdown>
                              <Dropdown
                                initialValue={values.token}
                                handleSelect={handleSelect}
                                optionItems={getTokenOptionList()}
                              />
                            </CustomDropdown>
                            <BorderMaxBtn>
                              <MaxButton type="button" onClick={handleMaxButton}>
                                MAX
                              </MaxButton>
                            </BorderMaxBtn>

                            <RightArrowBox>
                              <img src={RightArrowWhite.default} alt="right arrow" />
                            </RightArrowBox>
                          </InputContainer>
                          <BalanceText>
                            Your wallet balance:{" "}
                            <span className="notranslate">
                              {renderBalanceText()}
                            </span>
                          </BalanceText>
                        </TokenContainer>
                        <TokenContainer>
                          <PrimaryHeader>&nbsp;</PrimaryHeader>
                          <InputContainer>
                            <InputField
                              name="rptAmount"
                              disabled={true}
                              value={values.rptAmount}
                            />

                            <RtpToken>RPT</RtpToken>
                            <DepositBtn type="submit"><span data-text="Contribute">Contribute</span></DepositBtn>
                          </InputContainer>
                        </TokenContainer>
                      </DepositContainer>
                      <ErrorText>
                        <ErrorMessage name="amount" />
                      </ErrorText>
                      <ErrorText>
                        <ErrorMessage name="rptAmount" />
                      </ErrorText>
                    </DepositWrapper>
                  </Form>
                </Border>
              );
            }}
          </Formik>
          <RewardsAndTable>
            <RewardsContainer>
              <RewardsTop>
                <HeaderContainer>
                  <PrimaryHeaderText>Total RPT</PrimaryHeaderText>
                  <TotalRpt className="notranslate">
                    {renderTotalRpt()}
                  </TotalRpt>
                  <RptToUsd className="notranslate">
                    $ {thousandSeparator(rptToUsd.toString())}
                  </RptToUsd>
                </HeaderContainer>
              </RewardsTop>
              <RewardLine />
              <RewardsBottom>
                <HeaderContainer>
                  <PrimaryHeaderText>Available to Withdraw</PrimaryHeaderText>
                  <AvailableRpt className="notranslate">
                    {!!rptBalance && renderTokenAmountText(fromRtp(rptBalance))}
                  </AvailableRpt>
                </HeaderContainer>
                <ClaimRewardCont>
                  <WithdrawsBtn
                    disabled={
                      availableLiquidRpt === "" || availableLiquidRpt === "0"
                    }
                    onClick={() => setModalStatus(ModalTypes.withdrawFunds)}
                  >
                    <span data-text="Withdraw">Withdraw</span>
                  </WithdrawsBtn>
                </ClaimRewardCont>
                <ClaimRewardCont>
                  <BorderClaimBtn>
                    <ClaimRewardsBtn
                      disabled={!isClaimable}
                      onClick={() => setModalStatus(ModalTypes.claimStableCoins)}
                    >
                      Claim
                    </ClaimRewardsBtn>
                  </BorderClaimBtn>
                </ClaimRewardCont>
              </RewardsBottom>
            </RewardsContainer>
            <TableContainer>
              <PrimaryHeaderText>Liquidity History</PrimaryHeaderText>
              <TableWrapper>
                <HistoryTable>
                  <Table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Operation</th>
                        <th>Value</th>
                        <th
                          style={{ textAlign: "center", padding: "0 0 7px 0" }}
                        >
                          Time remaining
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dynamics.map((v: any) => (
                        <tr key={v._id}>
                          <td className="notranslate">{renderDate(v.date)}</td>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() => openEtherScan(v.transactionId)}
                          >
                            {v.operation}
                          </td>
                          <ApyTd
                            className="notranslate"
                            operation={v.operation}
                          >
                            {renderAmount(v.value)}
                          </ApyTd>
                          <td className="notranslate">
                            {renderDaysRemaining(v.operation, v.timeR)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </HistoryTable>
              </TableWrapper>
            </TableContainer>
          </RewardsAndTable>
          <HistoryContainer>
            <HeaderContainer>
              <HistoryPrimaryHeader>cumulative historical volume</HistoryPrimaryHeader>
            </HeaderContainer>
            <HistoryBox>
			  <HistoryBoxItemInfo>
				<HistoryBoxItem>
					<HistoryBoxIcon>
					<img src={HistoryIcon1.default} alt="history icon" />
					</HistoryBoxIcon>
					<HistoryBoxItemAmount className="notranslate">
					{renderTokenAmountText(optimiserLiquidity)}
					</HistoryBoxItemAmount>
				</HistoryBoxItem>
				<HistoryBoxText>
					Total liquidity within optimiser
					</HistoryBoxText>
			  </HistoryBoxItemInfo>
			  <HistoryBoxItemInfo>
				<HistoryBoxItem>
					<HistoryBoxIcon>
					<img src={HistoryIcon2.default} alt="history icon" />
					</HistoryBoxIcon>
					<HistoryBoxItemAmount className="notranslate">
					{renderTokenAmountText(liquidityInIgaming)}
					</HistoryBoxItemAmount>
				</HistoryBoxItem>
				<HistoryBoxText>
					Liquidity in iGaming
				</HistoryBoxText>
			  </HistoryBoxItemInfo>
			  <HistoryBoxItemInfo>
				<HistoryBoxItem>
					<HistoryBoxIcon>
					<img src={HistoryIcon3.default} alt="history icon" />
					</HistoryBoxIcon>
					<HistoryBoxItemAmount className="notranslate">
					{thousandSeparator(
						calculateRptRewardApy(
						renderStats(
							getNetworkArgs(network),
							ethereumStakedRptUsd,
							binanceStakedRptUsd,
							maticStakedRptUsd
						),
						currentPrice,
						renderStats(
							getNetworkArgs(network),
							daysLeftEthereum,
							daysLeftBinance,
							daysLeftMatic
						),
						renderStats(
							getNetworkArgs(network),
							ethereumRewardRate,
							binanceRewardRate,
							maticRewardRate
						)
						)
					)}
					</HistoryBoxItemAmount>
				</HistoryBoxItem>
				<HistoryBoxText>
					RPT Staking APY
				</HistoryBoxText>
			  </HistoryBoxItemInfo>
            </HistoryBox>
          </HistoryContainer>
        </PageContainer>
      </DashboardPage>
      <Modal show={modalStatus === ModalTypes.stake} closeModal={closeModal}>
        <StakeModal closeModal={closeModal} />
      </Modal>
      <Modal
        show={modalStatus === ModalTypes.withdrawFunds}
        closeModal={closeModal}
      >
        <WithdrawFunds closeModal={closeModal} />
      </Modal>
      <Modal
        show={modalStatus === ModalTypes.claimStableCoins}
        closeModal={closeModal}
      >
        <ClaimStableCoins closeModal={closeModal} />
      </Modal>
    </TokenHolderLayout>
  );
};

export default LiquidityProvider;
