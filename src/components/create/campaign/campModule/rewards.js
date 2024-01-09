import React, { useState } from "react";
import "./campaignModule.css";
import { PiWarningCircleBold } from "react-icons/pi";

export default function Rewards() {
  const [rewardVisibility, setRewardVisibility] = useState("Token");
  const [network, setNetwork] = useState("Ethereum");
  const [token, setToken] = useState("Eth");
  const [isOpen, setIsOpen] = useState(false);
  const [winnerSelectionisOpen, setwinnerSelectionisOpen] = useState(false);
  const [rewardDistributionOpen, setRewardDistributionOpen] = useState(false);
  const [distributedByisOpen, setDistributedByisOpen] = useState(false);

  const [selection, setSelection] = useState("Automatically");
  const [winnerSelection, setwinnerSelection] = useState(
    "Select the first N users as winners"
  );
  const [distributionType, setDistributionType] = useState("Equally");
  const [distributedBy, setDistributionBy] = useState("Taskon");

  const toggleVisibility = (choice) => {
    setRewardVisibility(choice);
  };

  const toggleOpen = () => setIsOpen(!isOpen);
  const makeSelection = (choice) => {
    setSelection(choice);
    setIsOpen(false);
  };

  const toggleWinnerOpen = () =>
    setwinnerSelectionisOpen(!winnerSelectionisOpen);
  const winnerSelect = (choice) => {
    setwinnerSelection(choice);
    setwinnerSelectionisOpen(false);
  };

  const rewardDistribution = () =>
    setRewardDistributionOpen(!rewardDistributionOpen);
  const makeDistributionType = (choice) => {
    setDistributionType(choice);
    setRewardDistributionOpen(false);
  };

  const toogleDistributedBy = () =>
    setDistributedByisOpen(!distributedByisOpen);
  const distributionByChoise = (choice) => {
    setDistributionBy(choice);
    setDistributedByisOpen(false);
  };

  return (
    <>
      {/* <div className="container-fluid"> */}
      <div className="row">
        <div className="col-lg-8">
          <h5>
            Reward Type <PiWarningCircleBold />
          </h5>
          <div className="toggle-switches justify-content-start my-4">
            {["Token", "Points"].map((choice) => (
              <div
                key={choice}
                className={`text-center ms-3 toggle-option ${
                  rewardVisibility === choice ? "active" : ""
                }`}
                onClick={() => toggleVisibility(choice)}
              >
                <label>{choice}</label>
              </div>
            ))}
          </div>

          <div id="campaign-description" className="">
            {rewardVisibility === "Token" ? (
              <div>
                <div>
                  <h6>Network</h6>
                  <div className="custom-select-wrapper">
                    <select
                      name="network"
                      id="network"
                      className="custom-select"
                      value={token}
                      onChange={(e) => setNetwork(e.target.value)}
                    >
                      <option value="mugunthan" className="rewardNetwork">
                        Mugunthan
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <h6 className="mt-3">Token Type</h6>
                  <div className="custom-select-wrapper">
                    <select
                      name="tokenType"
                      id="tokenType"
                      className="custom-select"
                      value={network}
                      onChange={(e) => setToken(e.target.value)}
                    >
                      <option value="Eth" className="rewardNetwork">
                        Eth
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <h6 className="mt-3">
                    Total Reward Amount <PiWarningCircleBold />
                  </h6>
                  <p>
                    *More rewards deposited, more credits you will get and
                    higher ranking the campaign will get
                  </p>
                  <div className="position-relative">
                    <input
                      type="number"
                      name="totalReward"
                      id="total-reward"
                      className="form-control"
                    />
                    <span className="token-type-badge">{token}</span>``
                  </div>
                </div>

                <div>
                  <h6 className="mt-3">Number of Winners</h6>

                  <div className="">
                    <input
                      type="number"
                      name="totalReward"
                      id="total-reward"
                      className="form-control"
                    />
                  </div>
                </div>

                <div>
                  <div className="dropdown-container mt-3">
                    <h6>
                      How to Draw Winners <PiWarningCircleBold />
                    </h6>
                    <div
                      className={`dropdown mt-3 ${isOpen ? "open" : ""}`}
                      tabIndex="0"
                      onBlur={() => setIsOpen(false)}
                    >
                      <div className="dropdown-header" onClick={toggleOpen}>
                        {selection}
                        <span
                          className={`arrow mt-2 ${isOpen ? "up" : "down"}`}
                        ></span>
                      </div>
                      {isOpen && (
                        <div className="dropdown-list ">
                          <div
                            className="dropdown-item"
                            onClick={() => makeSelection("Automatically")}
                          >
                            Automatically
                          </div>
                          <div
                            className="dropdown-item"
                            onClick={() => makeSelection("Manually")}
                          >
                            Manually
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="dropdown-container mt-3">
                    <h6>
                      Automatic Winner Selection <PiWarningCircleBold />
                    </h6>
                    <div
                      className={`dropdown mt-3 ${
                        winnerSelectionisOpen ? "open" : ""
                      }`}
                      tabIndex="0"
                      onBlur={() => setwinnerSelectionisOpen(false)}
                    >
                      <div
                        className="dropdown-header"
                        onClick={toggleWinnerOpen}
                      >
                        {winnerSelection}
                        <span
                          className={`arrow mt-2 ${
                            winnerSelectionisOpen ? "up" : "down"
                          }`}
                        ></span>
                      </div>

                      {winnerSelectionisOpen && (
                        <div className="dropdown-list ">
                          <div
                            className="dropdown-item"
                            onClick={() =>
                              winnerSelect(
                                "Select the first N users as winners"
                              )
                            }
                          >
                            Select the first N users as winners
                          </div>

                          <div
                            className="dropdown-item"
                            onClick={() =>
                              winnerSelect("Select N users randomly as winners")
                            }
                          >
                            Select N users randomly as winners
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="dropdown-container mt-3">
                    <h6>
                      How to Draw Winners <PiWarningCircleBold />
                    </h6>
                    <div
                      className={`dropdown mt-3 ${
                        rewardDistributionOpen ? "open" : ""
                      }`}
                      tabIndex="0"
                      onBlur={() => setRewardDistributionOpen(false)}
                    >
                      <div
                        className="dropdown-header"
                        onClick={rewardDistribution}
                      >
                        {distributionType}
                        <span
                          className={`arrow mt-2 ${
                            rewardDistributionOpen ? "up" : "down"
                          }`}
                        ></span>
                      </div>
                      {rewardDistributionOpen && (
                        <div className="dropdown-list ">
                          <div
                            className="dropdown-item"
                            onClick={() => makeDistributionType("Equally")}
                          >
                            Equally
                          </div>

                          <div
                            className="dropdown-item"
                            onClick={() => makeDistributionType("Randomly")}
                          >
                            Randomly
                          </div>

                          <div
                            className="dropdown-item"
                            onClick={() => makeDistributionType("Customised")}
                          >
                            Customised
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="dropdown-container mt-3">
                    <h6>
                      Reward Distributed by <PiWarningCircleBold />
                    </h6>
                    <div
                      className={`dropdown mt-3 ${isOpen ? "open" : ""}`}
                      tabIndex="0"
                      onBlur={() => distributedByisOpen(false)}
                    >
                      <div
                        className="dropdown-header"
                        onClick={toogleDistributedBy}
                      >
                        {distributedBy}
                        <span
                          className={`arrow mt-2 ${
                            distributedByisOpen ? "up" : "down"
                          }`}
                        ></span>
                      </div>
                      {distributedByisOpen && (
                        <div className="dropdown-list ">
                          <div
                            className="dropdown-item"
                            onClick={() => distributionByChoise("Taskon")}
                          >
                            Taskon
                          </div>
                          <div
                            className="dropdown-item"
                            onClick={() => distributionByChoise("Yourself")}
                          >
                            Yourself
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="buttons my-4 ">
                    <button className="save-draft text-nowrap">
                      Save as Draft
                    </button>
                    <button className="save-draft ms-3">Previous</button>
                    <button className="next">Next</button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <h6 className="mt-3">
                    Reward Amount <PiWarningCircleBold />
                  </h6>

                  <div className="position-relative">
                    <input
                      type="number"
                      name="RewardPoint"
                      id="RewardPoint"
                      className="form-control"
                    />
                    <span className="token-type-badge">Points/Winner</span>
                  </div>

                  <h6 className="mt-3">Number of Winners</h6>

                  <div className="">
                    <input
                      type="number"
                      name="totalReward"
                      id="total-reward"
                      className="form-control"
                    />
                  </div>

                  <h6 className="mt-3">
                    How to Draw Winners <PiWarningCircleBold />
                  </h6>
                  <div
                    className={`dropdown mt-3 ${isOpen ? "open" : ""}`}
                    tabIndex="0"
                    onBlur={() => setIsOpen(false)}
                  >
                    <div className="dropdown-header" onClick={toggleOpen}>
                      {selection}
                      <span
                        className={`arrow mt-2 ${isOpen ? "up" : "down"}`}
                      ></span>
                    </div>
                    {isOpen && (
                      <div className="dropdown-list ">
                        <div
                          className="dropdown-item"
                          onClick={() => makeSelection("Automatically")}
                        >
                          Automatically
                        </div>
                        <div
                          className="dropdown-item"
                          onClick={() => makeSelection("Manually")}
                        >
                          Manually
                        </div>
                      </div>
                    )}
                  </div>

                  <h6 className="mt-3">
                    Automatic Winner Selection <PiWarningCircleBold />
                  </h6>
                  <div
                    className={`dropdown mt-3 ${
                      winnerSelectionisOpen ? "open" : ""
                    }`}
                    tabIndex="0"
                    onBlur={() => setwinnerSelectionisOpen(false)}
                  >
                    <div className="dropdown-header" onClick={toggleWinnerOpen}>
                      {winnerSelection}
                      <span
                        className={`arrow mt-2 ${
                          winnerSelectionisOpen ? "up" : "down"
                        }`}
                      ></span>
                    </div>

                    {winnerSelectionisOpen && (
                      <div className="dropdown-list ">
                        <div
                          className="dropdown-item"
                          onClick={() =>
                            winnerSelect("Select the first N users as winners")
                          }
                        >
                          Select the first N users as winners
                        </div>

                        <div
                          className="dropdown-item"
                          onClick={() =>
                            winnerSelect("Select N users randomly as winners")
                          }
                        >
                          Select N users randomly as winners
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="buttons my-4 ">
                    <button className="save-draft text-nowrap">
                      Save as Draft
                    </button>
                    <button className="save-draft ms-3">Previous</button>
                    <button className="next">Next</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-4">&nbsp;</div>
      </div>
      {/* <div> */}
    </>
  );
}
