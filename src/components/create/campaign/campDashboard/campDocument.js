import React, { useState } from "react";
import { FormProvider } from "../campModule/formprovider";
import Basicinfo from "../campModule/basicinfo";
import Eligiblity from "../campModule/eligiblity";
import Rewards from "../campModule/rewards";
import Task from "../campModule/task";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";

export default function CampDocument() {
  return (
    <>
      <FormProvider>
        <Routes>
          <Route path="/basicinfo" element={<Basicinfo />} />
          <Route path="/campaigneligibility" element={<Eligiblity />} />
          <Route path="/campaignrewards" element={<Rewards />} />
          <Route path="/campaigntasks" element={<Task />} />
          <Route path="/" element={<Navigate to="/basicinfo" replace />} />
        </Routes>
      </FormProvider>
    </>
  );
}

{
  /* <Route index element={<Basicinfo/>} />
        <Route path="/basicinfo" element={<Basicinfo/>} />
        <Route path="/campaigneligibility" element={<Eligiblity />} />
        <Route path="/campaignrewards" element={<Rewards/>} />
        <Route path="/campaigntasks" element={<Task />} />
        <Route path="/" exact>
        <Navigate to="/basicinfo" />
        </Route> */
}
