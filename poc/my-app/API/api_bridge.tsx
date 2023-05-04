import api_interface from "./api_interface";
import MockAPI from "./api_mock";

class API {
  static instance: api_interface = new MockAPI();

  private constructor() {}

  static get_instance(): api_interface {
    return API.instance;
  }
}

export default API;
