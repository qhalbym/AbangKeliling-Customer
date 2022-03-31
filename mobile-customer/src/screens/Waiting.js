import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";

import { fetchOrdersWaiting } from "../store/actions/ordersActions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const Waiting = ({ navigation }) => {
  const dispatch = useDispatch();

  const [countInterval, setCountInterval] = useState(1);
  const { orderWaiting } = useSelector((state) => state.orderWaitingReducer);
  const { token } = useSelector((state) => state.customerReducer);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountInterval(countInterval + 1);
      dispatch(fetchOrdersWaiting(token));
    }, 5000);

    return () => clearInterval(interval);
  }, [orderWaiting]);

  // console.log(orderWaiting, "<<<<<<<< order waiting");

  // let orderWaiting = null;

  if (orderWaiting == null || orderWaiting.length > 0) {
    return (
      <View style={[styles.containerLoading, styles.horizontal]}>
        {/* <PulseIndicator color="#ffce34" size={70} /> */}
        <Image
          style={styles.imageIllustrations}
          source={require("../../assets/81133-waiting.gif")}
        />
        <Text style={styles.waitingText}>
          Waiting for seller confirmation...
        </Text>
      </View>
    );
  } else if (orderWaiting.length == 0) {
    return (
      <View style={styles.confirmedContainer}>
        <Text style={styles.confirmedText}>Seller has confirm your order</Text>
        <TouchableOpacity
          style={styles.goToOngoingBtn}
          onPress={() => navigation.navigate("Ongoing")}
        >
          <Text style={styles.goToOngoingText}>See your ongoing order</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  imageIllustrations: {
    resizeMode: "contain",
    width: windowWidth * 0.8,
    height: windowHeight * 0.5,
  },
  containerLoading: {
    height: windowHeight * 0.5,
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: windowHeight * 0.2,
  },
  waitingText: {
    fontSize: 15,
  },

  // confirmed
  confirmedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  goToOngoingBtn: {
    backgroundColor: "#ffce34",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  confirmedText: {
    marginVertical: 10,
    fontSize: 18,
  },
});
