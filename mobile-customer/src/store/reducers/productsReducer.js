import {
  PRODUCTS_FETCH_SUCCESS,
  PRODUCTS_FETCH_LOADING,
  PRODUCTS_FETCH_ERROR,
} from "../actions/actionType";

const initialState = {
  products: [],
  errorProducts: null,
  loadingProducts: true,
};

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCTS_FETCH_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    case PRODUCTS_FETCH_LOADING:
      return {
        ...state,
        loadingProducts: action.payload,
      };
    case PRODUCTS_FETCH_ERROR:
      return {
        ...state,
        errorProducts: action.payload,
      };
    default:
      return state;
  }
}

export default productsReducer;
