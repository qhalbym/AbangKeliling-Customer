import React from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const image =
  "https://media.istockphoto.com/photos/making-shoes-picture-id174992667?k=20&m=174992667&s=612x612&w=0&h=eA8DQbRTN9Gw4qusPKbQYBl1IdxEdEVwZ_OX5oVXlek=";
function titleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function SellerCard({ navigation, seller }) {
  console.log(seller, ">>>>>>>>sellercard");

  return (
    <View style={styles.card}>
      <View>
        <Image
          style={styles.sellerImage}
          source={{
            uri: seller.storeImg,
          }}
        />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.contentName}>{seller.storeName}</Text>
        <Text style={styles.contentDistance}>{seller.distance} Km</Text>
        <Text style={styles.contentDesc}>{seller.storeDescription}</Text>

        <TouchableOpacity
          style={styles.seeProducts}
          onPress={() =>
            navigation.navigate("Products", {
              id: seller._id,
              storeName: seller.storeName,
            })
          }
        >
          <Text style={styles.seeProductText}>See Products</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    height: windowHeight * 0.22,
    width: windowWidth * 0.95,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 5,

    shadowColor: "#000",
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  sellerImage: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.22,
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
