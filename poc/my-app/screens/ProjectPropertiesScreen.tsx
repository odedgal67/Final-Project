import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PropertiesButton from "../components/PropertiesButton";
import Background from "../components/Background";
import { View } from "react-native";

const ProjectPropertiesScreen = ({ navigation, route }) => {
  navigation.setOptions({ title: route.params.projectName });
  return (
    <Background>
      <SafeAreaView
        style={{
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: 40,
          margin: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <PropertiesButton
            propertyName="שלבים כלליים"
            onPress={() =>
              navigation.navigate("GeneralStagesScreen", {
                header: route.params.projectName,
              })
            }
          />
          <PropertiesButton
            propertyName="תכניות"
            onPress={() =>
              navigation.navigate("PlansScreen", {
                header: route.params.projectName,
              })
            }
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <PropertiesButton
            propertyName="ליקויי בנייה"
            onPress={() =>
              navigation.navigate("GeneralStagesScreen", {
                header: route.params.projectName,
              })
            }
          />
          <PropertiesButton
            propertyName="שלבי בנייה לפי דירות"
            onPress={() =>
              navigation.navigate("LevelsScreen", {
                header: route.params.projectName,
              })
            }
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default ProjectPropertiesScreen;
