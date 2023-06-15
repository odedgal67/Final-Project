import { Project, Stage, Mission, Plan, Fault, User, Status, UserRecord, Apartment } from "../../types";
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
      let stageResponse = new StageResponse({ result: value });
      output.push(stageResponse.get_result());
      console.log("stage: ");
      console.log(stageResponse.get_result());
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

export class PlanResponse extends Response<Plan> {
  get_result(): Plan {
    let output: Plan = {
      name: this.result.name,
      id: this.result.id,
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
        id: value.id,
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
      completion_date: this.result.completion_date,
      proof: this.result.proof,
      proof_fix: this.result.proof_fix,
      project_id: this.result.project_id,
      comment: this.result.comment,
      green_building: this.result.green_building,
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
        completion_date: value.completion_date,
        proof: value.proof,
        proof_fix: value.proof_fix,
        project_id: value.project_id,
        comment: value.comment,
        green_building: value.green_building,
      });
    });
    return output;
  }
}

export class ApartmentResponse extends Response<Apartment> {
  get_result(): Apartment {
    let output: Apartment = {
      apartment_number: this.result.apartment_number,
    };
    return output;
  }
}

export class ApartmentsResponse extends Response<Apartment[]> {
  get_result(): Apartment[] {
    let output: Apartment[] = [];
    Object.entries(this.result).forEach(([_key, value]) => {
      output.push({
        apartment_number: value.apartment_number,
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
