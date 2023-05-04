import { Mission, Project, Stage, Status } from "../types";
import api_interface from "./api_interface";

class MockAPI extends api_interface {
  projects: Project[] = [];
  last_project_id: number = 0;
  stages: Stage[] = [];
  last_stage_id: number = 0;
  missions: Mission[] = [];
  last_mission_id: number = 0;

  constructor() {
    super();
  }

  get_all_projects(username: string): Project[] {
    return this.projects;
  }

  login(username: string, password: string): boolean {
    return true;
  }

  add_project(project_name: string, username: string): number {
    console.log("added project!");
    this.projects.push({ id: this.last_project_id, name: project_name });
    this.last_project_id++;
    return this.last_project_id - 1;
  }

  add_stage(project_id: number, stage_name: string, username: string): number {
    this.stages.push({
      name: stage_name,
      status: Status.Open,
      completion_date: new Date(),
      stage_id: this.last_stage_id,
    });
    this.last_stage_id++;
    return this.last_stage_id - 1;
  }

  add_mission(
    project_id: number,
    stage_id: number,
    mission_name: string,
    username: string
  ): number {
    this.missions.push({
      name: mission_name,
      status: Status.Open,
      proof: 0,
      link: "",
      green_building: false,
      completion_date: new Date(),
      completing_user: "",
      comment: "",
      id: this.last_mission_id,
    });
    this.last_mission_id++;
    return this.last_mission_id - 1;
  }

  set_mission_status(
    project_id: number,
    stage_id: number,
    mission_id: number,
    new_status: Status,
    username: string
  ): void {
    console.log(this.missions);
    this.missions[mission_id].status = new_status;
  }

  get_all_missions(
    project_id: number,
    stage_id: number,
    username: string
  ): Mission[] {
    return this.missions;
  }

  get_all_stages(project_id: number, username: string): Stage[] {
    return this.stages;
  }

  edit_comment_in_mission(
    project_id: number,
    stage_id: number,
    mission_id: number,
    comment: string,
    username: string
  ): void {
    this.missions[mission_id].comment = comment;
  }
}
export default MockAPI;
