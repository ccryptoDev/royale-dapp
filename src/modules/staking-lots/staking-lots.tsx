import { TokenHolderLayout } from "../../layouts";
import { useState, useEffect } from "react";
import {
  StakingContainer,
  Title,
  SubTitle,
  RoyalsLotsItem,
  RoyaLotsContainer,
  ImgContainer,
  LotsHeading,
  LotsValue,
  LotsDesc,
  BtnContainer,
  LotStakeButton,
  LotUnstakeButton,
  LotsApy,
  BottomContainer,
  ListContainer,
  ClaimRoyaContainer,
  Header,
  ClaimButton,
  TableHeader,
  TableHeaderText,
  TableRow,
  LotColumn,
  AmountCol,
  TableRowContainer,
  SuccessBox,
  CongratsText,
  SuccessText,
  CloseSuccess,
  RewardsContainer,
  RewardRow,
  RewardType,
  RewardRowDetail,
  RewardDash,
  RewardAmount,
  LoadingText,
  QueenNftContainer,
  QueenWrapper,
  QueenIcon,
  QueenTitle,
  QueenBtnContainer,
  QueenBtn,
  QueenInfo,
  Border,
  BorderUnstakeBtn,
  BorderClaimBtn
} from "./style";
import {
  RoyaleQueenImg,
  RoyaleKingImg,
  RoyaleFlushImg,
  CrossIcon,
  QueenNftICon,
} from "../../images";
import {
  StakingLotModals,
  SuccessMsgType,
  LotRewardProcess,
  fromUsdc,
  renderTokenAmountText,
  getConfig,
  LotPrice,
  thousandSeparator,
} from "../../utils";
import {
  BuyQroya,
  BuyKroya,
  BuyFroya,
  Modal,
  SellFroya,
  SellKroya,
  SellQroya,
  Loader,
  KroyaDiscount,
} from "../../components";
import { useSelector, useDispatch } from "react-redux";
import {
  getUSerLotReward,
  getUserTotalLots,
  getRoyaBalance,
  closeSuccessMsg,
  claimQroyaRewards,
  claimKroyaRewards,
  claimFroyaRewards,
  getNftBalance,
  setNftId,
  getLockedNFTs,
  sellQroyaLot,
  getDiscountedQueenLots,
} from "../../logic/actions";

const StakingLots = () => {
  const [modalStatus, setModalStatus] = useState(StakingLotModals.closed);

  const {
    totalQroyaLot,
    totalKroyaLot,
    totalFroyaLot,
    claimingProcess,
    queenLotReward,
    kinglotReward,
    flushLotReward,
    lotTypeBought,
    lotAmountBought,
    lotTypeSold,
    lotAmountSold,
    successMsgType,
    queenNft,
    lockedNfts,
    lotOperation,
    sellQueenLotNftId,
    totalDiscountedQueenLot,
  } = useSelector((state: any) => state.stakingLots);

  const { userAddress, walletConnected } = useSelector(
    (state: any) => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (walletConnected) {
      dispatch(getUSerLotReward(userAddress));
      dispatch(getUserTotalLots(userAddress));
      dispatch(getRoyaBalance(userAddress));
      dispatch(getNftBalance(userAddress));
      dispatch(getLockedNFTs(userAddress));
      dispatch(getDiscountedQueenLots(userAddress));
    }
  }, [userAddress, dispatch, walletConnected]);

  const openModal = (modalType: number) => {
    setModalStatus(modalType);
  };

  const closeModal = () => {
    setModalStatus(StakingLotModals.closed);
  };

  const handleCloseMsg = () => {
    dispatch(closeSuccessMsg());
  };

  const handleQueenReward = () => {
    if (walletConnected) {
      dispatch(claimQroyaRewards(userAddress));
    }
  };

  const handleKingReward = () => {
    if (walletConnected) {
      dispatch(claimKroyaRewards(userAddress));
    }
  };

  const handleFlushReward = () => {
    if (walletConnected) {
      dispatch(claimFroyaRewards(userAddress));
    }
  };

  const handleStakeClick = (nftId: number) => {
    dispatch(setNftId(nftId));
    openModal(StakingLotModals.queenDiscount);
  };

  const renderNftContainer = () => {
    if (queenNft.length) {
      return queenNft.map((v: number, k: number) => (
        <QueenInfo key={k}>
          <QueenIcon src={QueenNftICon.default} alt="queen icon" />
          <QueenTitle>Queen of Queens</QueenTitle>
          <LotsValue className="notranslate">7,200/Lot</LotsValue>
          <QueenBtnContainer>
            <QueenBtn onClick={() => handleStakeClick(v)}>Stake</QueenBtn>
          </QueenBtnContainer>
        </QueenInfo>
      ));
    }

    return null;
  };

  const handleUnstakeLockedNft = (nftId: string) => {
    console.log("nft id ", nftId);

    if (walletConnected) {
      dispatch(sellQroyaLot(userAddress, 1, nftId));
    }
  };

  const renderLockedNfts = () => {
    if (lockedNfts.length) {
      return lockedNfts.map((v: string, k: number) => (
        <QueenInfo key={k}>
          <QueenIcon src={QueenNftICon.default} alt="queen icon" />
          <QueenTitle>Queen of Queens</QueenTitle>
          <LotsValue className="notranslate">7,200/Lot</LotsValue>
          <QueenBtnContainer>
            <QueenBtn
              onClick={() => handleUnstakeLockedNft(v)}
              disabled={lotOperation > StakingLotModals.closed}
            >
              {sellQueenLotNftId === v &&
              lotOperation > StakingLotModals.closed ? (
                <Loader />
              ) : (
                "Unstake"
              )}
            </QueenBtn>
          </QueenBtnContainer>
        </QueenInfo>
      ));
    }

    return null;
  };

  const renderTotalQroyaLots = () => {
    if (parseInt(totalQroyaLot) - parseInt(totalDiscountedQueenLot) >= 0) {
      return parseInt(totalQroyaLot) - parseInt(totalDiscountedQueenLot);
    }

    return 0;
  };

  return (
    <TokenHolderLayout pageTitle={"Staking Lots"}>
      <StakingContainer>
        <SuccessBox show={successMsgType === SuccessMsgType.showBuySuccess}>
          <CongratsText>Congratulations!</CongratsText>
          <SuccessText>
            {`You have acquired ${lotAmountBought} ${lotTypeBought} ${
              lotAmountBought > 1 ? "lots" : "lot"
            }!`}
          </SuccessText>
          <CloseSuccess onClick={handleCloseMsg}>
            <img src={CrossIcon.default} alt="close" />
          </CloseSuccess>
        </SuccessBox>
        <SuccessBox show={successMsgType === SuccessMsgType.showSellSuccess}>
          <CongratsText>Congratulations!</CongratsText>
          <SuccessText>
            {`You have unstaked ${lotAmountSold} ${lotTypeSold} ${
              lotAmountSold > 1 ? "lots" : "lot"
            }!`}
          </SuccessText>
          <CloseSuccess onClick={handleCloseMsg}>
            <img src={CrossIcon.default} alt="close" />
          </CloseSuccess>
        </SuccessBox>
        <Title>Staking Lots</Title>
        <SubTitle>Let your ROYA earn for you</SubTitle>
        <RoyaLotsContainer>
          <Border>
            <RoyalsLotsItem>
              <ImgContainer>
                <img src={RoyaleQueenImg.default} alt="royal queen" />
              </ImgContainer>
              <LotsHeading>
                (qROYA)
              </LotsHeading>
              <LotsValue className="notranslate">
                {thousandSeparator(LotPrice.queenLot.toString())} ROYA/Lot
              </LotsValue>
              <LotsDesc>
                Staking rewards are distributed to active staking lots holders.
                Click the Confirm button below and confirm the transaction to
                acquire staking lots.
              </LotsDesc>
              <BtnContainer>
                <LotStakeButton
                  onClick={() => openModal(StakingLotModals.buyQueen)}
                >
                  <span data-text="Stake">Stake</span>
                </LotStakeButton>
                <BorderUnstakeBtn>
                  <LotUnstakeButton
                    onClick={() => openModal(StakingLotModals.sellQueen)}
                    disabled={renderTotalQroyaLots() === 0}
                  >
                    <span data-text="Unstake">Unstake</span>
                  </LotUnstakeButton>
                </BorderUnstakeBtn>
              </BtnContainer>
              <LotsApy>Variable APY</LotsApy>
            </RoyalsLotsItem>
          </Border>
          <Border>
            <RoyalsLotsItem>
              <ImgContainer>
                <img src={RoyaleKingImg.default} alt="royal king" />
              </ImgContainer>
              <LotsHeading>
                (kROYA)
              </LotsHeading>
              <LotsValue className="notranslate">
                {thousandSeparator(LotPrice.kingLot.toString())} ROYA/Lot
              </LotsValue>
              <LotsDesc>
                Staking rewards are distributed to active staking lots holders.
                Click the Confirm button below and confirm the transaction to
                acquire staking lots.
              </LotsDesc>
              <BtnContainer>
                <LotStakeButton
                  onClick={() => openModal(StakingLotModals.buyKing)}
                >
                  <span data-text="Stake">Stake</span>
                </LotStakeButton>
                <BorderUnstakeBtn>
                  <LotUnstakeButton
                    onClick={() => openModal(StakingLotModals.sellKing)}
                    disabled={totalKroyaLot === "0"}
                  >
                    <span data-text="Unstake">Unstake</span>
                  </LotUnstakeButton>
                </BorderUnstakeBtn>
              </BtnContainer>
              <LotsApy>Variable APY</LotsApy>
            </RoyalsLotsItem>
          </Border>
          <Border>
            <RoyalsLotsItem>
              <ImgContainer>
                <img src={RoyaleFlushImg.default} alt="royal flush" />
              </ImgContainer>
              <LotsHeading>
                (fROYA)
              </LotsHeading>
              <LotsValue className="notranslate">
                {thousandSeparator(LotPrice.flushLot.toString())} ROYA/Lot
              </LotsValue>
              <LotsDesc>
                Staking rewards are distributed to active staking lots holders.
                Click the Confirm button below and confirm the transaction to
                acquire staking lots.
              </LotsDesc>
              <BtnContainer>
                <LotStakeButton
                  onClick={() => openModal(StakingLotModals.BuyFlush)}
                >
                  <span data-text="Stake">Stake</span>
                </LotStakeButton>
                <BorderUnstakeBtn>
                  <LotUnstakeButton
                    onClick={() => openModal(StakingLotModals.sellFlush)}
                    disabled={totalFroyaLot === "0"}
                  >
                    <span data-text="Unstake">Unstake</span>
                  </LotUnstakeButton>
                </BorderUnstakeBtn>
              </BtnContainer>
              <LotsApy>Variable APY</LotsApy>
            </RoyalsLotsItem>
          </Border>
        </RoyaLotsContainer>
        <BottomContainer>
          <ListContainer>
            <Header>List of lots</Header>
            <TableHeader>
              <TableHeaderText>Lot</TableHeaderText>
              <TableHeaderText>Discounted</TableHeaderText>
              <TableHeaderText>Non-Discounted</TableHeaderText>
            </TableHeader>
            <TableRowContainer>
              <TableRow>
                <LotColumn>qROYA</LotColumn>
                <AmountCol className="notranslate">
                  {totalDiscountedQueenLot}
                </AmountCol>
                <AmountCol className="notranslate">
                  {renderTotalQroyaLots()}
                </AmountCol>
              </TableRow>
              <TableRow>
                <LotColumn>kROYA</LotColumn>
                <AmountCol className="notranslate">0</AmountCol>
                <AmountCol className="notranslate">{totalKroyaLot}</AmountCol>
              </TableRow>
              <TableRow>
                <LotColumn>fROYA</LotColumn>
                <AmountCol className="notranslate">0</AmountCol>
                <AmountCol className="notranslate">{totalFroyaLot}</AmountCol>
              </TableRow>
            </TableRowContainer>
          </ListContainer>
          <ClaimRoyaContainer>
            <Header>EARNINGS FROM STAKING LOTS</Header>
            <RewardsContainer>
              <RewardRow>
			  	<RewardRowDetail>
					<RewardType>qROYA</RewardType>
					<RewardDash />
					<RewardAmount className="notranslate">
					{`${renderTokenAmountText(fromUsdc(queenLotReward))} USDC`}
					</RewardAmount>
				</RewardRowDetail>
                <BorderClaimBtn>
                  <ClaimButton
                    onClick={() => handleQueenReward()}
                    disabled={
                      claimingProcess > LotRewardProcess.idle ||
                      queenLotReward === "0"
                    }
                  >
                    {claimingProcess === LotRewardProcess.qlotReward ? (
                      <Loader />
                    ) : (
                      "Claim"
                    )}
                  </ClaimButton>
                </BorderClaimBtn>
			  </RewardRow>
              <RewardRow>
			  	<RewardRowDetail>
					<RewardType>kROYA</RewardType>
					<RewardDash />
					<RewardAmount className="notranslate">
					{`${renderTokenAmountText(fromUsdc(kinglotReward))} USDC`}
					</RewardAmount>
				</RewardRowDetail>
                <BorderClaimBtn>
                  <ClaimButton
                    onClick={() => handleKingReward()}
                    disabled={
                      claimingProcess > LotRewardProcess.idle ||
                      kinglotReward === "0"
                    }
                  >
                    {claimingProcess === LotRewardProcess.klotReward ? (
                      <Loader />
                    ) : (
                      "Claim"
                    )}
                  </ClaimButton>
                </BorderClaimBtn>
              </RewardRow>
              <RewardRow>
				<RewardRowDetail>
					<RewardType>fROYA</RewardType>
					<RewardDash />
					<RewardAmount className="notranslate">
						{`${renderTokenAmountText(fromUsdc(flushLotReward))} USDC`}
					</RewardAmount>
				</RewardRowDetail>
                <BorderClaimBtn>
                  <ClaimButton
                    onClick={() => handleFlushReward()}
                    disabled={
                      claimingProcess > LotRewardProcess.idle ||
                      flushLotReward === "0"
                    }
                  >
                    {claimingProcess === LotRewardProcess.flotReward ? (
                      <Loader />
                    ) : (
                      "Claim"
                    )}
                  </ClaimButton>
                </BorderClaimBtn>
              </RewardRow>
              {claimingProcess > LotRewardProcess.idle && (
                <LoadingText>{getConfig().transactionText}</LoadingText>
              )}
            </RewardsContainer>
          </ClaimRoyaContainer>
        </BottomContainer>

        <QueenNftContainer>
          <Header>Royale NFT Collection</Header>
          <QueenWrapper>
            {renderNftContainer()}
            {renderLockedNfts()}
          </QueenWrapper>
        </QueenNftContainer>
      </StakingContainer>

      <Modal
        show={modalStatus === StakingLotModals.buyQueen}
        closeModal={closeModal}
      >
        <BuyQroya closeModal={closeModal} />
      </Modal>
      <Modal
        show={modalStatus === StakingLotModals.buyKing}
        closeModal={closeModal}
      >
        <BuyKroya closeModal={closeModal} />
      </Modal>
      <Modal
        show={modalStatus === StakingLotModals.BuyFlush}
        closeModal={closeModal}
      >
        <BuyFroya closeModal={closeModal} />
      </Modal>

      <Modal
        show={modalStatus === StakingLotModals.sellQueen}
        closeModal={closeModal}
      >
        <SellQroya closeModal={closeModal} />
      </Modal>
      <Modal
        show={modalStatus === StakingLotModals.sellKing}
        closeModal={closeModal}
      >
        <SellKroya closeModal={closeModal} />
      </Modal>
      <Modal
        show={modalStatus === StakingLotModals.sellFlush}
        closeModal={closeModal}
      >
        <SellFroya closeModal={closeModal} />
      </Modal>
      <Modal
        show={modalStatus === StakingLotModals.queenDiscount}
        closeModal={closeModal}
      >
        <KroyaDiscount closeModal={closeModal} />
      </Modal>
    </TokenHolderLayout>
  );
};

export default StakingLots;
