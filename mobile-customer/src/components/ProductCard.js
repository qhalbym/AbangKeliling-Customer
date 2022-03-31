import React, { useState } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "react-native-vector-icons";
import Toast from "react-native-toast-message";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
function titleCase(str) {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}
export function ProductCard({ navigation, product, setOrder, onTest }) {
  const [quantity, setQuantity] = useState(0);

  const toastSuccessAdd = () => {
    Toast.show({
      type: "success",
      text1: "Product added to cart",
      visibilityTime: 1500,
    });
  };

  const toastSuccessFail = () => {
    Toast.show({
      type: "error",
      text1: "Product must have at least 1 quantity",
      visibilityTime: 1500,
    });
  };

  const changeDec = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const changeInc = () => {
    setQuantity(quantity + 1);
  };

  const handleAdd = () => {
    if (quantity == 0) {
      return toastSuccessFail();
    }
    toastSuccessAdd();
    onTest({
      ProductId: product._id,
      quantity: quantity,
      name: product.name,
      price: product.price,
    });
  };

  // int to currency
  function currencyFormat(num) {
    return (
      "Rp " +
      Number(num)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  }

  return (
    <View style={styles.card}>
      <View>
        <Image
          style={styles.productImage}
          source={{
            uri: product.image,
          }}
        />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.contentName}>{titleCase(product.name)}</Text>
        <Text style={styles.contentPrice}>{currencyFormat(product.price)}</Text>
        <Text style={styles.contentDesc}>{titleCase(product.description)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={changeDec} style={styles.plusMinus}>
            <AntDesign name={"minuscircle"} color={"#ffa70b"} size={18} />
          </TouchableOpacity>
          <Text>{quantity}</Text>
          <TouchableOpacity onPress={changeInc} style={styles.plusMinus}>
            <AntDesign name={"pluscircle"} color={"#ffa70b"} size={18} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => handleAdd()}
          style={styles.addToCartBtn}
        >
          <Text>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    backgroundColor: "white",
    height: windowHeight * 0.45,
    width: windowWidth * 0.45,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 5,

    shadowColor: "#000",
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  productImage: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.16,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  cardContent: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: windowHeight * 0.3,
  },
  contentName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  contentPrice: {
    backgroundColor: "#A2D2FF",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  contentDesc: {
    textAlign: "center",
  },
  quantityContainer: {
    flexDirection: "row",
  },
  plusMinus: {
    marginHorizontal: 20,
  },
  addToCartBtn: {
    backgroundColor: "#ffce34",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
