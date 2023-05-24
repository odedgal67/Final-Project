import * as React from "react";
import StagesTable from "../components/StagesTable";
import Background from "../components/Background";
import { ProjectContext } from "../utils/ProjectContext";
import { UserContext } from "../utils/UserContext";
import API from "../API/api_bridge";
import { Fault, Title } from "../types";

const FaultListScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: { params: { floor: number; title: Title } };
}) => {
  const { getProject } = React.useContext(ProjectContext);
  const { getUser } = React.useContext(UserContext);
  const [faults, setFaults] = React.useState([] as Fault[]);
  React.useEffect(() => {
    setFaults(
      API.get_instance().get_all_faults(
        getProject().id,
      )
    );
  }, []);
  return (
    <Background>
      <StagesTable
        stages={faults}
        allow_change_status={true}
        ButtonHandler={(_fault_name: String, fault_id: number) => {
          return () =>
            navigation.navigate("FaultScreen", {
              fault: faults.find(
                (fault: any) => fault.id == fault_id
              ),
              title: route.params.title,
            });
        }}
        addStagehandler={(getter: () => string, modal_visibility_setter) => {
          return () => {
            API.get_instance().add_fault(
              getProject().id,
              route.params.floor,
              0,
              getter(),
              getUser().name
            );
            setFaults(
              API.get_instance().get_all_faults(
                getProject().id,
              )
            );
            modal_visibility_setter(false);
          };
        }}
      />
    </Background>
  );
};

export default FaultListScreen;
