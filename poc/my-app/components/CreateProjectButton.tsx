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
  Button,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { UserContext } from "../utils/UserContext";
import API from "../API/api_bridge";

const CreateProjectButton = (props) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [project_name, setProject_Name] = React.useState("");
  const { user, setUser, getUser, notify } = React.useContext(UserContext);
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
      marginBottom: 5,
    },
    add_project_button: {
      flex: 1,
      borderRadius: 20,
      backgroundColor: "#4c595f",
      margin: "10%",
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

  const add_new_project_text = (
    <Text style={styles.white_text}>הוספת פרוייקט חדש</Text>
  );

  let add_project_click = () => {
    setModalVisible(false);
    API.get_instance().add_project(project_name, user.name);
    notify();
  };

  return (
    <View style={styles.initial_view}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <View>
          {add_new_project_text}
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
                {add_new_project_text}
              </View>
              <View style={{ flex: 2, backgroundColor: "#2c393f" }}>
                <TextInput
                  maxLength={25}
                  numberOfLines={1}
                  style={styles.text_input}
                  placeholder="שם הפרוייקט החדש"
                  placeholderTextColor={"black"}
                  textAlign="center"
                  onChangeText={(proj_name) => setProject_Name(proj_name)}
                />
                <TouchableOpacity
                  style={styles.add_project_button}
                  onPress={add_project_click}
                >
                  <Text style={styles.white_text}>אישור</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CreateProjectButton;
