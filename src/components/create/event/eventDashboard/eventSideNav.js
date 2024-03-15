import React from "react";
import { NavLink } from "react-router-dom";
import eventNavItems from "./eventConfi";
import "../../campaign/campDashboard/campign.css";


export default function EventSideNav() {
  console.log(eventNavItems);
  return (
    <>
      <div className="campignNav ">
        {eventNavItems.map(({ link, label, Icon }) => (
          <button key={label} className="SidenavButton mt-md-5 mt-4">
            <NavLink to={link} activeClassName="active ">
              <span className="iconDiv  justify-content-center ps-2 ">
                <Icon className="icon " size="75%"/>
              </span>
              <span className="labelmodule ms-5 ">{label}</span>
            </NavLink>
          </button>
        ))}
      </div>
    </>
  );
}
