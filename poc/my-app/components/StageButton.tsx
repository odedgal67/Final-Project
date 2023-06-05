import React from "react";
import { Text, TouchableHighlight, StyleSheet } from "react-native";

const StageButton = (props: {
  stageName: String;
  onClick: () => void;
  backgroundColor?: string;
}) => {
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: props.backgroundColor
        ? props.backgroundColor
        : "#2d3c3b",
      borderRadius: 10,
      flex: 4.5,
    },
    text: {
      textAlign: "center",
      fontSize: 14,
      lineHeight: 21,
      color: "white",
    },
  });
  return (
    <TouchableHighlight style={styles.button} onPress={props.onClick}>
      <Text style={styles.text}>{props.stageName}</Text>
    </TouchableHighlight>
  );
};

export default StageButton;
