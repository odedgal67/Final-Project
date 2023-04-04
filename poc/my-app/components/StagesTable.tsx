import React from "react";
import { View, ScrollView } from "react-native";
import StageButton from "./StageButton";
import StatusRectangle from "./StatusRectangle";

function getRows(stageNames: String[], stageStatuses: String[], ButtonHandler) {
  let rows = [];
  for (let i = 0; i < stageNames.length; i++) {
    rows.push(
      <View style={{ flexDirection: "row" }}>
        <StageButton stageName={stageNames[i]} onClick={ButtonHandler} />
        <StatusRectangle status={stageStatuses[i]} />
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
