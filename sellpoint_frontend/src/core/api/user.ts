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
   * @param address -  the users address with may edited fields
   * @returns the edited user
   */
  /*
  async editUser(user: User, password: string, address: Address): Promise<User> {
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
      return userResponse.data;
    } else {
      return addressResponse.data;
    }
  }
  */

  async editUser(user: User, password: string, address: Address): Promise<User> {
    const userResponse = await client.put("auth/self/", {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      password: password,
    });

    if (userResponse.statusText === "OK") {
      const addressResponse = await client.put("auth/edit/address/", {
        line1: address.line1,
        line2: address.line2,
        postalcode: address.postalcode,
        city: address.city,
        country: address.country,
      });
      return addressResponse.data;
    } else {
      return userResponse.data;
    }
  }

  async editPassword(oldPassword: string, newPassword: string): Promise<any> {
    const passwordResponse = await client.put("auth/change/password/", {
      old_password: oldPassword,
      new_password: newPassword,
    });
    return passwordResponse.data;
  }
}

export default new UserAPI();
