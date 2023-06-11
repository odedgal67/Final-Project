import React from "react";
import ProjectButton from "../components/ProjectButton";
import Background from "../components/Background";
import { ScrollView, View, Text } from "react-native";
import CreateProjectButton from "../components/CreateProjectButton";
import API from "../API/api_bridge";
import { UserContext } from "../utils/UserContext";
import { Project } from "../types";
import { useFocusEffect } from "@react-navigation/native";
import { ProjectContext } from "../utils/ProjectContext";
import ClickableIcon from "../components/StageTableUtils/ClickableIcon";
import ConfirmDialogue from "../components/ConfirmDialogue";
import { hebrew } from "../utils/text_dictionary";
import { CommonActions } from "@react-navigation/native";

function get_project_buttons(navigation: any, projects: Project[]) {
  let buttons = [];
  const { setProject, getProject, setRole } = React.useContext(ProjectContext);
  const { getUser } = React.useContext(UserContext);

  let get_project_button = (project: Project) => {
    return (
      <ProjectButton
        project={project}
        projectName={project.name}
        onPress={() => {
          setProject(project);
          API.get_instance()
            .get_role(getUser().id, getProject().id)
            .then((role) => setRole(role))
            .then(() => setProject(project))
            .then(() =>
              navigation.navigate("ProjectPropertiesScreen", {
                project: project,
              })
            );
        }}
      />
    );
  };

  for (let i = 0; i < projects.length; i += 2) {
    buttons.push(
      <View style={{ flexDirection: "row", justifyContent: "center" }} key={i}>
        {get_project_button(projects[i])}
        {projects[i + 1] && get_project_button(projects[i + 1])}
      </View>
    );
  }
  return buttons;
}

const ProjectsScreen = ({ navigation }: { navigation: any }) => {
  const { getUser, clearUserState } = React.useContext(UserContext);
  const [projects, setProjects] = React.useState([] as Project[]);
  const { clearProjectState } = React.useContext(ProjectContext);
  let add_project_click = (
    projectName: string,
    modal_visibility_setter: (b: boolean) => void
  ) => {
    API.get_instance()
      .add_project(projectName, getUser().id)
      .then(() =>
        API.get_instance()
          .get_all_projects(getUser().id)
          .then((projects) => setProjects(projects))
      )
      .then(() => modal_visibility_setter(false));
  };
  React.useEffect(() => {
    API.get_instance()
      .get_all_projects(getUser().id)
      .then((projects) => setProjects(projects));
    navigation.setOptions({ title: "" });
  }, []);
  useFocusEffect(() => {
    clearProjectState();
  });
  return (
    <Background>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 15 }}>
          <ScrollView
            style={{
              flexDirection: "column",
              height: "80%",
              alignContent: "center",
            }}
          >
            {get_project_buttons(navigation, projects)}
            <View style={{ backgroundColor: "red", margin: 50 }} />
          </ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(44, 57, 63, 1)",
              position: "absolute",
              width: 70,
              height: 70,
              borderRadius: 35,
              left: 30,
              bottom: "12%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ClickableIcon
              width={50}
              height={50}
              imagePath={require("../components/imgs/logout.png")}
              onClick={() =>
                ConfirmDialogue({
                  title: "",
                  message: hebrew.are_you_sure_you_want_to_logout,
                  onConfirm: () =>
                    API.get_instance()
                      .logout(getUser().id)
                      .then(() => {
                        clearUserState();
                        navigation.dispatch(
                          CommonActions.reset({
                            index: 0,
                            routes: [{ name: "LoginScreen", params: {} }],
                          })
                        );
                      })
                      .catch((err) => alert(err)),
                })
              }
            />
          </View>
          <CreateProjectButton onAddClick={add_project_click} />
        </View>
      </View>
    </Background>
  );
};

export default ProjectsScreen;
