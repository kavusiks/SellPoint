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

  /**
   * Edits the currenly logged in user.
   *
   * @param user the user object with edited fields
   * @param password the users password
   * @returns the edited user
   */
  async editUser(user: User, password: string): Promise<User> {
    console.log("edituser " + user.email);
    console.log(user.first_name);
    console.log(user.last_name);
    console.log(user.phone_number);

    const response = await client.put("auth/self/", {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      password: password,
    });
    console.log(response.data);
    return response.data;
  }
}

export default new UserAPI();
