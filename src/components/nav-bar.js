import React, { useContext } from "react";
import { UserContext } from "../context/user-context";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import AuthNav from "../Auth/AuthNav";
import { BsFillPersonFill } from "react-icons/bs";

const MainNav = (props) => (
  <Nav className="mr-auto">
    <Nav.Link
      as={RouterNavLink}
      to="/"
      exact
      activeClassName="router-link-exact-active"
    >
      Home
    </Nav.Link>
    {props.user ? (
      <>
        <Nav.Link
          as={RouterNavLink}
          to="/profile"
          exact
          activeClassName="router-link-exact-active"
        >
          Perfil
        </Nav.Link>
        <Nav.Link
          as={RouterNavLink}
          to="/load-data"
          exact
          activeClassName="router-link-exact-active"
        >
          Cargar Indicadores
        </Nav.Link>
        <Nav.Link
          as={RouterNavLink}
          to="/show-data"
          exact
          activeClassName="router-link-exact-active"
        >
          Mostrar Indicadores
        </Nav.Link>
        <Nav.Link
          as={RouterNavLink}
          to="/show-historical"
          exact
          activeClassName="router-link-exact-active"
        >
          Mostrar Historico
        </Nav.Link>
        {props.user.usRole === "admin" ? (
          <>
            <Nav.Link
              as={RouterNavLink}
              to="/AddUser"
              exact
              activeClassName="router-link-exact-active"
            >
              Agregar Usuarios
            </Nav.Link>
          </>
        ) : (
          ""
        )}
      </>
    ) : (
      ""
    )}
  </Nav>
);

const NavBar = () => {
  const { user } = useContext(UserContext);
  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Brand as={RouterNavLink} className="logo" to="/" />
          <MainNav user={user} />
          <AuthNav />
          {user && (
            <>
              <div>
                <BsFillPersonFill />
                <span>
                  {user.usName} {user.usLastName}
                </span>
              </div>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
