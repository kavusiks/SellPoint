import client from "./client";
import { AuthAccessRefreshToken, AuthAccessToken } from "../models/auth";
import User from "../models/user";
import Cookies, { CookieSetOptions } from "universal-cookie";

const COOKIE_ACCESS_TOKEN = "sp_auth_access";
const COOKIE_REFRESH_TOKEN = "sp_auth_refresh";
const COOKIE_REFRESH_MAX_AGE = 7689600; // Refresh token is valid for 90 days

const cookies = new Cookies();

/**
 * Abstraction of authentication endpoints. Handles storing authentication
 * token cookies and such. Automatically adds Authorization headers, and
 * updates access token.
 */
class AuthenticationService {
  constructor() {
    // Add interceptor that automatically adds authorization header to requests
    client.interceptors.request.use((config) => {
      if (this.isLoggedIn()) {
        config.headers.Authorization = "Bearer " + this.getAccessToken();
      }

      return config;
    });

    // Add interceptor that will automatically refresh token when it expires
    client.interceptors.response.use(
      (response) => {
        // If no errors occur, everything is fine and this interceptor does nothing
        return response;
      },
      async (error) => {
        if (!this.isLoggedIn() || error.response.status !== 401) {
          return new Promise((resolve, reject) => reject(error));
        }

        // Log out the user if we are forbidden from refreshing or logging in
        if (error.config.url === "auth/token/" || error.config.url === "auth/refresh/") {
          this.logOut();

          return new Promise((resolve, reject) => reject(error));
        }

        try {
          const token = await this.refreshAccessToken();
          // Re-do the request with the new token
          const config = error.config;
          config.headers.Authorization = "Bearer " + token.access;

          return await new Promise((resolve, reject) => {
            client
              .request(config)
              .then((response) => {
                resolve(response);
              })
              .catch((error_1) => {
                reject(error_1);
              });
          });
        } catch (error) {
          return await Promise.reject(error);
        }
      },
    );
  }

  /**
   * Create a new user
   *
   * @param user - The user to create
   * @param password - The password for the user
   * @param logIn - If login should happen automatically if creating the
   * user is sucessful
   * @param remember - If logIn is set to true, and we successfully log in,
   * should the user stay logged in across sessions
   */
  async signUp(user: User, password: string, logIn = false, remember = false): Promise<void> {
    await client.post("auth/register/", {
      ...user,
      password: password,
    });

    if (!logIn) {
      return;
    }

    await this.login(user.email, password, remember);
  }

  /**
   * Authenticate using the given email and password
   *
   * @param email - The email of the user
   * @param password - The password of the user
   * @param remember - If we should store the refresh token across sessions
   */
  async login(email: string, password: string, remember: boolean): Promise<AuthAccessRefreshToken> {
    const response = await client.post("auth/token/", { email: email, password: password });

    // Ensure we actually received the tokens. This is not the case if for example the log in is invalid
    if (response.data.refresh && response.data.access) {
      let opts: CookieSetOptions = { path: "/", sameSite: "lax" };

      // We do not set a max age on this token, since it will expire server side
      cookies.set(COOKIE_ACCESS_TOKEN, response.data.access, opts);

      if (remember) {
        // If we wish to remember log in we have to set the expiry of the cookie. When no
        // expiry is set, a cookie is session only and disappears when the tab is closed.
        opts = {
          ...opts,
          maxAge: COOKIE_REFRESH_MAX_AGE,
        };
      }

      cookies.set(COOKIE_REFRESH_TOKEN, response.data.refresh, opts);
    }

    return response.data;
  }

  /**
   * @returns If there is a user currently logged in, determined by
   * whether the {@link COOKIE_REFRESH_TOKEN} cookie exists
   */
  isLoggedIn(): boolean {
    return !!cookies.get(COOKIE_REFRESH_TOKEN);
  }

  /**
   * @returns The current access token. Makes no guarantees that this
   * token is not expired.
   */
  getAccessToken(): string {
    const cookie = cookies.get(COOKIE_ACCESS_TOKEN);
    if (!cookie) {
      throw new Error("Not logged in!");
    }

    return cookie;
  }

  /**
   * @returns The current refresh token. Makes no guarantees that this
   * token is not expired.
   */
  getRefreshToken(): string {
    const cookie = cookies.get(COOKIE_REFRESH_TOKEN);
    if (!cookie) {
      throw new Error("Not logged in!");
    }

    return cookie;
  }

  /**
   * Removes the access and refresh token cookies
   */
  logOut() {
    cookies.remove(COOKIE_REFRESH_TOKEN);
    cookies.remove(COOKIE_ACCESS_TOKEN);
  }

  private async refreshAccessToken(): Promise<AuthAccessToken> {
    const refreshToken = this.getRefreshToken(); // Will verify that we are in fact logged in aswell
    const response = await client.post("auth/refresh/", { refresh: refreshToken });
    if (response.data.access) {
      cookies.set(COOKIE_ACCESS_TOKEN, response.data.access, { path: "/", sameSite: "lax" });
    }

    return response.data;
  }
}

export default new AuthenticationService();
