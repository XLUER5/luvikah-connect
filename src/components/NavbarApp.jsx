import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/img/imagen2.png";
import "../assets/css/Navbar.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export const NavbarApp = () => {
  const Logout = () => {
    localStorage.removeItem("user");
    location.reload(true);
  };

  const [user, setUser] = useState({});

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("user"));
    setUser(savedData)
  }, []);

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
              <NavLink className={"nav-link"} to={"/posts"}>
                Inicio
              </NavLink>
              <NavLink className={"nav-link"} to={`/profile/${user.username}`}>
                Perfil
              </NavLink>
              <Nav.Link onClick={() => Logout()}>Cerrar Sesion</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
