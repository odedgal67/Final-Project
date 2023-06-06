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
import { ListedStatusItem, Stage, Status } from "../types";
import { hebrew } from "../utils/text_dictionary";

function getRows(
  stageNames: string[],
  stageStatuses: Status[],
  stageIDs: string[],
  ButtonHandler: (stage_name: String, stage_id: string) => () => void,
  allow_change_status: boolean,
  onChangeStatus?: (stage_id: string) => (new_status: Status) => void
) {
  let rows = [];
  for (let i = 0; i < stageNames.length; i++) {
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
          stageName={stageNames[i]}
          onClick={ButtonHandler(stageNames[i], stageIDs[i])}
        />
        <StatusRectangle
          status={stageStatuses[i]}
          borderRad={5}
          height={undefined}
          width={undefined}
          activated={allow_change_status}
          onChange={onChangeStatus ? onChangeStatus(stageIDs[i]) : () => {}}
          border={false}
        />
      </View>
    );
  }
  return rows;
}

const StagesTable = (props: {
  stages: ListedStatusItem[];
  ButtonHandler: (stage: String, id: string) => any;
  addStagehandler: (
    getter: () => string,
    modal_visibility_setter: (vis: boolean) => void
  ) => () => void;
  allow_change_status: boolean;
  onChangeStatus?: (stage_id: string) => (new_status: Status) => void;
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [new_stage_name, set_stage_name] = React.useState("");
  let stagesNames: string[] = props.stages.map(
    (stage: ListedStatusItem) => stage.name
  );
  let stageIDs: string[] = props.stages.map(
    (stage: ListedStatusItem) => stage.id
  );
  let stagesStatuses: Status[] = props.stages.map(
    (stage: ListedStatusItem) => stage.status
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
          stagesNames,
          stagesStatuses,
          stageIDs,
          props.ButtonHandler,
          props.allow_change_status,
          props.onChangeStatus
        )}
        <View style={{ flex: 1, flexDirection: "row" }}>
          <StageButton
            stageName={hebrew.add_new_stage}
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
                  paddingVertical: "2%",
                }}
              >
                <Text style={styles.rename_text}>{hebrew.add_new_stage}</Text>
                <TextInput
                  maxLength={25}
                  numberOfLines={1}
                  style={styles.text_input}
                  placeholder={hebrew.name}
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
                  <Text style={styles.rename_text_white}>{hebrew.accept}</Text>
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
    textAlign: "center",
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
