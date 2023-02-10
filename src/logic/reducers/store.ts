import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./user.reducer";
import stakeReducer from "./stake.reducer";
import rptStakingReducer from "./rptStaking.reducer";
import liquidityProviderReducer from "./liquidityProvider.reducer";
import stakingLotsReducer from "./stakingLots.reducer";
import royaReserveReducer from "./royaReserve.reducer";
import royaAnalyticsReducer from "./royaAnalytics.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  stake: stakeReducer,
  liquidityProvider: liquidityProviderReducer,
  rptStaking: rptStakingReducer,
  stakingLots: stakingLotsReducer,
  royaReserve: royaReserveReducer,
  royaAnalytics: royaAnalyticsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
