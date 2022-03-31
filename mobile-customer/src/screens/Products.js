import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { Feather } from "react-native-vector-icons";

import { fetchProducts } from "../store/actions/productsActions";
import { ProductCard } from "../components/ProductCard";
import { addCart } from "../store/actions/cartActions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const errorCart = () => {
  Toast.show({
    type: "error",
    text1: "You have not add any products to cart",
    text2: "Please add at least 1 product to cart",
    visibilityTime: 3000,
  });
};

export const ProductsScreen = ({ route, navigation }) => {
  const { id, storeName } = route.params;
  // console.log(id, "<<<<<<<<< id");

  const { products, loadingProducts, errorProducts } = useSelector(
    (state) => state.productsReducer
  );

  const [order, setOrder] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("mounted in products");
    dispatch(fetchProducts(id));
    setOrder(products);
  }, [dispatch]);

  if (loadingProducts) {
    return (
      <View>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  // console.log(products, "<<<<<<< products");
  // console.log(order, "<<<<<<< ORDER");

  const handleOrder = () => {
    // console.log(order, "<<<<<< order di handle order");
    if (order.length == 0) {
      return errorCart();
    }

    let data = {
      SellerId: products[0].SellerId,
      ProductId: order,
    };
    dispatch(addCart(data));
    navigation.navigate("Cart");
  };

  const test = (a) => {
    let flag = false;
    order.forEach((el) => {
      if (el.ProductId === a.ProductId) {
        el.quantity = a.quantity;
        flag = true;
      }
    });
    if (!flag) {
      order.push(a);
    }
    // console.log(order, "<<<<<<<< habis di loop");
  };

  const renderProduct = ({ item }) => (
    <ProductCard product={item} setOrder={setOrder} onTest={test} />
  );

  //dummy
  // let products = [
  //   {
  //     _id: 1,
  //     name: "Bakso Tikus",
  //     price: 15000,
  //     image:
  //       "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cocktails-1594319263.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*",
  //     description: "Bakso dengan tikus berkualitas",
  //   },
  //   {
  //     _id: 2,
  //     name: "Bakso Boraks",
  //     price: 20000,
  //     image:
  //       "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cocktails-1594319263.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*",
  //     description: "Bakso dengan boraks kadaluarsa",
  //   },
  //   {
  //     _id: 3,
  //     name: "Bakso Boraks",
  //     price: 20000,
  //     image:
  //       "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cocktails-1594319263.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*",
  //     description: "Bakso dengan boraks kadaluarsa",
  //   },
  //   {
  //     _id: 4,
  //     name: "Bakso Boraks",
  //     price: 20000,
  //     image:
  //       "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cocktails-1594319263.jpg?crop=1.00xw:1.00xh;0,0&resize=980:*",
  //     description: "Bakso dengan boraks kadaluarsa",
  //   },
  // ];

  return (
    <View>
      <Text style={styles.storeName}>~{storeName}~</Text>
      <View style={styles.productsContainer}>
        <FlatList
          contentContainerStyle={styles.productList}
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item._id}
          nestedScrollEnabled
          // horizontal={false}
          numColumns={2}
        />
      </View>
      <TouchableOpacity
        style={styles.goToCartBtn}
        onPress={() => handleOrder()}
      >
        <Feather name={"shopping-bag"} color={"black"} size={20} />
        <Text style={styles.goToCartText}>Go To Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productsContainer: {
    height: windowHeight * 0.705,
  },
  storeName: {
    alignSelf: "center",
    fontSize: 18,
  },
  productList: {
    alignItems: "center",
  },
  goToCartBtn: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffa70b",
    width: windowWidth * 0.7,
    height: windowHeight * 0.05,
    // paddingHorizontal: 20,
    // paddingVertical: 5,
    borderRadius: 5,

    shadowColor: "#000",
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  goToCartText: {
    marginLeft: 5,
    textAlign: "center",
    fontSize: 15,
  },
});
