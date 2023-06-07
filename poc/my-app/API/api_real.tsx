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
  extractFileNameFromUri,
  extractFileTypeFromUri,
} from "../utils/stringFunctions";
import {
  PostWRapperProjects,
  PostWrapper,
  PostWrapperMission,
  PostWrapperMissions,
  PostWrapperProject,
  PostWrapperRole,
  PostWrapperStage,
  PostWrapperStages,
  PostWrapperString,
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

  public get_url(path: string): string {
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
    project_id: string,
    title: Title,
    stage_name: string,
    username: string
  ): Promise<Stage> {
    return new PostWrapperStage().send_request(this.get_url("add_stage"), {
      project_id: project_id,
      title_id: title,
      stage_name: stage_name,
      username: username,
    });
  }
  add_mission(
    project_id: string,
    stage_id: string,
    title: Title,
    mission_name: string,
    username: string,
    apartment_number?: number
  ): Promise<Mission> {
    return new PostWrapperMission().send_request(this.get_url("add_mission"), {
      project_id: project_id,
      apartment_number: apartment_number,
      stage_id: stage_id,
      title_id: title,
      mission_name: mission_name,
      username: username,
    });
  }
  add_plan(
    project_id: string,
    plan_name: string,
    link: string,
    username: string
  ): Promise<number> {
    throw new Error("Method not implemented.");
  }
  set_mission_status(
    project_id: string,
    title: Title,
    stage_id: string,
    mission_id: string,
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
    project_id: string,
    title: Title,
    stage_id: string,
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
    project_id: string,
    title: Title,
    stage_id: string,
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
  get_all_faults(project_id: string): Promise<Fault[]> {
    throw new Error("Method not implemented.");
  }
  add_fault(
    project_id: string,
    floor: number,
    apartment_number: number,
    fault_name: string,
    username: string
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  get_all_stages(
    project_id: string,
    title: Title,
    username: string
  ): Promise<Stage[]> {
    let title_id: number = title;
    return new PostWrapperStages().send_request(
      this.get_url("get_all_stages"),
      { project_id: project_id, title_id: title_id, username: username }
    );
  }
  get_all_plans(project_id: string): Promise<Plan[]> {
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
    project_id: string,
    title: Title,
    stage_id: string,
    mission_id: string,
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
    project_id: string,
    fault_id: number,
    comment: string,
    username: string
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  set_fault_status(
    project_id: string,
    fault_id: number,
    new_status: Status,
    username: string
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  get_role(username: string, project_id: string): Promise<roles> {
    return new PostWrapperRole().send_request(
      this.get_url("get_my_permission"),
      { username: username, project_id: project_id }
    );
  }
  edit_project_name(
    usernaem: string,
    project_id: string,
    new_name: string
  ): Promise<void> {
    return new PostWrapperVoid().send_request(
      this.get_url("edit_project_name"),
      { username: usernaem, project_id: project_id, new_project_name: new_name }
    );
  }
  get_all_users(project_id: string, username: string): Promise<UserRecord[]> {
    return new PostWrapperUserRecords().send_request(
      this.get_url("get_all_assigned_users_in_project"),
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
      username: id,
      password: password,
      name: username,
    });
  }
  remove_user(project_id: string, user: User, username: string): Promise<void> {
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
    project_id: string,
    id: string,
    new_role: roles,
    username: string
  ): Promise<void> {
    return new PostWrapperVoid().send_request(
      this.get_url("assign_project_to_user"),
      {
        project_id: project_id,
        permission_type: new_role,
        assigning_username: username,
        username_to_assign: id,
      }
    );
  }

  private create_formData_for_file(
    local_image_uri: string,
    project_id: string,
    stage_id: string,
    mission_id: string,
    username: string,
    title: Title,
    type: string
  ): FormData {
    let file_name = extractFileNameFromUri(local_image_uri);
    const formData = new FormData();
    console.log(local_image_uri);
    formData.append("file", {
      uri: local_image_uri, // this is fine
      name: file_name,
      type: type + "/" + extractFileTypeFromUri(local_image_uri),
    });
    formData.append("file_name", file_name);
    formData.append("project_id", project_id);
    formData.append("stage_id", stage_id);
    formData.append("mission_id", mission_id);
    formData.append("username", username);
    formData.append("title_id", String(title));
    return formData;
  }

  update_mission_proof(
    project_id: string,
    title: Title,
    stage_id: string,
    mission_id: string,
    local_image_uri: string,
    username: string
  ): Promise<string> {
    const formData = this.create_formData_for_file(
      local_image_uri,
      project_id,
      stage_id,
      mission_id,
      username,
      title,
      "image"
    );
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return new PostWrapperString().send_request(
      this.get_url("set_mission_proof"),
      formData,
      config
    );
  }
  async load_excel_data(
    project_id: string,
    data: {},
    username: string
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const handleSheet = async (sheetName: string, title: Title) => {
        const rows = data[sheetName];
        let index = -1;
        let stage_id = "";
        let mission_id = "";

        for (const row of rows.slice(1)) {
          if (row[0] && (index === -1 || Math.floor(row[0]) !== index)) {
            console.log("adding stage");
            index = row[0];
            await this.add_stage(project_id, title, row[1].trim(), username)
              .then((stage: Stage) => {
                stage_id = stage.id;
              })
              .catch((error: string) => {
                return reject(error);
              });
          } else {
            await this.add_mission(
              project_id,
              stage_id,
              title,
              row[1].trim(),
              username
            )
              .then((mission: Mission) => {
                mission_id = mission.id;
              })
              .catch((error: string) => {
                return reject(error);
              });
            if (row[2]) {
              this.edit_comment_in_mission(
                project_id,
                title,
                stage_id,
                mission_id,
                row[2].trim(),
                username
              ).catch((error: string) => {
                reject(error);
              });
            }
          }
          console.log(row[1]);
        }
      };
      console.log("loading excel data");
      console.log(data);

      handleSheet("שלב מקדים", Title.EarlyStages);
      handleSheet("עבודות שלד", Title.SkeletalStages);
      handleSheet("פיתוח וכללי לבניין", Title.GeneralStages);

      // let rows = data["ליקויי בניה"];
      // for (const row of rows.slice(1))
      //   this.add_fault(project_id, row[4], row[5], row[1], username);

      // rows = data["תכניות"];
      // for (const row of rows.slice(1))
      //   this.add_plan(project_id, row[0], row[1] ? row[1] : "", username)
      resolve();
    });
  }

  update_mission_document(
    project_id: string,
    title: Title,
    stage_id: string,
    mission_id: string,
    local_document_uri: string,
    username: string
  ): Promise<string> {
    const formData = this.create_formData_for_file(
      local_document_uri,
      project_id,
      stage_id,
      mission_id,
      username,
      title,
      "application"
    );
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return new PostWrapperString().send_request(
      this.get_url("set_mission_tekken"),
      formData,
      config
    );
  }

  update_mission_plan(
    project_id: string,
    title: Title,
    stage_id: string,
    mission_id: string,
    local_document_uri: string,
    username: string
  ): Promise<string> {
    const formData = this.create_formData_for_file(
      local_document_uri,
      project_id,
      stage_id,
      mission_id,
      username,
      title,
      "application"
    );
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return new PostWrapperString().send_request(
      this.get_url("set_mission_plan_link"),
      formData,
      config
    );
  }
}
