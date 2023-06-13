import * as React from "react";
import StagesTable from "../components/StagesTable";
import { View } from "react-native";
import Background from "../components/Background";
import { ProjectContext } from "../utils/ProjectContext";
import { Stage, Project, Title, Status } from "../types";
import API from "../API/api_bridge";
import { UserContext } from "../utils/UserContext";
import { title_to_hebrew } from "../utils/text_dictionary";
import { truncate_page_title } from "../utils/stringFunctions";
import { useFocusEffect } from "@react-navigation/native";

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
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: truncate_page_title(title_to_hebrew[route.params.title]),
    });
  }, [navigation]);
  useFocusEffect(
    React.useCallback(() => {
      API.get_instance()
        .get_all_stages(getProject().id, route.params.title, getUser().id)
        .then((stages) => setStages(stages))
        .catch((err) => alert(err));
    }, [])
  );
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
          ButtonHandler={(stage_name: string, stage_id: string) => {
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
                .then((new_stage: Stage) => {
                  setStages((currStages) => [...currStages, new_stage]);
                })
                .then(() => modal_visibility_setter(false))
                .catch((err) => alert(err));
            };
          }}
          onDelete={(stage_id: string) => () =>
            new Promise((resolve, _reject) => {
              API.get_instance()
                .remove_stage(
                  getProject().id,
                  route.params.title,
                  stage_id,
                  getUser().id
                )
                .then((removedStage: Stage) => {
                  setStages((currStages) =>
                    currStages.filter((stage) => stage.id != removedStage.id)
                  );
                })
                .catch((err) => alert(err))
                .then(() => resolve())
                .catch((err) => alert(err));
            })}
          onEditName={(stage_id: string) => (newname: string) =>
            new Promise((resolve, reject) => {
              API.get_instance()
                .edit_stage_name(
                  getProject().id,
                  route.params.title,
                  stage_id,
                  newname,
                  getUser().id
                )
                .then(() =>
                  setStages((currStages) =>
                    currStages.map((stage) =>
                      stage.id == stage_id ? { ...stage, name: newname } : stage
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

export default GeneralStagesScreen;
