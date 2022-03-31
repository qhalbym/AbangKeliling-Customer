import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Button, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { doRegister } from "../store/actions/customerAction";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [dataRegister, setDataRegister] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: ""
  });
  function registerButton() {
    if (!dataRegister.username.trim() || !dataRegister.email.trim() || !dataRegister.password.trim() || !dataRegister.phoneNumber.trim()) {
      alert('Field Can not be Empty!');
      return;
    }
    dispatch(doRegister(dataRegister));

  }

  return (
    <View style={styles.container}>
      <Text>REGISTER SCREEN</Text>
      <Text>{dataRegister.email}-{dataRegister.username}-{dataRegister.phoneNumber}-{dataRegister.password}</Text>
      <TextInput
        onChangeText={(text) => setDataRegister({ ...dataRegister, username: text })}
        placeholder={'Username'}
        style={styles.input}
      />
      <TextInput
        onChangeText={(text) => setDataRegister({ ...dataRegister, phoneNumber: text })}
        placeholder={'Phone Number'}
        style={styles.input}
      />
      <TextInput
        onChangeText={(text) => setDataRegister({ ...dataRegister, email: text })}
        placeholder={'email'}
        style={styles.input}
      />
      <TextInput
        onChangeText={(text) => setDataRegister({ ...dataRegister, password: text })}
        placeholder={'Password'}
        secureTextEntry={true}
        style={styles.input}
      />


      <Button
        title={'Register'}
        onPress={() => registerButton()}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});
