import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Button, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProjectButton from "../components/ProjectButton";
import StagesTable from "../components/StagesTable";

const MissionScreen = ({ navigation, route }) => {
  return (
    <View>
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
    </View>
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
  button: {
    alignItems: "center",
    justifyContent: "center",
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
