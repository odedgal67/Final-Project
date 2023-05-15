import { Mission, Project, Stage, Status, Title } from "../types";
import { roles } from "../utils/Permissions";
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
    this.init_data();
  }

  private init_data() {
    this.add_project("פרויקט דוגמא", "דוגמא");
  }

  get_all_projects(username: string): Project[] {
    return this.projects.filter((project) => true);
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

  add_stage(
    project_id: number,
    title: Title,
    stage_name: string,
    username: string
  ): number {
    this.stages.push({
      name: stage_name,
      status: Status.Open,
      completion_date: new Date(),
      id: this.last_stage_id,
      title: title,
    });
    this.last_stage_id++;
    return this.last_stage_id - 1;
  }

  add_mission(
    project_id: number,
    stage_id: number,
    title: Title,
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
      title: title,
    });
    console.log(
      "added mission!  with title:" + this.missions[this.last_mission_id].title
    );
    this.last_mission_id++;
    return this.last_mission_id - 1;
  }

  private check_update_stages_statuses() {
    if (this.missions.some((mission) => mission.status == Status.Invalid)) {
      this.stages.forEach((stage) => (stage.status = Status.Invalid));
      return;
    } else if (
      this.missions.some((mission) => mission.status == Status.InProgress)
    ) {
      this.stages.forEach((stage) => (stage.status = Status.InProgress));
      return;
    } else if (
      this.missions.every((mission) => mission.status == Status.Done)
    ) {
      this.stages.forEach((stage) => (stage.status = Status.Done));
      return;
    } else {
      this.stages.forEach((stage) => (stage.status = Status.Open));
      return;
    }
  }

  set_mission_status(
    project_id: number,
    title: Title,
    stage_id: number,
    mission_id: number,
    new_status: Status,
    username: string
  ): void {
    console.log(this.missions);
    if (this.missions[mission_id] == undefined) {
      console.warn(
        "mission id " + mission_id + " not found in project " + project_id
      );
      return;
    }
    this.missions[mission_id].status = new_status;
    this.check_update_stages_statuses();
  }

  get_all_missions(
    project_id: number,
    title: Title,
    stage_id: number,
    username: string
  ): Mission[] {
    console.log("returning all missions for title " + title);
    let output = this.missions.filter((mission) => mission.title == title);
    console.log("filtered missions: " + output);
    console.log("all missions: " + this.missions);
    return output;
  }

  get_all_stages(project_id: number, title: Title, username: string): Stage[] {
    return this.stages.filter((stage) => stage.title == title);
  }

  edit_comment_in_mission(
    project_id: number,
    title: Title,
    stage_id: number,
    mission_id: number,
    comment: string,
    username: string
  ): void {
    console.log(
      "edited comment!" +
        comment +
        " mission id: " +
        mission_id +
        " username: " +
        username +
        " stage_id: " +
        stage_id +
        " project_id: " +
        project_id
    );
    this.missions[mission_id].comment = comment;
  }

  get_role(username: string, project_id: number): roles {
    return roles.CONTRACTOR;
  }
}
export default MockAPI;
