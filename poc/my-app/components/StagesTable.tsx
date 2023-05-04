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
import { Status } from "../types";

function getRows(
  stageNames: String[],
  stageStatuses: Status[],
  stageIDs: number[],
  ButtonHandler,
  allow_change_status: boolean
) {
  let rows = [];
  for (let i = 0; i < stageNames.length; i++) {
    rows.push(
      <View
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
          stageName={stageNames[i]}
          onClick={ButtonHandler(stageNames[i], stageIDs[i])}
        />
        <StatusRectangle
          status={stageStatuses[i]}
          borderRad={5}
          height={undefined}
          width={undefined}
          activated={allow_change_status}
        />
      </View>
    );
  }
  return rows;
}

const StagesTable = (props: {
  stagesNames: String[];
  stagesStatuses: Status[];
  stageIDs: number[];
  columnTitle: String;
  ButtonHandler: (stage: String, id: number) => any;
  addStagehandler: (
    getter: () => string,
    modal_visibility_setter: (vis: boolean) => void
  ) => () => void;
  allow_change_status: boolean;
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [new_stage_name, set_stage_name] = React.useState("");
  let add_new_text = "הוספה";
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#c2c0b2",
        }}
      >
        {getRows(
          props.stagesNames,
          props.stagesStatuses,
          props.stageIDs,
          props.ButtonHandler,
          props.allow_change_status,
          props.stageIDs
        )}
        <View style={{ flex: 1, flexDirection: "row" }}>
          <StageButton
            stageName={"הוספה"}
            onClick={() => setModalVisible(true)}
          />
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
              set_stage_name("");
            }}
          >
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.3)",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 5,
                  opacity: 1,
                  width: "75%",
                }}
              >
                <Text style={styles.rename_text}>{add_new_text}</Text>
                <TextInput
                  maxLength={25}
                  numberOfLines={1}
                  style={styles.text_input}
                  placeholder="שם"
                  placeholderTextColor={"black"}
                  textAlign="center"
                  onChangeText={(stage_name: string) =>
                    set_stage_name(stage_name)
                  }
                />
                <TouchableOpacity
                  style={styles.accept_name_change_button}
                  onPress={props.addStagehandler(() => {
                    return new_stage_name;
                  }, setModalVisible)}
                >
                  <Text style={styles.rename_text_white}>אישור</Text>
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
  button: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: "5%",
    paddingHorizontal: "8%",
    marginHorizontal: "4%",
    marginVertical: "7%",
    elevation: 15,
    borderRadius: 10,
    backgroundColor: "#c2c0b2",
    maxHeight: "70%",
    maxWidth: "40%",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    flex: 1,
    paddingBottom: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  image_background: {
    flex: 1,
    backgroundColor: "#e2e0d2",
    borderRadius: 10,
    maxHeight: 80,
    maxWidth: 80,
  },
  text_bg: {
    flex: 1,
  },
  rename_text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "Black",
    marginHorizontal: "3%",
    marginTop: "2%",
  },
  rename_text_white: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    marginHorizontal: "3%",
    marginTop: "2%",
  },
  text_input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    margin: "5%",
  },
  accept_name_change_button: {
    borderRadius: 20,
    backgroundColor: "#4c595f",
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
    marginHorizontal: "5%",
    marginVertical: "2%",
  },
});

export default StagesTable;
