import React from "react";
import {
  Text,
  Pressable,
  StyleSheet,
  Image,
  View,
  ScrollView,
} from "react-native";

const ProjectButton = (props) => {
  let image_location = "./imgs/folder.png";
  return (
    <Pressable style={styles.button} onPress={props.onPress}>
      <View style={styles.text_bg}>
        <Text style={styles.text}>{props.projectName}</Text>
      </View>
      <View style={styles.image_background}>
        <Image source={require(image_location)} style={styles.image} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: "5%",
    paddingHorizontal: "8%",
    marginHorizontal: "4%",
    marginVertical: "7%",
    elevation: 15,
    borderRadius: 10,
    backgroundColor: "#c2c0b2",
    maxHeight: "70%",
    maxWidth: "40%",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    flex: 1,
    paddingBottom: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  image_background: {
    flex: 1,
    backgroundColor: "#e2e0d2",
    borderRadius: 10,
    maxHeight: 80,
    maxWidth: 80,
  },
  text_bg: {
    flex: 1,
  },
});

export default ProjectButton;
