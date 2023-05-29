import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import { Status } from "../types";
import { status_to_hebrew, title_to_hebrew } from "../utils/text_dictionary";

const statusColors: Record<Status, string> = {
  [Status.Open]: "#ffa134",
  [Status.InProgress]: "#f7e350",
  [Status.Done]: "#44ce1b",
  [Status.Invalid]: "#e51f1f",
};

const statusIMG = {
  [Status.Open]: require("./imgs/open_status.png"),
  [Status.InProgress]: require("./imgs/inprogress_status.png"),
  [Status.Done]: require("./imgs/done_status.png"),
  [Status.Invalid]: require("./imgs/invalid_status.png"),
};

const StatusRectangle = (props: {
  status: Status;
  borderRad: number;
  width: number | undefined;
  height: number | undefined;
  border: boolean;
  onChange: (status: Status) => void;
  activated: boolean;
}) => {
  if (props.activated == undefined) {
    props.activated = true;
  }
  let border_width = props.border ? 1 : 0;
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleChange = (new_status: Status) => {
    props.onChange(new_status);
    setModalVisible(false);
  };

  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: props.borderRad,
      width: props.width,
      maxWidth: props.width,
      maxHeight: props.height,
      height: props.height,
      elevation: 3,
      backgroundColor: statusColors[props.status] || "#ff0000",
      borderColor: "black",
      borderWidth: border_width,
      margin: 4.5,
      flex: 1,
    },
    text: {
      textAlign: "center",
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      color: "black",
    },
    opacity: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
      margin: 10,
      height: 50,
    },
  });

  function opacity_comp(value: Status) {
    let _styles = StyleSheet.create({
      s: {
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        width: "50%",
        backgroundColor: statusColors[value],
        margin: 10,
        height: 50,
        borderRadius: 50,
        borderColor: "black",
        borderWidth: 1,
      },
    });
    return (
      <TouchableOpacity
        style={_styles.s}
        onPress={() => handleChange(value)}
        // testID={hevalue}
      >
        <Text style={styles.text}>{status_to_hebrew[value]}</Text>
      </TouchableOpacity>
    );
  }

  let image_width =
    (props.width != undefined && props.width - 55) ||
    Dimensions.get("window").width * 0.1;
  return (
    <View style={{ flex: 1 }} testID="status-rectangle">
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
        disabled={!props.activated}
        testID="status-rectangle-button"
      >
        <Image
          source={statusIMG[props.status]}
          style={{ width: image_width, height: image_width, margin: 2 }}
          testID="status-rectangle-image"
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={{ backgroundColor: "#111111", flex: 2, opacity: 0 }}>
            <Pressable
              style={{ flex: 1 }}
              onPress={() => setModalVisible(false)}
            ></Pressable>
          </View>
          <View
            style={{
              backgroundColor: "rgba(52,52,52,0.5)",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            {opacity_comp(Status.Open)}
            {opacity_comp(Status.InProgress)}
            {opacity_comp(Status.Done)}
            {opacity_comp(Status.Invalid)}
          </View>
        </Modal>
      </TouchableOpacity>
    </View>
  );
};

export default StatusRectangle;
