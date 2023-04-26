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
  "לא תקין",
];

const MissionListsScreen = ({ navigation, route }) => {
  return (
    <Background>
      <StagesTable
        stagesNames={stage_names}
        stagesStatuses={stage_statuses}
        columnTitle={"משימות"}
        allow_change_status={true}
        ButtonHandler={(mission_name: String, mission_status: String) => {
          return () =>
            navigation.navigate("MissionScreen", {
              description: "Description",
              status: mission_status,
              mission_name: mission_name,
            });
        }}
        addStagehandler={(getter: () => string, modal_visibility_setter) => {
          return () => {
            alert("adding a mission: " + getter());
            modal_visibility_setter(false);
          };
        }}
      />
    </Background>
  );
};

export default MissionListsScreen;
