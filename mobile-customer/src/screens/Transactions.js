import React, { useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  FlatList,
} from "react-native";
import { MaterialIcons, Entypo } from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersComplete } from "../store/actions/ordersActions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const TransactionsScreen = () => {
  const { orderHistory, errorOrders, loadingOrders } = useSelector(
    (state) => state.ordersReducer
  );
  // console.log(orderHistory, "xxxxxxxxxxxxx order history");
  const { token } = useSelector((state) => state.customerReducer);

  const dispatch = useDispatch();

  const renderOrderHistory = ({ item }) => {
    let income = 0;
    item.ProductId.forEach((el) => {
      income += el.price * el.quantity;
    });
    return (
      <View>
        <View style={styles.historyContentContainer}>
          <MaterialIcons name={"attach-money"} color={"green"} size={18} />
          <Text>{currencyFormat(income)}</Text>
          <Text>{item.updatedAt.split("T").slice(0, -1)}</Text>
        </View>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
          }}
        />
      </View>
    );
  };

  useEffect(() => {
    dispatch(fetchOrdersComplete(token));
  }, []);

  // int to currency
  function currencyFormat(num) {
    return (
      "Rp " +
      Number(num)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  }

  // dummy
  // const orderHistory = [
  //   {
  //     ProductId: [
  //       {
  //         ProductId: 2,
  //         name: "Bakso Boraks",
  //         price: 15000,
  //         quantity: 4,
  //       },
  //     ],
  //     updatedAt: "2022-03-20T23:28:32.719+00:00",
  //   },
  //   {
  //     ProductId: [
  //       {
  //         ProductId: 2,
  //         name: "Bakso Boraks",
  //         price: 20000,
  //         quantity: 4,
  //       },
  //       {
  //         ProductId: 2,
  //         name: "Bakso Boraks",
  //         price: 12000,
  //         quantity: 2,
  //       },
  //     ],
  //     updatedAt: "2022-03-20T23:28:32.719+00:00",
  //   },
  // ];

  return (
    <View>
      <View style={styles.headerContainer}>
        <Entypo name={"archive"} color={"black"} size={35} />
        <Text style={styles.headerTitle}>
          This Is Your Transactions History
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 1,
          width: windowWidth * 0.6,
          alignSelf: "center",
          marginVertical: 5,
        }}
      />
      <FlatList
        data={orderHistory}
        renderItem={renderOrderHistory}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  headerTitle: {
    alignSelf: "center",
    fontSize: 20,
    marginBottom: 10,
  },
  historyContentContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
