import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

const PropertiesButton = (props: { title: string; onPress: () => void }) => {
  return (
    <Pressable style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "15%",
    paddingHorizontal: "5%",
    marginHorizontal: 10,
    marginVertical: 0,
    flex: 1,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: "#c2c0b2",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    alignSelf: "center",
    textAlign: "center",
  },
});

export default PropertiesButton;
