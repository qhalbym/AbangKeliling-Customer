import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "./middlewares/logger";
import sellersReducer from "./reducers/sellersReducer";
import sellerOngoingReducer from "./reducers/sellerOngoingReducer";
import productsReducer from "./reducers/productsReducer";
import ordersReducer from "./reducers/ordersReducer";
import orderWaitingReducer from "./reducers/orderWaitingReducer";
import customerReducer from "./reducers/customerReducer";
import cartReducer from "./reducers/cartReducer";

const rootReducer = combineReducers({
  sellersReducer,
  sellerOngoingReducer,
  productsReducer,
  ordersReducer,
  orderWaitingReducer,
  customerReducer,
  cartReducer,
});

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
