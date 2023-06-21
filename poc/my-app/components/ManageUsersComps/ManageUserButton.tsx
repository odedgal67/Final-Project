import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ConfirmDialogue from "../ConfirmDialogue";
import { hebrew } from "../../utils/text_dictionary";
import React from "react";

type RemoveUserButtonProps = {
  onPress: () => void;
  title: string;
  username: string;
};

export const RemoveUserButton = (props: RemoveUserButtonProps) => {
  let message_box_text = hebrew.are_you_sure_you_want_to_remove.replace(
    "${userName}",
    props.username
  );
  let confirm = () =>
    ConfirmDialogue({
      title: "",
      message: message_box_text,
      onConfirm: props.onPress,
    });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID="remove_user_button"
        style={styles.generic_button_container}
        onPress={confirm}
      >
        <Text style={styles.white_text}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const ResetUserPasswordButton = (props: RemoveUserButtonProps) => {
  let message_box_text = hebrew.are_you_sure_you_want_to_reset_password.replace(
    "${userName}",
    props.username
  );
  let confirm = () =>
    ConfirmDialogue({
      title: "",
      message: message_box_text,
      onConfirm: props.onPress,
    });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID="reset_user_password_button"
        style={styles.generic_button_container}
        onPress={confirm}
      >
        <Text style={styles.white_text}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  white_text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    margin: 10,
  },
  generic_button_container: {
    borderRadius: 5,
    backgroundColor: "#4c595f",
    alignItems: "center",
    justifyContent: "center",
    margin: 1,
  },
});

