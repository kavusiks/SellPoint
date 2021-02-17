import React, { useState } from "react";
import { Alert, Container, Row } from "react-bootstrap";
import styled from "styled-components";

export const addShadow = (comp: React.ComponentType<any>): any => {
  return styled(comp)`
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  `;
};

export const ShadowedContainer = addShadow(Container);
export const ShadowedAlert = addShadow(Alert);
export const FormContainer = addShadow(styled(ShadowedContainer)`
  max-width: 500px;
  padding: 10px;
  margin: 10px;
`);

export const CenteredRow = styled(Row)`
  justify-content: center;
  align-items: center;
`;

export const LeftCenterRow = styled(Row)`
  justify-content: flex-start;
  align-items: center;
`;

export interface ErrorState {
  error: React.ReactNode | null;
  setError: (error: string | undefined) => void;
}

export const useErrorState = (): ErrorState => {
  const [error, setError] = useState<string | undefined>(undefined);

  const makeErrorComponent = () => {
    if (!error) {
      return null;
    }

    return (
      <CenteredRow>
        <ShadowedAlert variant="warning">{error}</ShadowedAlert>
      </CenteredRow>
    );
  };

  return { error: makeErrorComponent(), setError };
};
