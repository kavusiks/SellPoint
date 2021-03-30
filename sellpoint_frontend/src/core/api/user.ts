import User from "../../models/user";
import client from "../client";

/**
 * API abstraction of endpoints that interact with user objects.
 */
class UserAPI {
  /**
   * @returns The user that is currently logged in
   */
  async getSelfUser(): Promise<User> {
    const response = await client.get("auth/self/");
    return response.data;
  }
  async getUserToVisit(email: string): Promise<User> {
    const response = await client.get(`auth/user/${email}/`);
    return response.data;
  }
}

export default new UserAPI();
