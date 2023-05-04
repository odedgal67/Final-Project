import { AWSError, Lambda } from "aws-sdk";
import lambdaClient from "./client";

function send_cmd(FunctionName: string, params: object) {
  let client_params = {
    FunctionName: FunctionName,
    Payload: JSON.stringify(params),
  };
  return lambdaClient.invoke(client_params).promise();
}

export async function log_in(username: string, password: string) {
  let cmd_promise = send_cmd("login", {
    username: username,
    password: password,
  });
  return await cmd_promise;
}
