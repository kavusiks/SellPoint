import User from "../../models/user";
import client from "../client";

class UserAPI {
  async getSelfUser(): Promise<User> {
    const response = await client.get("auth/self/");
    return response.data;
  }
}

export default new UserAPI();