export interface AuthRefreshTokens {
    access: string
}

export interface AuthLoginTokens extends AuthRefreshTokens {
    refresh: string;
}
