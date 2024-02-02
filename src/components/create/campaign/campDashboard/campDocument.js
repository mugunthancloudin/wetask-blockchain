import React,{useState} from "react";
import axios from 'axios';
import Basicinfo from "../campModule/basicinfo";
import Eligiblity from "../campModule/eligiblity";
import Rewards from "../campModule/rewards";
import Task from "../campModule/task";
import { Routes, Route } from "react-router-dom";
// import Basicinfo from "../campModule/basicInfo";
  
export default function CampDocument() {
    
  return (
    <>
      <Routes>
        <Route index element={<Basicinfo/>} />
        <Route path="/basicinfo" element={<Basicinfo/>} />
        <Route path="/campaigneligibility" element={<Eligiblity />} />
        <Route path="/campaignrewards" element={<Rewards/>} />
        <Route path="/campaigntasks" element={<Task />} />
      </Routes>    
    </>
  );
}
 