/**
 * Access token container
 */
export interface AuthAccessToken {
  /**
   * An access `Bearer` token
   */
  access: string;
}

/**
 * Access and refresh token container
 */
export interface AuthAccessRefreshToken extends AuthAccessToken {
  /**
   * A token that can be used to refresh the access token
   */
  refresh: string;
}
