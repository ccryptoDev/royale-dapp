import { useEffect } from "react";
import { Header } from "./components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  LiquidityProvider,
  RptStaking,
  StakingLots,
  RoyaReserve,
  RoyaAnalytics,
  BuySellRoya,
  TermsAndConditions,
  ConvertMroya
} from "./modules";
import { Paths, StoreageKey } from "./utils";
import wallet from "./utils/wallet";

const App = () => {
  useEffect(() => {
    const handleReconnect = async () => {
      try {
        const walletType = localStorage.getItem(
          StoreageKey.walletType
        ) as string;

        if (!isNaN(parseInt(walletType))) {
          await wallet.setProvider(parseInt(walletType));
          await wallet.login(parseInt(walletType));
        }
      } catch (e) {
        console.log("error in re connect ", e);
      }
    };

    handleReconnect();
  }, []);

  return (
    <Router>
      <Header />
      <Switch>
        <Route
          exact
          path={Paths.liquidityProvider}
          component={LiquidityProvider}
        />
        <Route exact path={Paths.rptStaking} component={RptStaking} />
        <Route exact path={Paths.stakingLots} component={StakingLots} />
        <Route exact path={Paths.royaReserve} component={RoyaReserve} />
        <Route exact path={Paths.royaAnalytics} component={RoyaAnalytics} />
        <Route exact path={Paths.buySellRoya} component={BuySellRoya} />
        <Route exact path={Paths.temrs} component={TermsAndConditions} />
        <Route exact path={Paths.convertMroya} component={ConvertMroya} />
      </Switch>
    </Router>
  );
};

export default App;
