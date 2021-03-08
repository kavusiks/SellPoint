import React, { FunctionComponent, useEffect, useState } from "react";
import { Alert, Container, Row, Spinner } from "react-bootstrap";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useSessionContext } from "../context/Session";

/**
 * Simple spinner for when something is loading
 *
 * @param props - The props
 */
export const DefaultSpinner: FunctionComponent = (props) => {
  return (
    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true">
      <span className="sr-only">{props.children}</span>
    </Spinner>
  );
};

/**
 * Formats a date to a human readable string
 *
 * @param date - The date to format
 */
export const formatDate = (date: Date | undefined): string => {
  if (!date) {
    return "-";
  }

  const dateRewrap = new Date(date.toLocaleString());
  return `${dateRewrap.toLocaleDateString()} ${dateRewrap.toLocaleTimeString()}`;
};

/**
 * Creates a styled component with a box shadow
 *
 * @param comp - The component
 */
export const addShadow = (comp: React.ComponentType<any>): any => {
  return styled(comp)`
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  `;
};

/**
 * A {@link Container} with a box-shadow
 */
export const ShadowedContainer = addShadow(Container);

/**
 * An {@link Alert} with a box-shadow
 */
export const ShadowedAlert = addShadow(Alert);

/**
 * A {@link ShadowedContainer} with max-width 500px, padding 10px and
 * margin 10px. Intended for use as a container for a form.
 */
export const FormContainer = addShadow(styled(ShadowedContainer)`
  max-width: 500px;
  padding: 10px;
  margin: 10px;
`);

/**
 * A {@link Row} (CSS Flexbox) with all components both vertically
 * and horizontally centered.
 */
export const CenteredRow = styled(Row)`
  justify-content: center;
  align-items: center;
`;

/**
 * A {@link Row} (CSS Flexbox) with all components vertically centered
 * and horizontally left-aligned.
 */
export const LeftCenterRow = styled(Row)`
  justify-content: flex-start;
  align-items: center;
`;

/**
 * A {@link Row} (CSS Flexbox) with all components vertically centered
 * and horizontally right-aligned.
 */
export const RightCenterRow = styled(Row)`
  justify-content: flex-end;
  align-items: center;
`;

/**
 * A {@link Row} (CSS Flexbox) with all components vertically top-aligned
 * and horizontally left-aligned.
 */
export const LeftTopRow = styled(Row)`
  justify-content: flex-start;
  align-items: flex-start;
`;

/**
 * A {@link Row} (CSS Flexbox) with all components vertically centered
 * and horizontally spaced out.
 */
export const SpaceBetweenCenterRow = styled(Row)`
  justify-content: space-between;
  align-items: center;
`;

/**
 * A state of a component where errors may occur
 */
export interface ErrorState {
  /**
   * The current error as a {@link React.ReactNode}, or `null` if no
   * error has occurred.
   */
  error: React.ReactNode | null;
  /**
   * Sets the error message
   *
   * @param error - The error message, or undefined
   */
  setError: (error: string | React.ReactNode | undefined) => void;
}

/**
 * A state for making simple error handling components. Will support
 * simple error messages, and wrap them as an {@link Alert} of variant
 * `warning`.
 *
 * @returns a newly created {@link ErrorState}
 */
export const useErrorState = (): ErrorState => {
  const [error, setError] = useState<string | React.ReactNode | undefined>(undefined);

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

/**
 * Utility function for authentication pages. Automatically redirects
 * a user to `/` if they are already authenticated, and attempt
 * to load this user, or the user is loaded while they are on this page.
 */
export const useAuthenticationPage = (): void => {
  const session = useSessionContext();
  const history = useHistory();

  useEffect(() => {
    if (session.user) {
      history.push("/");
    }
  }, [history, session.user]);
};
