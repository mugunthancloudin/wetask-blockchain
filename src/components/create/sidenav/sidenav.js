import React from "react";
import { NavLink } from "react-router-dom";
import navItems from "./navConfig";
import './sidenav.css';

const SideNav = () => {
     if (!navItems) return null;

  return (
    <nav>
      {navItems.map(({ path, label, Icon }) => (
        <button key={path} className="sidenav-button mt-4">
          <NavLink to={path} activeClassName="active">
            <span className="icon-only-md">
              {Icon && <Icon className="icon" />}
            </span>                                                             
            <span className="label">{label}</span>
          </NavLink>
        </button>                    
      ))}
    </nav>
  );
};
       
export default SideNav;
