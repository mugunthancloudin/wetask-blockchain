import React, { useState } from "react";
import "./campaignModule.css";
import balance from "../../../assets/campaign/balance.svg";
import level from "../../../assets/campaign/level.svg";

export default function Eligiblity() {
  const [formDetails, setFormDetails] = useState({
    network: "",
    tokenList: "",
    minBalance: "",
  });
  const [showBalanceCard, setShowBalanceCard] = useState(false);
  const [showLevelCard, setShowLevelCard] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handlers for showing cards
  const handleBalanceClick = () => {
    setShowBalanceCard(true);
  };

  const handleLevelClick = () => {
    setShowLevelCard(true);
  };

  // Handlers for closing cards
  const closeBalanceCard = () => {
    setShowBalanceCard(false);
  };

  const closeLevelCard = () => {
    setShowLevelCard(false);
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-8">
          <h6>Who are eligible for this Campaign?</h6>
          <div className="row mt-4">
            <div className="col-lg-6">
              <button
                className="eligiblityBtn text-nowrap w-100"
                onClick={handleBalanceClick}
              >
                <img src={balance} className="me-2" alt="balance" />
                Minimum Token Balance
              </button>
            </div>
            <div className="col-lg-6 ps-lg-5">
              <button
                className="eligiblityBtn w-100 text-nowrap"
                onClick={handleLevelClick}
              >
                <img src={level} alt="level" /> TaskOn Level
              </button>
            </div>
          </div>
          <hr />

          {showLevelCard && (
            <div className="card eligiblityLevelCard">
              <div className="card-body">
                <div className="row">
                  <div className="d-flex">
                    <img src={level} alt="level" className="titleImg" />{" "}
                    <h5 className="mt-2 ms-2">Taskon Level</h5>
                    <h3
                      className="eligiblityLevelClose"
                      onClick={closeLevelCard}
                    >
                      x
                    </h3>
                  </div>

                  <div className="baseCardContent">
                    <div className="lableWarp p-4">
                      <div className="row d-flex lableField">
                        <div className=" col-lg-4 lableFieldLable ">
                          Task On Level
                        </div>
                        <div className="col-lg-8 lableFieldInput">
                          <input type="number" className="form-control ms-3" />
                        </div>
                      </div>
                    </div>  
                  </div>
                </div>
              </div>
            </div>
          )}

          {showBalanceCard && (
            <div className="card mt-3 eligiblityLevelCard">
              <div className="card-body">
                <div className="row">
                  <div className="d-flex">
                    <img src={balance} alt="balance" className="titleImg" />{" "}
                    <h5 className="mt-2 ms-2">Minimum Token Balance</h5>
                    <h3 className="eligiblityClose" onClick={closeBalanceCard}>
                      x
                    </h3>
                  </div>

                  <div className="baseCardContent">
                    <div className="lableWarp p-4">
                      {/* Network Field */}
                      <div className="row d-lg-flex lableField">
                        <div className="col-lg-4 lableFieldLable ">Network</div>
                        <div className="col-lg-8 lableFieldInput">
                          <select
                            name="network"
                            className="form-control ms-3"
                            value={formDetails.network}
                            onChange={handleInputChange}
                          >
                            <option value="Ethereum">Ethereum</option>
                            <option value="Binance Smart Chain">
                              Binance Smart Chain
                            </option>
                          </select>
                        </div>
                      </div>

                      {/* Token List Field */}
                      <div className="row d-flex lableField mt-3">
                        <div className="col-lg-4 lableFieldLable ">
                          Pick From List
                        </div>
                        <div className="col-lg-8 lableFieldInput">
                          <select
                            name="tokenList"
                            className="form-control ms-3"
                            value={formDetails.tokenList}
                            onChange={handleInputChange}
                          >
                            <option className="" value="Eth">
                              Eth
                            </option>
                          </select>
                        </div>
                      </div>

                      {/* Minimum Balance Field */}
                      <div className="row d-flex lableField mt-3">
                        <div className="col-lg-4 lableFieldLable ">
                          Min.Balance
                        </div>
                        <div className="col-lg-8 lableFieldInput">
                          <input
                            type="number"
                            name="minBalance"
                            className="form-control ms-3"
                            value={formDetails.minBalance}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="buttons my-4 ">
            <button className="save-draft text-nowrap">Save as Draft</button>
            <button className="save-draft ms-3">Previous</button>
            <button className="next">Next</button>
            </div>
        </div>
        <div className="col-lg-4">&nbsp;</div>
      </div>
    </>
  );
}
