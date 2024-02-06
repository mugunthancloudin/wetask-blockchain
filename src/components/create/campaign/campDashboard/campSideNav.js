import React from "react";
import { NavLink } from "react-router-dom";
import navItems from "./campConfi";
import "./campign.css";


export default function CampSideNav() {
  console.log(navItems);
  return (
    <>
      <div className="campignNav ">
        {navItems.map(({ link, label, Icon }) => (
          <button key={label} className="SidenavButton mt-4">
            <NavLink to={link} activeClassName="active">
              <span className="iconDiv">
                <Icon className="icon ms-2" size={75} />
              </span>
              <span className="labelmodule ms-5 ">{label}</span>{" "}
            </NavLink>
          </button>
        ))}
      </div>
    </>
  );
}
