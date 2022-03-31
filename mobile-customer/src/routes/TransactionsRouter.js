import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TransactionsScreen } from "../screens/Transactions";

const Stack = createNativeStackNavigator();

export const TransactionRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
    </Stack.Navigator>
  );
};
