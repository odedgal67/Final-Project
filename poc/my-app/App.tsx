import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProjectsScreen from "./screens/ProjectsScreen";
import ProjectPropertiesScreen from "./screens/ProjectPropertiesScreen";
import GeneralStagesScreen from "./screens/GeneralStagesScreen";
import MissionScreen from "./screens/MissionScreen";
import MissionListScreen from "./screens/MissionListScreen";
import ApartmentListScreen from "./screens/ApartmentListScreen";
import FaultScreen from "./screens/FaultScreen";
import FaultListScreen from "./screens/FaultListScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import PlansScreen from "./screens/PlansScreen";
import LoginScreen from "./screens/LoginScreen";
import { UserContext, UserContextProvider } from "./utils/UserContext";
import { LogBox } from "react-native";
import Crane from "./components/Crane";
import ManageUsersScreen from "./screens/ManageUsersScreen";
import { registerRootComponent } from "expo";
const Stack = createNativeStackNavigator();

const MyStack = () => {
  LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  const { getUser } = React.useContext(UserContext);
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
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="ProjectsScreen" component={ProjectsScreen} />
          <Stack.Screen name="ProjectPropertiesScreen" component={ProjectPropertiesScreen} />
          <Stack.Screen name="ManageUsersScreen" component={ManageUsersScreen} />
          <Stack.Screen name="GeneralStagesScreen" component={GeneralStagesScreen} />
          <Stack.Screen name="MissionScreen" component={MissionScreen} />
          <Stack.Screen name="MissionListScreen" component={MissionListScreen} />
          <Stack.Screen name="ApartmentListScreen" component={ApartmentListScreen} />
          <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
          <Stack.Screen name="FaultScreen" component={FaultScreen} />
          <Stack.Screen name="FaultListScreen" component={FaultListScreen} />
          <Stack.Screen name="PlansScreen" component={PlansScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
};

export default MyStack;
registerRootComponent(MyStack);