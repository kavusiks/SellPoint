import client from "./client";
import {AuthLoginTokens} from "../models/auth";
import User from "../models/user";
import axios from "axios";


class AuthenticationService {
  constructor() {
    client.interceptors.request.use((config) => {
      // TODO: Implement auth header
      return config;
    });
  }

  async signUp(user: User, password: string) {
      // TODO: Sign up
  } 

  async login(email: string, password: string, remember: boolean): Promise<AuthLoginTokens> {
    const tokens = await axios.post("auth/token/", { email: email, password: password });
    if (tokens.data.access) {
        // TODO: Store refresh token in cookie
    }

    return tokens.data;
  }

  async refreshToken() {
    // TODO: Refresh token using stored refresh token and /auth/refresh
  }

  logOut() {
    console.log("Logging out!");
    // TODO: Remove cookie if exists and update session
  }
}

export default new AuthenticationService();