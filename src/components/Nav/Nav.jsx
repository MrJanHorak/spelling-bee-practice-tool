import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Nav.css";

import LogoDesktop from "../../assets/logo/logo-desktop.png";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

const Nav = (props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setNavbarOpen(false);
  };

  return (
    <>
    <div id="humburger-menu">
      <nav className="navBar">
        <button onClick={handleToggle}>
          {navbarOpen ? (
            <MdClose style={{ color: "#fff", width: "40px", height: "40px" }} />
          ) : (
            <FiMenu
              style={{ color: "#7b7b7b", width: "40px", height: "40px" }}
            />
          )}
        </button>
        <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
          <li>
            <NavLink
              to="/spellingbee"
              activeClassName="active-link"
              onClick={() => closeMenu()}
              exact
            >
              Spelling Bee Mode
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink
              to="/study"
              activeClassName="active-link"
              onClick={() => closeMenu()}
              exact
            >
              Study Words
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              activeClassName="active-link"
              onClick={() => closeMenu()}
              exact
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin"
              activeClassName="active-link"
              onClick={() => closeMenu()}
              exact
            >
              Admin Panel
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              activeClassName="active-link"
              onClick={() => closeMenu() && props.handleLogout}
              exact
            >
              {" "}
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
      </div>
      <div id="nav-bar">
      <nav className="nav-bar">
      <NavLink id="logo" to="/">
        <img src={LogoDesktop} alt="bee" />
      </NavLink>
      {props.user && props.user.isAdmin ? (
        <>
          <NavLink
            to="/spellingbee"
            activeClassName="active-link"
            onClick={() => closeMenu()}
            exact
          >
            Spelling Bee Mode
          </NavLink>
          <NavLink
            to="/study"
            activeClassName="active-link"
            onClick={() => closeMenu()}
            exact
          >
            Study Words
          </NavLink>
          <NavLink
            to="/profile"
            activeClassName="active-link"
            onClick={() => closeMenu()}
            exact
          >
            Profile
          </NavLink>
          <NavLink
            to="/admin"
            activeClassName="active-link"
            onClick={() => closeMenu()}
            exact
          >
            Admin Panel
          </NavLink>
          <NavLink
            to="/"
            activeClassName="active-link"
            onClick={() => closeMenu() && props.handleLogout}
            exact
          >
            {" "}
            Logout
          </NavLink>
        </>
      ) : props.user ? (
        <>
          {" "}
          <NavLink to="/spellingbee">Spelling Bee Mode</NavLink>
          <NavLink to="/study">Study Words</NavLink>
          <NavLink to="/" onClick={props.handleLogout}>
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/signin">Sign In</NavLink>
        </>
      )}
    </nav>
    </div>
    </>
  );
};

export default Nav;
