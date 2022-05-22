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
      <div id="humburger">
        <nav className="navBar">
          <button onClick={handleToggle}>
            {navbarOpen ? (
              <MdClose
                style={{ color: "#fff", width: "40px", height: "40px" }}
              />
            ) : (
              <FiMenu
                style={{ color: "#7b7b7b", width: "40px", height: "40px" }}
              />
            )}
          </button>
          {props.user && props.user.isAdmin ? (
            <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
              <li>
                <NavLink id="logo" to="/" onClick={() => closeMenu()}>
                  <img src={LogoDesktop} alt="bee" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/spellingbee" onClick={() => closeMenu()}>
                  Spelling Bee Mode
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/study" onClick={() => closeMenu()}>
                  Study Words
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" onClick={() => closeMenu()}>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin" onClick={() => closeMenu()}>
                  Admin Panel
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  onClick={() => {
                    props.handleLogout();
                    closeMenu();
                  }}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          ) : props.user ? (
            <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
              <li>
                <NavLink id="logo" to="/" onClick={() => closeMenu()}>
                  <img src={LogoDesktop} alt="bee" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/spellingbee" onClick={() => closeMenu()}>
                  Spelling Bee Mode
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/study" onClick={() => closeMenu()}>
                  Study Words
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" onClick={() => closeMenu()}>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  onClick={() => {
                    props.handleLogout();
                    closeMenu();
                  }}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          ) : (
            <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
              <li>
                <div className="logoHolder">
                  <img src={LogoDesktop} alt="bee" />
                </div>
              </li>
              <li>
                {" "}
                <NavLink
                  to="/signup"
                  onClick={() => {
                    props.handleLogout();
                    closeMenu();
                  }}
                >
                  Sign Up
                </NavLink>{" "}
              </li>
              <li>
                {" "}
                <NavLink
                  to="/signin"
                  onClick={() => {
                    props.handleLogout();
                    closeMenu();
                  }}
                >
                  Sign In
                </NavLink>{" "}
              </li>
            </ul>
          )}
        </nav>
      </div>
      <div id="nav-bar">
        <nav className="nav-bar">
          <NavLink id="logo" to="/" onClick={() => closeMenu()}>
            <img src={LogoDesktop} alt="bee" />
          </NavLink>
          {props.user && props.user.isAdmin ? (
            <>
              <NavLink to="/spellingbee" onClick={() => closeMenu()}>
                Spelling Bee Mode
              </NavLink>
              <NavLink to="/study" onClick={() => closeMenu()}>
                Study Words
              </NavLink>
              <NavLink to="/profile" onClick={() => closeMenu()}>
                Profile
              </NavLink>
              <NavLink to="/admin" onClick={() => closeMenu()}>
                Admin Panel
              </NavLink>
              <NavLink
                to="/"
                onClick={() => {
                  props.handleLogout();
                  closeMenu();
                }}
              >
                {" "}
                Logout
              </NavLink>
            </>
          ) : props.user ? (
            <>
              {" "}
              <NavLink to="/spellingbee" onClick={() => closeMenu()} exact>
                Spelling Bee Mode
              </NavLink>
              <NavLink to="/study" onClick={() => closeMenu()}>
                Study Words
              </NavLink>
              <NavLink to="/profile" onClick={() => closeMenu()}>
                Profile
              </NavLink>
              <NavLink
                to="/"
                onClick={() => {
                  props.handleLogout();
                  closeMenu();
                }}
              >
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/signup"
                onClick={() => {
                  props.handleLogout();
                  closeMenu();
                }}
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/signin"
                onClick={() => {
                  props.handleLogout();
                  closeMenu();
                }}
              >
                Sign In
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default Nav;
