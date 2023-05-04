import { Mission, Project, Stage, Status } from "../types";

abstract class api_interface {
  abstract login(username: string, password: string): boolean;
  abstract add_project(project_name: string, username: string): number;
  abstract add_stage(
    project_id: number,
    stage_name: string,
    username: string
  ): number;
  abstract add_mission(
    project_id: number,
    stage_id: number,
    mission_name: string,
    username: string
  ): number;
  abstract set_mission_status(
    project_id: number,
    stage_id: number,
    mission_id: number,
    new_status: Status,
    username: string
  ): void;
  abstract get_all_missions(
    project_id: number,
    stage_id: number,
    username: string
  ): Mission[];
  abstract get_all_stages(project_id: number, username: string): Stage[];
  abstract get_all_projects(username: string): Project[];
  abstract edit_comment_in_mission(
    project_id: number,
    stage_id: number,
    mission_id: number,
    comment: string,
    username: string
  ): void;
}

export default api_interface;