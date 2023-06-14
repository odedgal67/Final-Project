import api_interface from "./api_interface";
import MockAPI from "./api_mock";
import { RealAPI } from "./api_real";

class API {
  // static instance: api_interface = new RealAPI("http://192.168.1.225:80");
  static instance: api_interface = new RealAPI("http://16.170.170.180:80");
  // static instance: api_interface = new MockAPI();
  private constructor() {}

  static get_instance(): api_interface {
    return API.instance;
  }
}

export default API;
