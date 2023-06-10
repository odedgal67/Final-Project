import * as React from "react";
import StagesTable from "../components/StagesTable";
import Background from "../components/Background";
import { ProjectContext } from "../utils/ProjectContext";
import { UserContext } from "../utils/UserContext";
import API from "../API/api_bridge";
import { Mission, Stage, Title } from "../types";
import { truncate_page_title } from "../utils/stringFunctions";

const MissionListsScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: { params: { stage: Stage; title: Title } };
}) => {
  const { getProject } = React.useContext(ProjectContext);
  const { getUser } = React.useContext(UserContext);
  const [missions, setMissions] = React.useState([] as Mission[]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: truncate_page_title(route.params.stage.name),
    });
  }, [navigation]);
  React.useEffect(() => {
    API.get_instance()
      .get_all_missions(
        getProject().id,
        route.params.title,
        route.params.stage.id,
        getUser().id
      )
      .then((missions) => setMissions(missions))
      .catch((err) => alert(err))
      .catch((err) => alert(err));
  }, []);
  return (
    <Background>
      {missions && (
        <StagesTable
          stages={missions}
          allow_change_status={false}
          ButtonHandler={(_mission_name: string, mission_id: string) => {
            return () =>
              navigation.navigate("MissionScreen", {
                mission: missions.find(
                  (mission: any) => mission.id == mission_id
                ),
                title: route.params.title,
                stage: route.params.stage,
              });
          }}
          addStagehandler={(getter: () => string, modal_visibility_setter) => {
            return () => {
              API.get_instance()
                .add_mission(
                  getProject().id,
                  route.params.stage.id,
                  route.params.title,
                  getter(),
                  getUser().id
                )
                .then((_mission_id) =>
                  API.get_instance().get_all_missions(
                    getProject().id,
                    route.params.title,
                    route.params.stage.id,
                    getUser().id
                  )
                )
                .then((missions) => setMissions(missions))
                .catch((err) => alert(err))
                .then(() => modal_visibility_setter(false));
            };
          }}
          onDelete={(mission_id: string) => () =>
            new Promise((resolve, _reject) => {
              API.get_instance()
                .remove_mission(
                  getProject().id,
                  route.params.title,
                  route.params.stage.id,
                  mission_id,
                  getUser().id
                )
                .then((removed_mission: Mission) =>
                  setMissions((currMissions) =>
                    currMissions.filter(
                      (mission) => mission.id != removed_mission.id
                    )
                  )
                )
                .catch((err) => alert(err))
                .then(() => resolve());
            })}
          onEditName={(mission_id: string) => (newname: string) =>
            new Promise((resolve, reject) => {
              API.get_instance()
                .edit_mission_name(
                  getProject().id,
                  route.params.title,
                  route.params.stage.id,
                  mission_id,
                  newname,
                  getUser().id
                )
                .then(() =>
                  setMissions((currMissions) =>
                    currMissions.map((mission) =>
                      mission.id == mission_id
                        ? { ...mission, name: newname }
                        : mission
                    )
                  )
                )
                .catch((err) => alert(err))
                .then(() => resolve());
            })}
        />
      )}
    </Background>
  );
};

export default MissionListsScreen;
