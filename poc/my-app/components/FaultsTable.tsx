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
import StageButton from "./StageButton";
import StatusRectangle from "./StatusRectangle";
import { ListedStatusItem, Fault, Status } from "../types";
import { hebrew } from "../utils/text_dictionary";

function getRows(
  faultNames: string[],
  faultStatuses: Status[],
  faultIDs: string[],
  ButtonHandler: (fault_name: string, fault_id: string) => () => void,
  allow_change_status: boolean,
  onChangeStatus?: (fault_id: string) => (new_status: Status) => void
) {
  let rows = [];
  for (let i = 0; i < faultNames.length; i++) {
    rows.push(
      <View
        key={i}
        style={{
          flexDirection: "row",
          backgroundColor: "#121e26",
          marginVertical: 4.5,
          marginHorizontal: 10,
          elevation: 5,
          borderRadius: 10,
        }}
      >
        <StageButton
          stageName={faultNames[i]}
          onClick={ButtonHandler(faultNames[i], faultIDs[i])}
        />
        <StatusRectangle
          status={faultStatuses[i]}
          borderRad={5}
          height={undefined}
          width={undefined}
          activated={allow_change_status}
          onChange={onChangeStatus ? onChangeStatus(faultIDs[i]) : () => {}}
          border={false}
        />
      </View>
    );
  }
  return rows;
}

const FaultsTable = (props: {
  faults: Fault[];
  ButtonHandler: (fault: string, id: string) => any;
  addFaulthandler: (
    getter: () => { name: string; floor: number; apartment: number },
    modal_visibility_setter: (vis: boolean) => void
  ) => () => void;
  allow_change_status: boolean;
  onChangeStatus?: (fault_id: string) => (new_status: Status) => void;
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [fault_name, set_fault_name] = React.useState("");
  const [floor_number, set_floor_number] = React.useState("");
  const [apartment_number, set_apartment_number] = React.useState("");

  let faultNames: string[] = props.faults.map(
    (fault: ListedStatusItem) => fault.name
  );
  let faultIDs: string[] = props.faults.map(
    (fault: ListedStatusItem) => fault.id
  );
  let faultStatuses: Status[] = props.faults.map(
    (fault: ListedStatusItem) => fault.status
  );

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#c2c0b2",
          flex: 1,
        }}
      >
        {getRows(
          faultNames,
          faultStatuses,
          faultIDs,
          props.ButtonHandler,
          props.allow_change_status,
          props.onChangeStatus
        )}
        <View style={{ flex: 1, flexDirection: "row" }}>
          <StageButton
            stageName={hebrew.add_new_fault}
            onClick={() => setModalVisible(true)}
          />
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
              set_fault_name("");
              set_floor_number("");
              set_apartment_number("");
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <View style={styles.inputContainer}>
                <Text style={styles.modalTitle}>{hebrew.add_new_fault}</Text>
                <TextInput
                  maxLength={25}
                  style={styles.textInput}
                  placeholder={hebrew.name}
                  placeholderTextColor={"black"}
                  textAlign="center"
                  onChangeText={set_fault_name}
                />
                <TextInput
                  maxLength={25}
                  style={styles.textInput}
                  placeholder={hebrew.floor_number}
                  placeholderTextColor={"black"}
                  textAlign="center"
                  onChangeText={set_floor_number}
                />
                <TextInput
                  maxLength={25}
                  style={styles.textInput}
                  placeholder={hebrew.apartment_number}
                  placeholderTextColor={"black"}
                  textAlign="center"
                  onChangeText={set_apartment_number}
                />
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={props.addFaulthandler(
                    () => ({
                      name: fault_name,
                      floor: parseInt(floor_number),
                      apartment: parseInt(apartment_number),
                    }),
                    setModalVisible
                  )}
                >
                  <Text style={styles.acceptButtonText}>{hebrew.accept}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    opacity: 1,
    width: "75%",
    paddingVertical: "2%",
  },
  modalTitle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    marginTop: "2%",
    marginBottom: "5%",
    textAlign: "center",
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    margin: "3%",
  },
  acceptButton: {
    borderRadius: 20,
    backgroundColor: "#4c595f",
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
    marginHorizontal: "5%",
    marginVertical: "2%",
  },
  acceptButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    marginHorizontal: "3%",
    marginTop: "2%",
  },
});

export default FaultsTable;
