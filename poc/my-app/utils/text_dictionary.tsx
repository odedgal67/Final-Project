import { Status, Title } from "../types";
import { roles } from "./Permissions";

export var hebrew = {
  general_stages: "פיתוח וכללי לבניין",
  pre_stage: "שלב מקדם",
  skeletal_stages: "עבודות שלד",
  apartments: "עבודות גמר בדירות",
  plans: "תכניות",
  building_defects: "ליקויי בנייה",
  add_new_stage: "הוספה",
  add_new_project_place_holder: "שם הפרויקט",
  add_new_project: "הוספת פרויקט חדש",
  accept: "אישור",
  decline: "ביטול",
  project_name_cant_be_empty: "שם הפרויקט לא יכול להיות ריק",
  mission_description: "תיאור משימה",
  link_to_document: "קישור לתקן",
  link_to_plan: "קישור לתכנית",
  link_to_documentation: "קישור לתיעוד",
  change_name_for_projectName: "שינוי שם עבור ${projectName}",
  projectSettings: "הגדרות פרויקט",
  saved_changes_successfully: "השינויים נשמרו בהצלחה",
  add_new_plan: "הוספת תכנית חדשה",
  add_new_plan_place_holder: "שם התכנית",
  add_new_plan_link_place_holder: "קישור לתכנית",
  plan_name_cant_be_empty: "שם התכנית לא יכול להיות ריק",
  plan_link_cant_be_empty: "קישור לתכנית לא יכול להיות ריק",
  date_of_edit: "תאריך עריכה",
  register: "הרשמה",
  login: "התחברות",
  id: "תעודת זהות",
  password: "סיסמה",
  manage_users: "ניהול משתמשים",
  close: "סגור",
  remove: "הסרה",
  change_role: "שינוי תפקיד",
  are_you_sure_you_want_to_remove: "האם אתה בטוח שברצונך להסיר את ${userName}?",
  add_user: "הוספת משתמש או מתן גישה",
  register_user_explanation: "רשימת משתמש חדש למערכת",
  name: "שם",
  verify_password: "אימות סיסמה",
  passwords_dont_match: "הסיסמאות אינן תואמות",
  fill_all_fields: "אנא מלא את כל השדות",
  user_registered_successfully: "המשתמש נרשם בהצלחה",
  invalid_id: "תעודת זהות לא תקינה",
  user_assigned_successfully: "המשתמש קיבל גישה בהצלחה",
  assign_existing_user_a_role_explanation: "מתן גישה למשתמש קיים",
  back: "חזרה",
};

export var title_to_hebrew = {
  [Title.EarlyStages]: hebrew.pre_stage,
  [Title.SkeletalStages]: hebrew.skeletal_stages,
  [Title.ApartmentStages]: hebrew.apartments,
  [Title.GeneralStages]: hebrew.general_stages,
  [Title.BuildingFaults]: hebrew.building_defects,
};

export var status_to_hebrew = {
  [Status.Open]: "פתוח",
  [Status.InProgress]: "בתהליך",
  [Status.Done]: "סגור",
  [Status.Invalid]: "לא תקין",
};

export var role_to_hebrew = {
  [roles.WORK_MANAGER]: "מנהל עבודה",
  [roles.PROJECT_MANAGER]: "מנהל פרויקט",
  [roles.CONTRACTOR]: "קבלן",
};
