import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersOngoing } from "../store/actions/ordersActions";
import { fetchOneSellers } from "../store/actions/sellersActions";

import { MaterialIcons, Entypo } from "react-native-vector-icons";

import { MapScreen } from "./Map";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const getWidth = (num) => (num * windowWidth) / 100;
const getHeight = (num) => (num * windowHeight) / 100;

export const Ongoing = ({ navigation }) => {
  const { orderOngoing, errorOrders, loadingOrders } = useSelector(
    (state) => state.ordersReducer
  );

  const { sellerOngoing } = useSelector((state) => state.sellerOngoingReducer);
  const { token } = useSelector((state) => state.customerReducer);
  const dispatch = useDispatch();
  function currencyFormat(num) {
    return (
      "Rp " +
      Number(num)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  }

  // console.log(orderOngoing[0], "<<<<======dariscreeenONGOING");
  function titleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchOrdersOngoing(token));
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  if (loadingOrders) {
    return (
      <View>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }

  const renderOrderOngoing = ({ item, index }) => (
    <Text style={styles.orderItem}>
      {index + 1}
      {". "}
      {titleCase(item.name)} {" x "} {item.quantity}{" "}
      {currencyFormat(item.price * item.quantity)}
    </Text>
  );
  // console.log(orderOngoing, "=======================<<<<<<<<orderongoing");

  if (orderOngoing.length == 0) {
    return (
      <View style={styles.noOngoinOrderContainer}>
        <Image
          style={styles.imageIllustrations}
          source={require("../../assets/undraw_mobile_user_re_xta4.png")}
        />
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          You don't have any ongoing order
        </Text>
        <Text>Explore abang-abang around you</Text>
      </View>
    );
  }

  let totalPrice = 0;
  orderOngoing[0]?.ProductId.forEach((e) => {
    totalPrice += e.price * e.quantity;
  });
  return (
    <View style={styles.container}>
      <View style={styles.onGoingOrderContainer}>
        <Text style={styles.title}>
          {titleCase(orderOngoing[0].sellerStoreName)}
        </Text>
        <View style={styles.onGoingContent}>
          <FlatList
            data={orderOngoing[0].ProductId}
            renderItem={renderOrderOngoing}
            keyExtractor={(item) => item.ProductId}
          />
        </View>
        <View style={styles.onGoingTotal}>
          <Text
            style={{
              ...styles.orderItem,
              fontWeight: "bold",
              alignSelf: "flex-end",
            }}
          >
            Total: {currencyFormat(totalPrice)}
          </Text>
        </View>
        <MapScreen
          SellerId={orderOngoing[0]?.SellerId}
          sellerLoc={orderOngoing[0].sellerLocation}
        ></MapScreen>
      </View>
    </View>
  );
};

function titleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: getHeight(95),
    width: windowWidth,
    paddingHorizontal: getWidth(3),
    paddingVertical: getHeight(2),
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#eee",
  },
  noOngoinOrderContainer: {
    alignItems: "center",
    marginTop: windowHeight * 0.08,
  },
  onGoingOrderContainer: {
    flexDirection: "column",
    // flex: 1,
    paddingHorizontal: getWidth(5),
    // paddingVertical: getHeight(5),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  onGoingContent: {
    alignSelf: "flex-start",
    marginBottom: getHeight(1),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: getHeight(2),
    width: "100%",
  },
  onGoingTotal: {
    marginVertical: getHeight(3),
    fontWeight: "bold",
    width: "100%",
  },
  imageIllustrations: {
    resizeMode: "contain",
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
  },
  title: {
    fontSize: getWidth(8),
    color: "#555",
    fontWeight: "bold",
    marginBottom: getHeight(2),
  },
  orderItem: {
    fontSize: getWidth(4),
    color: "#555",
  },
  containerComp: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    backgroundColor: "white",
    borderRadius: 5,
  },
  ongoingHeader: {
    textAlign: "center",
    fontSize: 20,
    padding: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 5,
    // display: "flex",
    shadowColor: "#000",
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  sellerImage: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.18,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  cardContent: {
    marginLeft: 15,
    justifyContent: "space-around",
  },
  contentName: {
    fontWeight: "bold",
    fontSize: 20,
    width: windowWidth * 0.61,
  },
  contentDesc: {
    fontSize: 15,
    width: windowWidth * 0.61,
  },
  seeProducts: {
    width: windowWidth * 0.57,
    paddingHorizontal: 30,
    paddingVertical: 5,
    backgroundColor: "#ffce34",
    justifyContent: "center",
    borderRadius: 5,
  },
  seeProductText: {
    color: "#31302b",
    textAlign: "center",
  },
});
