import { useState } from "react";
import {
  SelectWrapper,
  HeaderContainer,
  HeaderLine,
  HeaderText,
  SelectBoxWrapper,
  SelectBoxText,
  NetworkDropdown,
  NetworkIcon,
  NetworkText,
  DropdownArrow,
  NetworkDropdownList,
  NetworkDropdownWrapper,
  Border
} from "./style";
import {
  EtherScanIcon,
  BscScanIcon,
  MaticScanIcon,
  NetworkArrow,
} from "../../../../images";
import { NetworkOptions } from "../../../../utils";

interface Props {
  network: string;
  handleNetworkChange: (network: string) => void;
}

const NetworkSelect = (props: Props) => {
  const { network, handleNetworkChange } = props;
  const [open, setOpen] = useState(false);

  const renderIcon = (): string => {
    switch (network) {
      case NetworkOptions.ethereum:
        return EtherScanIcon.default;

      case NetworkOptions.binance:
        return BscScanIcon.default;

      case NetworkOptions.matic:
        return MaticScanIcon.default;

      default:
        return EtherScanIcon.default;
    }
  };

  const handleSelectNetwork = (network: string) => {
    handleNetworkChange(network);
    setOpen(false);
  };

  return (
	<>
		<HeaderLine />
		<SelectWrapper>
			<HeaderContainer>
				<HeaderText>NETWORK STATS</HeaderText>
				<SelectBoxText>Select network</SelectBoxText>
			</HeaderContainer>
			<SelectBoxWrapper>
				<NetworkDropdownWrapper>
				<Border>
					<NetworkDropdown onClick={() => setOpen((curr) => !curr)}>
						<NetworkIcon>
						<img src={renderIcon()} alt="network" />
						</NetworkIcon>
						<NetworkText>{network}</NetworkText>
						<DropdownArrow open={open}>
						<img src={NetworkArrow.default} alt="arrow" />
						</DropdownArrow>
					</NetworkDropdown>
				</Border>
				{open && (
					<NetworkDropdownList>
					<NetworkDropdown
						onClick={() => handleSelectNetwork(NetworkOptions.ethereum)}
					>
						<NetworkIcon>
						<img src={EtherScanIcon.default} alt="ethereum" />
						</NetworkIcon>
						<NetworkText>{NetworkOptions.ethereum}</NetworkText>
					</NetworkDropdown>
					<NetworkDropdown
						onClick={() => handleSelectNetwork(NetworkOptions.binance)}
					>
						<NetworkIcon>
						<img src={BscScanIcon.default} alt="binance" />
						</NetworkIcon>
						<NetworkText>{NetworkOptions.binance}</NetworkText>
					</NetworkDropdown>
					<NetworkDropdown
						onClick={() => handleSelectNetwork(NetworkOptions.matic)}
					>
						<NetworkIcon>
						<img src={MaticScanIcon.default} alt="polygon" />
						</NetworkIcon>
						<NetworkText>{NetworkOptions.matic}</NetworkText>
					</NetworkDropdown>
					</NetworkDropdownList>
				)}
				</NetworkDropdownWrapper>
			</SelectBoxWrapper>
		</SelectWrapper>
	</>
  );
};

export default NetworkSelect;
