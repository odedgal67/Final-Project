import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProjectButton from '../components/ProjectButton';
import StagesTable from '../components/StagesTable';
import { View } from 'react-native';

const stage_names = [
  "קבלת היתר בניה",
  "היתר עקירת עצים",
  "ביטוח למבנה",
  "תכניות עבודה",
  "תכנית קונסטרוקציה",
  "תכנית אינסטלציה",
  "תכנית פיתוח",
  "תכנית כיבוי אש",
  "תכניות נוספות",
  "מינוי מנהל עבודה+ עוזר בטיחות",
  "הכנת יומן עבודה",
  "קבלת אישורי עבודה בגובה מכל הקבלנים",
  "תיעוד מהשטח טרם ביצוע העבודות כולל תמונות של בניינים צמודים",
];

const stage_statuses = ["הסתיים", "הסתיים", "הסתיים", "הסתיים", "הסתיים", "הסתיים", "הסתיים", "הסתיים", "הסתיים", "הסתיים", "בתהליך", "לא בוצע", "לא בוצע"]

const MissionListsScreen = ({navigation, route}) => {
    return (
      <View>
          <StagesTable stagesNames={stage_names} stagesStatuses={stage_statuses} columnTitle={"משימות"} ButtonHandler={(stage_name: String) => navigation.navigate("MissionScreen", {description: "תיאור"})}/>
      </View>
    );
  };

export default MissionListsScreen;