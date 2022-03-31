import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Button,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { HomeScreen } from "../screens/Home";
import { ProductsScreen } from "../screens/Products";
import { Cart } from "../screens/Cart";
import { Waiting } from "../screens/Waiting";
import { useDispatch } from "react-redux";
import { customerSetToken } from "../store/actions/customerAction";

const Stack = createNativeStackNavigator();

const Logo = () => {
  return (
    <Image
      style={StyleSheet.absoluteFill}
      source={{
        uri: "https://cdn.discordapp.com/attachments/951783863712104472/955838138343895070/unknown.png",
      }}
    />
  );
};

export const HomeRouter = () => {
  const dispatch = useDispatch();
  const doLogout = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      dispatch(customerSetToken(null));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: "AbangKeliling",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => doLogout()}
              style={{
                backgroundColor: "#ffce34",
                padding: 8,
                borderRadius: 5,
                flexDirection: "row",
              }}
            >
              <Text>Logout</Text>
              <MaterialCommunityIcons
                name={"logout"}
                color={"black"}
                size={20}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Waiting" component={Waiting} />
    </Stack.Navigator>
  );
};
