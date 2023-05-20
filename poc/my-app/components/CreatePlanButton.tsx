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

const CreatePlanButton = (props: {
  onAddClick: (
    planName: string,
    link: string,
    modal_visibility_setter: (b: boolean) => void
  ) => void;
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [plan_name, setPlan_Name] = React.useState("");
  const [link, setPlan_Link] = React.useState("");
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
    },
    add_plan_button: {
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

  const add_new_plan_text = (
    <Text style={styles.white_text}>{hebrew.add_new_plan}</Text>
  );

  return (
    <View style={styles.initial_view}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
        testID="addButton"
      >
        <View>
          {add_new_plan_text}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View
              style={{ backgroundColor: "#111111", flex: 2, opacity: 0 }}
              testID="closeButton"
            >
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
                {add_new_plan_text}
              </View>
              <View style={{ flex: 3, backgroundColor: "#2c393f" }}>
                <TextInput
                  maxLength={25}
                  numberOfLines={1}
                  style={styles.text_input}
                  placeholder={hebrew.add_new_plan_place_holder}
                  placeholderTextColor={"black"}
                  textAlign="center"
                  onChangeText={(plan_name) => setPlan_Name(plan_name)}
                />
                <TextInput
                  numberOfLines={1}
                  style={styles.text_input}
                  placeholder={hebrew.add_new_plan_link_place_holder}
                  placeholderTextColor={"black"}
                  textAlign="center"
                  onChangeText={(link) => setPlan_Link(link)}
                />
                <TouchableOpacity
                  style={styles.add_plan_button}
                  onPress={() =>
                    props.onAddClick(plan_name, link, setModalVisible)
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

export default CreatePlanButton;
