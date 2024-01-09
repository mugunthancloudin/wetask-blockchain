import React from "react";
import Sidenav from "../sidenav/sidenav";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Event from "../event/event";
import Space from "../space/space";


export default function Layout() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <Sidenav />
          </div>
          <div className="col-lg-8">
            <main style={{ flexGrow: 1, padding: "20px" }}>
              <Routes>

                <Route path="/events" element={<Event />} />
                <Route path="/space" element={<Space />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
