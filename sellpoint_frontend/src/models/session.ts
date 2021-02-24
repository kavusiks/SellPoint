import User from "./user";

/**
 * Current session data
 */
export default interface Session {
  /**
   * If there is a currently authenticated user
   */
  isAuthenticated: boolean;
  /**
   * The currently authenticated user. May be undefined if
   * still loading.
   */
  user?: User;
  /**
   * Refreshes the current user, or sets it to undefined
   * if there is no currentl authenticated user.
   */
  updateSelfUser: () => Promise<void>;
  /**
   * The path to redirect to after authenticating
   */
  redirectPath?: string;
  /**
   * Updates the current redirectPath
   */
  setRedirectPath: (path: string | undefined) => void;
}
