import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from 'react-bootstrap/Nav';
import logo from "../assets/img/imagen2.png";
import "../assets/css/Navbar.css";

export const NavbarApp = () => {
  return (
    <>
      <Navbar bg="primary">
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} className="img-navbar" alt="" />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Inicio</Nav.Link>
            <Nav.Link href="#features">Perfil</Nav.Link>
            <Nav.Link href="#pricing">Cerrar Sesion</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
