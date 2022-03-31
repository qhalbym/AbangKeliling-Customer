import {
  SELLERS_FETCH_SUCCESS,
  SELLERS_FETCH_LOADING,
  SELLERS_FETCH_ERROR,
  SELLER_FETCH_ONE_SUCCESS,
} from "../actions/actionType";

const initialState = {
  sellers: [],
  errorSellers: null,
  loadingSellers: true,
  sellerOngoing: {},
};

function sellersReducer(state = initialState, action) {
  switch (action.type) {
    case SELLERS_FETCH_SUCCESS:
      return {
        ...state,
        sellers: action.payload,
      };
    case SELLER_FETCH_ONE_SUCCESS:
      return {
        ...state,
        sellerOngoing: action.payload,
      };
    case SELLERS_FETCH_LOADING:
      return {
        ...state,
        loadingSellers: action.payload,
      };
    case SELLERS_FETCH_ERROR:
      return {
        ...state,
        errorSellers: action.payload,
      };
    default:
      return state;
  }
}

export default sellersReducer;
