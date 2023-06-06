import * as React from "react";
import FaultsTable from "../components/FaultsTable";
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
        <FaultsTable
          faults={faults}
          allow_change_status={true}
          ButtonHandler={(_fault_name: String, fault_id: string) => {
            return () =>
              navigation.navigate("FaultScreen", {
                fault: faults.find((fault: any) => fault.id == fault_id),
                title: route.params.title,
              });
          }}
          addFaulthandler={(getter: () => { name: string; floor: number; apartment: number }, modal_visibility_setter) => {
            return () => {
              API.get_instance()
                .add_fault(
                  getProject().id,
                  getter().floor,
                  getter().apartment,
                  getter().name,
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
