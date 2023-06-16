import React from "react";
import {
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
  Dimensions,
  ImageSourcePropType,
} from "react-native";
import ClickableIcon from "./ClickableIcon";
import GetTextModal from "../GetTextModal";
import { hebrew } from "../../utils/text_dictionary";
import ConfirmDialogue from "../ConfirmDialogue";
import { Fault } from "../../types";

type BaseProps = {
  fault: Fault;
  onClick: () => void;
  backgroundColor?: string;
};

type FaultButtonbaseProps = {
  onLongClick?: () => void;
} & BaseProps;

const total_flex = 4.5;
const padding_horizontal = 16;
const backgroundColor = "#2d3c3b";
const borderRadius = 10;

export const FaultButtonBase = (props: FaultButtonbaseProps) => {
  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      paddingHorizontal: padding_horizontal,
      backgroundColor: props.backgroundColor
        ? props.backgroundColor
        : backgroundColor,
      borderRadius: borderRadius,
      flex: total_flex,
    },
    text: {
      textAlign: "center",
      fontSize: 14,
      lineHeight: 21,
      color: "white",
    },
  });
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={props.onClick}
      onLongPress={props.onLongClick}
    >
      <Text style={styles.text}>{props.fault.name}</Text>
    </TouchableHighlight>
  );
};

type editButtonProps = {
  onClick: () => void;
  Image: ImageSourcePropType;
};

const EditButton = (props: editButtonProps) => {
  const len = Dimensions.get("window").width * 0.1;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.1)",
        padding: "1%",
        marginHorizontal: "1%",
        borderRadius: borderRadius,
      }}
    >
      <ClickableIcon
        imagePath={props.Image}
        width={len}
        height={len}
        onClick={props.onClick}
      />
    </View>
  );
};

type FaultButtonProps = {
  onDelete: () => Promise<void>;
  onEditName: (newname: string) => Promise<void>;
} & BaseProps;

export const FaultButton = (props: FaultButtonProps) => {
  const [isEditable, setIsEditable] = React.useState(false);
  const [editNameModalVisibility, setEditNameModalVisibility] =
    React.useState(false);
  const [newFaultName, setNewFaultName] = React.useState("");
  return isEditable ? (
    <>
      <View
        style={{
          flex: total_flex,
          flexDirection: "row",
          paddingHorizontal: padding_horizontal,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <EditButton
          Image={require("../imgs/back.png")}
          onClick={() => {
            setIsEditable(false);
          }}
        />
        <EditButton
          Image={require("../imgs/edit.png")}
          onClick={() => {
            setEditNameModalVisibility(true);
          }}
        />
        <EditButton
          Image={require("../imgs/trash.png")}
          onClick={() =>
            ConfirmDialogue({
              title: "",
              message: hebrew.are_you_sure_you_want_to_delete_x.replace(
                "${x}",
                props.fault.name
              ),
              onConfirm: () =>
                props
                  .onDelete()
                  .then(() => setIsEditable(false))
                  .catch((err) => alert(err)),
            })
          }
        />
      </View>
      <GetTextModal
        visible={editNameModalVisibility}
        onRequestClose={function (): void {
          setEditNameModalVisibility(false);
        }}
        onChangeText={function (text: string): void {
          setNewFaultName(text);
        }}
        onAccept={function (): void {
          props
            .onEditName(newFaultName)
            .then(() => {
              setIsEditable(false);
              setEditNameModalVisibility(false);
            })
            .catch((err) => alert(err));
        }}
        boxTitle={hebrew.change_name_for_projectName.replace(
          "${projectName}",
          props.fault.name
        )}
      />
    </>
  ) : (
    <FaultButtonBase
      fault={props.fault}
      onClick={props.onClick}
      onLongClick={() => setIsEditable(true)}
      backgroundColor={props.backgroundColor}
    />
  );
};