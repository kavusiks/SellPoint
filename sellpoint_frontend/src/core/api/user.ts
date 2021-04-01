import User, { Address } from "../../models/user";
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
   * @param user-the user object with may edited fields
   * @param password -the users password
   * @param address -  the users address with may edited fields
   * @returns the edited user
   */
  async editUser(user: User, password: string, address: Address): Promise<User> {
    console.log("edituser " + user.email);
    console.log(user.first_name);
    console.log(user.last_name);
    console.log(user.phone_number);

    const addressResponse = await client.put("auth/edit/address/", {
      line1: address.line1,
      line2: address.line2,
      postalcode: address.postalcode,
      city: address.city,
      country: address.country,
    });

    if (addressResponse.statusText === "OK") {
      const userResponse = await client.put("auth/self/", {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        password: password,
      });
      console.log("i put request", userResponse.data);
      return userResponse.data;
    } else {
      return addressResponse.data;
    }
  }
}

export default new UserAPI();
