import {
  PRODUCTS_FETCH_SUCCESS,
  PRODUCTS_FETCH_LOADING,
  PRODUCTS_FETCH_ERROR,
} from "./actionType";
import axios from "../../api/axios";

export const fetchProducts = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      console.log("MASUK FETCHPRODUCTS");
      console.log(data, "-----------------");

      if (!data) {
        throw new Error("Something went wrong");
      }

      await dispatch(fetchProductsSuccess(data));
    } catch (err) {
      dispatch(fetchProductsError(err));
    } finally {
      dispatch(fetchProductsLoading(false));
    }
  };
};

export const fetchProductsSuccess = (payload) => {
  return {
    type: PRODUCTS_FETCH_SUCCESS,
    payload,
  };
};
export const fetchProductsLoading = (payload) => {
  return {
    type: PRODUCTS_FETCH_LOADING,
    payload,
  };
};
export const fetchProductsError = (payload) => {
  return {
    type: PRODUCTS_FETCH_ERROR,
    payload,
  };
};
