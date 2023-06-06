import { Project, Stage, Mission, Plan, Fault, User, Status, UserRecord } from "../../types";
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
      let stage = {
        name: value.name,
        id: value.id,
        status: status_mapping[value.status],
        completion_date: new Date(),
      };
      output.push(stage);
      console.log("stage: ");
      console.log(stage);
    });
    return output;
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
      status: this.result.status,
      proof_link: this.result.proof,
    };
    return output;
  }
}

export class MissionsResponse extends Response<Mission[]> {
  get_result(): Mission[] {
    let output: Mission[] = [];
    Object.entries(this.result).forEach(([_key, value]) => {
      output.push({
        id: value.id,
        name: value.name,
        green_building: value.green_building,
        completion_date: new Date(),
        completing_user: value.completing_user,
        comment: value.comment,
        status: value.status,
        proof_link: value.proof,
      });
    });
    return output;
  }
}

export class PlanResponse extends Response<Plan> {
  get_result(): Plan {
    let output: Plan = {
      name: this.result.name,
      link: this.result.link,
      date: this.result.date,
      project_id: this.result.project_id,
    };
    return output;
  }
}

export class PlansResponse extends Response<Plan[]> {
  get_result(): Plan[] {
    let output: Plan[] = [];
    Object.entries(this.result).forEach(([_key, value]) => {
      output.push({
        name: value.name,
        link: value.link,
        date: value.date,
        project_id: value.project_id,
      });
    });
    return output;
  }
}

export class FaultResponse extends Response<Fault> {
  get_result(): Fault {
    let output: Fault = {
      id: this.result.id,
      name: this.result.name,
      status: this.result.status,
      urgency: this.result.urgency,
      floor_number: this.result.floor_number,
      apartment_number: this.result.apartment_number,
      date: this.result.date,
      photo: this.result.photo,
      proof: this.result.proof,
      project_id: this.result.project_id,
      comment: this.result.comment,
    };
    return output;
  }
}

export class FaultsResponse extends Response<Fault[]> {
  get_result(): Fault[] {
    let output: Fault[] = [];
    Object.entries(this.result).forEach(([_key, value]) => {
      output.push({
        id: value.id,
        name: value.name,
        status: value.status,
        urgency: value.urgency,
        floor_number: value.floor_number,
        apartment_number: value.apartment_number,
        date: value.date,
        photo: value.photo,
        proof: value.proof,
        project_id: value.project_id,
        comment: value.comment,
      });
    });
    return output;
  }
}

export class UserResponse extends Response<User> {
  get_result(): User {
    return { id: this.result.username, name: this.result.name };
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

export class RoleResponse extends Response<roles> {
  get_result(): roles {
    return roles_mapping[(this.result as number) - 1];
  }
}

export class VoidResponse extends Response<void> {
  get_result(): void {
    return;
  }
}

export class StringResponse extends Response<string> {
  get_result(): string {
    return this.result;
  }
}
