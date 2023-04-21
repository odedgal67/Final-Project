import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

const StageButton = (props: { stageName: String; onClick }) => {
  return (
    <Pressable style={styles.button} onPress={props.onClick}>
      <Text style={styles.text}>{props.stageName}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#2d3c3b",
    borderRadius: 10,
    flex: 2,
  },
  text: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 21,
    color: "white",
  },
});

export default StageButton;
