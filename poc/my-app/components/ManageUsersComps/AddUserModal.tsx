import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { hebrew } from "../../utils/text_dictionary";
import { useState } from "react";
import Background from "../Background";
import RegisterNewUser from "./RegisterNewUser";
import AssignUserToProject from "./AssignUserToProject";

type AddUserModalProps = {
  onAssignUserToProject: (user_id: string, role: roles) => void;
};

const AddUserModal = (props: AddUserModalProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button_container}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.white_text}>{hebrew.add_user}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Background>
          <ScrollView>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <View style={{ flex: 1, paddingTop: "10%" }}>
                <Text style={styles.low_opacity_title}>
                  {hebrew.register_user_explanation}
                </Text>
                <RegisterNewUser />
              </View>
              <View style={{ flex: 1, paddingTop: "10%" }}>
                <Text style={styles.low_opacity_title}>
                  {hebrew.assign_existing_user_a_role_explanation}
                </Text>
                <AssignUserToProject onAssign={props.onAssignUserToProject} />
              </View>
              <View style={{ flex: 1, paddingTop: "20%" }}>
                <TouchableOpacity
                  style={styles.back_button}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.low_opacity_title}>{hebrew.back}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Background>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#4c595f",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  white_text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    margin: 10,
  },
  button_container: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  low_opacity_title: {
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center",
    letterSpacing: 0.25,
    color: "rgba(0,0,0,0.3)",
    margin: 10,
  },
  back_button: {
    flex: 1,
    padding: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddUserModal;
