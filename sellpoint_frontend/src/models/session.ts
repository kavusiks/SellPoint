import User from "./user";

export default interface Session {
    isAuthenticated: boolean;
    user?: User;
    updateSelfUser: () => void;
    redirectPath?: string;
    setRedirectPath?: (path: string | undefined) => void;
}