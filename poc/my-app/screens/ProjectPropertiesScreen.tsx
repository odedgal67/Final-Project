import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProjectButton from "../components/ProjectButton";
import Background from "../components/Background";

const ProjectsScreen = ({ navigation, route }) => {
  navigation.setOptions({ title: route.params.projectName });
  return (
    <Background>
      <SafeAreaView>
        <ProjectButton
          projectName="שלבים כלליים"
          onPress={() => navigation.navigate("GeneralStagesScreen")}
        />
        <ProjectButton
          projectName="תכניות"
          onPress={() => navigation.navigate("PlansScreen")}
        />
        <ProjectButton
          projectName="ליקויי בנייה"
          onPress={() => navigation.navigate("GeneralStagesScreen")}
        />
        <ProjectButton
          projectName="שלבי בנייה לפי דירות"
          onPress={() => navigation.navigate("LevelsScreen")}
        />
      </SafeAreaView>
    </Background>
  );
};

export default ProjectsScreen;
