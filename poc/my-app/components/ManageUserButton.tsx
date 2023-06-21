import React, { useContext, useEffect, useState } from "react";
import { User } from "../types";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { truncate_with_dots } from "../utils/stringFunctions";
import { hebrew, role_to_hebrew } from "../utils/text_dictionary";
import { roles } from "../utils/Permissions";
import { RemoveUserButton, ResetUserPasswordButton } from "./ManageUsersComps/ManageUserButton";
import RoleSelection from "./ManageUsersComps/RoleSelection";
import { UserContext } from "../utils/UserContext";
import API from "../API/api_bridge";
import { ProjectContext } from "../utils/ProjectContext";

type ManageUserButtonProps = {
  navigation: any;
  user: User;
  onRemove: (user: User) => void;
  role: roles;
};

const ManageUserButton = (props: ManageUserButtonProps) => {
  let name = truncate_with_dots(props.user.name, 15);
  const [role, setRole] = useState(role_to_hebrew[props.role]);
  const [pressed, setPressed] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { getProject } = React.useContext(ProjectContext);
  const { getUser } = React.useContext(UserContext);
  useEffect(() => {
    API.get_instance()
      .is_admin(getUser().id)
      .then((res) => setIsAdmin(res))
      .catch((err) => console.log(err));
  }, []);
  let onChangeRole = (val: roles) => {
    API.get_instance()
      .edit_user_role(getProject().id, props.user.id, val, getUser().id)
      .then(() => setRole(role_to_hebrew[val]))
      .catch((err) => alert(err));
  };
  let removeUserClick = () => {
    return props.onRemove(props.user);
  };
  return (
    <Pressable style={styles.container} onPress={() => setPressed(!pressed)}>
      {pressed ? (
        <View style={{ flex: 2, flexDirection: "row" }}>
          <RemoveUserButton
            onPress={removeUserClick}
            title={hebrew.remove}
            username={props.user.name}
          />
          <RoleSelection title={hebrew.change_role} onPress={onChangeRole} />
          {isAdmin?
          <ResetUserPasswordButton
            onPress={() =>{
              API.get_instance()
              .reset_password_for_user(props.user.id, getUser().id)
              .then(() => alert(hebrew.password_reset_success))
              .catch((err) => {
                console.log(err);
                return alert(hebrew.password_reset_fail)
              });
            } }
            title={hebrew.reset_password}
            username={props.user.name}/>
            : null}
        </View>
      ) : (
        <Text style={styles.role_text}>{role}</Text>
      )}
      <Text style={styles.name_text}>{name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    elevation: 3,
    marginBottom: 5,
  },
  name_text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    padding: 10,
    flex: 0.5,
    textAlign: "center",
  },
  role_text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "rgba(0,0,0,0.5)",
    padding: 10,
    flex: 2,
    textAlign: "center",
  },
  white_text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  generic_button_container: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#4c595f",
    alignItems: "center",
    justifyContent: "center",
    margin: 1,
  },
});

export default ManageUserButton;
