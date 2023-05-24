import { roles } from "../utils/Permissions";
import {
  Mission,
  Plan,
  Project,
  Stage,
  Status,
  Title,
  Fault,
  User,
  UserRecord,
} from "../types";
import api_interface from "./api_interface";
import { generateRandomString } from "../utils/stringFunctions";
import { createLocalFile } from "../utils/FileFunctions";

type UserRecordMock = { user: User; project_id: number; role: roles };

class MockAPI extends api_interface {
  projects: Project[] = [];
  last_project_id: number = 0;
  stages: Stage[] = [];
  last_stage_id: number = 0;
  missions: Mission[] = [];
  last_mission_id: number = 0;
  plans: Plan[] = [];
  last_plan_id: number = 0;
  faults: any[] = [];
  last_fault_id: number = 0;
  users: UserRecordMock[] = [];

  constructor() {
    super();
    this.init_data();
  }

  private init_data() {
    this.add_project("פרויקט דוגמא", "דוגמא");
    this.plans.push({
      name: "ynet",
      link: "https://www.ynet.co.il",
      date: new Date(),
      project_id: 0,
    });
    this.users.push({
      user: {
        name: "oded very long name",
        id: "1234",
      },
      project_id: 0,
      role: roles.PROJECT_MANAGER,
    });
    this.users.push({
      user: { name: "liron", id: "1235" },
      role: roles.CONTRACTOR,
      project_id: 0,
    });
    this.users.push({
      user: { name: "hadar", id: "1236" },
      role: roles.WORK_MANAGER,
      project_id: 0,
    });
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
    console.log("current projects: " + this.projects.length);
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

  add_plan(
    project_id: number,
    plan_name: string,
    link: string,
    username: string
  ): number {
    console.log("added plan!");
    this.plans.push({
      id: this.last_plan_id,
      name: plan_name,
      link: link,
      date: new Date(),
      project_id: project_id,
    });
    this.last_plan_id++;
    return this.last_plan_id - 1;
  }

  get_all_plans(project_id: number): Plan[] {
    return this.plans.filter((plan) => true);
  }

  add_fault(
    project_id: number,
    floor: number,
    apartment_number: number,
    fault_name: string,
    username: string
  ): number {
    console.log("added fault!");
    this.faults.push({
      urgency: "",
      status: Status.Open,
      floor: floor,
      apartment_number: apartment_number,
      photo: 0,
      proof: 0,
      comment: "",
      id: this.last_fault_id,
      name: fault_name,
      date: new Date(),
      project_id: project_id,
      title: Title.BuildingFaults,
    });
    this.last_fault_id++;
    return this.last_fault_id - 1;
  }

  get_all_faults(project_id: number): Fault[] {
    return this.faults.filter((fault) => true);
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

  set_stage_status(
    project_id: number,
    title: Title,
    stage_id: number,
    new_status: Status,
    username: string
  ): void {
    if (this.stages[stage_id] == undefined) {
      console.warn(
        "stage id " + stage_id + " not found in project " + project_id
      );
      return;
    }
    this.stages[stage_id].status = new_status;
  }

  get_all_missions(
    project_id: number,
    title: Title,
    stage_id: number,
    username: string
  ): Mission[] {
    let output = this.missions.filter((mission) => mission.title == title);
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

  edit_fault_comment(
    project_id: number,
    fault_id: number,
    comment: string,
    username: string
  ): void {
    console.log(
      "edited comment!" +
        comment +
        " fault id: " +
        fault_id +
        " username: " +
        username +
        " project_id: " +
        project_id
    );
    this.faults[fault_id].comment = comment;
  }

  set_fault_status(
    project_id: number,
    fault_id: number,
    new_status: Status,
    username: string
  ): void {
    if (this.faults[fault_id] == undefined) {
      console.warn(
        "fault id " + fault_id + " not found in project " + project_id
      );
      return;
    }
    this.faults[fault_id].status = new_status;
  }

  get_role(username: string, project_id: number): roles {
    return roles.CONTRACTOR;
  }
  edit_project_name(
    usernaem: string,
    project_id: number,
    new_name: string
  ): void {
    this.projects[project_id].name = new_name;
  }

  get_all_users(project_id: number, username: string): UserRecord[] {
    let output: UserRecord[] = [];
    this.users.forEach((user_record) => {
      if (user_record.project_id == project_id) {
        output.push({ user: user_record.user, role: user_record.role });
      }
    });
    return output;
  }

  register(username: string, id: string, password: string): void {
    this.users.push({
      user: {
        name: username,
        id: id,
      },
      project_id: -1,
      role: roles.WORK_MANAGER,
    });
  }

  remove_user(project_id: number, user: User, username: string): void {
    this.users = this.users.filter(
      (user_record) =>
        user_record.user.id != user.id || user_record.project_id != project_id
    );
  }

  edit_user_role(
    project_id: number,
    id: string,
    new_role: roles,
    username: string
  ): void {
    console.log("editing user role id: " + id + " new role: " + new_role);
    this.users.forEach((user_record) => {
      console.log("user_record.user.id: " + user_record.user.id);
      if (user_record.user.id == id) {
        user_record.role = new_role;
        user_record.project_id = project_id;
      }
    });
  }

  async update_mission_proof(
    project_id: number,
    title: Title,
    stage_id: number,
    mission_id: number,
    imageBlob: Blob,
    username: string
  ) {
    let formdata = new FormData();
    formdata.append("image", imageBlob, "image.jpg");
    let file_name = generateRandomString(10) + ".jpg";
    let uri = "http:////192.168.50.61:5000//images//" + file_name;
    await fetch(uri, {
      method: "POST",
      body: imageBlob,
      headers: {
        "Content-Type": imageBlob.type,
      },
    });
    this.missions[mission_id].proof_link = uri;
    console.log(
      "updated mission proof link: " + uri + " mission id " + mission_id
    );
    return uri;
  }
}
export default MockAPI;
