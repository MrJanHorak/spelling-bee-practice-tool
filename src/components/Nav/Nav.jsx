import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Nav.css";

import LogoDesktop from "../../assets/logo/logo-desktop.png";

const Nav = (props) => {
  return (
    <nav className="nav-bar">
      <NavLink id="logo" to="/">
        <img src={LogoDesktop} alt="bee" />
      </NavLink>
      {props.user && props.user.isAdmin ? (
        <>
          <NavLink to="/spellingbee">Spelling Bee Mode</NavLink>
          <NavLink to="/study">Study Words</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/admin">Admin Panel</NavLink>
          <NavLink to="/" onClick={props.handleLogout}>
            Logout
          </NavLink>
        </>
      ) : props.user ?
      (
        <> <NavLink to="/spellingbee">Spelling Bee Mode</NavLink>
        <NavLink to="/study">Study Words</NavLink>
        <NavLink to="/" onClick={props.handleLogout}>
          Logout
        </NavLink>
        </>
      ) :
      <>
      <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/signin">Sign In</NavLink>
      </>
}
    </nav>
  );
};

export default Nav;
