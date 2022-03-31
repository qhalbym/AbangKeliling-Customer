import { CART_ADD_SUCCESS } from "./actionType";
import axios from "../../api/axios";

export const addCart = (payload) => {
  return async (dispatch) => {
    try {
      await dispatch(addCartSuccess(payload));
    } catch (err) {
      console.log(err, "<<<< err dari cartActions");
    }
  };
};

export const addCartSuccess = (payload) => {
  return {
    type: CART_ADD_SUCCESS,
    payload,
  };
};
