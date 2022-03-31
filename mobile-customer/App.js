import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View } from "react-native";

import { Provider, useSelector } from "react-redux";
import store from "./src/store";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Toast from "react-native-toast-message";

import Navigator from "./src/navigator";

export default function App() {
  const getToken = async () => {
    try {
      const res = await AsyncStorage.getItem("access_token");

      setAccess_Token(res);

      console.log(res, "===================================");
      if (access_token) {
        console.log("lagi loading");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Provider store={store}>
      <Navigator />
      <Toast />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
