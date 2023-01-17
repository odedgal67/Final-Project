import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import ProjectsScreen from './screens/ProjectsScreen';
import ProjectPropertiesScreen from './screens/ProjectPropertiesScreen';
import GeneralStagesScreen from './screens/GeneralStagesScreen';
import MissionScreen from './screens/MissionScreen';
import MissionListsScreen from './screens/MissionListScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitleAlign : "center"}}>
        <Stack.Screen
          name="projects"
          component={ProjectsScreen}
          options={{
            title: 'פרוייקטים'
          }}
        />
        <Stack.Screen
          name="projectProperties"
          component={ProjectPropertiesScreen}
          options={{
            title: 'פרטי פרוייקט',
          }}
        />
        <Stack.Screen
          name="GeneralStagesScreen"
          component={GeneralStagesScreen}
          options={{
            title: 'שלבים כלליים',
          }}
        />
        <Stack.Screen
          name="MissionScreen"
          component={MissionScreen}
          options={{
            title: 'משימה',
          }}
        />
      <Stack.Screen
          name="MissionListsScreen"
          component={MissionListsScreen}
          options={{
            title: 'משימות',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
