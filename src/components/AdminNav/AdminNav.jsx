import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Nav.css";

const AdminNav = (props) => {
  return (
    <nav className="nav-bar">
          <NavLink to="/addwords">Add Words</NavLink>
          <NavLink to="/seeAllWords">See All Words</NavLink>
          <NavLink to="/admin">All Users</NavLink>
    </nav>
  );
};

export default AdminNav;
