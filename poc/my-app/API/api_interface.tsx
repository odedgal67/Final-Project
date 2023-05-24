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
} from "../types";

abstract class api_interface {
  abstract login(username: string, password: string): boolean;
  abstract add_project(project_name: string, username: string): number;
  abstract add_stage(
    project_id: number,
    title: Title,
    stage_name: string,
    username: string
  ): number;
  abstract add_mission(
    project_id: number,
    stage_id: number,
    title: Title,
    mission_name: string,
    username: string
  ): number;
  abstract add_plan(
    project_id: number,
    plan_name: string,
    link: string,
    username: string
  ): number;
  abstract set_mission_status(
    project_id: number,
    title: Title,
    stage_id: number,
    mission_id: number,
    new_status: Status,
    username: string
  ): void;
  abstract set_stage_status(
    project_id: number,
    title: Title,
    stage_id: number,
    new_status: Status,
    username: string
  ): void;
  abstract get_all_missions(
    project_id: number,
    title: Title,
    stage_id: number,
    username: string
  ): Mission[];
  // abstract get_all_faults(
  //   project_id: number,
  //   title: Title,
  //   username: string
  // ): Fault[];
  abstract get_all_faults(
    project_id: number
  ): Fault[];
  abstract add_fault(
    project_id: number,
    floor: number,
    apartment_number: number,
    fault_name: string,
    username: string
  ): number;
  abstract get_all_stages(
    project_id: number,
    title: Title,
    username: string
  ): Stage[];
  abstract get_all_plans(project_id: number): Plan[];
  abstract get_all_projects(username: string): Project[];
  abstract edit_comment_in_mission(
    project_id: number,
    title: Title,
    stage_id: number,
    mission_id: number,
    comment: string,
    username: string
  ): void;
  abstract edit_fault_comment(
    project_id: number,
    fault_id: number,
    comment: string,
    username: string
  ): void;
  abstract set_fault_status(
    project_id: number,
    fault_id: number,
    new_status: Status,
    username: string
  ): void;
  abstract get_role(username: string, project_id: number): roles;
  abstract edit_project_name(
    usernaem: string,
    project_id: number,
    new_name: string
  ): void;
  abstract get_all_users(project_id: number, username: string): UserRecord[];
  abstract register(username: string, id: string, password: string): void;
  abstract remove_user(project_id: number, user: User, username: string): void;
  abstract edit_user_role(
    project_id: number,
    id: string,
    new_role: roles,
    username: string
  ): void;
  abstract update_mission_proof(
    project_id: number,
    title: Title,
    stage_id: number,
    mission_id: number,
    Image: Blob,
    username: string
  ): Promise<string>;
}

export default api_interface;
