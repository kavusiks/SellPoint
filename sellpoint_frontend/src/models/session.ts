import User from "./user";

export default interface Session {
    isAuthenticated: boolean;
    user?: User;
    setUser: (user: User | undefined) => void;
    redirectPath?: string;
    setRedirectPath?: (path: string | undefined) => void;
}