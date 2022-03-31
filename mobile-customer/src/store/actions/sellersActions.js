import {
  SELLERS_FETCH_SUCCESS,
  SELLERS_FETCH_LOADING,
  SELLERS_FETCH_ERROR,
  SELLER_FETCH_ONE_SUCCESS,
} from "./actionType";
import axios from "../../api/axios";

export const fetchSellers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/sellers");

      if (!data) {
        throw new Error("Something went wrong");
      }
      await dispatch(fetchSellersSuccess(data));
    } catch (err) {
      dispatch(fetchSellersError(err));
    } finally {
      dispatch(fetchSellersLoading(false));
    }
  };
};

export const fetchOneSellers = (sellerId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/sellers/${sellerId}`);

      if (!data) {
        throw new Error("Something went wrong");
      }
      await dispatch(fetchOngoingSellersSuccess(data));
    } catch (err) {
      dispatch(fetchSellersError(err));
    } finally {
      dispatch(fetchSellersLoading(false));
    }
  };
};

export const fetchSellersSuccess = (payload) => {
  return {
    type: SELLERS_FETCH_SUCCESS,
    payload,
  };
};
export const fetchSellersLoading = (payload) => {
  return {
    type: SELLERS_FETCH_LOADING,
    payload,
  };
};
export const fetchSellersError = (payload) => {
  return {
    type: SELLERS_FETCH_ERROR,
    payload,
  };
};
export const fetchOngoingSellersSuccess = (payload) => {
  return {
    type: SELLER_FETCH_ONE_SUCCESS,
    payload,
  };
};
