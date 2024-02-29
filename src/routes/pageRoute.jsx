import React from "react";
import { Route, Routes } from "react-router-dom";
import CampDocument from "../components/create/campaign/campDashboard/campDocument";
import LandingPage from "../pages/landingPage";
import CampDashboard from "../components/create/campaign/campDashboard/campDashboard";
import Campaign from "../pages/campaign";
import Space from "../pages/space";
import Event from "../pages/event";
import Basicinfo from "../components/create/campaign/campModule/basicinfo";
import Eligiblity from "../components/create/campaign/campModule/eligiblity";
import Rewards from "../components/create/campaign/campModule/rewards";
import Task from "../components/create/campaign/campModule/task";
import CampaignDetails from "../components/campaign/campaigndetails";

export default function PageRoute() {
  return (
    <>
      <Routes>
        <Route path="/camp/*" element={<CampDashboard />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/campaign" element={<Campaign />} />
        {/* <Route path="/campaign/:id" render={(props) => <CampaignDetails {...props} accumulatedData={accumulatedData} />} /> */}
        {/* <Route path="/campaign" element={<Campaign />} /> */}
        <Route path="/campaign/:id" element={<CampaignDetails/>} />
        <Route path="/space" element={<Space />} />
        <Route path="/event" element={<Event />} />

        <Route path="/basicinfo" element={<Basicinfo />} />
        <Route path="/campaigneligibility" element={<Eligiblity />} />
        <Route path="/campaignrewards" element={<Rewards />} />
        <Route path="/campaigntasks" element={<Task />} />
      </Routes>
    </>
  );
}