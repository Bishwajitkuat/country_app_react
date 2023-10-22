import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

const Layout = () => {
  const dispatch = useDispatch();
  const { user, isLoadingUser, errorUser } = useSelector(
    (state) => state.users
  );
  useEffect(() => {
    if (errorUser) {
      alert(errorUser);
      return;
    }
  }, [errorUser]);
  if (isLoadingUser) return <Loader />;
  return (
    <Container>
      <Row>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Container className="justify-content-bwtween">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/countries">
                  <Nav.Link>Countries</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/favourites">
                  <Nav.Link>Favourites</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
            {user && (
              <button
                className="btn btn-outline-primary"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            )}
            {!user && (
              <LinkContainer to="/login">
                <Nav.Link>
                  <button className="btn btn-outline-primary">Login</button>
                </Nav.Link>
              </LinkContainer>
            )}
          </Container>
        </Navbar>
      </Row>
      <Row>
        <Outlet />
      </Row>
    </Container>
  );
};

export default Layout;
