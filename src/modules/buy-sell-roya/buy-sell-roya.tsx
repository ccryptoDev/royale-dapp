import { useState, useEffect } from "react";
import { TokenHolderLayout } from "../../layouts";
import {
  BuySellContainer,
  PrimaryHeader,
  Text,
  Uniswap,
  BtnContainer,
  GoToBtn,
  Border
} from "./style";
import { getContractAddress, Networks } from "../../utils";
import { useSelector } from "react-redux";
import Modal from '../../components/bulk-upload-modal/modal'
import { GradientBorder } from "../../images";

const BuySellRoya = () => {
  const { network } = useSelector((state: any) => state.user);
  const [show, setShow] = useState(true);
  const closeModal = () => {
    setShow(false);
  };
  const openPancakeSwap = () => {
    window.open(
      "https://pancakeswap.info/pool/0xed644bc82edd5874163d45325b74949b6dbd8fc1",
      "_blank"
    );
  };

  const openDfynSwap = () => {
    window.open(
      "https://info.dfyn.network/pair/0x76c472c4d1f9c4a4b7e16af251bd32c3b1a7327f",
      "_blank"
    );
  };

  const renderComponent = () => {
    switch (network) {
      case Networks.ropsten:
      case Networks.mainnet:
        return (
          <>
            <Text>ROYA can be bought or sold via UNISWAP</Text>
            <Uniswap
              src={`https://app.uniswap.org/#/swap?outputCurrency=${
                getContractAddress().royaToken
              }`}
              height="660px"
              width="100%"
              id="myId"
            />
          </>
        );

      case Networks.bscTestnet:
      case Networks.bscMainnet:
        return (
          <>
            <Text>ROYA can be bought or sold via PANCAKESWAP</Text>
            <BtnContainer>
              <GoToBtn onClick={() => openPancakeSwap()}>
                Go To PancakeSwap
              </GoToBtn>
            </BtnContainer>
          </>
        );

      case Networks.maticMainnet:
      case Networks.maticTestnet:
        return (
          <>
            <Text>ROYA can be bought or sold via DFYN</Text>
            <BtnContainer>
              <GoToBtn onClick={() => openDfynSwap()}>Go To DFYN</GoToBtn>
            </BtnContainer>
          </>
        );

      default:
        return (
          <>
            {/* <Modal show={show} closeModal={closeModal} /> */}
            <Text>ROYA can be bought or sold via UNISWAP</Text>
            <Border>
              <Uniswap
                src={`https://app.uniswap.org/#/swap?outputCurrency=${
                  getContractAddress().royaToken
                }`}
                height="653px"
                width="100%"
                id="myId"
              />
            </Border>
          </>
        );
    }
  };

  return (
    <TokenHolderLayout pageTitle={"Buy or Sell ROYA"}>
      <BuySellContainer>
        <PrimaryHeader>ROYA Swap</PrimaryHeader>
        {renderComponent()}
      </BuySellContainer>
    </TokenHolderLayout>
  );
};

export default BuySellRoya;
