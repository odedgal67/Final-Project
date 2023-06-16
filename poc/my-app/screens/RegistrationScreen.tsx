import * as React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { CommonActions } from "@react-navigation/native";
import API from "../API/api_bridge";
import Background from "../components/Background";
import { hebrew } from "../utils/text_dictionary";
import { validate_id } from "../utils/ValidateInputs";

const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [id, setId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verify_password, setVerifyPassword] = React.useState("");

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: hebrew.register });
  }, [navigation]);

  const handleRegistration = () => {
    let trimmed_id = id.trim();
    let trimmed_name = username.trim();
    if (!validate_id(trimmed_id)) {
      alert(hebrew.invalid_id);
      return;
    }
    if (password != verify_password) {
      alert(hebrew.passwords_dont_match);
      return;
    }
    if (
      id == "" ||
      username == "" ||
      password == "" ||
      verify_password == ""
    ) {
      alert(hebrew.fill_all_fields);
      return;
    }
    API.get_instance()
    .register(username, id, password)
    .then(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "LoginScreen" }],
        }),
        alert(hebrew.registration_successful),
      );
    })
    .catch((error) => {
      alert(error);
    });
};

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.heading}>{hebrew.register}</Text>
          <TextInput style={styles.input}
            placeholder={hebrew.name}
            placeholderTextColor="#B4B4B4"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput style={styles.input}
            placeholder={hebrew.id}
            placeholderTextColor="#B4B4B4"
            value={id}
            onChangeText={setId}
          />
          <TextInput
            style={styles.input}
            placeholder={hebrew.password}
            secureTextEntry={true}
            placeholderTextColor="#B4B4B4"
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder={hebrew.verify_password}
            secureTextEntry={true}
            placeholderTextColor="#B4B4B4"
            value={verify_password}
            onChangeText={setVerifyPassword}
          />
          <Pressable style={styles.button} onPress={handleRegistration}>
            <Text style={styles.buttonText}>{hebrew.register}</Text>
          </Pressable>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#3C3C3C",
  },
  input: {
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "100%",
    fontSize: 18,
    color: "#3C3C3C",
  },
  button: {
    backgroundColor: "#0090D6",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default RegistrationScreen;
