import Session from "../models/session";
import User from "../models/user";
import React, { FunctionComponent, createContext, useContext, useState, useEffect } from "react";
import AuthenticationService from "../core/auth";
import UserAPI from "../core/api/user";

export const useProviderValue = (): Session => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [redirectPath, setRedirectPath] = useState<string | undefined>(undefined);

  const updateSelfUser = () => {
    if (!AuthenticationService.isLoggedIn()) {
      setUser(undefined);
      return;
    }

    UserAPI.getSelfUser().then(user => setUser(user)).catch(error => setUser(undefined));
  }

  useEffect(() => {
    if (!AuthenticationService.isLoggedIn()) {
      return;
    }

    // TODO: Pull own user from API and update user state
  });

  const isAuthenticated = !!user;
  return { isAuthenticated, user, redirectPath, updateSelfUser, setRedirectPath };
};

const SessionContext = createContext<Session | undefined>(undefined);
SessionContext.displayName = "SessionContext";

export const SessionContextProvider: FunctionComponent = (props: any) => {
  const value = useProviderValue();
  return <SessionContext.Provider value={value} {...props} />;
};

export const useSessionContext = (): Session => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSessionContext must be called within a provider!");
  }

  return context;
};
