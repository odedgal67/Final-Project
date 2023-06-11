import { Project, Stage, User, Status, Mission, UserRecord } from "../../types";
import { roles } from "../../utils/Permissions";

let roles_mapping = [
  roles.WORK_MANAGER,
  roles.PROJECT_MANAGER,
  roles.CONTRACTOR,
];

let status_mapping = [
  Status.Undefined,
  Status.Open,
  Status.InProgress,
  Status.Done,
  Status.Invalid,
];

//Classes responsible for parsing the response from the server
//need to be implemented for each type (User, Project, etc.)
//The get_result() method returns the result of the response according to server dto.
export abstract class Response<T> {
  public result?: any;
  public error?: string;

  constructor(data: any) {
    this.result = data["result"];
    this.error = data["error"];
  }

  abstract get_result(): T;
}

export class UserResponse extends Response<User> {
  get_result(): User {
    return { id: this.result.username, name: this.result.name };
  }
}

export class ProjectResponse extends Response<Project> {
  get_result(): Project {
    return { id: this.result.id, name: this.result.name };
  }
}

export class ProjectsResponse extends Response<Project[]> {
  get_result(): Project[] {
    let output: Project[] = [];
    Object.entries(this.result).forEach(([_key, value]) => {
      output.push({ id: value.id, name: value.name });
    });
    return output;
  }
}

export class RoleResponse extends Response<roles> {
  get_result(): roles {
    return roles_mapping[(this.result as number) - 1];
  }
}

export class StageResponse extends Response<Stage> {
  get_result(): Stage {
    let output: Stage = {
      name: this.result.name,
      id: this.result.id,
      status: status_mapping[this.result.status],
      completion_date: new Date(),
    };
    return output;
  }
}

export class StagesResponse extends Response<Stage[]> {
  get_result(): Stage[] {
    let output: Stage[] = [];
    Object.entries(this.result).forEach(([_key, value]) => {
      let stageResponse = new StageResponse({ result: value });
      output.push(stageResponse.get_result());
      console.log("stage: ");
      console.log(stageResponse.get_result());
    });
    return output;
  }
}

export class VoidResponse extends Response<void> {
  get_result(): void {
    return;
  }
}

export class MissionResponse extends Response<Mission> {
  get_result(): Mission {
    let output: Mission = {
      id: this.result.id,
      name: this.result.name,
      green_building: this.result.green_building,
      completion_date: new Date(),
      completing_user: this.result.completing_user,
      comment: this.result.comment,
      status: status_mapping[this.result.status],
      proof_link: this.result.proof,
      document_link: this.result.tekken,
      plan_link: this.result.plan_link,
    };
    return output;
  }
}

export class MissionsResponse extends Response<Mission[]> {
  get_result(): Mission[] {
    let output: Mission[] = [];
    Object.entries(this.result).forEach(([_key, value]) => {
      let missionResponse = new MissionResponse({ result: value });
      output.push(missionResponse.get_result());
    });
    return output;
  }
}

export class UserRecordsResponse extends Response<UserRecord[]> {
  get_result(): UserRecord[] {
    let output: UserRecord[] = [];
    Object.entries(this.result).forEach(([_key, value]) => {
      console.log("record: ", value.user_dto);
      output.push({
        user: { id: value.user_dto.username, name: value.user_dto.name },
        role: value.permission,
      });
    });
    return output;
  }
}

export class StringResponse extends Response<string> {
  get_result(): string {
    return this.result;
  }
}
