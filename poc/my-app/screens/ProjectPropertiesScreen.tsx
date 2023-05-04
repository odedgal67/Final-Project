import * as React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PropertiesButton from "../components/PropertiesButton";
import Background from "../components/Background";
import { View } from "react-native";
import {
  ProjectContext,
  ProjectContextProvider,
} from "../utils/ProjectContext";

const ProjectPropertiesScreen = ({ navigation, route }) => {
  let projectName = route.params.project.name;
  navigation.setOptions({ title: projectName });
  const { project, setProject, getProject } = React.useContext(ProjectContext);
  setProject(route.params.project);
  return (
    <ProjectContextProvider>
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
                  header: projectName,
                  project: getProject(),
                })
              }
            />
            <PropertiesButton
              propertyName="תכניות"
              onPress={() =>
                navigation.navigate("PlansScreen", {
                  header: projectName,
                  project: getProject(),
                })
              }
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <PropertiesButton
              propertyName="ליקויי בנייה"
              onPress={() =>
                navigation.navigate("GeneralStagesScreen", {
                  header: projectName,
                  project: getProject(),
                })
              }
            />
            <PropertiesButton
              propertyName="שלבי בנייה לפי דירות"
              onPress={() =>
                navigation.navigate("LevelsScreen", {
                  header: projectName,
                  project: getProject(),
                })
              }
            />
          </View>
        </SafeAreaView>
      </Background>
    </ProjectContextProvider>
  );
};

export default ProjectPropertiesScreen;
