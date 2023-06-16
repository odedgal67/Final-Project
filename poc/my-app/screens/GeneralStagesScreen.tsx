import * as React from "react";
import StagesTable from "../components/StagesTable";
import { View } from "react-native";
import Background from "../components/Background";
import { ProjectContext } from "../utils/ProjectContext";
import { Stage, Project, Title, Status } from "../types";
import API from "../API/api_bridge";
import { UserContext } from "../utils/UserContext";
import { hebrew, title_to_hebrew } from "../utils/text_dictionary";
import { truncate_page_title } from "../utils/stringFunctions";
import { useFocusEffect } from "@react-navigation/native";

const GeneralStagesScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: { params: { title: Title; project: Project, apartment_number ?: number } };
}) => {
  const { setProject, getProject } = React.useContext(ProjectContext);
  const { getUser } = React.useContext(UserContext);
  const [stages, setStages] = React.useState([] as Stage[]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.apartment_number ? hebrew.apartment_stages.replace("${apartment}", route.params.apartment_number.toString()) :
      route.params.project.name + " > " + truncate_page_title(title_to_hebrew[route.params.title]),
    });
  }, [navigation]);
  useFocusEffect(
    React.useCallback(() => {
      API.get_instance()
        .get_all_stages(getProject().id, route.params.title, getUser().id, route.params.apartment_number)
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
                  // , route.params.apartment_number // TODO: add apartment number after adding it to the backend
                )
                .then(() =>
                  API.get_instance()
                    .get_all_stages(
                      getProject().id,
                      route.params.title,
                      getUser().id,
                      route.params.apartment_number
                    )
                    .then((stages) => setStages(stages))
                )
                .catch((err) => alert(err));
            };
          }}
          ButtonHandler={(stage_name: string, stage_id: string) => {
            return () =>
              navigation.navigate("MissionListScreen", {
                stage: stages.find((stage: any) => stage.id == stage_id),
                stageName: stage_name,
                stage_id: stage_id,
                title: route.params.title,
                apartment_number: route.params.apartment_number,
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
                  getUser().id,
                  route.params.apartment_number
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
                  getUser().id,
                  route.params.apartment_number
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
                  getUser().id,
                  route.params.apartment_number
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
