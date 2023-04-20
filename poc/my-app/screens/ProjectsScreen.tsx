import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProjectButton from "../components/ProjectButton";
import Background from "../components/Background";
import { View } from "react-native";

const project_names = [
  "פרוייקט 1",
  "פרוייקט 2",
  "פרוייקט 3",
  "פרוייקט 4",
  "פרוייקט 5",
  "פרוייקט 6",
];

function get_project_buttons(navigation: any) {
  let buttons = [];
  for (let i = 0; i < project_names.length; i += 2) {
    buttons.push(
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <ProjectButton
          projectName={project_names[i]}
          onPress={() =>
            navigation.navigate("projectProperties", {
              projectName: project_names[i],
            })
          }
        />
        <ProjectButton
          projectName={project_names[i + 1]}
          onPress={() =>
            navigation.navigate("projectProperties", {
              projectName: project_names[i + 1],
            })
          }
        />
      </View>
    );
  }
  return buttons;
}

const ProjectsScreen = ({ navigation }) => {
  return (
    <Background>
      <SafeAreaView
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "10%",
        }}
      >
        {get_project_buttons(navigation)}
      </SafeAreaView>
    </Background>
  );
};

export default ProjectsScreen;
