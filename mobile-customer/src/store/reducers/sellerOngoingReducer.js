import { SELLER_FETCH_ONE_SUCCESS } from "../actions/actionType";

const initialState = {
  sellerOngoing: [],
};

function sellerOngoingReducer(state = initialState, action) {
  switch (action.type) {
    case SELLER_FETCH_ONE_SUCCESS:
      return {
        ...state,
        sellerOngoing: action.payload,
      };
    default:
      return state;
  }
}

export default sellerOngoingReducer;
