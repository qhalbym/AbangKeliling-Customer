import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  FlatList,
  LogBox,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellers } from "../store/actions/sellersActions";

import { SellerCard } from "../components/SellerCard";

import * as Location from "expo-location";
import {
  fetchCustomerById,
  updateLocation,
} from "../store/actions/customerAction";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { customer } = useSelector((state) => state.customerReducer);
  const { sellers, loadingSellers, errorSellers } = useSelector(
    (state) => state.sellersReducer
  );

  const { token } = useSelector((state) => state.customerReducer);

  const dispatch = useDispatch();

  const [countInterval, setCountInterval] = useState(1);

  useEffect(() => {
    const getCust = dispatch(fetchCustomerById(token)).then((result) => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        dispatch(updateLocation(result._id, location, token));
        setLocation(location);
      })();
    });
  }, []);

  useEffect(() => {
    let interval;

    if (countInterval == 1) {
      setCountInterval(countInterval + 1);
      dispatch(fetchSellers());
    } else {
      interval = setInterval(() => {
        // console.log("mounted.......");
        setCountInterval(countInterval + 1);
        dispatch(fetchSellers());
      }, 5000);
    }

    return () => clearInterval(interval);
    // dispatch(fetchSellers());
  }, [sellers, countInterval]);

  if (loadingSellers) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }

  const getDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d.toFixed(2);
  };

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const sellerOnRange = [];
  sellers.forEach((e) => {
    if (e.location.coords) {
      const lat1 = location?.coords.latitude;
      const lon1 = location?.coords.longitude;
      const lat2 = e.location.coords.latitude;
      const lon2 = e.location.coords.longitude;
      if (getDistance(lat1, lon1, lat2, lon2) < 100) {
        e.distance = getDistance(lat1, lon1, lat2, lon2);
        sellerOnRange.push(e);
      }
    }
  });

  console.log(sellerOnRange, "<<<<<<<<<< seller on range >>>>>>>>>>>>");

  // dummy;
  // let sellers = [
  //   {
  //     storeName: "Bebek Haji Engga Slamet",
  //     storeDescription: "Semua bebek ada di sini",
  //     imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcookpad.com%2Fid%2Fresep%2F11729965-bakso-kenyal-dan-enak-daging-sapi-dan-ayam&psig=AOvVaw182QnymLpTiPKE-c2v6cR7&ust=1648089776973000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPCv3P-a2_YCFQAAAAAdAAAAABAJ",
  //     CategoryId: "dfujagefuah390ui9ru238fkaf",
  //   },
  //   {
  //     storeName: "Bakso Enak",
  //     storeDescription: "Bakso tikus campur boraks",
  //     imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcookpad.com%2Fid%2Fresep%2F11729965-bakso-kenyal-dan-enak-daging-sapi-dan-ayam&psig=AOvVaw182QnymLpTiPKE-c2v6cR7&ust=1648089776973000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPCv3P-a2_YCFQAAAAAdAAAAABAJ",
  //     CategoryId: "dfujagefuah390ui9ru238fkaf",
  //   },
  //   {
  //     storeName: "Jajanan Emak",
  //     storeDescription: "Jajanan asli Indonesia",
  //     imageUrl:
  //       "https://s3.theasianparent.com/cdn-cgi/image/height=412/tap-assets-prod/wp-content/uploads/sites/24/2021/05/leade-jajanan-tradisional.jpg",
  //     CategoryId: "dfujagefuah390ui9ru238fkaf",
  //   },
  //   {
  //     storeName: "Sol Sepatu",
  //     storeDescription: "Sol sepatu, merangkap sebagai maling sepatu",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
  //     CategoryId: "dfujagefuah390ui9ru238fkaf",
  //   },
  // ];

  const renderSellers = ({ item }) => (
    <SellerCard seller={item} navigation={navigation} />
  );

  // console.log(sellers, "<<<<<<< sellers >>>>>>");
  // 6239773ae0ef41136422db10
  return (
    <View>
      <View style={styles.homeTitleContainer}>
        <Text style={styles.homeTitleText}>Abang-Abang Near You</Text>
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
      <View style={styles.cardsContainer}>
        <FlatList
          data={sellerOnRange}
          // data={sellers}
          renderItem={renderSellers}
          keyExtractor={(item) => item._id}
          nestedScrollEnabled
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeTitleText: {
    fontSize: 25,
    alignSelf: "center",
    fontFamily: "sans-serif-medium",
  },
  cardsContainer: {
    height: windowHeight * 0.73,
    width: windowWidth,
    alignItems: "center",
  },
});
