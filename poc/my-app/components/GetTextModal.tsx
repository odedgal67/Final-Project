import React from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { hebrew } from "../utils/text_dictionary";
import { truncate_with_dots } from "../utils/stringFunctions";

type GetTextModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  onChangeText: (text: string) => void;
  onAccept: () => void;
  boxTitle: string;
};

const GetTextModal = (props: GetTextModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}
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
          <Text style={styles.rename_text}>
            {truncate_with_dots(props.boxTitle, 35)}
          </Text>
          <TextInput
            maxLength={25}
            numberOfLines={1}
            style={styles.text_input}
            placeholder="שם"
            placeholderTextColor={"black"}
            textAlign="center"
            onChangeText={props.onChangeText}
          />
          <TouchableOpacity
            style={styles.accept_name_change_button}
            onPress={props.onAccept}
          >
            <Text style={styles.rename_text_white}>{hebrew.accept}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
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

export default GetTextModal;
