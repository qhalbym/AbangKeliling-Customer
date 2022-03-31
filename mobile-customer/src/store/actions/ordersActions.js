import {
  ORDERS_FETCH_SUCCESS,
  ORDERS_FETCH_LOADING,
  ORDERS_FETCH_ERROR,
  ORDER_WAITING_FETCH_SUCCESS,
  ORDERS_ONGOING_FETCH_SUCCESS,
  ORDERS_HISTORY_FETCH_SUCCESS,
} from "./actionType";
import axios from "../../api/axios";

export const fetchOrders = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/orders", {
        headers: { access_token: token },
      });

      if (!data) {
        throw new Error("Something went wrong");
      }

      await dispatch(fetchOrdersSuccess(data));
    } catch (err) {
      dispatch(fetchOrdersError(err));
    } finally {
      dispatch(fetchOrdersLoading(false));
    }
  };
};

export const fetchOrdersWaiting = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/orders/waiting", {
        headers: { access_token: token },
      });

      await dispatch(fetchOrderWaitingSuccess(data));
    } catch (err) {
      console.log(err, "<<<<<< err dari ordersActions");
    } finally {
      console.log("finally");
    }
  };
};

export const fetchOrdersOngoing = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/orders/ongoing", {
        headers: { access_token: token },
      });

      if (!data) {
        throw new Error("Something went wrong");
      }
      await dispatch(fetchOngoingOrdersSuccess(data));
    } catch (err) {
      dispatch(fetchOrdersError(err));
    } finally {
      dispatch(fetchOrdersLoading(false));
    }
  };
};

export const fetchOrdersComplete = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/orders/history", {
        headers: { access_token: token },
      });

      if (!data) {
        throw new Error("Something went wrong");
      }
      await dispatch(fetchHistoryOrdersSuccess(data));
    } catch (err) {
      dispatch(fetchOrdersError(err));
    } finally {
      dispatch(fetchOrdersLoading(false));
    }
  };
};

export const postOrder = (order, access_token) => {
  return async (dispatch) => {
    try {
      await axios.post("/orders", { order }, { headers: { access_token } });
    } catch (error) {
      console.log("+++++++++++++++");
      console.log(error);
    }
  };
};

export const fetchOrdersSuccess = (payload) => {
  return {
    type: ORDERS_FETCH_SUCCESS,
    payload,
  };
};
export const fetchOrdersLoading = (payload) => {
  return {
    type: ORDERS_FETCH_LOADING,
    payload,
  };
};
export const fetchOrdersError = (payload) => {
  return {
    type: ORDERS_FETCH_ERROR,
    payload,
  };
};
export const fetchOrderWaitingSuccess = (payload) => {
  return {
    type: ORDER_WAITING_FETCH_SUCCESS,
    payload,
  };
};
export const fetchOngoingOrdersSuccess = (payload) => {
  return {
    type: ORDERS_ONGOING_FETCH_SUCCESS,
    payload,
  };
};
export const fetchHistoryOrdersSuccess = (payload) => {
  return {
    type: ORDERS_HISTORY_FETCH_SUCCESS,
    payload,
  };
};
