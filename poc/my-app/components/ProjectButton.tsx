import React from "react";
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableNativeFeedback,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { hebrew } from "../utils/text_dictionary";
import { Project } from "../types";
import { UserContext } from "../utils/UserContext";
import API from "../API/api_bridge";

const ProjectButton = (props: {
  project: Project;
  projectName: string;
  onPress: () => void;
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [new_project_name, setProject_Name] = React.useState("");
  const { getUser } = React.useContext(UserContext);
  const [curr_project_name, setCurr_Project_Name] = React.useState(
    props.project.name
  );
  let image_location = "./imgs/folder.png";
  let projectName = props.project.name;
  let choose_new_project_text = hebrew.change_name_for_projectName.replace(
    "${projectName}",
    projectName
  );
  let rename_project_click = () => {
    if (new_project_name.length == 0) {
      alert(hebrew.project_name_cant_be_empty);
      return;
    }
    setModalVisible(false);
    API.get_instance()
      .edit_project_name(getUser().id, props.project.id, new_project_name)
      .then(() => {
        setCurr_Project_Name(new_project_name);
      })
      .catch((err) => alert(err));
  };
  return (
    <TouchableNativeFeedback
      style={styles.button}
      onPress={props.onPress}
      onLongPress={() => {
        setModalVisible(true);
        setProject_Name("");
      }}
    >
      <View style={styles.button}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            setProject_Name("");
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.3)",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 5,
                opacity: 1,
                width: "75%",
                maxWidth: "75%",
              }}
            >
              <Text style={styles.rename_text}>{choose_new_project_text}</Text>
              <TextInput
                maxLength={25}
                numberOfLines={1}
                style={styles.text_input}
                placeholder={hebrew.add_new_project_place_holder}
                placeholderTextColor={"black"}
                textAlign="center"
                onChangeText={(proj_name) => setProject_Name(proj_name)}
              />
              <TouchableOpacity
                style={styles.accept_name_change_button}
                onPress={rename_project_click}
              >
                <Text style={styles.rename_text_white}>{hebrew.accept}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.text_bg}>
          <Text style={styles.text}>{curr_project_name}</Text>
        </View>
        <View style={styles.image_background}>
          <Image source={require(image_location)} style={styles.image} />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: "5%",
    paddingHorizontal: "8%",
    marginHorizontal: "4%",
    marginVertical: "7%",
    elevation: 15,
    borderRadius: 10,
    backgroundColor: "#c2c0b2",
    maxHeight: "70%",
    maxWidth: "40%",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    flex: 1,
    paddingBottom: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  image_background: {
    flex: 1,
    backgroundColor: "#e2e0d2",
    borderRadius: 10,
    maxHeight: 80,
    maxWidth: 80,
  },
  text_bg: {
    flex: 1,
  },
  rename_text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "Black",
    marginHorizontal: "3%",
    marginTop: "2%",
  },
  rename_text_white: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    marginHorizontal: "3%",
    marginTop: "2%",
  },
  text_input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    margin: "5%",
  },
  accept_name_change_button: {
    borderRadius: 20,
    backgroundColor: "#4c595f",
    alignItems: "center",
    justifyContent: "center",
    padding: "5%",
    marginHorizontal: "5%",
    marginVertical: "2%",
  },
});

export default ProjectButton;
