import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Ongoing } from "../screens/OnGoing";
import { MapScreen } from "../screens/Map";

const Stack = createNativeStackNavigator();

export const OngoingRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Ongoing" component={Ongoing} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
};
