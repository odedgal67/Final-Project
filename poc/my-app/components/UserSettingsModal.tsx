import React, { useContext, useState } from "react";
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { UserContext } from "../utils/UserContext";
import API from "../API/api_bridge";
import ConfirmDialogue from "../components/ConfirmDialogue";
import { CommonActions } from "@react-navigation/native";
import { hebrew } from "../utils/text_dictionary";
import Background from "./Background";
import ClickableIcon from "./TableUtils/ClickableIcon";

const UserSettingsModal = ({ navigation, updateUsername }) => {
  const { getUser, clearUserState, setLastUsedPassword } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNameChange, setShowNameChange] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const handleNameChangeButtons = () => {
    setShowNameChange(!showNameChange);
  };

  const handlePasswordChangeButtons = () => {
    setShowPasswordChange(!showPasswordChange);
  };

  const handleLogout = () => {
    ConfirmDialogue({
      title: "",
      message: hebrew.are_you_sure_you_want_to_logout,
      onConfirm: () => {
        API.get_instance()
          .logout(getUser().id)
          .then(() => {
            clearUserState();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "LoginScreen", params: {} }],
              })
            );
          })
          .catch((err) => alert(err));
      },
    });
  };

  const handleNameChange = () => {
    if (newName.length < 3) {
      alert(hebrew.name_not_valid);
      return;
    }
    API.get_instance()
      .change_user_name(newName, getUser().id)
      .then(() => {
        alert(hebrew.name_changed_successfully);
        setNewName("");
        setModalVisible(false);
        setShowNameChange(false);
        updateUsername(newName);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert(hebrew.passwords_dont_match);
      return;
    }
    API.get_instance()
      .change_user_password(newPassword, getUser().id)
      .then(() => {
        alert(hebrew.password_changed_successfully);
        setNewPassword("");
        setConfirmPassword("");
        setModalVisible(false);
        setShowPasswordChange(false);
        setLastUsedPassword(newPassword);
      })
      .catch(() => {
        alert(hebrew.password_instructions);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ClickableIcon
        width={50}
        height={50}
        imagePath={require("../components/imgs/settings.png")}
        onClick={() => setModalVisible(true)}
        testID={""}
      />
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
            <ScrollView style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleNameChangeButtons}
              >
                <Text style={styles.submitButtonText}>
                  {hebrew.change_name}
                </Text>
              </TouchableOpacity>
              {showNameChange && (
                <View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder={hebrew.new_name}
                      placeholderTextColor="#B4B4B4"
                      value={newName}
                      onChangeText={setNewName}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleNameChange}
                  >
                    <Text style={styles.modalButtonText}>
                      {hebrew.change_name}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handlePasswordChangeButtons}
              >
                <Text style={styles.submitButtonText}>
                  {hebrew.change_password}
                </Text>
              </TouchableOpacity>
              {showPasswordChange && (
                <View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      secureTextEntry={true}
                      placeholder={hebrew.new_password}
                      placeholderTextColor="#B4B4B4"
                      value={newPassword}
                      onChangeText={setNewPassword}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      secureTextEntry={true}
                      placeholder={hebrew.verify_password}
                      placeholderTextColor="#B4B4B4"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handlePasswordChange}
                  >
                    <Text style={styles.modalButtonText}>
                      {hebrew.change_password}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleLogout}
              >
                <Text style={styles.submitButtonText}>{hebrew.logout}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                  setModalVisible(false);
                  setShowNameChange(false);
                  setShowPasswordChange(false);
                }}
              >
                <Text style={styles.submitButtonText}>{hebrew.close}</Text>
              </TouchableOpacity>
            </ScrollView>
          </Background>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalButton: {
    backgroundColor: "#e4dfdb",
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
    marginHorizontal: "20%",
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  opacityCompletion: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
  },
  submitButton: {
    backgroundColor: "#0090D6",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
  },
});

export default UserSettingsModal;
