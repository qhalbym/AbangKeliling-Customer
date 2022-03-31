import {
  ORDERS_FETCH_SUCCESS,
  ORDERS_FETCH_LOADING,
  ORDERS_FETCH_ERROR,
  ORDERS_ONGOING_FETCH_SUCCESS,
  ORDERS_HISTORY_FETCH_SUCCESS
} from "../actions/actionType";

const initialState = {
  orders: [],
  errorOrders: null,
  loadingOrders: true,
  orderOngoing: [],
  orderHistory: []
};

function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case ORDERS_FETCH_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      };
    case ORDERS_HISTORY_FETCH_SUCCESS:
      return {
        ...state,
        orderHistory: action.payload,
      };
    case ORDERS_ONGOING_FETCH_SUCCESS:
      return {
        ...state,
        orderOngoing: action.payload,
      };
    case ORDERS_FETCH_LOADING:
      return {
        ...state,
        loadingOrders: action.payload,
      };
    case ORDERS_FETCH_ERROR:
      return {
        ...state,
        errorOrders: action.payload,
      };
    default:
      return state;
  }
}

export default ordersReducer;
