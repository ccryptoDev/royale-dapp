import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  SideBar,
  RoyaleLogoContainer,
  LinkContainer,
  Wrapper,
  ContentBox,
  ContentBoxHead,
  Border,
  MenuItem
} from "./style";
import { useHistory, useLocation } from "react-router-dom";
import { Networks, Paths, SocialLinks } from "../../utils";
import { MenuIcon } from "../../images";
import { Footer } from "../../components";
import { RoyaleLogo, CircleYellow } from "../../images";

interface Props {
  children: React.ReactNode;
  pageTitle?: string;
  backgroundColor?: string;
}

const TokenHolderLayout = (props: Props) => {
  const { children } = props;

  const [show, setShow] = useState(false);

  const [status, setStatus] = useState(1);

  const history = useHistory();

  const { pathname } = useLocation();

  const handleLinkClick = (path: string) => {
    history.push(path);
    setShow(false);
  };

  useEffect(() => {
	if (pathname.includes('rpt-staking')) setStatus(2)
	else if (pathname.includes('staking-lots')) setStatus(3)
	else if (pathname.includes('roya-reserve')) setStatus(4)
	else if (pathname.includes('network-stats')) setStatus(5)
	else if (pathname.includes('roya-swap')) setStatus(6)
	else if (pathname.includes('mroya-swap')) setStatus(7)
	else setStatus(1)
  }, [pathname])

  const { network } = useSelector((state: any) => state.user);

  const renderMroyaSwapLink = () => {
    switch (network) {
      case Networks.ropsten:
      case Networks.mainnet:
        return (
          <MenuItem>
            <Border active={pathname === Paths.convertMroya}>
              <LinkContainer
                active={pathname === Paths.convertMroya}
                onClick={() => handleLinkClick(Paths.convertMroya)}
              >
                mROYA Swap
				{status==7 && <img src={CircleYellow.default} />}
              </LinkContainer>
            </Border>
          </MenuItem>
        );

      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <SideBar show={show}>
	  	<RoyaleLogoContainer
          onClick={() => history.push(Paths.liquidityProvider)}
        >
          <img src={RoyaleLogo.default} alt="royale logo" />
        </RoyaleLogoContainer>
        <MenuItem>
          <Border active={pathname === Paths.liquidityProvider}>
            <LinkContainer
              active={pathname === Paths.liquidityProvider}
              onClick={() => handleLinkClick(Paths.liquidityProvider)}
            >
              Liquidity Provider
          {status==1 && <img src={CircleYellow.default} />}
            </LinkContainer>
          </Border>
        </MenuItem>
        <MenuItem>
          <Border active={pathname === Paths.rptStaking}>
            <LinkContainer
              active={pathname === Paths.rptStaking}
              onClick={() => handleLinkClick(Paths.rptStaking)}
            >
              RPT Staking
          {status==2 && <img src={CircleYellow.default} />}
            </LinkContainer>
          </Border>
        </MenuItem>
        <MenuItem>
          <Border active={pathname === Paths.stakingLots}>
            <LinkContainer
              active={pathname === Paths.stakingLots}
              onClick={() => handleLinkClick(Paths.stakingLots)}
            >
              Staking Lots
          {status==3 && <img src={CircleYellow.default} />}
            </LinkContainer>
          </Border>
        </MenuItem>
        <MenuItem>
          <Border active={pathname === Paths.royaReserve}>
            <LinkContainer
              active={pathname === Paths.royaReserve}
              onClick={() => handleLinkClick(Paths.royaReserve)}
            >
              ROYA Reserve
          {status==4 && <img src={CircleYellow.default} />}
            </LinkContainer>
          </Border>
        </MenuItem>
        <MenuItem>
          <Border active={pathname === Paths.royaAnalytics}>
            <LinkContainer
              active={pathname === Paths.royaAnalytics}
              onClick={() => handleLinkClick(Paths.royaAnalytics)}
            >
              Network Stats
          {status==5 && <img src={CircleYellow.default} />}
            </LinkContainer>
          </Border>
        </MenuItem>
        <MenuItem>
          <Border active={pathname === Paths.buySellRoya}>
            <LinkContainer
              active={pathname === Paths.buySellRoya}
              onClick={() => handleLinkClick(Paths.buySellRoya)}
            >
              ROYA Swap
          {status==6 && <img src={CircleYellow.default} />}
            </LinkContainer>
          </Border>
        </MenuItem>
        {renderMroyaSwapLink()}
        <MenuItem>
          <Border active={false}>
            <LinkContainer active={false}>
              <a href={SocialLinks.docs} target="_blank" rel="noopener noreferrer">
                Docs
              </a>
            </LinkContainer>
          </Border>
        </MenuItem>
      </SideBar>
      <ContentBox>
        <ContentBoxHead
          backgroundColor={
            pathname === Paths.royaAnalytics ? "" : "transparent"
          }
        >
          <img
            src={MenuIcon.default}
            alt="menu"
            onClick={() => setShow(true)}
          />
        </ContentBoxHead>
        {children}
        <Footer />
      </ContentBox>
    </Wrapper>
  );
};

export default TokenHolderLayout;
