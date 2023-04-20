import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import ProjectsScreen from "./screens/ProjectsScreen";
import ProjectPropertiesScreen from "./screens/ProjectPropertiesScreen";
import GeneralStagesScreen from "./screens/GeneralStagesScreen";
import MissionScreen from "./screens/MissionScreen";
import MissionListsScreen from "./screens/MissionListScreen";
import LevelsScreen from "./screens/LevelsScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import PlansScreen from "./screens/PlansScreen";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerRight: () => (
            <HeaderButtons>
              <Item
                title="Menu"
                iconName="menu-outline"
                iconSize={30}
                onPress={() => console.log("Pressed")}
                IconComponent={Ionicons}
              />
            </HeaderButtons>
          ),
        }}
      >
        <Stack.Screen
          name="projects"
          component={ProjectsScreen}
          options={{
            title: "פרוייקטים",
          }}
        />
        <Stack.Screen
          name="projectProperties"
          component={ProjectPropertiesScreen}
          options={{
            title: "פרטי פרוייקט",
          }}
        />
        <Stack.Screen
          name="GeneralStagesScreen"
          component={GeneralStagesScreen}
          options={{
            title: "שלבים כלליים",
          }}
        />
        <Stack.Screen
          name="MissionScreen"
          component={MissionScreen}
          options={{
            title: "משימה",
          }}
        />
        <Stack.Screen
          name="MissionListsScreen"
          component={MissionListsScreen}
          options={{
            title: "משימות",
          }}
        />
        <Stack.Screen
          name="LevelsScreen"
          component={LevelsScreen}
          options={{
            title: "משימות לפי דירה",
          }}
        />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{
            title: "הרשמה",
          }}
        />
        <Stack.Screen
          name="PlansScreen"
          component={PlansScreen}
          options={{
            title: "תכניות",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
