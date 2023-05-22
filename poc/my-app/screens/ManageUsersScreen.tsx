import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import Background from "../components/Background";
import { User, UserRecord } from "../types";
import { ProjectContext } from "../utils/ProjectContext";
import API from "../API/api_bridge";
import { UserContext } from "../utils/UserContext";
import { hebrew } from "../utils/text_dictionary";
import ManageUserButton from "../components/ManageUserButton";
import AddUserModal from "../components/ManageUsersComps/AddUserModal";
import { validate_id } from "../utils/ValidateInputs";
import { roles } from "../utils/Permissions";

const ManageUsersScreen = ({ navigation }: { navigation: any }) => {
  const [users, setUsers] = useState([] as UserRecord[]);
  const { getProject } = React.useContext(ProjectContext);
  const { getUser } = React.useContext(UserContext);
  useEffect(() => {
    setUsers(API.get_instance().get_all_users(getProject().id, getUser().name));
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({ title: hebrew.manage_users });
  }, [navigation]);
  let removeUser = (user: User) => {
    API.get_instance().remove_user(getProject().id, user, getUser().name);
    setUsers((_users) => {
      const updatedUsers = API.get_instance().get_all_users(
        getProject().id,
        getUser().name
      );
      return updatedUsers;
    });
  };
  let assignUser = (id: string, role: roles) => {
    let trimmed_id = id.trim();
    if (!validate_id(trimmed_id)) {
      alert(hebrew.invalid_id);
      return;
    }
    if (id == "" || role == roles.UNDEFINED) {
      alert(hebrew.fill_all_fields);
      return;
    }
    API.get_instance().edit_user_role(
      getProject().id,
      trimmed_id,
      role,
      getUser().name
    );
    setUsers((_users) => {
      const updatedUsers = API.get_instance().get_all_users(
        getProject().id,
        getUser().name
      );
      alert(hebrew.user_assigned_successfully);
      return updatedUsers;
    });
  };
  return (
    <Background>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View key={1}>
            {users.map((user_record, index) => {
              return (
                <ManageUserButton
                  key={index}
                  user={user_record.user}
                  navigation={navigation}
                  onRemove={removeUser}
                  role={user_record.role}
                />
              );
            })}
          </View>
        </ScrollView>
        <AddUserModal onAssignUserToProject={assignUser} />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ManageUsersScreen;
