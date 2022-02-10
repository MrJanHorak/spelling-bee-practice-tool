import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => {
  return (
    <nav className="nav-bar">
      <NavLink id="logo" to="/index" <img src={LogoDesktop} alt="bee" />
      {props.user
      ?
    <>
      <NavLink to="/practice">Spelling Bee Mode</NavLink>
      <NavLink to="/study">Study Words</NavLink>
      <NavLink to="/" onClick={props.handleLogout}>Logout</NavLink>
    </>
    : <>
      <NavLink to="/signup">Sign Up</NavLink>
      <NavLink to="/signin">Sign In</NavLink>
    </>
    }
    </nav>
  )
}

export default Nav