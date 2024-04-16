import React from "react";
import eventImg from "../assets/event/eventbg.webp";
import "./event.css";

export default function Eventhome() {
  return (
    <>
      <div className="container-fluid eventMainBg">
        <div className="row">
          <img src={eventImg} alt="eventHome" width={100} />
        </div>

        <div className="row d-flex mt-3">
          <div className="col-lg-12">
            <button className="eventButton">Ongiong</button>
            <button className="eventButton">Upcoming</button>
            <button className="eventButton">Expired</button>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-lg-3">
          <div className="card eventCardBg">
            <img src={eventImg} alt="cardImg" />
            <h6 className="mt-3">Goblin Saga</h6>
            <h5>Goblin Saga - Festival</h5>
            <button className="eventBtn">WL</button>
          </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
