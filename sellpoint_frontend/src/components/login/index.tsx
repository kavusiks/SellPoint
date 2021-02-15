import React, { FunctionComponent } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import styled from "styled-components";
import { Link } from 'react-router-dom';

const CenteredRow = styled(Row)`
align-items: center;
justify-content:
`

export const LoginForm: FunctionComponent = () => {
  return (
    <Container>
      <Form>
        <Row>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
        </Row>
        <Row>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Row>
        <Row>
        <Link to ={'/createUser'}>
          <Button variant="primary" type="submit">
          Create User
          </Button>
          </Link>
        </Row>
      </Form>
    </Container>
  );
};


export default LoginForm;
