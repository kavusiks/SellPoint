import Session from "../models/session";
import User from "../models/user";
import React, { FunctionComponent, createContext, useContext, useState, useEffect } from "react";
import AuthenticationService from "../core/auth";

export const useProviderValue = (): Session => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [redirectPath, setRedirectPath] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!AuthenticationService.isLoggedIn()) {
      return;
    }

    // TODO: Pull own user from API and update user state
  })

  const isAuthenticated = !!user;
  return { isAuthenticated, user, redirectPath, setUser, setRedirectPath };
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
