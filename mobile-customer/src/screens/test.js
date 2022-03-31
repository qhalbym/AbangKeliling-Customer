import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Button } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export const TestScreen = () => {
  const [location, setLocation] = useState();
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      } else if (status == 'granted') {
        const lastKnownPosition = await Location.getLastKnownPositionAsync();
        if (!lastKnownPosition) {
          return;
        }
        const { latitude, longitude } = lastKnownPosition.coords;
        setLocation({ latitude, longitude });
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  // (async () => {
  //   loading = true;
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== 'granted') {
  //     setErrorMsg('Permission to access location was denied');
  //     return;
  //   }

  //   let location = await Location.getCurrentPositionAsync({});
  //   setLocation(location);
  //   loading = false;
  // })

  useEffect(() => {
    getLocation();
  }, []);

  // useInterval(() => {
  //   // Your custom logic here
  //   getLocation();
  //   console.log(location);
  // }, 1000);

  if (!location) {
    console.log('lagi loading');
    return (
      <View>
        <Text>sabar</Text>
      </View>
    );
  } else if (location) {

    return (
      <View>
        <MapView
          style={styles.map}
          showsUserLocation={true}
        >
        </MapView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  map: {
    width: windowWidth,
    height: windowHeight
  }
});
