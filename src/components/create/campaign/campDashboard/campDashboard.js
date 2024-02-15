import React from "react";
import CampSideNav from "./campSideNav";
import CampDocument from "./campDocument";
import MyNavbar from "../../../navbar & footer/navbar/navbar";

export default function CampDashboard() {
  return (
    <div className="container-fluid campDash">
      <MyNavbar />
      <div className="row d-flex">
        <div className="col-lg-3 col-md-2  ">
          {/* fixed-column */}
          <CampSideNav />
        </div>
        <div className="col-lg-9 col-md-10 w-75 ">
          {/* scrollable-column */}
          <CampDocument />
        </div>
      </div>
    </div>
  );
}