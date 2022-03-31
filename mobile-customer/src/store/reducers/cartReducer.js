import { CART_ADD_SUCCESS } from "../actions/actionType";

const initialState = {
  cart: [],
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_ADD_SUCCESS:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
}

export default cartReducer;
