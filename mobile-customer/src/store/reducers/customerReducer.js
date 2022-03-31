import {
  CUSTOMER_LOGIN,
  CUSTOMER_LOGOUT,
  CUSTOMER_TOKEN,
  CUSTOMERS_UPDATE_LOCATION,
  CUSTOMERS_UPDATE_LOCATION_LOADING,
  CUSTOMERS_UPDATE_LOCATION_ERROR,
  CUSTOMERS_FETCH_BY_ID_SUCCESS,
} from "../actions/actionType";

const initialState = {
  isLogin: false,
  token: null,
  location: {},
  locationLoading: true,
  locationError: false,
  customer: {},
};

function customerReducer(state = initialState, action) {
  switch (action.type) {
    case CUSTOMER_LOGIN:
      return {
        ...state,
        isLogin: true,
      };
    case CUSTOMER_LOGOUT:
      return {
        ...state,
        isLogin: false,
      };
    case CUSTOMER_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case CUSTOMERS_FETCH_BY_ID_SUCCESS:
      return {
        ...state,
        customer: action.payload,
      };
    case CUSTOMERS_UPDATE_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case CUSTOMERS_UPDATE_LOCATION_LOADING:
      return {
        ...state,
        locationError: action.payload,
      };
    case CUSTOMERS_UPDATE_LOCATION_ERROR:
      return {
        ...state,
        locationError: action.payload,
      };
    default:
      return state;
  }
}

export default customerReducer;
