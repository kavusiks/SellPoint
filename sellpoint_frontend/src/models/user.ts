/**
 * The physical address of a {@link User}
 */
export interface Address {
  /**
   * First address line
   */
  line1: string;
  /**
   * Second address line
   */
  line2?: string;
  /**
   * Zip code
   */
  postalcode: string;
  /**
   * City name
   */
  city: string;
  /**
   * Country name
   */
  country: string;
}

/**
 * A SellPoint user
 */
export default interface User {
  /**
   * The user's email address
   */
  email: string;
  /**
   * The user's first name
   */
  first_name: string;
  /**
   * The user's last name
   */
  last_name: string;
  /**
   * The user's phone number
   */
  phone_number?: string;
  /**
   * When the user last logged in
   */
  last_login?: Date;
  /**
   * The user's {@link Address}
   */
  address: Address;
}
