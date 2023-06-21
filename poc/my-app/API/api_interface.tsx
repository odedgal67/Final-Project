import { roles } from "../utils/Permissions";
import {
  Mission,
  Project,
  Stage,
  Status,
  Title,
  Plan,
  Fault,
  User,
  UserRecord,
  Urgency,
  Apartment,
} from "../types";
import { Linking } from "react-native";

abstract class api_interface {
  abstract get_url(path: string): string;
  abstract login(username: string, password: string): Promise<User>;
  abstract add_project(
    project_name: string,
    username: string
  ): Promise<Project>;
  abstract add_stage(
    project_id: string,
    title: Title,
    stage_name: string,
    username: string,
    apartment_number?: number
  ): Promise<Stage>;
  abstract add_mission(
    project_id: string,
    stage_id: string,
    title: Title,
    mission_name: string,
    username: string,
    apartment_number?: number
  ): Promise<Mission>;
  abstract add_plan(
    project_id: string,
    plan_name: string,
    link: string,
    username: string
  ): Promise<Plan>;
  abstract remove_plan(
    project_id: string,
    plan_id: string,
    username: string
  ): Promise<void>;
  abstract edit_plan_name(
    project_id: string,
    plan_id: string,
    new_name: string,
    username: string
  ): Promise<void>;
  abstract edit_plan_link(
    project_id: string,
    plan_id: string,
    new_link: string,
    username: string
  ): Promise<void>;
  abstract set_mission_status(
    project_id: string,
    title: Title,
    stage_id: string,
    mission_id: string,
    new_status: Status,
    username: string,
    apartment_number?: number
  ): Promise<void>;
  abstract set_stage_status(
    project_id: string,
    title: Title,
    stage_id: string,
    new_status: Status,
    username: string,
    apartment_number?: number
  ): Promise<void>;
  abstract get_all_missions(
    project_id: string,
    title: Title,
    stage_id: string,
    username: string,
    apartment_number?: number
  ): Promise<Mission[]>;
  abstract get_all_faults(project_id: string, username: string): Promise<Fault[]>;
  abstract add_fault(
    project_id: string,
    floor_number: number,
    apartment_number: number,
    fault_name: string,
    username: string
  ): Promise<Fault>;
  abstract get_all_stages(
    project_id: string,
    title: Title,
    username: string,
    apartment_number?: number
  ): Promise<Stage[]>;
  abstract get_all_plans(project_id: string, username: string): Promise<Plan[]>;
  abstract get_all_projects(username: string): Promise<Project[]>;
  abstract edit_comment_in_mission(
    project_id: string,
    title: Title,
    stage_id: string,
    mission_id: string,
    comment: string,
    username: string,
    apartment_number?: number
  ): Promise<void>;
  abstract edit_fault(
    project_id: string,
    fault_id: string,
    fault_name: string,
    floor_number: number,
    apartment_number: number,
    green_building: boolean,
    urgency: Urgency,
    proof_fix: string,
    tekken: string,
    plan_link: string,
    status: Status,
    proof: string,
    comment: string,
    username: string
  ): Promise<void>;
  abstract set_fault_status(
    project_id: string,
    fault_id: string,
    new_status: Status,
    username: string
  ): Promise<void>;
  abstract set_fault_urgency(
    project_id: string,
    fault_id: string,
    new_urgency: Urgency,
    username: string
  ): Promise<void>;
  abstract set_fault_comment(
    project_id: string,
    fault_id: string,
    new_comment: string,
    username: string
  ): Promise<void>;
  abstract set_fault_proof(
    project_id: string,
    fault_id: string,
    new_proof: string,
    username: string
  ): Promise<string>;
  abstract set_fault_proof_fix(
    project_id: string,
    fault_id: string,
    new_proof_fix: string,
    username: string
  ): Promise<string>;
  abstract remove_fault(
    project_id: string,
    fault_id: string,
    username: string
  ): Promise<Fault>;
  abstract get_role(username: string, project_id: string): Promise<roles>;
  abstract edit_project_name(
    usernaem: string,
    project_id: string,
    new_name: string
  ): Promise<void>;
  abstract get_all_users(
    project_id: string,
    username: string
  ): Promise<UserRecord[]>;
  abstract register(
    username: string,
    id: string,
    password: string
  ): Promise<void>;
  abstract remove_user(
    project_id: string,
    user: User,
    username: string
  ): Promise<void>;
  abstract edit_user_role(
    project_id: string,
    id: string,
    new_role: roles,
    username: string
  ): Promise<void>;
  abstract update_mission_proof(
    project_id: string,
    title: Title,
    stage_id: string,
    mission_id: string,
    local_image_uri: string,
    username: string,
    apartment_number?: number
  ): Promise<string>;
  abstract update_mission_document(
    project_id: string,
    title: Title,
    stage_id: string,
    mission_id: string,
    local_document_uri: string,
    username: string,
    apartment_number?: number
  ): Promise<string>;
  abstract update_mission_plan(
    project_id: string,
    title: Title,
    stage_id: string,
    mission_id: string,
    local_document_uri: string,
    username: string,
    apartment_number?: number
  ): Promise<string>;
  abstract remove_stage(
    project_id: string,
    title: Title,
    stage_id: string,
    username: string,
    apartment_number?: number
  ): Promise<Stage>;
  abstract remove_mission(
    project_id: string,
    title: Title,
    stage_id: string,
    mission_id: string,
    username: string,
    apartment_number?: number
  ): Promise<Mission>;
  abstract edit_stage_name(
    project_id: string,
    title: Title,
    stage_id: string,
    new_stage_name: string,
    username: string,
    apartment_number?: number
  ): Promise<void>;
  abstract edit_mission_name(
    project_id: string,
    title: Title,
    stage_id: string,
    mission_id: string,
    new_mission_name: string,
    username: string,
    apartment_number?: number
  ): Promise<void>;
  abstract get_all_apartments(
    project_id: string,
    username: string
  ): Promise<Apartment[]>;
  abstract add_apartment(
    project_id: string,
    apartment_number: number,
    username: string
  ): Promise<Apartment>;
  abstract remove_apartment(
    project_id: string,
    apartment_number: number,
    username: string
  ): Promise<Apartment>;
  abstract load_excel_data(
    project_id: string,
    data: {},
    username: string
  ): Promise<void>;
  abstract change_user_name(
    new_name: string,
    username: string
  ): Promise<void>;
  abstract change_user_password(
    new_password: string,
    username: string
  ): Promise<void>;
  abstract logout(username: string): Promise<void>;
  abstract is_admin(username: string): Promise<boolean>;
  abstract reset_password_for_user(username_to_reset: string, username_resetting: string): Promise<void>;
}

export default api_interface;
