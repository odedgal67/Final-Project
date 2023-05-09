import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProjectButton from "../components/ProjectButton";
import Background from "../components/Background";
import { ScrollView, View } from "react-native";
import CreateProjectButton from "../components/CreateProjectButton";
import API from "../API/api_bridge";
import { UserContext } from "../utils/UserContext";
import { Project } from "../types";

function get_project_buttons(navigation: any, projects: Project[]) {
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

const ProjectsScreen = ({ navigation }: { navigation: any }) => {
  const { getUser } = React.useContext(UserContext);
  const [projects, setProjects] = React.useState([] as Project[]);
  let add_project_click = (
    projectName: string,
    modal_visibility_setter: (b: boolean) => void
  ) => {
    API.get_instance().add_project(projectName, getUser().name);
    modal_visibility_setter(false);
    setProjects((_projects) => {
      const updatedProjects = API.get_instance().get_all_projects(
        getUser().name
      );
      return updatedProjects;
    });
  };
  React.useEffect(() => {
    setProjects(API.get_instance().get_all_projects(getUser().name));
  }, []);
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
          {get_project_buttons(navigation, projects)}
        </ScrollView>
        <CreateProjectButton onAddClick={add_project_click} />
      </View>
    </Background>
  );
};

export default ProjectsScreen;
