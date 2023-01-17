import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProjectButton from "../components/ProjectButton";

const ProjectsScreen = ({ navigation, route }) => {
  navigation.setOptions({ title: route.params.projectName });
  return (
    <SafeAreaView>
      <ProjectButton
        projectName="שלבי בנייה"
        onPress={() => navigation.navigate("GeneralStagesScreen")}
      />
      <ProjectButton
        projectName="ליקויי בנייה"
        onPress={() => navigation.navigate("GeneralStagesScreen")}
      />
      <ProjectButton
        projectName="שלבי בנייה - דירות"
        onPress={() => navigation.navigate("GeneralStagesScreen")}
      />
    </SafeAreaView>
  );
};

export default ProjectsScreen;
