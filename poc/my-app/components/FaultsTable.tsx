import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import StatusRectangle from "./StatusRectangle";
import { ListedStatusItem, Fault, Status } from "../types";
import { hebrew } from "../utils/text_dictionary";
import { FaultButton, FaultButtonBase} from "./TableUtils/FaultButton";
import GetTextModalFault from "./GetTextModalFault";

function getRows(
  faults: Fault[],
  ButtonHandler: (fault_name: string, fault_id: string) => () => void,
  allow_change_status: boolean,
  onDelete: (fault_id: string) => () => Promise<void>,
  onEditName: (fault: Fault) => (new_name: string) => Promise<void>,
  onChangeStatus?: (fault: Fault) => (new_status: Status) => void
) {
  let rows = [];
  for (let i = 0; i < faults.length; i++) {
    rows.push(
      faults[i] && (
        <View
            key={faults[i].id}
            style={{
            flexDirection: "row",
            backgroundColor: "#121e26",
            marginVertical: 4.5,
            marginHorizontal: 10,
            elevation: 5,
            borderRadius: 10,
            }}
        >
            <FaultButton
                fault={faults[i]}
                onClick={ButtonHandler(faults[i].name, faults[i].id)}
                onDelete={onDelete(faults[i].id)}
                onEditName={onEditName(faults[i])}
            />
            <StatusRectangle
            status={faults[i].status}
            borderRad={5}
            height={undefined}
            width={undefined}
            activated={allow_change_status}
            onChange={onChangeStatus ? onChangeStatus(faults[i]) : () => {}}
            border={false}
            />
        </View>
      )
    );
  }
  return rows;
}

const FaultsTable = (props: {
  faults: Fault[];
  onAdd: (fault_name: string, floor_number: number, apartment_number: number) => Promise<void>;
  ButtonHandler: (fault: string, id: string) => any;
  allow_change_status: boolean;
  onDelete: (fault_id: string) => () => Promise<void>;
  onEditName: (fault: Fault) => (new_name: string) => Promise<void>;
  onChangeStatus?: (fault: Fault) => (new_status: Status) => void;
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [fault_name, set_fault_name] = React.useState("");
  const [floor_number, set_floor_number] = React.useState("");
  const [apartment_number, set_apartment_number] = React.useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#c2c0b2" }}>
      <View style={{ flex: 9.3 }}>
        <ScrollView>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {getRows(
            props.faults,
            props.ButtonHandler,
            props.allow_change_status,
            props.onDelete,
            props.onEditName,
            props.onChangeStatus
            )}
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        <FaultButtonBase
          fault={{
            name: hebrew.add_new_fault,
            id: "",
            floor_number: 0,
            apartment_number: 0,
            urgency: 1,
            completion_date: new Date(),
            proof: "",
            proof_fix: "",
            project_id: 0,
            comment: "",
            green_building: false,
            status: Status.Undefined,
          }}
          onClick={() => setModalVisible(true)}
          backgroundColor="rgb(46, 107, 94)"
        />
        <GetTextModalFault
          visible={modalVisible}
          boxTitle={hebrew.add_new_fault}
          onRequestClose={() => {
            setModalVisible(false);
            set_fault_name("");
          }}
          onChangeTextName={set_fault_name}
          onChangeTextFloor={set_floor_number}
          onChangeTextApartment={set_apartment_number}
          onAccept={() => {
            props.onAdd(fault_name, parseInt(floor_number), parseInt(apartment_number)).then(() => {
            setModalVisible(false);
            set_fault_name("");
            set_floor_number("");
            set_apartment_number("");
            }).catch((err) => {
                alert(err);
            });
          }}
        />
      </View>
    </View>
  );
};

export default FaultsTable;
