// SideNav.js
import React from "react";
import { NavLink } from "react-router-dom";
import navItems from "./navConfig";
import './sidenav.css';

const SideNav = () => {
  console.log(navItems);

  return (
    <nav>
      {navItems.map(({ path, label, Icon }) => (
        <button key={path} className="SidenavButton mt-4">
          <NavLink to={path} activeClassName="active">
            
              <Icon className="icon" />
              <span className="label">{label}</span>{" "}
            
          </NavLink>
        </button>
      ))}
    </nav>
  );
};

export default SideNav;
