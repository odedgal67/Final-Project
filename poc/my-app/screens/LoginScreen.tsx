import * as React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { CommonActions } from "@react-navigation/native";
import API from "../API/api_bridge";
import Background from "../components/Background";
import { hebrew } from "../utils/text_dictionary";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  React.useLayoutEffect(() => {
    navigation.setOptions({ title: hebrew.login });
  }, [navigation]);

  const handleLogin = () => {
    API.get_instance()
      .login(username, password)
      .then((user) => {
        const allProjects = API.get_instance().get_all_projects(user.name);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "projects", params: { allProjects } }],
          })
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
          <Text style={styles.heading}>{hebrew.login}</Text>
          <TextInput
            style={styles.input}
            placeholder={hebrew.id}
            placeholderTextColor="#B4B4B4"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder={hebrew.password}
            secureTextEntry={true}
            placeholderTextColor="#B4B4B4"
            value={password}
            onChangeText={setPassword}
          />
          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>{hebrew.login}</Text>
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

export default LoginScreen;
