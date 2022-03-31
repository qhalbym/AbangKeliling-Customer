import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { DataTable } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import { postOrder } from "../store/actions/ordersActions";
import { addCart } from "../store/actions/cartActions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function Cart({ navigation }) {
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cartReducer);
  const { token } = useSelector((state) => state.customerReducer);

  // console.log(cart, "<<<<<<<<<<< cart nya ini");

  const renderCartProduct = ({ item }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dataTable}>{item.name}</DataTable.Cell>
      <DataTable.Cell numeric style={styles.dataTable}>
        {item.quantity}
      </DataTable.Cell>
      <DataTable.Cell numeric style={styles.dataTable}>
        {currencyFormat(item.price * item.quantity)}
      </DataTable.Cell>
    </DataTable.Row>
  );

  const handleOrder = async () => {
    console.log("masuk");
    await dispatch(postOrder(cart, token));
    // await dispatch(addCart([]));
    await navigation.navigate("Waiting");
  };

  console.log(cart, ">>>>>>>>>> ini cart");

  // int to currency
  function currencyFormat(num) {
    return (
      "Rp " +
      Number(num)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  }

  // count total price
  let totalPrice = 0;
  if (cart) {
    cart.ProductId.forEach((el) => (totalPrice += el.price * el.quantity));
  }

  return (
    <View>
      <View style={styles.container}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Product Name</DataTable.Title>
            <DataTable.Title numeric>Quantity</DataTable.Title>
            <DataTable.Title numeric>Price</DataTable.Title>
          </DataTable.Header>
        </DataTable>
        <FlatList
          data={cart.ProductId}
          renderItem={renderCartProduct}
          keyExtractor={(item) => item.ProductId}
        />
        <DataTable.Row>
          <DataTable.Cell style={styles.dataTable}>Total</DataTable.Cell>
          <DataTable.Cell>{ }</DataTable.Cell>
          <DataTable.Cell numeric style={styles.dataTable}>
            {currencyFormat(totalPrice)}
          </DataTable.Cell>
        </DataTable.Row>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => handleOrder()}
        >
          <Text style={styles.orderText}>Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    paddingTop: 10,
    paddingHorizontal: 30,
  },
  orderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    alignContent: "center",
  },
  dataTable: {},
  orderButton: {
    width: windowWidth * 0.8,
    backgroundColor: "#ffce34",
    borderRadius: 5,
    alignSelf: "center",
    // paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 20,
  },
  orderText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
