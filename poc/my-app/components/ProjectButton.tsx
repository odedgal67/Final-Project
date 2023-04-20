import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ProjectButton = (props) => {
  return (
    <Pressable style={styles.button} onPress={props.onPress}>
      <LinearGradient
        colors={["#53A8B6", "#5585B599"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
      <Text style={styles.text}>{props.projectName}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "15%",
    paddingHorizontal: "10%",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  gradient: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default ProjectButton;
