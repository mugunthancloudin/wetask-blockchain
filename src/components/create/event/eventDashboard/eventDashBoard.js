import React from "react";
import EventDocument from "./eventDocument";
import EventSideNav from "./eventSideNav";
import MyNavbar from "../../../navbar & footer/navbar/navbar";
import Event from "../event";

export default function EventDashboard() {
  return (
    <div className="container-fluid campDash">
      <MyNavbar />
      <div className="row d-flex">
        <div className="col-lg-3 col-md-2  ">
          {/* fixed-column */}
          <EventSideNav/>
        </div>
        <div className="col-lg-9 col-md-10 w-75 ">
          {/* scrollable-column */}
          <EventDocument />
          <Event/>
        </div>
      </div>
    </div>
  );
}