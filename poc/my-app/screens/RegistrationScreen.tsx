import * as React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import ProjectButton from "../components/ProjectButton";
import Background from "../components/Background";

const RegistrationScreen = () => {
  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.heading}>הרשמה</Text>
          <TextInput style={styles.input} placeholder="תעודת זהות" />
          <TextInput style={styles.input} placeholder="סיסמה" secureTextEntry={true} />
          <ProjectButton onPress={() => alert("Registration button pressed")} projectName="הרשמה" />
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
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  input: {
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: "100%",
  },
});

export default RegistrationScreen;
