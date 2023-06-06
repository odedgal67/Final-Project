import * as React from "react";
import StagesTable from "../components/StagesTable";
import Background from "../components/Background";
import { ProjectContext } from "../utils/ProjectContext";
import { UserContext } from "../utils/UserContext";
import API from "../API/api_bridge";
import { Fault, Project, Title } from "../types";
import { hebrew, title_to_hebrew } from "../utils/text_dictionary";

const FaultListScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: { params: { title: Title; project: Project } };
}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({ title:route.params.project.name + " > " + title_to_hebrew[route.params.title] });
  }, [navigation]);

  const { getProject } = React.useContext(ProjectContext);
  const { getUser } = React.useContext(UserContext);
  const [faults, setFaults] = React.useState([] as Fault[]);
  React.useEffect(() => {
    API.get_instance()
      .get_all_faults(getProject().id, getUser().id)
      .then((faults) => setFaults(faults));
  }, []);
  return (
    <Background>
      {faults && (
        <StagesTable
          stages={faults}
          allow_change_status={true}
          ButtonHandler={(_fault_name: String, fault_id: string) => {
            return () =>
              navigation.navigate("FaultScreen", {
                fault: faults.find((fault: any) => fault.id == fault_id),
                title: route.params.title,
              });
          }}
          addStagehandler={(getter: () => string, modal_visibility_setter) => {
            return () => {
              API.get_instance()
                .add_fault(
                  getProject().id,
                  0,
                  0,
                  getter(),
                  getUser().id
                )
                .then((_fault_id) => {
                  API.get_instance()
                    .get_all_faults(getProject().id, getUser().id)
                    .then((faults) => setFaults(faults))
                    .then(() => modal_visibility_setter(false));
                });
            };
          }}
        />
      )}
    </Background>
  );
};

export default FaultListScreen;
