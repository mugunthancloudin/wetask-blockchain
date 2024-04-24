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
import UserDetails from "../components/campaign/UserDetails";
import EventBasicInfo from "../components/create/event/eventModule/eventBasicInfo";
import EventCampaign from "../components/create/event/eventModule/eventCampaign";
import EventRewards from "../components/create/event/eventModule/eventRewards";
import EventDashboard from "../components/create/event/eventDashboard/eventDashBoard";
import EventDetails from "../components/event/eventDetails";
import SpaceCreate from "../components/create/space/space";

export default function PageRoute() {
  return (
    <>
      <Routes>
        <Route path="/camp/*" element={<CampDashboard />} />
        <Route path="/event/*" element={<EventDashboard/>} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/campaign" element={<SpaceCreate />} />
        {/* <Route path="/campaign/:id" render={(props) => <CampaignDetails {...props} accumulatedData={accumulatedData} />} /> */}
        {/* <Route path="/campaign" element={<Campaign />} /> */}
        <Route path="/campaign/:id" element={<CampaignDetails />} />
        <Route path="/space" element={<Space />} />
        <Route path="/event" element={<Event />} />
        <Route path="/event/:id" element={<EventDetails/>}/>
  
        {/* create campaign routes */}
        <Route path="/basicinfo" element={<Basicinfo />} />
        <Route path="/campaigneligibility" element={<Eligiblity />} />
        <Route path="/campaignrewards" element={<Rewards />} />
        <Route path="/campaigntasks" element={<Task />} />

        {/* create event routes */}
        <Route path="/eventbasicInfo" element={<EventBasicInfo />} />
        <Route path="/eventcampaign" element={<EventCampaign />} />
        <Route path="/eventrewards" element={<EventRewards />} />

    
      </Routes>
    </>
  );
}
 