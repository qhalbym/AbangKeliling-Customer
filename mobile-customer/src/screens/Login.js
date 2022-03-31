import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  TextInput,
  TouchableOpacity,
  // AsyncStorage
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { doLogin } from "../store/actions/customerAction";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const LoginScreen = ({ setAccess_Token }) => {
  // _storeData = async () => {
  //   try {
  //     await AsyncStorage.setItem("@MySuperStore:key", "I like to save it.");
  //   } catch (error) {
  //     // Error saving data
  //   }
  // };

  // const _retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("TASKS");
  //     if (value !== null) {
  //       // We have data!!
  //       console.log(value);
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };

  // const save = async (token)=>{
  //   try {

  //   } catch (err) {

  //   }
  // }

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = () => {
    // console.log(login);
    if (!login.email.trim() || !login.password.trim()) {
      alert("Field Can not be Empty!");
      return;
    }

    dispatch(doLogin(login));
  };

  return (
    <View style={styles.container}>
      <Text>This is Login Screen</Text>
      <Text>
        {login.email}
        {login.password}
      </Text>
      <TextInput
        autoCompleteType="email"
        keyboardType="email-address"
        returnKeyType="next"
        textContentType="emailAddress"
        placeholder="Email"
        placeholderTextColor={"white"}
        onChangeText={(text) => {
          setLogin({ ...login, email: text });
        }}
        style={styles.inputEmail}
      />
      <TextInput
        autoCompleteType="password"
        returnKeyType="next"
        secureTextEntry={true}
        textContentType="password"
        placeholder="Password"
        placeholderTextColor={"white"}
        onChangeText={(text) => setLogin({ ...login, password: text })}
        style={styles.inputEmail}
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => handleSubmit()}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputEmail: {
    backgroundColor: "grey",
    width: windowWidth * 0.8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    color: "white",
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: "grey",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  loginText: {
    color: "white",
  },
});
