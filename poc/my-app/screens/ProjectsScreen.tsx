import * as React from 'react';
import {NavigationContainer, StackNavigationState} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProjectButton from '../components/ProjectButton';

const project_names = ["פרוייקט 1", "פרוייקט 2", "פרוייקט 3", "פרוייקט 4", "פרוייקט 5", "פרוייקט 6"];

function get_project_buttons (navigation: any) {
  let buttons = [];
  for (let i = 0; i < project_names.length; i++) {
    buttons.push(<ProjectButton projectName={project_names[i]} onPress={() => navigation.navigate("projectProperties", {projectName: project_names[i]})}/>);
  }
  return buttons;
}

const ProjectsScreen = ({navigation}) => {
    return (
      <SafeAreaView>
      {get_project_buttons(navigation)}
      </SafeAreaView>
    );
  };

export default ProjectsScreen;