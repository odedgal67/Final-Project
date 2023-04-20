import React from "react";
import { View, ScrollView } from "react-native";
import StageButton from "./StageButton";
import StatusRectangle from "./StatusRectangle";

function getRows(stageNames: String[], stageStatuses: String[], ButtonHandler) {
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
          backgroundColor: "#c2c0b2",
        }}
      >
        {getRows(props.stagesNames, props.stagesStatuses, props.ButtonHandler)}
      </View>
    </ScrollView>
  );
};

export default StagesTable;
