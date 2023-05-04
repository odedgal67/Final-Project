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
import { Stage, Status } from "../types";
import API from "../API/api_bridge";
import { UserContext } from "../utils/UserContext";

const GeneralStagesScreen = ({ navigation, route }) => {
  const { project, setProject, getProject, notify } =
    React.useContext(ProjectContext);
  const { user, setUser, getUser } = React.useContext(UserContext);
  const [ismodalVisible, setModalVisible] = React.useState(false);
  setProject(route.params.project);
  navigation.setOptions({ title: getProject().name + " שלבים כלליים" });
  let stages = API.get_instance().get_all_stages(
    getProject().id,
    getUser().name
  );
  const stage_names: string[] = stages.map((stage: Stage) => stage.name);
  const stage_ids: number[] = stages.map((stage: Stage) => stage.id);
  const stage_statuses: Status[] = stages.map((stage: Stage) => stage.status);
  return (
    <Background>
      <View>
        <StagesTable
          stagesNames={stage_names}
          stagesStatuses={stage_statuses}
          stageIDs={stage_ids}
          columnTitle={"שלבים"}
          allow_change_status={false}
          ButtonHandler={(stage_name: String, stage_id: number) => {
            return () =>
              navigation.navigate("MissionListsScreen", {
                stage: stages.find((stage: any) => stage.id == stage_id),
                stageName: stage_name,
                stage_id: stage_id,
              });
          }}
          addStagehandler={(
            get_name: () => string,
            modal_visibility_setter
          ) => {
            return () => {
              API.get_instance().add_stage(
                getProject().id,
                get_name(),
                getUser().name
              );
              modal_visibility_setter(false);
              setModalVisible(!ismodalVisible);
            };
          }}
        />
      </View>
    </Background>
  );
};

export default GeneralStagesScreen;
