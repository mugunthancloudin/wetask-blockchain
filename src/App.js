import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/create/layouts/layout";
import CampDashboard from "./components/create/campaign/campDashboard/campDashboard";
import "./App.css";
import Eligiblity from "./components/create/campaign/campModule/eligiblity";
import Rewards from "./components/create/campaign/campModule/rewards";
import Task from "./components/create/campaign/campModule/task";
// import Basicinfo from "./components/create/campaign/campModule/basicinfo";
import PageRoute from "./routes/pageRoute";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <>
      <PageRoute/>
    </>
  );
}

export default App;
