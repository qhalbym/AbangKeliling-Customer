import {
  CUSTOMER_LOGIN,
  CUSTOMER_LOGOUT,
  CUSTOMER_TOKEN,
  CUSTOMERS_UPDATE_LOCATION,
  CUSTOMERS_UPDATE_LOCATION_LOADING,
  CUSTOMERS_UPDATE_LOCATION_ERROR,
  CUSTOMERS_FETCH_BY_ID_SUCCESS,
} from "../actions/actionType";
import axios from "../../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export const setAToken = async (value) => {
//   try {
//     const token = await AsyncStorage.setItem('access_token', value);
//     console.log(token, '-02313210asd');
//   } catch (err) {
//     console.log(err);
//   }
// };

export const getAToken = async () => {
  try {
    return await AsyncStorage.getItem("access_token");
    // console.log(value, '===dariAction');
  } catch (err) {
    console.log(err);
  }
};

export function doRegister(payload) {
  return async (dispatch) => {
    try {
      console.log(payload);
      const { data } = await axios.post("/customers/register", payload);
      console.log("success register");
    } catch (err) {
      console.log("gagal register");
      console.log(err);
    }
  };
}

export function doLogin(payload) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/customers/login", payload);
      dispatch(customerLogin());
      dispatch(customerSetToken(data.access_token));
      console.log(data);
      if (data) {
        try {
          await AsyncStorage.setItem("access_token", data.access_token);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export const fetchCustomerById = (access_token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/customers", {
        headers: { access_token: access_token },
      });

      if (!data) {
        throw new Error("Something went wrong");
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateLocation = (id, location, access_token) => {
  return async (dispatch) => {
    try {
      dispatch(setLocationLoading(true));
      await axios.patch(
        "/customers/" + id,
        { location },
        { headers: { access_token } }
      );
      dispatch(setLocation(location));
      dispatch(setLocationLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLocationError(true));
    }
  };
};

export function customerLogin() {
  return {
    type: CUSTOMER_LOGIN,
  };
}

export function customerLogout() {
  return {
    type: CUSTOMER_LOGOUT,
  };
}

export function customerSetToken(payload) {
  return {
    type: CUSTOMER_TOKEN,
    payload,
  };
}

export function fetchByIdSuccess(payload) {
  return {
    type: CUSTOMERS_FETCH_BY_ID_SUCCESS,
    payload,
  };
}

export function setLocation(payload) {
  return {
    type: CUSTOMERS_UPDATE_LOCATION,
    payload,
  };
}

export function setLocationLoading(payload) {
  return {
    type: CUSTOMERS_UPDATE_LOCATION_LOADING,
    payload,
  };
}

export function setLocationError(payload) {
  return {
    type: CUSTOMERS_UPDATE_LOCATION_ERROR,
    payload,
  };
}
