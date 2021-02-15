import User from "../../models/user";
import client from "../client";

const DUMMY_USER: User = {
  email: "test@test.org",
  first_name: "Ola",
  last_name: "Nordmann",
  last_login: new Date(),
  phone_number: "12345678",
};

class UserAPI {
  async getSelfUser(): Promise<User> {
      // TODO: Implement endpoint for getting this data
      return DUMMY_USER;
  }
}

export default new UserAPI();