import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProjectButton from "../components/LevelsButton";
import Background from "../components/Background";

const level_names = [
  "דירה 1",
  "דירה 2",
  "דירה 3",
  "דירה 4",
  "דירה 5",
  "דירה 6",
  "דירה 7",
  "דירה 8",
  "דירה 9",
  "דירה 10",
];

function get_level_buttons(navigation: any) {
  let buttons = [];
  for (let i = 0; i < level_names.length; i++) {
    buttons.push(
      <ProjectButton
        key={i}
        levelName={level_names[i]}
        onPress={() =>
          navigation.navigate("GeneralStagesScreen", {
            levelName: level_names[i],
          })
        }
      />
    );
  }
  return buttons;
}

const LevelsScreen = ({ navigation }) => {
  return (
    <Background>
      <SafeAreaView>{get_level_buttons(navigation)}</SafeAreaView>
    </Background>
  );
};

export default LevelsScreen;