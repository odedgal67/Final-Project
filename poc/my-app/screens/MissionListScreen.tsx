import * as React from "react";
import StagesTable from "../components/StagesTable";
import Background from "../components/Background";
import { ProjectContext } from "../utils/ProjectContext";
import { UserContext } from "../utils/UserContext";
import API from "../API/api_bridge";
import { Mission, Status } from "../types";
import { StageContext } from "../utils/StageContext";

const MissionListsScreen = ({ navigation, route }) => {
  const { project, setProject, getProject, notify } =
    React.useContext(ProjectContext);
  const { user, setUser, getUser } = React.useContext(UserContext);
  const { stage, setStage, getStage } = React.useContext(StageContext);
  setStage(route.params.stage);
  const [ismodalVisible, setModalVisible] = React.useState(false);
  let missions = API.get_instance().get_all_missions(
    getProject().id,
    route.params.stage_id,
    getUser().name
  );
  const mission_names: string[] = missions.map(
    (mission: Mission) => mission.name
  );
  const mission_ids: number[] = missions.map((mission: Mission) => mission.id);
  const mission_statuses: Status[] = missions.map(
    (mission: Mission) => mission.status
  );
  return (
    <Background>
      <StagesTable
        stagesNames={mission_names}
        stagesStatuses={mission_statuses}
        stageIDs={mission_ids}
        columnTitle={"משימות"}
        allow_change_status={true}
        ButtonHandler={(mission_name: String, mission_id: number) => {
          return () =>
            navigation.navigate("MissionScreen", {
              mission: missions.find(
                (mission: any) => mission.id == mission_id
              ),
            });
        }}
        addStagehandler={(getter: () => string, modal_visibility_setter) => {
          return () => {
            API.get_instance().add_mission(
              getProject().id,
              route.params.stage_id,
              getter(),
              getUser().name
            );
            modal_visibility_setter(false);
            setModalVisible(!ismodalVisible);
          };
        }}
      />
    </Background>
  );
};

export default MissionListsScreen;
