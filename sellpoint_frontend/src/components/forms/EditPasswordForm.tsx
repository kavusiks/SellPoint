import React, { FunctionComponent, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router";
import { useSessionContext } from "../../context/Session";
import AuthenticationService from "../../core/auth";
import User, { Address } from "../../models/user";
import { CenteredRow } from "../styled";
import { FormProps } from "./FormParts";
import { readDjangoError } from "../../core/client";
import styled from "styled-components";
import UserAPI from "../../core/api/user";

const StyledButton = styled(Button)`
  margin: 10px;
`;

/**
 * The props for the {@link EditPasswordForm}
 */
export interface EditPasswordProps extends FormProps {
  /**
   * If the user should be logged in automatically after registering,
   * if registration is successful.
   */
  logIn?: boolean;
  /**
   * If the user should stay logged in. This option will not do anything
   * unless `logIn` is set to `true`.
   */
  rememberLogIn?: boolean;
}

/**
 * A form for registering a new user
 *
 * @param props - The props
 */
export const EditPasswordForm: FunctionComponent<EditPasswordProps> = ({
  setError,
  logIn,
  rememberLogIn,
}: EditPasswordProps) => {
  const session = useSessionContext();
  const history = useHistory();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // We use a state for this so that validation doesn't display
    // until after the first submission attempt
    setValidated(true);

    e.preventDefault();

    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      e.stopPropagation();
      return;
    }

    UserAPI.editPassword(oldPassword, newPassword)
      .then(() => history.push("/profile"))
      .catch((error) => {
        setOldPassword("");
        setNewPassword("");
        setError(error.response ? readDjangoError(error.response) : "En uforventet error oppstod!");
      });
  };

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit}>
      <Form.Group controlId="form-edit-password">
        <Form.Label>Gammelt passord</Form.Label>
        <Form.Control
          type="password"
          minLength={8}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          isInvalid={validated}
          required
        />
      </Form.Group>
      <Form.Group controlId="form-edit-confirm-password">
        <Form.Label>Nytt passord</Form.Label>
        <Form.Control
          type="password"
          minLength={8}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          isInvalid={validated}
          required
        />
      </Form.Group>

      <CenteredRow noGutters>
        <StyledButton variant="primary" type="submit">
          Endre passord
        </StyledButton>
      </CenteredRow>
    </Form>
  );
};
