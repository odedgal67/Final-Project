import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Button, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProjectButton from "../components/ProjectButton";
import StagesTable from "../components/StagesTable";
import Background from "../components/Background";

const MissionScreen = ({ navigation, route }) => {
  return (
    <Background>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>תיאור משימה</Text>
        <Text style={styles.title}>{route.params.description}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          bottom: "-120%",
        }}
      >
        <LinkButton title={"קישור לתקן"}></LinkButton>
        <LinkButton title={"קישור לתוכנית"}></LinkButton>
        <LinkButton title={"קישור לתיעוד"}></LinkButton>
      </View>
    </Background>
  );
};

const LinkButton = (props) => {
  return (
    <Pressable style={styles.button} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    margin: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#646464",
    borderColor: "black",
    borderWidth: 1,
    margin: 4.5,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    color: "white",
  },
});

export default MissionScreen;
