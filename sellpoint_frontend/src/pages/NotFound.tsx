import React, { FunctionComponent } from "react";
import { CenteredRow } from "../components/styled";

export const NotFoundPage: FunctionComponent = () => {
  return (
    <>
      <CenteredRow>
        <h1>404</h1>
      </CenteredRow>
      <CenteredRow>
        <h3>Side ikke funnet</h3>
      </CenteredRow>
    </>
  );
};
