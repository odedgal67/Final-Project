import * as React from "react";
import FaultsTable from "../components/FaultsTable";
import Background from "../components/Background";
import { ProjectContext } from "../utils/ProjectContext";
import { UserContext } from "../utils/UserContext";
import API from "../API/api_bridge";
import { Fault, Project, Status, Title } from "../types";
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
          onChangeStatus={(fault: Fault) => (newstatus: Status) => {
            return new Promise((resolve, reject) => {
              API.get_instance()
                .set_fault_status(getProject().id, fault.id, newstatus, getUser().id)
                .then(() =>
                  API.get_instance()
                    .get_all_faults(getProject().id, getUser().id)
                    .then((faults) => {
                      setFaults(faults)
                      resolve()
                    }).catch((err) => reject(err))
                ).catch((err) => reject(err));
            });
          }}
          onAdd={(fault_name: string, floor_number: number, apartment_number: number) => {
            return new Promise((resolve, reject) => {
                API.get_instance()
                  .add_fault(
                    getProject().id,
                    floor_number,
                    apartment_number,
                    fault_name,
                    getUser().id
                  )
                  .then((_fault_id) =>
                    API.get_instance()
                      .get_all_faults(getProject().id, getUser().id)
                      .then((faults) => {
                        setFaults(faults)
                        resolve()}).catch((err) => reject(err))
                  ).catch((err) => reject(err));
              });
          }}
          onDelete={(fault_id: string) => { return () => {
            return new Promise((resolve, reject) => {
              API.get_instance()
                .remove_fault(getProject().id, fault_id, getUser().id)
                .then(() =>
                  API.get_instance()
                    .get_all_faults(getProject().id, getUser().id)
                    .then((faults) => {
                      setFaults(faults)
                      resolve()}
                    ).catch((err) => reject(err))
                ).catch((err) => reject(err));
            });
          }}}
          onEditName={(fault: Fault) => (newname: string) => {
            return new Promise((resolve, reject) => {
              API.get_instance()
                .edit_fault(getProject().id, fault.id, newname, fault.floor_number, fault.apartment_number, fault.green_building, fault.urgency, fault.proof_fix, "", "", fault.status, fault.proof, fault.comment, getUser().id)
                .then(() =>
                  API.get_instance()
                  .get_all_faults(getProject().id, getUser().id)
                  .then((faults) => {
                    setFaults(faults)
                    resolve()}
                  ).catch((err) => reject(err))
                ).catch((err) => reject(err));
            })
          }}
        />
      )}
    </Background>
  );
};

export default FaultListScreen;
