import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import GetAttributeComp from "./GetAttributeComp";
import { hebrew } from "../../utils/text_dictionary";
import AcceptButton from "./AcceptButton";
import API from "../../API/api_bridge";
import { validate_id } from "../../utils/ValidateInputs";

const RegisterNewUser = () => {
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [verify_password, setVerifyPassword] = React.useState("");
  return (
    <View style={styles.container}>
      <GetAttributeComp
        name={hebrew.id}
        onChangeText={(val: string) => setId(val)}
      />
      <GetAttributeComp
        name={hebrew.name}
        onChangeText={(val: string) => setName(val)}
      />
      <GetAttributeComp
        name={hebrew.password}
        onChangeText={(val: string) => setPassword(val)}
        secureTextEntry={true}
      />
      <GetAttributeComp
        name={hebrew.verify_password}
        onChangeText={(val: string) => setVerifyPassword(val)}
        secureTextEntry={true}
      />
      <AcceptButton
        onPress={() => {
          let trimmed_id = id.trim();
          let trimmed_name = name.trim();
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
            name == "" ||
            password == "" ||
            verify_password == ""
          ) {
            alert(hebrew.fill_all_fields);
            return;
          }
          API.get_instance()
            .register(trimmed_name, trimmed_id, password)
            .then(() => alert(hebrew.user_registered_successfully))
            .catch((err) => alert(err));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default RegisterNewUser;
