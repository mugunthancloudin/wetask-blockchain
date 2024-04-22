import React, { useState, useEffect } from "react";
import eventImg from "../assets/event/eventbg.webp";
import { Link } from "react-router-dom";
import { useReadEvent } from "../../services/blockchain.js";
import "./event.css";

export default function Eventhome() {
  const [eventId, setEventId] = useState("1");
  const [accumulatedData, setAccumulatedData] = useState([]);
  const { data, isSuccess } = useReadEvent(eventId);
  // Log accumulatedData for debugging
  console.log("EventData:", accumulatedData);

  useEffect(() => {
    if (isSuccess) {
      setAccumulatedData((currentData) => [...currentData, data[0]]);
      setEventId((currentId) => String(Number(currentId) + 1));
    }
  }, [data, isSuccess, eventId, accumulatedData]);

  return (
    <>
      <div className="container-fluid eventMainBg">
        <div className="row">
          <img src={eventImg} alt="eventHome" width={100} />
        </div>

        <div className="row d-flex mt-3">
          <div className="col-lg-12">
            <button className="eventButton">All</button>
            <button className="eventButton">Ongiong</button>
            <button className="eventButton">Upcoming</button>
            <button className="eventButton">Expired</button>
          </div>
        </div>

        {/* <div className="row mt-3">
          <div className="col-lg-3">
            <div className="card eventCardBg">
              <img src={eventImg} alt="cardImg" />
              <h6 className="mt-3">Goblin Saga</h6>
              <h5>Goblin Saga - Festival</h5>
              <button className="eventBtn">WL</button>
            </div>
           </div>
          <div className="col-lg-3">
            <div className="card eventCardBg">
              <img src={eventImg} alt="cardImg" />
              <h6 className="mt-3">Goblin Saga</h6>
              <h5>Goblin Saga - Festival</h5>
              <button className="eventBtn">WL</button>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card eventCardBg">
              <img src={eventImg} alt="cardImg" />
              <h6 className="mt-3">Goblin Saga</h6>
              <h5>Goblin Saga - Festival</h5>
              <button className="eventBtn">WL</button>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card eventCardBg">
               <img src={eventImg} alt="cardImg" />
              <h6 className="mt-3">Goblin Saga</h6>
              <h5>Goblin Saga - Festival</h5>
              <button className="eventBtn">WL</button>
            </div>
          </div>
        </div> */}

        <div className="row mt-3">
          {accumulatedData.map((item) => (
            <div key={item.id} className="col-lg-3 mb-4">
              <Link
                to={`/event/${item.id}`}
                state={{ accumulatedData }}
                style={{ textDecoration: "none" }}
              >
                <div className="card eventCardBg d-flex flex-column">
                  <div className="card-body text-white">
                    <img
                      src={`https://ipfs.moralis.io:2053/ipfs/${item.image}`}
                      alt="productImage"
                      className="w-100 h-50"
                      style={{ objectFit: "cover" }}
                    />
                    <p className="card-title mt-3">{item.name}</p>
                    <p className="card-text">{item.description}</p>
                    <button className="eventBtn">WL</button>
                  </div>

                  <div></div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
   
    </>
  );
}