import {
  Title,
  Status,
  Mission,
  Fault,
  Stage,
  Plan,
  Project,
  UserRecord,
  User,
} from "../types";
import { roles } from "../utils/Permissions";
import {
  PostWRapperProjects,
  PostWrapper,
  PostWrapperMissions,
  PostWrapperProject,
  PostWrapperRole,
  PostWrapperStages,
  PostWrapperUser,
  PostWrapperUserRecords,
  PostWrapperVoid,
} from "./RealAPIUtils/PostWrappers";
import api_interface from "./api_interface";

export class RealAPI extends api_interface {
  private server_url: string;

  constructor(server_url: string) {
    super();
    this.server_url = server_url;
  }

  private get_url(path: string): string {
    return this.server_url + "/" + path;
  }

  login(username: string, password: string): Promise<User> {
    console.log("login in real api");
    return new PostWrapperUser().send_request(this.get_url("login"), {
      username: username,
      password: password,
    });
  }

  add_project(project_name: string, username: string): Promise<Project> {
    return new PostWrapperProject().send_request(this.get_url("add_project"), {
      project_name: project_name,
      username: username,
    });
  }
  add_stage(
    project_id: number,
    title: Title,
    stage_name: string,
    username: string
  ): Promise<void> {
    return new PostWrapperVoid().send_request(this.get_url("add_stage"), {
      project_id: project_id,
      title_id: title,
      stage_name: stage_name,
      username: username,
    });
  }
  add_mission(
    project_id: number,
    stage_id: number,
    title: Title,
    mission_name: string,
    username: string,
    apartment_number?: number
  ): Promise<void> {
    return new PostWrapperVoid().send_request(this.get_url("add_mission"), {
      project_id: project_id,
      apartment_number: apartment_number,
      stage_id: stage_id,
      title_id: title,
      mission_name: mission_name,
      username: username,
    });
  }
  add_plan(
    project_id: number,
    plan_name: string,
    link: string,
    username: string
  ): Promise<number> {
    throw new Error("Method not implemented.");
  }
  set_mission_status(
    project_id: number,
    title: Title,
    stage_id: number,
    mission_id: number,
    new_status: Status,
    username: string
  ): Promise<void> {
    return new PostWrapperVoid().send_request(
      this.get_url("set_mission_status"),
      {
        project_id: project_id,
        title_id: title,
        stage_id: stage_id,
        mission_id: mission_id,
        new_status: new_status,
        username: username,
      }
    );
  }
  set_stage_status(
    project_id: number,
    title: Title,
    stage_id: number,
    new_status: Status,
    username: string
  ): Promise<void> {
    return new PostWrapperVoid().send_request(
      this.get_url("set_stage_status"),
      {
        project_id: project_id,
        title_id: title,
        stage_id: stage_id,
        new_status: new_status,
        username: username,
      }
    );
  }
  get_all_missions(
    project_id: number,
    title: Title,
    stage_id: number,
    username: string
  ): Promise<Mission[]> {
    return new PostWrapperMissions().send_request(
      this.get_url("get_all_missions"),
      {
        project_id: project_id,
        title_id: title,
        stage_id: stage_id,
        username: username,
      }
    );
  }
  get_all_faults(project_id: number): Promise<Fault[]> {
    throw new Error("Method not implemented.");
  }
  add_fault(
    project_id: number,
    floor: number,
    apartment_number: number,
    fault_name: string,
    username: string
  ): Promise<number> {
    throw new Error("Method not implemented.");
  }
  get_all_stages(
    project_id: number,
    title: Title,
    username: string
  ): Promise<Stage[]> {
    let title_id: number = title;
    return new PostWrapperStages().send_request(
      this.get_url("get_all_stages"),
      { project_id: project_id, title_id: title_id, username: username }
    );
  }
  get_all_plans(project_id: number): Promise<Plan[]> {
    throw new Error("Method not implemented.");
  }
  get_all_projects(username: string): Promise<Project[]> {
    console.log("get all projects in real api");
    return new PostWRapperProjects().send_request(
      this.get_url("get_projects"),
      { username: username }
    );
  }
  edit_comment_in_mission(
    project_id: number,
    title: Title,
    stage_id: number,
    mission_id: number,
    comment: string,
    username: string,
    apartment_number?: number
  ): Promise<void> {
    return new PostWrapperVoid().send_request(
      this.get_url("edit_comment_in_mission"),
      {
        project_id: project_id,
        title_id: title,
        stage_id: stage_id,
        mission_id: mission_id,
        comment: comment,
        username: username,
        apartment_number: apartment_number,
      }
    );
  }
  edit_fault_comment(
    project_id: number,
    fault_id: number,
    comment: string,
    username: string
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  set_fault_status(
    project_id: number,
    fault_id: number,
    new_status: Status,
    username: string
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  get_role(username: string, project_id: number): Promise<roles> {
    return new PostWrapperRole().send_request(
      this.get_url("get_my_permission"),
      { username: username, project_id: project_id }
    );
  }
  edit_project_name(
    usernaem: string,
    project_id: number,
    new_name: string
  ): Promise<void> {
    return new PostWrapperVoid().send_request(
      this.get_url("edit_project_name"),
      { username: usernaem, project_id: project_id, new_project_name: new_name }
    );
  }
  get_all_users(project_id: number, username: string): Promise<UserRecord[]> {
    return new PostWrapperUserRecords().send_request(
      this.get_url("get_all_users"),
      { project_id: project_id, username: username }
    );
  }
  register(
    username: string,
    id: string,
    password: string,
    name: string
  ): Promise<void> {
    return new PostWrapperVoid().send_request(this.get_url("register"), {
      username: username,
      id: id,
      password: password,
      name: name,
    });
  }
  remove_user(project_id: number, user: User, username: string): Promise<void> {
    return new PostWrapperVoid().send_request(
      this.get_url("remove_user_from_project"),
      {
        project_id: project_id,
        username_to_remove: user.id,
        removing_user: username,
      }
    );
  }
  edit_user_role(
    project_id: number,
    id: string,
    new_role: roles,
    username: string
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update_mission_proof(
    project_id: number,
    title: Title,
    stage_id: number,
    mission_id: number,
    Image: Blob,
    username: string
  ): Promise<string> {
    throw new Error("Method not implemented.");
  }
}
