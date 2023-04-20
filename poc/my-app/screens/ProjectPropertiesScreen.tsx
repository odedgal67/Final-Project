import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProjectButton from "../components/PropertiesButton";
import Background from "../components/Background";
import { View } from "react-native";

const ProjectPropertiesScreen = ({ navigation, route }) => {
  navigation.setOptions({ title: route.params.propertyName });
  return (
    <Background>
      <SafeAreaView style={{ flexDirection: "column", justifyContent: "center", paddingTop: 40, margin: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20, }}>
          <ProjectButton
            propertyName="שלבים כלליים"
            onPress={() => navigation.navigate("GeneralStagesScreen")}
          />
          <ProjectButton
            propertyName="תכניות"
            onPress={() => navigation.navigate("PlansScreen")}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <ProjectButton
            propertyName="ליקויי בנייה"
            onPress={() => navigation.navigate("GeneralStagesScreen")}
          />
          <ProjectButton
            propertyName="שלבי בנייה לפי דירות"
            onPress={() => navigation.navigate("LevelsScreen")}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default ProjectPropertiesScreen;
