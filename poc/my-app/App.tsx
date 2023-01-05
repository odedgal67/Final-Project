import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import ProjectsScreen from './screens/ProjectsScreen';
import ProjectPropertiesScreen from './screens/ProjectPropertiesScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerTitleAlign="right">
        <Stack.Screen
          name="projects"
          component={ProjectsScreen}
          options={{
            title: 'פרוייקטים',
          }}
        />
        <Stack.Screen
          name="projectProperties"
          component={ProjectPropertiesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
