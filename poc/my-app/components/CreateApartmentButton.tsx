import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { hebrew } from "../utils/text_dictionary";

const CreateApartmentButton = (props) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [apartment_number, setApartment_number] = React.useState("");
  let borderRadius = 20;

  const styles = StyleSheet.create({
    button: {
      flex: 1,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    initial_view: {
      flex: 1,
      backgroundColor: "#2c393f",
      justifyContent: "center",
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      alignContent: "center",
    },
    text_input: {
      backgroundColor: "white",
      borderRadius: 10,
      marginHorizontal: "10%",
      marginBottom: 15,
      flex: 0.75,
    },
    add_apartment_button: {
      flex: 1,
      borderRadius: 20,
      backgroundColor: "#4c595f",
      margin: "5%",
      marginHorizontal: "30%",
      alignItems: "center",
      justifyContent: "center",
    },
    white_text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
    },
  });

  const add_apartment_text = (
    <Text style={styles.white_text}>{hebrew.add_apartment}</Text>
  );

  return (
    <View style={styles.initial_view}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
        testID="addButton"
      >
        <View>
          {add_apartment_text}
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
            <View style={styles.initial_view}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {add_apartment_text}
              </View>
              <View style={{ flex: 3, backgroundColor: "#2c393f" }}>
                <TextInput
                  maxLength={3}
                  numberOfLines={1}
                  keyboardType="numeric"
                  style={styles.text_input}
                  placeholder={hebrew.apartment_number}
                  placeholderTextColor={"black"}
                  textAlign="center"
                  onChangeText={(apartment_number) => setApartment_number(apartment_number)}
                />
                <TouchableOpacity
                  style={styles.add_apartment_button}
                  onPress={() =>
                    props.onAddClick(apartment_number, setModalVisible)
                  }
                >
                  <Text style={styles.white_text}>{hebrew.accept}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CreateApartmentButton;
