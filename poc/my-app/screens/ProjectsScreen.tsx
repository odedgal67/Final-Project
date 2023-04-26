import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProjectButton from "../components/ProjectButton";
import Background from "../components/Background";
import { Button, ScrollView, View } from "react-native";
import CreateProjectButton from "../components/CreateProjectButton";

const project_names = [
  "פרוייקט 1",
  "פרוייקט 2",
  "פרוייקט 3",
  "פרוייקט 4",
  "פרוייקט 5",
  "פרוייקט 6",
  "פרוייקט 7",
  "פרוייקט 8",
  "פרוייקט 9",
];

function get_project_buttons(navigation: any) {
  let buttons = [];
  for (let i = 0; i < project_names.length; i += 2) {
    buttons.push(
      <SafeAreaView style={{ flexDirection: "row", justifyContent: "center" }}>
        <ProjectButton
          projectName={project_names[i]}
          onPress={() =>
            navigation.navigate("projectProperties", {
              projectName: project_names[i],
            })
          }
        />
        {project_names[i + 1] && (
          <ProjectButton
            projectName={project_names[i + 1]}
            onPress={() =>
              navigation.navigate("projectProperties", {
                projectName: project_names[i + 1],
              })
            }
          />
        )}
      </SafeAreaView>
    );
  }
  return buttons;
}

const ProjectsScreen = ({ navigation }) => {
  return (
    <Background>
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{
            flexDirection: "column",
            height: "80%",
            alignContent: "center",
          }}
        >
          {get_project_buttons(navigation)}
        </ScrollView>
        <CreateProjectButton />
      </View>
    </Background>
  );
};

export default ProjectsScreen;
