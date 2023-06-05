import * as React from "react";
import StagesTable from "../components/StagesTable";
import { View } from "react-native";
import Background from "../components/Background";
import { ProjectContext } from "../utils/ProjectContext";
import { Stage, Project, Title, Status } from "../types";
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
  const [stages, setStages] = React.useState([] as Stage[]);
  React.useEffect(() => {
    API.get_instance()
      .get_all_stages(getProject().id, route.params.title, getUser().id)
      .then((stages) => setStages(stages))
      .catch((err) => alert(err));
    setProject(route.params.project);
    navigation.setOptions({
      title: getProject().name + " " + title_to_hebrew[route.params.title],
    });
  }, []);
  return (
    <Background>
      {stages && (
        <StagesTable
          stages={stages}
          allow_change_status={true}
          onChangeStatus={(stage_id: string) => {
            return (new_status: Status) => {
              API.get_instance()
                .set_stage_status(
                  getProject().id,
                  route.params.title,
                  stage_id,
                  new_status,
                  getUser().id
                )
                .then(() =>
                  API.get_instance()
                    .get_all_stages(
                      getProject().id,
                      route.params.title,
                      getUser().id
                    )
                    .then((stages) => setStages(stages))
                )
                .catch((err) => alert(err));
            };
          }}
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
              API.get_instance()
                .add_stage(
                  getProject().id,
                  route.params.title,
                  get_name(),
                  getUser().id
                )
                .then(() => {
                  API.get_instance()
                    .get_all_stages(
                      getProject().id,
                      route.params.title,
                      getUser().id
                    )
                    .then((stages) => setStages(stages))
                    .catch((err) => alert(err));
                })
                .then(() => modal_visibility_setter(false))
                .catch((err) => alert(err));
            };
          }}
        />
      )}
    </Background>
  );
};

export default GeneralStagesScreen;
