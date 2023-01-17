import React from "react";
import { Button, Text, Pressable, StyleSheet } from "react-native";

const StageButton = (props: { stageName: String; onClick }) => {
  return (
    <Pressable style={styles.button} onPress={props.onClick}>
      <Text style={styles.text}>{props.stageName}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "50%",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#646464",
    borderColor: "black",
    borderWidth: 1,
    margin: 4.5,
    flex: 1,
  },
  text: {
    textAlign: "right",
    fontSize: 14,
    lineHeight: 21,
    color: "white",
  },
});

export default StageButton;
