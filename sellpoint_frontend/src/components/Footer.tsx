import React, { FunctionComponent } from "react";
import { Nav, Navbar } from "react-bootstrap";

export const Footer: FunctionComponent = () => {
  return (
    <Navbar bg="light" variant="light" fixed="bottom" className="page">
      <Navbar.Brand className="sellpointFont">Sellpoint </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Sett link 1</Nav.Link>
        <Nav.Link href="#features">Sett link 2</Nav.Link>
        <Nav.Link href="#pricing">Sett link 3</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Footer;
