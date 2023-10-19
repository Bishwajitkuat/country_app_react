import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { auth, logout } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Layout2 = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="container">
      <nav class="navbar navbar-expand-lg">
        <div class="container-xxl p-4">
          <NavLink to="/" class="navbar-brand">
            <p class="display-2 fw-bold">Brand</p>
          </NavLink>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarTogglerDemo01"
          >
            <ul class="navbar-nav">
              <li class="navbar-item">
                <NavLink to="/countries" class="nav-link">
                  Countries
                </NavLink>
              </li>
              <li class="navbar-item">
                <NavLink to="/favourites" class="nav-link">
                  Favourites
                </NavLink>
              </li>
              <li class="navbar-item">
                <NavLink to="/login" class="nav-link">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Row>
        <Outlet />
      </Row>
    </div>
  );
};

export default Layout2;
