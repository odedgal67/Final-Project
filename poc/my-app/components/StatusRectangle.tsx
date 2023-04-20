import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const statusColors: Record<string, string> = {
  "לא בוצע": "#ffa134",
  בתהליך: "#f7e350",
  הסתיים: "#44ce1b",
  "לא תקין": "#e51f1f",
};

const StatusRectangle = (props: {
  status: string;
  onChange: (status: string) => void;
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleChange = (value: string) => {
    setModalVisible(false);
    // props.onChange(value);
  };

  const styles = StyleSheet.create({
    button: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 10,
      elevation: 3,
      backgroundColor: statusColors[props.status] || "#ff0000",
      borderColor: "black",
      borderWidth: 1,
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

  function opacity_comp(value: string) {
    let _styles = {
      alignItems: "center",
      alignSelf: "center",
      justifyContent: "center",
      width: "100%",
      backgroundColor: statusColors[value],
      margin: 10,
      height: 50,
      borderRadius: 20,
    };
    return (
      <TouchableOpacity style={_styles} onPress={() => handleChange(value)}>
        <Text style={styles.text}>{value}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.text}>{props.status}</Text>
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
            {opacity_comp("לא בוצע")}
            {opacity_comp("בתהליך")}
            {opacity_comp("הסתיים")}
            {opacity_comp("לא תקין")}
          </View>
        </Modal>
      </Pressable>
    </View>
  );
};

export default StatusRectangle;
