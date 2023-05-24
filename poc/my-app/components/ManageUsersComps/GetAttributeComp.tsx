import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

type GetAttributeCompProps = {
  name: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

const GetAttributeComp = (props: GetAttributeCompProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={props.onChangeText}
        style={styles.text_input}
        secureTextEntry={props.secureTextEntry}
      />
      <Text style={styles.text}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0)",
    flexDirection: "row",
    width: "75%",
    padding: 5,
    flex: 1,
  },
  text: {
    flex: 1,
    textAlign: "center",
  },
  text_input: {
    flex: 2,
    backgroundColor: "white",
    borderColor: "rgba(100,100,100,1)",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
});

export default GetAttributeComp;
