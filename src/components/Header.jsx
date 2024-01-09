import React from "react";
import { Navbar, NavbarBrand } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../images/web-logo.png";

const NavContent = styled.div`
  li {
    list-style-type: none;
  }
`;

const Wrapper = styled.div`
  background-color: transparent;
  padding-top: 10px;
  padding-bottom: 10px;
  min-height: 80px;
  color: #fff;
  font-weight: 500;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = () => {
  return (
    <Wrapper className="row gx-0">
      <nav className="navbar navbar-expand-lg px-5">
        <a style={{color: 'var(--blue-color)'}} className="navbar-brand" href="#">
          BoreStook
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <NavContent
          className="collapse navbar-collapse "
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav ms-auto fs-5">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Storage
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/order">
                OrderHistory
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customer">
                Customer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/statistic">
                Statistic
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/master">
                Master
              </NavLink>
            </li>
          </ul>
        </NavContent>
      </nav>
    </Wrapper>
  );
};

export default Header;
