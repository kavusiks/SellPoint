import React, { FunctionComponent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import { CenteredRow } from "../styled";
import { FormProps } from "./FormParts";
import { readDjangoError } from "../../core/client";
import styled from "styled-components";
import UserAPI from "../../core/api/user";

const StyledButton = styled(Button)`
  margin: 10px;
`;

/**
 * A form for registering a new user
 *
 * @param props - The props
 */
export const EditPasswordForm: FunctionComponent<FormProps> = ({ setError }: FormProps) => {
  const history = useHistory();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // We use a state for this so that validation doesn't display
    // until after the first submission attempt
    setValidated(true);

    e.preventDefault();

    const form = e.target as HTMLFormElement;

    if (!form.checkValidity() || newPassword !== confirmNewPassword) {
      e.stopPropagation();
      if (newPassword !== confirmNewPassword)
        setError("Det nye passordet er ikke lik bekreftelsen av passordet.");
      return;
    }

    UserAPI.editPassword(oldPassword, newPassword)
      .then(() => history.push("/login"))
      .catch((error) => {
        setOldPassword("");
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
          onChange={(e) => {
            setOldPassword(e.target.value);
            setError("");
          }}
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
          onChange={(e) => {
            setNewPassword(e.target.value);
            setError("");
          }}
          isInvalid={validated && newPassword !== confirmNewPassword}
          required
        />
      </Form.Group>
      <Form.Group controlId="form-edit-confirm-password">
        <Form.Label>Bekreft nytt passord</Form.Label>
        <Form.Control
          type="password"
          minLength={8}
          value={confirmNewPassword}
          onChange={(e) => {
            setConfirmNewPassword(e.target.value);
            setError("");
          }}
          isInvalid={validated && newPassword !== confirmNewPassword}
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
