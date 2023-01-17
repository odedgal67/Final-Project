import React from "react";
import {
  Button,
  Text,
  Pressable,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import StageButton from "./StageButton";
import StatusRectangle from "./StatusRectangle";

function getRows(stageNames: String[], stageStatuses: String[], ButtonHandler) {
  let rows = [];
  for (let i = 0; i < stageNames.length; i++) {
    rows.push(
      <View style={{ flexDirection: "row" }}>
        <StatusRectangle status={stageStatuses[i]} />
        <StageButton stageName={stageNames[i]} onClick={ButtonHandler} />
      </View>
    );
  }
  return rows;
}

const StagesTable = (props: {
  stagesNames: String[];
  stagesStatuses: String[];
  columnTitle: String;
  ButtonHandler: (arg0: String) => any;
}) => {
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {getRows(props.stagesNames, props.stagesStatuses, props.ButtonHandler)}
      </View>
    </ScrollView>
  );
};

export default StagesTable;
