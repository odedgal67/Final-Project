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
import { Mission, Stage, Status, Title } from "../types";
import API from "../API/api_bridge";
import { hebrew } from "../utils/text_dictionary";
import ImageMissionLink from "../components/MissionLinks/ImageMissionLink";
import PropertiesButton from "../components/PropertiesButton";

const MissionScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: { params: { mission: Mission; title: Title; stage: Stage } };
}) => {
  const { getProject } = React.useContext(ProjectContext);
  const { getUser, notify } = React.useContext(UserContext);
  const [status, setStatus] = React.useState(route.params.mission.status);
  const [isEditable, setEditable] = React.useState(false);
  let mission: Mission = route.params.mission;
  let _mission_name =
    mission.name.length > 25
      ? mission.name.substring(0, 15) + "..."
      : mission.name;
  React.useLayoutEffect(() => {
    navigation.setOptions({ title: _mission_name });
  }, [navigation]);
  const [comment, setComment] = React.useState(mission.comment);
  let onSubmitEdit = () => {
    API.get_instance()
      .edit_comment_in_mission(
        getProject().id,
        route.params.stage.id,
        route.params.title,
        mission.id,
        comment,
        getUser().id
      )
      .then(() => {
        alert(hebrew.saved_changes_successfully);
        setEditable(false);
      })
      .catch((err) => alert(err));
  };
  console.log("mission screen rendered " + mission.id + " " + mission.name);
  return (
    <Background>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.title_view_style}>
            <Text style={styles.title}>{hebrew.mission_description}</Text>
            <TouchableNativeFeedback
              onLongPress={() => setEditable(true)}
              delayLongPress={500}
            >
              <View
                style={
                  isEditable
                    ? styles.description_bg_editable
                    : styles.description_bg
                }
              >
                <TextInput
                  style={styles.description_text}
                  value={comment}
                  onChangeText={(comm) =>
                    comm.length < 250 ? setComment(comm) : null
                  }
                  editable={isEditable}
                  onSubmitEditing={onSubmitEdit}
                ></TextInput>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.status_and_links}>
            <View style={styles.links_view}>
              <LinkButton title={hebrew.link_to_document}></LinkButton>
              <LinkButton title={hebrew.link_to_plan}></LinkButton>
              <ImageMissionLink
                mission={mission}
                title={route.params.title}
                stage_id={route.params.stage.id}
                link={mission.proof_link}
              />
            </View>
            <View style={styles.status_rectangle_view}>
              <StatusRectangle
                border={false}
                activated={true}
                status={status}
                width={Dimensions.get("window").height * 0.25}
                height={Dimensions.get("window").height * 0.25}
                borderRad={
                  Math.round(
                    Dimensions.get("window").height +
                      Dimensions.get("window").height
                  ) / 2
                }
                onChange={function (new_status: Status): void {
                  API.get_instance()
                    .set_mission_status(
                      getProject().id,
                      route.params.stage.id,
                      route.params.title,
                      mission.id,
                      new_status,
                      getUser().id
                    )
                    .then(() => {
                      setStatus(new_status);
                      mission.status = new_status;
                      notify();
                    });
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Background>
  );
};

const LinkButton = (props: { title: string }) => {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={() => alert(hebrew.link_doesnt_exist)}
    >
      <Text style={styles.link_button_text}>{props.title}</Text>
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
    marginHorizontal: 1,
    flex: 1,
  },
  link_button_text: {
    fontSize: 14,
    lineHeight: 21,
    color: "white",
    marginVertical: "10%",
  },
  title_view_style: {
    alignItems: "center",
    height: "60%",
    maxHeight: "60%",
  },
  status_rectangle_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: "1%",
  },
  links_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#d4cfcb",
    borderColor: "#b4afab",
    borderTopWidth: 1,
  },
  status_and_links: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#2c393f",
    flex: 1,
  },
  description_text: {
    textAlign: "center",
    color: "black",
    flex: 1,
    textAlignVertical: "top",
  },
  description_bg: {
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
  description_bg_editable: {
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

export default MissionScreen;
