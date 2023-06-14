import axios, { AxiosRequestConfig } from "axios";
import { Project, Stage, Mission, Plan, Fault, User, UserRecord, Apartment } from "../../types";
import {
  Response,
  ProjectResponse,
  ProjectsResponse,
  StageResponse,
  StagesResponse,
  MissionResponse,
  MissionsResponse,
  PlanResponse,
  PlansResponse,
  FaultResponse,
  FaultsResponse,
  UserResponse,
  UserRecordsResponse,
  RoleResponse,
  VoidResponse,
  StringResponse,
} from "./Responses";
import { roles } from "../../utils/Permissions";
import { UserContextWrapper } from "../../utils/UserContext";
import API from "../api_bridge";
// import RNRestart from "react-native-restart";

const refresh_token_error_code = 401;
//This class wraps post requests to the server, needs to be implemented for each type on Response<T> Object.
//data should have same parameters as API
export abstract class PostWrapper<T> {
  constructor() {}

  public send_request(
    path: string,
    data: any,
    config?: AxiosRequestConfig<any> | undefined
  ): Promise<T> {
    const { getUser, getLatestPassword } = UserContextWrapper();
    return new Promise((resolve, reject) => {
      axios
        .post(path, data, config)
        .then((response) => {
          console.log("response data:", response.data);
          const responseData = this.get_response_class(response.data);
          if (responseData.result) resolve(responseData.get_result());
          else {
            console.error("error in send_request: ", responseData.error);
            reject(responseData.error);
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === refresh_token_error_code) {
              console.log("refreshing token");
              API.get_instance()
                .login(getUser().id, getLatestPassword())
                .then((user: User) => {
                  this.send_request(path, data, config).then((result: T) => {
                    resolve(result);
                  });
                })
                .catch((_) => {
                  // RNRestart.restart();
                  reject("Login credentials changed, please login again");
                });
            } else {
              reject("server is down");
            }
          }
        });
    });
  }

  abstract get_response_class(data: any): Response<T>;
}

// the following classes are duct-tape solutions to the problem of type script not being able to intantiate a class by it's type.
export class PostWrapperProject extends PostWrapper<Project> {
  get_response_class(data: any): Response<Project> {
    return new ProjectResponse(data);
  }
}

export class PostWRapperProjects extends PostWrapper<Project[]> {
  get_response_class(data: any): Response<Project[]> {
    console.log("data in PostWrapperProjects: ", data);
    return new ProjectsResponse(data);
  }
}

export class PostWrapperStage extends PostWrapper<Stage> {
  get_response_class(data: any): Response<Stage> {
    return new StageResponse(data);
  }
}

export class PostWrapperStages extends PostWrapper<Stage[]> {
  get_response_class(data: any): Response<Stage[]> {
    return new StagesResponse(data);
  }
}

export class PostWrapperMission extends PostWrapper<Mission> {
  get_response_class(data: any): Response<Mission> {
    return new MissionResponse(data);
  }
}

export class PostWrapperMissions extends PostWrapper<Mission[]> {
  get_response_class(data: any): Response<Mission[]> {
    return new MissionsResponse(data);
  }
}

export class PostWrapperPlan extends PostWrapper<Plan> {
  get_response_class(data: any): Response<Plan> {
    return new PlanResponse(data);
  }
}

export class PostWrapperPlans extends PostWrapper<Plan[]> {
  get_response_class(data: any): Response<Plan[]> {
    return new PlansResponse(data);
  }
}

export class PostWrapperFault extends PostWrapper<Fault> {
  get_response_class(data: any): Response<Fault> {
    return new FaultResponse(data);
  }
}

export class PostWrapperFaults extends PostWrapper<Fault[]> {
  get_response_class(data: any): Response<Fault[]> {
    return new FaultsResponse(data);
  }
}

export class PostWrapperApartment extends PostWrapper<Apartment> {
  get_response_class(data: any): Response<Apartment> {
    return new FaultResponse(data);
  }
}

export class PostWrapperApartments extends PostWrapper<Apartment[]> {
  get_response_class(data: any): Response<Apartment[]> {
    return new FaultsResponse(data);
  }
}

export class PostWrapperUser extends PostWrapper<User> {
  get_response_class(data: any): Response<User> {
    return new UserResponse(data);
  }
}

export class PostWrapperUserRecords extends PostWrapper<UserRecord[]> {
  get_response_class(data: any): Response<UserRecord[]> {
    return new UserRecordsResponse(data);
  }
}

export class PostWrapperRole extends PostWrapper<roles> {
  get_response_class(data: any): Response<roles> {
    return new RoleResponse(data);
  }
}

export class PostWrapperVoid extends PostWrapper<void> {
  get_response_class(data: any): Response<void> {
    return new VoidResponse(data);
  }
}

export class PostWrapperString extends PostWrapper<string> {
  get_response_class(data: any): Response<string> {
    return new StringResponse(data);
  }
}
