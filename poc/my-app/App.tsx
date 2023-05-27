import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProjectsScreen from "./screens/ProjectsScreen";
import ProjectPropertiesScreen from "./screens/ProjectPropertiesScreen";
import GeneralStagesScreen from "./screens/GeneralStagesScreen";
import MissionScreen from "./screens/MissionScreen";
import MissionListsScreen from "./screens/MissionListScreen";
import LevelsScreen from "./screens/LevelsScreen";
import FaultScreen from "./screens/FaultScreen";
import FaultListScreen from "./screens/FaultListScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import PlansScreen from "./screens/PlansScreen";
import { UserContext, UserContextProvider } from "./utils/UserContext";
import { LogBox } from "react-native";
import Crane from "./components/Crane";
import ManageUsersScreen from "./screens/ManageUsersScreen";
import API from "./API/api_bridge";
const Stack = createNativeStackNavigator();

const MyStack = () => {
  LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  const { getUser } = React.useContext(UserContext);
  API.get_instance().login("123456789", "Password");
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center",
            headerRight: (props) =>
              Crane({
                ...props,
                onClick: () => {
                  console.log("logged as: " + getUser().name);
                },
              }),
          }}
        >
          <Stack.Screen name="projects" component={ProjectsScreen} />
          <Stack.Screen
            name="projectProperties"
            component={ProjectPropertiesScreen}
          />
          <Stack.Screen
            name="ManageUsersScreen"
            component={ManageUsersScreen}
          />
          <Stack.Screen
            name="GeneralStagesScreen"
            component={GeneralStagesScreen}
          />
          <Stack.Screen name="MissionScreen" component={MissionScreen} />
          <Stack.Screen
            name="MissionListsScreen"
            component={MissionListsScreen}
          />
          <Stack.Screen name="LevelsScreen" component={LevelsScreen} />
          <Stack.Screen
            name="RegistrationScreen"
            component={RegistrationScreen}
          />
          <Stack.Screen
            name="FaultScreen"
            component={FaultScreen}
            options={{
              title: "ליקוי",
            }}
          />
          <Stack.Screen
            name="FaultListScreen"
            component={FaultListScreen}
            options={{
              title: "ליקויי בנייה",
            }}
          />
          <Stack.Screen name="PlansScreen" component={PlansScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
};

export default MyStack;
