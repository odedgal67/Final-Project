import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProjectButton from '../components/ProjectButton';
import StagesTable from '../components/StagesTable';
import { View } from 'react-native';

const stage_names: string[] = [
  "שלב מקדים",
  "עבודות עפר",
  "מרתף",
  "יסודות+ כלונסאות",
  "שלד הבניין",
  "עבודות בנייה",
  "עבודות טייח",
  "עבודות איטום",
  "עבודות קדם ריצוף",
  "עבודות ריצוף וחיפוי",
  "עבודות חשמל",
  "עבודות אינסטלציה"
];

const stage_statuses = ["הסתיים", "הסתיים", "הסתיים", "הסתיים", "בתהליך", "בתהליך", "בתהליך", "לא תקין", "לא בוצע", "לא בוצע", "לא בוצע", "לא בוצע"]

const GeneralStagesScreen = ({navigation, route}) => {
    return (
      <View>
          <StagesTable stagesNames={stage_names} stagesStatuses={stage_statuses} columnTitle={"שלבים"} ButtonHandler={(stage_name: String) => navigation.navigate("MissionListsScreen", {stageName: stage_name})}/>
      </View>
    );
  };

export default GeneralStagesScreen;