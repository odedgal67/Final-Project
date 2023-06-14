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
  Urgency,
} from "../types";
import { roles } from "../utils/Permissions";
import {
  extractFileNameFromUri,
  extractFileTypeFromUri,
} from "../utils/stringFunctions";
import {
  PostWrapper,
  PostWrapperProject,
  PostWRapperProjects,
  PostWrapperStage,
  PostWrapperStages,
  PostWrapperMission,
  PostWrapperMissions,
  PostWrapperFault,
  PostWrapperFaults,
  PostWrapperPlan,
  PostWrapperPlans,
  PostWrapperUser,
  PostWrapperUserRecords,
  PostWrapperRole,
  PostWrapperVoid,
  PostWrapperString,
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
  ): Promise<Plan> {
    let file_name = extractFileNameFromUri(link);
    const formData = new FormData();
    formData.append("file", {
      uri: link, // this is fine
      name: file_name,
      type: "application/" + extractFileTypeFromUri(link),
    });
    formData.append("file_name", file_name);
    formData.append("project_id", project_id);
    formData.append("plan_name", plan_name);
    formData.append("username", username);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return new PostWrapperPlan().send_request(
      this.get_url("add_plan"),
      formData,
      config
    );
  }

  remove_plan(
    project_id: string,
    plan_id: string,
    username: string
  ): Promise<void> {
    return new PostWrapperVoid().send_request(
      this.get_url("remove_plan"), {
      project_id: project_id,
      plan_id: plan_id,
      username: username,
    });
  }

  edit_plan_name(
    project_id: string,
    plan_id: string,
    new_name: string,
    username: string
  ): Promise<void> {
    return new PostWrapperVoid().send_request(
      this.get_url("edit_plan_name"), {
      project_id: project_id,
      plan_id: plan_id,
      new_plan_name: new_name,
      username: username,
    });
  }

  edit_plan_link(
    project_id: string,
    plan_id: string,
    new_link: string,
    username: string
  ): Promise<void> {
    let file_name = extractFileNameFromUri(new_link);
    const formData = new FormData();
    formData.append("file", {
      uri: new_link, // this is fine
      name: file_name,
      type: "application/" + extractFileTypeFromUri(new_link),
    });
    formData.append("file_name", file_name);
    formData.append("project_id", project_id);
    formData.append("plan_id", plan_id);
    formData.append("username", username);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return new PostWrapperVoid().send_request(
      this.get_url("edit_plan_link"),
      formData,
      config
    );
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

  get_all_faults(project_id: string, username: string): Promise<Fault[]> {
    return new PostWrapperFaults().send_request(
      this.get_url("get_all_building_faults"),
      { project_id: project_id, username: username }
    );
  }

  add_fault(
    project_id: string,
    floor_number: number,
    apartment_number: number,
    fault_name: string,
    username: string
  ): Promise<Fault> {
    return new PostWrapperFault().send_request(
    this.get_url("add_building_fault"),
      { project_id: project_id, name: fault_name, username: username, floor_number: floor_number, apartment_number: apartment_number }
    );
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

  get_all_plans(project_id: string, username: string): Promise<Plan[]> {
    return new PostWrapperPlans().send_request(this.get_url("get_all_plans"),
    { project_id: project_id, username: username });
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

  edit_fault(
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
  ): Promise<void> {
    return new PostWrapperVoid().send_request(
      this.get_url("edit_building_fault"),
      {
        project_id: project_id,
        building_fault_id: fault_id,
        building_fault_name: fault_name,
        floor_number: floor_number,
        apartment_number: apartment_number,
        green_building: green_building,
        urgency: urgency,
        proof_fix: proof_fix,
        tekken: tekken,
        plan_link: plan_link,
        status: status,
        proof: proof,
        comment: comment,
        username: username
      }
    );
  }

  set_fault_status(
    project_id: string,
    fault_id: string,
    new_status: Status,
    username: string
  ): Promise<void> {
    return new PostWrapperVoid().send_request(
      this.get_url("set_build_fault_status"),
      { project_id: project_id, build_fault_id: fault_id, new_status: new_status, username: username }
    );
  }

  set_fault_urgency(
    project_id: string,
    fault_id: string,
    new_urgency: Urgency,
    username: string
  ): Promise<void> {
    return new PostWrapperVoid().send_request(
      this.get_url("set_urgency"),
      { project_id: project_id, building_fault_id: fault_id, new_urgency: new_urgency, username: username }
    );
  }

  set_fault_comment(
    project_id: string,
    fault_id: string,
    comment: string,
    username: string
  ): Promise<void> {
    return new PostWrapperVoid().send_request(
      this.get_url("set_building_fault_comment"),
      { project_id: project_id, building_fault_id: fault_id, comment: comment, username: username }
    );
  }

  set_building_fault_proof(
    project_id: string,
    fault_id: string,
    proof: string,
    username: string
  ): Promise<string> {
    let file_name = extractFileNameFromUri(proof);
    const formData = new FormData();
    formData.append("file", {
      uri: proof, // this is fine
      name: file_name,
      type: "image/" + extractFileTypeFromUri(proof),
    });
    formData.append("file_name", file_name);
    formData.append("project_id", project_id);
    formData.append("building_fault_id", fault_id);
    formData.append("username", username);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return new PostWrapperString().send_request(
      this.get_url("set_building_fault_proof"),
      formData,
      config
    );
  }

  set_building_fault_proof_fix(
    project_id: string,
    fault_id: string,
    proof: string,
    username: string
  ): Promise<string> {
    let file_name = extractFileNameFromUri(proof);
    const formData = new FormData();
    formData.append("file", {
      uri: proof, // this is fine
      name: file_name,
      type: "image/" + extractFileTypeFromUri(proof),
    });
    formData.append("file_name", file_name);
    formData.append("project_id", project_id);
    formData.append("building_fault_id", fault_id);
    formData.append("username", username);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return new PostWrapperString().send_request(
      this.get_url("set_building_fault_proof_fix"),
      formData,
      config
    );
  }

  remove_fault(
    project_id: string, 
    fault_id: string,
    username: string
    ): Promise<Fault> {
    return new PostWrapperFault().send_request(
      this.get_url("remove_building_fault"),
      { project_id: project_id, build_fault_id: fault_id, username: username }
    );
  }

  get_role(
    username: string,
    project_id: string
    ): Promise<roles> {
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

  get_all_users(
    project_id: string,
    username: string
    ): Promise<UserRecord[]> {
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

      let rows = data["ליקויי בניה"];
      let fault_id = "";
      for (const row of rows.slice(1)) {
        if(row[1] && row[1] != "")
          this.add_fault(project_id, row[4], row[5], row[1], username).then((fault: Fault) =>{fault_id = fault.id}).catch((error: string) =>{reject(error);});
        if(row[2] == "בוצע")
          this.set_fault_status(project_id, fault_id, Status.Done, username);
        // if(row[3])
        //   this.edit_fault_urgency(project_id, fault_id, row[3], username);
      }

      rows = data["תכניות"];
      for (const row of rows.slice(1))
        this.add_plan(project_id, row[0], row[1], username)
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

  remove_stage(
    project_id: string,
    title: Title,
    stage_id: string,
    username: string,
    apartment_number?: number
  ): Promise<Stage> {
    return new PostWrapperStage().send_request(this.get_url("remove_stage"), {
      project_id: project_id,
      title_id: title,
      stage_id: stage_id,
      username: username,
      apartment_number: apartment_number,
    });
  }

  remove_mission(
    project_id: string,
    title: Title,
    stage_id: string,
    mission_id: string,
    username: string,
    apartment_number?: number
  ): Promise<Mission> {
    return new PostWrapperMission().send_request(
      this.get_url("remove_mission"),
      {
        project_id: project_id,
        title_id: title,
        stage_id: stage_id,
        mission_id: mission_id,
        username: username,
        apartment_number: apartment_number,
      }
    );
  }

  edit_stage_name(
    project_id: string,
    title: Title,
    stage_id: string,
    new_stage_name: string,
    username: string,
    apartment_number?: number
  ): Promise<void> {
    return new PostWrapperVoid().send_request(this.get_url("edit_stage_name"), {
      project_id: project_id,
      title_id: title,
      stage_id: stage_id,
      new_stage_name: new_stage_name,
      username: username,
      apartment_number: apartment_number,
    });
  }

  edit_mission_name(
    project_id: string,
    title: Title,
    stage_id: string,
    mission_id: string,
    new_mission_name: string,
    username: string,
    apartment_number?: number
  ): Promise<void> {
    return new PostWrapperVoid().send_request(
      this.get_url("edit_mission_name"),
      {
        project_id: project_id,
        title_id: title,
        stage_id: stage_id,
        mission_id: mission_id,
        new_mission_name: new_mission_name,
        username: username,
        apartment_number: apartment_number,
      }
    );
  }

  logout(username: string): Promise<void> {
    return new PostWrapperVoid().send_request(this.get_url("logout"), {
      username: username,
    });
  }
}
