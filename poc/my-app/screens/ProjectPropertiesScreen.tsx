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
    </Background>
  );
};

export default ProjectsScreen;
