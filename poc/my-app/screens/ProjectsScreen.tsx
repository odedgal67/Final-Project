import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProjectButton from "../components/ProjectButton";
import Background from "../components/Background";
import { Button, ScrollView, View } from "react-native";
import CreateProjectButton from "../components/CreateProjectButton";
import { log_in } from "../API/api_real";
import API from "../API/api_bridge";
import { UserContext } from "../utils/UserContext";

function get_project_buttons(navigation: any) {
  const { user, setUser, getUser } = React.useContext(UserContext);
  let projects = API.get_instance().get_all_projects(user.name);
  let buttons = [];
  for (let i = 0; i < projects.length; i += 2) {
    buttons.push(
      <SafeAreaView style={{ flexDirection: "row", justifyContent: "center" }}>
        <ProjectButton
          projectName={projects[i].name}
          onPress={() =>
            navigation.navigate("projectProperties", {
              project: projects[i],
            })
          }
        />
        {projects[i + 1] && (
          <ProjectButton
            projectName={projects[i + 1].name}
            onPress={() =>
              navigation.navigate("projectProperties", {
                project: projects[i + 1],
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
