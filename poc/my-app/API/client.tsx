import { Lambda } from "aws-sdk";
import client_config from "../.env/constants";

class LambdaClient {
  private static instance: LambdaClient;
  private client: Lambda;

  private constructor() {
    this.client = new Lambda(client_config);
  }

  public static getInstance(): LambdaClient {
    if (!LambdaClient.instance) {
      LambdaClient.instance = new LambdaClient();
    }

    return LambdaClient.instance;
  }

  public getClient(): Lambda {
    return this.client;
  }
}

export default LambdaClient.getInstance().getClient();
