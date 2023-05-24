import * as React from "react";
import StagesTable from "../components/StagesTable";
import Background from "../components/Background";
import { ProjectContext } from "../utils/ProjectContext";
import { UserContext } from "../utils/UserContext";
import API from "../API/api_bridge";
import { Mission, Stage, Title } from "../types";

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
    navigation.setOptions({ title: route.params.stage.name });
  }, [navigation]);
  React.useEffect(() => {
    setMissions(
      API.get_instance().get_all_missions(
        getProject().id,
        route.params.title,
        route.params.stage.id,
        getUser().name
      )
    );
  }, []);
  return (
    <Background>
      <StagesTable
        stages={missions}
        allow_change_status={false}
        ButtonHandler={(_mission_name: String, mission_id: number) => {
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
            API.get_instance().add_mission(
              getProject().id,
              route.params.stage.id,
              route.params.title,
              getter(),
              getUser().name
            );
            setMissions(
              API.get_instance().get_all_missions(
                getProject().id,
                route.params.title,
                route.params.stage.id,
                getUser().name
              )
            );
            modal_visibility_setter(false);
          };
        }}
      />
    </Background>
  );
};

export default MissionListsScreen;
