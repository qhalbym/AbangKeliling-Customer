import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { Polyline } from "react-native-maps";
import { Marker } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneSellers } from "../store/actions/sellersActions";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

const BACKGROUND_FETCH_TASK = "background-fetch";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const getWidth = (num) => (num * windowWidth) / 100;
const getHeight = (num) => (num * windowHeight) / 100;

export const MapScreen = ({ SellerId, sellerLoc }) => {
  const dispatch = useDispatch();
  const { location, locationLoading, locationError } = useSelector(
    (state) => state.customerReducer
  );

  const { sellerOnGoing } = useSelector((state) => state.sellersReducer);
  const customerLocation = {
    latitude: location?.coords.latitude,
    longitude: location?.coords.longitude,
  };

  let sellerLocation = {
    latitude: sellerLoc.coords.latitude,
    longitude: sellerLoc.coords.longitude,
  };

  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    dispatch(fetchOneSellers(SellerId));
    return BackgroundFetch.BackgroundFetchResult.NewData;
  });

  BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 5, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchOneSellers(SellerId));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={{ height: getHeight(40), width: "100%" }}
        region={{
          latitude: customerLocation.latitude,
          longitude: customerLocation.longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }}
      >
        <Marker coordinate={sellerLocation}>
          <View style={styles.marker}>
            <Ionicons name="cart" size={getHeight(5)}></Ionicons>
            <Text>Si Abang</Text>
          </View>
        </Marker>
        <Marker coordinate={customerLocation}>
          <View style={styles.marker}>
            <Ionicons name="person" size={getHeight(5)}></Ionicons>
            <Text>You</Text>
          </View>
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  marker: {
    flexDirection: "column",
    alignItems: "center",
    fontWeight: "bold",
  },
  container: {
    width: getWidth(80),
    height: getHeight(40),
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
});
