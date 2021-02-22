import React from "react";
import { FunctionComponent } from "react";
import { Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Button } from "react-bootstrap";
import "./index.css";
import { useSessionContext } from "../../context/Session";

const Navigationbar: FunctionComponent = () => {
  const session = useSessionContext();

  const makeButtons = () => {
    if (!session.isAuthenticated) {
      return (
        <>
          <Button className="button" href="/register" variant="outline-secondary">
            Opprett bruker
          </Button>
          <Button className="button" href="/login" variant="outline-success">
            Logg Inn
          </Button>
        </>
      );
    }

    return (
      <>
        <Button className="button" href="/profile" variant="outline-secondary">
          Din Profil
        </Button>
        <Button className="button" variant="outline-primary">
          Logg Ut
        </Button>
      </>
    );
  };

  return (
    <Navbar className="navbar" bg="light" variant="light">
      <Navbar.Brand href="/" className="logo">
        Sell<strong>Point</strong>
      </Navbar.Brand>

      <Nav className="mr-auto">
        <Nav.Link href="/ad/create">Ny annonse</Nav.Link>
      </Nav>

      {makeButtons()}
    </Navbar>
  );
};

export default Navigationbar;
