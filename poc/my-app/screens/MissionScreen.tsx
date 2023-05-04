import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import Background from "../components/Background";
import StatusRectangle from "../components/StatusRectangle";
import { ProjectContext } from "../utils/ProjectContext";
import { UserContext } from "../utils/UserContext";
import { Mission, Status } from "../types";
import {
  MissionStatusContext,
  MissionStatusContextProvider,
} from "../utils/MissionStatusContext";
import { StageContext } from "../utils/StageContext";

const MissionScreen = ({ navigation, route }) => {
  const { project, setProject, getProject, notify } =
    React.useContext(ProjectContext);
  const { user, setUser, getUser } = React.useContext(UserContext);
  const [ismodalVisible, setModalVisible] = React.useState(false);
  const { status, getStatus, setStatus, _setStatus } =
    React.useContext(MissionStatusContext);
  const { stage, setStage, getStage } = React.useContext(StageContext);
  let mission: Mission = route.params.mission;
  _setStatus(mission.status);
  let _mission_name =
    mission.name.length > 25
      ? mission.name.substring(0, 15) + "..."
      : mission.name;
  navigation.setOptions({ title: _mission_name });
  return (
    <Background>
      <View style={{ height: "100%" }}>
        <View style={styles.title_view_style}>
          <Text style={styles.title}>תיאור משימה</Text>
          <View style={styles.description_bg}>
            <Text style={styles.description_text}>
              {route.params.description}
            </Text>
          </View>
        </View>
        <View style={styles.status_and_links}>
          <View style={styles.links_view}>
            <LinkButton title={"קישור לתקן"}></LinkButton>
            <LinkButton title={"קישור לתוכנית"}></LinkButton>
            <LinkButton title={"קישור לתיעוד"}></LinkButton>
          </View>
          <View style={styles.status_rectangle_view}>
            {/* <MissionStatusContextProvider> */}
            <StatusRectangle
              border={false}
              activated={true}
              status={getStatus()}
              width={Dimensions.get("window").width * 0.5}
              height={Dimensions.get("window").width * 0.5}
              borderRad={
                Math.round(
                  Dimensions.get("window").width +
                    Dimensions.get("window").width
                ) / 2
              }
              onChange={function (new_status: Status): void {
                setStatus(
                  getProject().id,
                  getStage().id,
                  mission.id,
                  new_status,
                  getUser().name
                );
                setModalVisible(!ismodalVisible);
              }}
            />
            {/* </MissionStatusContextProvider> */}
          </View>
        </View>
      </View>
    </Background>
  );
};

const LinkButton = (props) => {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={() => alert("לא קיים קישור")}
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
});

export default MissionScreen;
