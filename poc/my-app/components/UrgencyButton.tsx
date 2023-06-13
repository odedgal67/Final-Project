import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Urgency } from "../types";
import { urgency_to_hebrew } from "../utils/text_dictionary";

const urgencyColors: Record<Urgency, string> = {
  [Urgency.LOW]: "#44ce1b",
  [Urgency.MODERATE]: "#f7e350",
  [Urgency.HIGH]: "#e51f1f",
};

const UrgencyButton = (props: {
  urgency: Urgency;
  onUrgencyChange: (newUrgency: Urgency) => void;
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleUrgencyChange = (newUrgency: Urgency) => {
    props.onUrgencyChange(newUrgency);
    setModalVisible(false);
  };

  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      borderRadius: 10,
      elevation: 10,
      borderColor: "black",
      marginHorizontal: "10%",
      backgroundColor: urgencyColors[props.urgency] || "#ff0000",
    },
    text: {
      textAlign: "center",
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      color: "black",
      padding: 5,
    },
  });

  function opacity_comp(value: Urgency) {
    let _styles = StyleSheet.create({
      s: {
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        width: "50%",
        backgroundColor: urgencyColors[value],
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
        onPress={() => handleUrgencyChange(value)}
      >
        <Text style={styles.text}>{urgency_to_hebrew[value]}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1 }} testID="status-rectangle">
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
      <Text style={styles.text}>{urgency_to_hebrew[props.urgency]}</Text>
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
            {opacity_comp(Urgency.LOW)}
            {opacity_comp(Urgency.MODERATE)}
            {opacity_comp(Urgency.HIGH)}
          </View>
        </Modal>
      </TouchableOpacity>
    </View>
  );
};

export default UrgencyButton;
