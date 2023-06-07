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
import { ListedStatusItem, Stage, Status } from "../types";
import { hebrew } from "../utils/text_dictionary";
import { StageButton, StageButtonBase } from "./StageTableUtils/StageButton";
import GetTextModal from "./GetTextModal";

function getRows(
  stages: ListedStatusItem[],
  ButtonHandler: (stage_name: string, stage_id: string) => () => void,
  allow_change_status: boolean,
  onDelete: (stage_id: string) => () => Promise<void>,
  onEditName: (stage_id: string) => (newname: string) => Promise<void>,
  onChangeStatus?: (stage_id: string) => (new_status: Status) => void
) {
  let rows = [];
  for (let i = 0; i < stages.length; i++) {
    rows.push(
      <View
        key={stages[i].id}
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
          stageName={stages[i].name}
          onClick={ButtonHandler(stages[i].name, stages[i].id)}
          onDelete={onDelete(stages[i].id)}
          onEditName={onEditName(stages[i].id)}
        />
        <StatusRectangle
          status={stages[i].status}
          borderRad={5}
          height={undefined}
          width={undefined}
          activated={allow_change_status}
          onChange={onChangeStatus ? onChangeStatus(stages[i].id) : () => {}}
          border={false}
        />
      </View>
    );
  }
  return rows;
}

const StagesTable = (props: {
  stages: ListedStatusItem[];
  ButtonHandler: (stage: string, id: string) => any;
  addStagehandler: (
    getter: () => string,
    modal_visibility_setter: (vis: boolean) => void
  ) => () => void;
  allow_change_status: boolean;
  onDelete: (stage_id: string) => () => Promise<void>;
  onEditName: (stage_id: string) => (newname: string) => Promise<void>;
  onChangeStatus?: (stage_id: string) => (new_status: Status) => void;
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [new_stage_name, set_stage_name] = React.useState("");
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
              props.stages,
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
        <StageButtonBase
          stageName={hebrew.add_new_stage}
          onClick={() => setModalVisible(true)}
          backgroundColor="rgb(46, 107, 94)"
        />
        <GetTextModal
          visible={modalVisible}
          boxTitle={hebrew.add_new_stage}
          onRequestClose={() => {
            setModalVisible(false);
            set_stage_name("");
          }}
          onChangeText={(stage_name: string) => set_stage_name(stage_name)}
          onAccept={props.addStagehandler(() => {
            return new_stage_name;
          }, setModalVisible)}
        />
      </View>
    </View>
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
