import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import Background from "../components/Background";
import { User } from "../types";
import { ProjectContext } from "../utils/ProjectContext";
import API from "../API/api_bridge";
import { UserContext } from "../utils/UserContext";
import { hebrew } from "../utils/text_dictionary";
import ManageUserButton from "../components/ManageUserButton";

const ManageUsersScreen = ({ navigation }: { navigation: any }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState([] as User[]);
  const [selectedUser, setSelectedUser] = useState({} as User);
  const { setProject, getProject } = React.useContext(ProjectContext);
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
  return (
    <Background>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View key={1}>
            {users.map((user, index) => {
              return (
                <ManageUserButton
                  key={index}
                  user={user}
                  navigation={navigation}
                  onRemove={removeUser}
                />
              );
            })}
          </View>
        </ScrollView>
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
