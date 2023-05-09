import { Status, Title } from "../types";

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
  project_name_cant_be_empty: "שם הפרויקט לא יכול להיות ריק",
  mission_description: "תיאור משימה",
  link_to_document: "קישור לתקן",
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
