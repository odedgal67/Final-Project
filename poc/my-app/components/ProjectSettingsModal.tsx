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
import { useContext, useState } from "react";
import { ProjectContext } from "../utils/ProjectContext";
import { UserContext } from "../utils/UserContext";
import Background from "./Background";
import API from "../API/api_bridge";
import * as DocumentPicker from "expo-document-picker";
import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";

interface ProjectSettingsModalProps {
  project: Project;
  navigation: any;
}

interface ProjectSettingButtonProps {
  title: string;
  onPress: () => void;
}

function get_project_setting_button(props: ProjectSettingButtonProps) {
  return (
    <TouchableOpacity style={styles.modalButton} onPress={props.onPress}>
      <Text style={styles.modalButtonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const ProjectSettingsModal = (props: ProjectSettingsModalProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { getProject } = useContext(ProjectContext);
  const { getUser } = useContext(UserContext);
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
              {get_project_setting_button({
                title: hebrew.manage_users,
                onPress: () => {
                  setModalVisible(false);
                  props.navigation.navigate("ManageUsersScreen");
                },
              })}
              {get_project_setting_button({
                title: hebrew.load_from_excel,
                onPress: () => {
                  handleLoadFromExcel(getProject().id, getUser().id).then(() =>
                    setModalVisible(false)
                  );
                },
              })}
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

const handleLoadFromExcel = async (proj: string, user: string) => {
  try {
    const file = await DocumentPicker.getDocumentAsync({
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    if (file.type === "success") {
      const excelData = await readExcelFile(file.uri);

      if (excelData) {
        await API.get_instance()
          .load_excel_data(proj, excelData, user)
          .catch((error) => {
            alert(error);
          });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const readExcelFile = async (fileUri: string) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) {
      throw new Error("File does not exist");
    }

    const fileContent = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const workbook = XLSX.read(fileContent, { type: "base64" });

    const excelData: { [key: string]: any } = {};

    workbook.SheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      excelData[sheetName] = data;
    });

    return excelData;
  } catch (error) {
    console.log(error);
    return null;
  }
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
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  modalButton: {
    backgroundColor: "#e4dfdb",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    alignItems: "center",
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
