import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProjectButton from "../components/ProjectButton";
import StagesTable from "../components/StagesTable";
import { View } from "react-native";
import Background from "../components/Background";
import {
  ProjectContext,
  ProjectContextProvider,
} from "../utils/ProjectContext";
import { Stage, Status, Project, Title } from "../types";
import API from "../API/api_bridge";
import { UserContext } from "../utils/UserContext";
import { title_to_hebrew } from "../utils/text_dictionary";

const GeneralStagesScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: { params: { title: Title; project: Project } };
}) => {
  const { setProject, getProject } = React.useContext(ProjectContext);
  const { getUser } = React.useContext(UserContext);
  setProject(route.params.project);
  navigation.setOptions({
    title: getProject().name + " " + title_to_hebrew[route.params.title],
  });
  const [stages, setStages] = React.useState([] as Stage[]);
  React.useEffect(() => {
    setStages(
      API.get_instance().get_all_stages(
        getProject().id,
        route.params.title,
        getUser().name
      )
    );
  }, []);
  return (
    <Background>
      <View>
        <StagesTable
          stages={stages}
          columnTitle={"שלבים"}
          allow_change_status={false}
          ButtonHandler={(stage_name: String, stage_id: number) => {
            return () =>
              navigation.navigate("MissionListsScreen", {
                stage: stages.find((stage: any) => stage.id == stage_id),
                stageName: stage_name,
                stage_id: stage_id,
                title: route.params.title,
              });
          }}
          addStagehandler={(
            get_name: () => string,
            modal_visibility_setter
          ) => {
            return () => {
              let id = API.get_instance().add_stage(
                getProject().id,
                route.params.title,
                get_name(),
                getUser().name
              );
              setStages(
                API.get_instance().get_all_stages(
                  getProject().id,
                  route.params.title,
                  getUser().name
                )
              );
              modal_visibility_setter(false);
            };
          }}
        />
      </View>
    </Background>
  );
};

export default GeneralStagesScreen;
