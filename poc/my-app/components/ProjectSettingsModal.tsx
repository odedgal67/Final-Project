import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
} from "react-native";
import { Project } from "../types";
import { hebrew } from "../utils/text_dictionary";
import { useState } from "react";
import Background from "./Background";
import { useFocusEffect } from "@react-navigation/native";

interface ProjectSettingsModalProps {
  project: Project;
  navigation: any;
}

const ProjectSettingsModal = (props: ProjectSettingsModalProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <Pressable
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
          console.log("clicked projectsettings");
        }}
      >
        <Text style={styles.text}>{hebrew.projectSettings}</Text>
      </Pressable>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.opacityCompletion}></View>
          <Background>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  props.navigation.navigate("ManageUsersScreen");
                }}
              >
                <Text style={styles.modalButtonText}>
                  {hebrew.manage_users}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonText}>{hebrew.close}</Text>
              </TouchableOpacity>
            </View>
          </Background>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: "#c2c0b2",
    marginHorizontal: "10%",
    marginVertical: "4%",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    alignSelf: "center",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    alignItems: "stretch",
  },
  modalText: {
    color: "white",
    fontSize: 20,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#e4dfdb",
    padding: 10,
    marginVertical: "1%",
    elevation: 1,
  },
  modalButtonText: {
    color: "rgb(50,50,50)",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  opacityCompletion: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
  },
});

export default ProjectSettingsModal;