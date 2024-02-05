import React from "react";
// import Basicinfo from "../campModule/basicinfo";
import Eligiblity from "../campModule/eligiblity";
import Rewards from "../campModule/rewards";
import Task from "../campModule/task";
import { Route, Routes } from "react-router-dom";
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