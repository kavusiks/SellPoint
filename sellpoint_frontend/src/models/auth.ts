export interface AuthAccessToken {
    access: string;
}

export interface AuthAccessRefreshToken extends AuthAccessToken {
    refresh: string;
}
