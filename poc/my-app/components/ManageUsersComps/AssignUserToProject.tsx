import React from "react";
import { View, StyleSheet } from "react-native";
import GetAttributeComp from "./GetAttributeComp";
import { hebrew } from "../../utils/text_dictionary";
import RoleSelection from "./RoleSelection";
import { roles } from "../../utils/Permissions";
import AcceptButton from "./AcceptButton";
import { ProjectContext } from "../../utils/ProjectContext";
import { UserContext } from "../../utils/UserContext";

type AssignUserToProjectProps = {
  onAssign: (id: string, role: roles) => void;
};

const AssignUserToProject = (props: AssignUserToProjectProps) => {
  const [id, setId] = React.useState("");
  const [role, setRole] = React.useState(roles.UNDEFINED);
  const { getProject } = React.useContext(ProjectContext);
  const { getUser } = React.useContext(UserContext);
  return (
    <View style={styles.container}>
      <GetAttributeComp
        name={hebrew.id}
        onChangeText={(val: string) => {
          setId(val);
        }}
      />
      <View style={styles.row}>
        <RoleSelection onPress={(val: roles) => setRole(val)} title={hebrew.choose_role} />
      </View>
      <AcceptButton
        onPress={() => {
          props.onAssign(id, role);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    width: "75%",
    padding: 5,
  },
});

export default AssignUserToProject;
