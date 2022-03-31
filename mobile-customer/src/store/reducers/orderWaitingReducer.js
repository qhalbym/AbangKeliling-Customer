import { ORDER_WAITING_FETCH_SUCCESS } from "../actions/actionType";

const initialState = {
  orderWaiting: null,
};

function orderWaitingReducer(state = initialState, action) {
  switch (action.type) {
    case ORDER_WAITING_FETCH_SUCCESS:
      return {
        ...state,
        orderWaiting: action.payload,
      };
    default: {
      return state;
    }
  }
}

export default orderWaitingReducer;
