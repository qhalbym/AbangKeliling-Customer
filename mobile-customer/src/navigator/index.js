import React, { useEffect, useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { Text } from "react-native";

import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";

import { LoginScreen } from "../screens/Login";
import { RegisterScreen } from "../screens/Register";
import { HomeRouter } from "../routes/HomeRouter";
import { OngoingRouter } from "../routes/OngoingRouter";
import { TransactionRouter } from "../routes/TransactionsRouter";
import { TestScreen } from "../screens/test";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAToken } from "../store/actions/customerAction";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "black",
    background: "#fff",
    card: "#ffa70b",
    text: "black",
  },
};

export default function Navigator() {
  const [access_token, setAccess_Token] = useState(null);
  // const [access_token, setAccess_Token] = useState(true);
  const { token } = useSelector((state) => state.customerReducer);

  useEffect(() => {
    setAccess_Token(token);
  }, [token]);

  return (
    <NavigationContainer theme={MyTheme}>
      {!access_token ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            setAccess_Token={setAccess_Token}
          />
          <Tab.Screen name="Register" component={RegisterScreen} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = focused ? "md-home" : "md-home-outline";
                return <Ionicons name={iconName} size={size} color={color} />;
              } else if (route.name === "Transactions") {
                iconName = focused ? "history" : "history";
                return (
                  <MaterialIcons name={iconName} size={size} color={color} />
                );
              } else if (route.name == "Ongoing") {
                iconName = focused ? "progress-check" : "progress-check";
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              }
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeRouter}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Transactions"
            component={TransactionRouter}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Ongoing"
            component={OngoingRouter}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
