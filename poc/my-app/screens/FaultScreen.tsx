import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TouchableNativeFeedback,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Background from "../components/Background";
import StatusRectangle from "../components/StatusRectangle";
import { ProjectContext } from "../utils/ProjectContext";
import { UserContext } from "../utils/UserContext";
import { Fault, Status, Title } from "../types";
import API from "../API/api_bridge";
import { hebrew } from "../utils/text_dictionary";

const FaultScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: { params: { fault: Fault; title: Title } };
}) => {
  const { getProject } = React.useContext(ProjectContext);
  const { getUser, notify } = React.useContext(UserContext);
  const [status, setStatus] = React.useState(route.params.fault.status);
  const [isEditable, setEditable] = React.useState(false);
  const fault: Fault = route.params.fault;
  const _fault_name =
    fault.name.length > 25 ? fault.name.substring(0, 15) + "..." : fault.name;

    navigation.setOptions({ title: _fault_name });
    const [comment, setComment] = React.useState(fault.comment);

  let onSubmitEdit = () => {
    API.get_instance().edit_fault_comment(
      getProject().id,
      fault.id,
      comment,
      getUser().name
    );
    setEditable(false);
  };

  return (
    <Background>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.titleViewStyle}>
            <Text style={styles.title}>{hebrew.fault_description}</Text>
            <TouchableNativeFeedback
              onLongPress={() => setEditable(true)}
              delayLongPress={5}
            >
              <View
                style={
                  isEditable
                    ? styles.descriptionBgEditable
                    : styles.descriptionBg
                }
              >
                <TextInput
                  style={styles.descriptionText}
                  value={comment}
                  onChangeText={(comm) =>
                    comment.length < 250 ? setComment(comm) : null
                  }
                  editable={isEditable}
                  onSubmitEditing={onSubmitEdit}
                ></TextInput>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.statusAndLinks}>
            <View style={styles.linksView}>
              <Text style={styles.smallText}>{hebrew.urgency}</Text>
              <UrgencyButton title={hebrew.urgency}></UrgencyButton>
            </View>
            <View style={styles.linksView}>
              <View>
                <Text style={styles.smallText}>{hebrew.apartment}</Text>
                <Text style={styles.smallText}>{fault.apartment_number}</Text>
              </View>
              <View>
                <Text style={styles.smallText}>{hebrew.floor}</Text>
                <Text style={styles.smallText}>{fault.floor}</Text>
              </View>
              <View>
                <Text style={styles.smallText}>{hebrew.date_of_edit}</Text>
                <Text style={styles.smallText}>{new Date(fault.date).toLocaleDateString()}</Text>
              </View>
            </View>
            <View style={styles.statusRectangleView}>
              <StatusRectangle
                border={false}
                activated={true}
                status={status}
                width={Dimensions.get("window").height * 0.25}
                height={Dimensions.get("window").height * 0.25}
                borderRad={Dimensions.get("window").height}
                onChange={(newStatus: Status) => {
                  API.get_instance().set_fault_status(
                    getProject().id,
                    fault.id,
                    newStatus,
                    getUser().name
                  );
                  setStatus(newStatus);
                  fault.status = newStatus;
                  notify();
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Background>
  );
};

const UrgencyButton = (props: { title: string }) => {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={() => alert(hebrew.link_doesnt_exist)}
    >
      <Text style={styles.smallText}>{props.title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    margin: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "#646464",
    borderColor: "black",
    borderWidth: 0,
    marginVertical: "2%",
    flex: 0.5,
  },
  smallText: {
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 21,
    marginVertical: 7.5,
    textAlign: "center",
  },
  titleViewStyle: {
    alignItems: "center",
    height: "55%",
    maxHeight: "60%",
  },
  statusRectangleView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: "1%",
  },
  linksView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#d4cfcb",
    borderColor: "#b4afab",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  statusAndLinks: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#2c393f",
    flex: 1,
  },
  descriptionText: {
    textAlign: "center",
    color: "black",
    flex: 1,
    textAlignVertical: "top",
  },
  descriptionBg: {
    backgroundColor: "#d4cfcb",
    width: "80%",
    alignContent: "center",
    textAlign: "center",
    flex: 1,
    marginBottom: "5%",
    borderRadius: 5,
    borderColor: "#b4afab",
    borderWidth: 1,
  },
  descriptionBgEditable: {
    backgroundColor: "#e4dfdb",
    width: "80%",
    alignContent: "center",
    textAlign: "center",
    flex: 1,
    marginBottom: "5%",
    borderRadius: 5,
    borderColor: "#b4afab",
    borderWidth: 1,
  },
});

export default FaultScreen;
