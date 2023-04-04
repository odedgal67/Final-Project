import * as React from "react";
import StagesTable from "../components/StagesTable";
import Background from "../components/Background";

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
  "מינוי מנהל עבודה ועוזר בטיחות",
  "הכנת יומן עבודה",
  "קבלת אישורי עבודה בגובה מכל הקבלנים",
  "תיעוד מהשטח טרם ביצוע העבודות כולל תמונות של בניינים צמודים",
];

const stage_statuses = [
  "הסתיים",
  "הסתיים",
  "הסתיים",
  "הסתיים",
  "הסתיים",
  "הסתיים",
  "הסתיים",
  "הסתיים",
  "הסתיים",
  "הסתיים",
  "בתהליך",
  "לא בוצע",
  "לא בוצע",
];

const MissionListsScreen = ({ navigation, route }) => {
  return (
    <Background>
        <StagesTable
          stagesNames={stage_names}
          stagesStatuses={stage_statuses}
          columnTitle={"משימות"}
          ButtonHandler={(stage_name: String) =>
            navigation.navigate("MissionScreen", { description: "תיאור" })
          }
        />
    </Background>
  );
};

export default MissionListsScreen;
