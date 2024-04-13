import React, { useState } from "react";
import "../../campaign/campModule/campaignModule.css"
import { useFormContext } from "./formprovider";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PiWarningCircleBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { UserView} from "../../../../services/blockchain";


const TokenSchema = yup.object().shape({
  networkType: yup.string().required("Please select the Network type"),
  tokenType: yup.string().required("Please select the Token type"),
  rewardToken: yup
    .number()
    .typeError("Reward Amount must be a number")
    .required("Reward Amount is required")
    .positive("Reward Amount must be a positive number"),
  totalReward: yup
    .number()
    .typeError("Number of Winners must be a number")
    .required("Number of Winners is required")
    .integer("Number of Winners must be an integer")
    .min(1, "Number of Winners must be at least 1"),
  drawnMethod: yup.string().required("Please select a drawing method"),
  winnerSelection: yup
    .string()
    .required("Please select a winner selection method"),
  distributionType: yup
    .string()
    .required("Please select a Distribution method"),
  distributedBy: yup.string().required("Please select a Distribution method"),
});

const PointSchema = yup.object().shape({
  totalReward: yup
    .number()
    .typeError("Number of Winners must be a number")
    .required("Number of Winners is required")
    .integer("Number of Winners must be an integer")
    .min(1, "Number of Winners must be at least 1"),

  rewardPoint: yup
    .number()
    .typeError("Reward Amount must be a number")
    .required("Reward Amount is required")
    .positive("Reward Amount must be a positive number"),

  drawnMethod: yup.string().required("Please select a drawing method"),

  winnerSelection: yup
    .string()
    .required("Please select a winner selection method"),
});

export default function EventRewards() {
  const [rewardVisibility, setRewardVisibility] = useState("Token");
  const [networkTypeIsOpen, setNetworkTypeIsOpen] = useState(false);
  const [tokenTypeIsOpen, setTokenTypeIsOpen] = useState(false);
  const [token, setToken] = useState("Eth");
  const [drawWinnersIsOpen, setDrawWinnersIsOpen] = useState(false);
  const [winnerSelectionIsOpen, setWinnerSelectionIsOpen] = useState(false);
  const [rewardDistributionIsOpen, setRewardDistributionIsOpen] =
    useState(false);
  const [distributedByisOpen, setDistributedByisOpen] = useState(false);
  const { data} = UserView();

  // console.log(data);

  const navigate = useNavigate();
  const { updateFormData } = useFormContext();

  const toggleVisibility = (choice) => {
    setRewardVisibility(choice);
  };

  const toggleNetworkSelectionOpen = () => {
    setNetworkTypeIsOpen(!networkTypeIsOpen);
  };

  const toggleTokenSelectionOpen = () => {
    setTokenTypeIsOpen(!tokenTypeIsOpen);
  };

  const toggleDrawWinnersOpen = () => {
    setDrawWinnersIsOpen(!drawWinnersIsOpen);
  };

  const toggleWinnerSelectionOpen = () => {
    setWinnerSelectionIsOpen(!winnerSelectionIsOpen);
  };

  const toggleRewardDistributionSelectionOpen = () => {
    setRewardDistributionIsOpen(!rewardDistributionIsOpen);
  };
 
  const toogleDistributedBy = () => {
    setDistributedByisOpen(!distributedByisOpen);
  };

  const {
    control: controlToken,
    register: registerToken,
    handleSubmit: handleSubmitOfToken,
    formState: { errors: tokenErrors },
  } = useForm({
    resolver: yupResolver(TokenSchema),
  });

  const onSubmitOfToken = async (data) => {
    try {
      console.log("Token\nSubmitted Data: ", JSON.stringify(data, null, 2));
      updateFormData({ tokenReward: data });
      // navigate(`/camp/campaigneligibility`);
    } catch (error) {
      console.error("Error in onSubmitOfToken:", error);
    }
  };

  const {
    control: controlPoints,
    register: registerPoints,
    handleSubmit: handleSubmitOfPoints,
    formState: { errors: pointsErrors },
  } = useForm({
    resolver: yupResolver(PointSchema),
  });

  const onSubmitOfPoints = (data) => {
     try {
      alert("points\nSubmitted Data: " + JSON.stringify(data, null, 2));
      updateFormData({ pointReward: data });
      // navigate(`/camp/campaigneligibility`);
    } catch (error) {
       console.error("Error in onSubmitOfPoints:", error);
    }
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
                <form onSubmit={handleSubmitOfToken(onSubmitOfToken)}>
                  <div>
                    <div className="dropdown-container mt-3">
                      <h6>Network</h6>
                      <div
                        className={`dropdown mt-3 ${
                          networkTypeIsOpen ? "open" : ""
                        }`}
                        tabIndex="0"
                        onBlur={() => setNetworkTypeIsOpen(false)}
                      >
                        <Controller
                          name="networkType"
                          control={controlToken}
                          defaultValue=""
                          render={({ field }) => (
                            <div
                              className={`dropdown mt-3 ${
                                networkTypeIsOpen ? "open" : ""
                              }`}
                              tabIndex="0"
                              onBlur={() => setNetworkTypeIsOpen(false)}
                            >
                              <div
                                className="dropdown-header"
                                onClick={toggleNetworkSelectionOpen}
                              >
                                {field.value || "Select Network Type"}
                                <span
                                  className={`arrow mt-2 ${
                                    networkTypeIsOpen ? "up" : "down"
                                  }`}
                                ></span>
                              </div>
                              {networkTypeIsOpen && (
                                <div className="dropdown-list">
                                  <div
                                    className="dropdown-item"
                                    onClick={() => {
                                      field.onChange("Ethereum");
                                      toggleNetworkSelectionOpen();
                                    }}
                                  >
                                    Ethereum
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    onClick={() => {
                                      field.onChange("Binance Smart Chain");
                                       toggleNetworkSelectionOpen();
                                    }}
                                  >
                                    Binance Smart Chain
                                  </div>
                                  {/* Add or remove network types as needed */}
                                </div>
                              )}
                            </div>
                          )}
                        />

                        {tokenErrors.networkType && (
                          <p className="text-danger fw-bold">
                            {tokenErrors.networkType.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="dropdown-container mt-3">
                      <h6>Token Type</h6>
                      <div
                        className={`dropdown mt-3 ${
                          tokenTypeIsOpen ? "open" : ""
                        }`}
                        tabIndex="0"
                        onBlur={() => setTokenTypeIsOpen(false)}
                      >
                        <Controller
                          name="tokenType"
                          control={controlToken}
                          defaultValue=""
                          render={({ field }) => (
                            <div
                              className={`dropdown mt-3 ${
                                tokenTypeIsOpen ? "open" : ""
                              }`}
                              tabIndex="0"
                              onBlur={() => setTokenTypeIsOpen(false)}
                            >
                              <div
                                className="dropdown-header"
                                onClick={toggleTokenSelectionOpen}
                              >
                                {field.value || "Select Token Type"}
                                <span
                                  className={`arrow mt-2 ${
                                    tokenTypeIsOpen ? "up" : "down"
                                  }`}
                                ></span>
                              </div>
                              {tokenTypeIsOpen && (
                                <div className="dropdown-list">
                                  <div
                                    className="dropdown-item"
                                    onClick={() => {
                                      field.onChange("Eth"); // Assuming 'Eth' is a correct value
                                      toggleTokenSelectionOpen();
                                    }}
                                  >
                                    Eth
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    onClick={() => {
                                      field.onChange("Bsc"); // Changing this to a different value
                                      toggleTokenSelectionOpen();
                                    }}
                                  >
                                    Bsc
                                  </div>
                                  {/* Add more token types as needed */}
                                </div>
                              )}
                            </div>
                          )}
                        />

                        {tokenErrors.tokenType && (
                          <p className="text-danger fw-bold">
                            {tokenErrors.tokenType.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h6 className="mt-3">Total Reward Amount</h6>
                      <p className="fs-6">
                        *More rewards deposited, more credits you will get and
                        higher ranking the campaign will get
                      </p>
                      <div className="position-relative">
                        <input
                          type="number"
                          name="rewardToken"
                          id="RewardToken"
                          min="0.0001" max={data !== undefined ? data.assets : ""}
                          className={`form-control ${
                            tokenErrors.rewardToken ? "is-invalid" : ""
                          }`}
                          {...registerToken("rewardToken")}
                        />
                        <span className="token-type-badge">{token}</span>
                      </div>
                      <small>*Min Eth Value 0.0001</small>

                      {tokenErrors.rewardToken && (
                        <p className="text-danger fw-bold">
                          {tokenErrors.rewardToken.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <h6 className="mt-3">Number of Winners</h6>

                      <div className="">
                        <input
                          type="number"
                          name="totalReward"
                          id="total-reward"
                          className={`form-control ${
                            tokenErrors.totalReward ? "is-invalid" : ""
                          }`}
                          {...registerToken("totalReward")}
                        />
                      </div>

                      {tokenErrors.totalReward && (
                        <p className="text-danger fw-bold">
                          {tokenErrors.totalReward.message}
                        </p>
                      )}
                    </div>

                    <div className="">
                      <h6 className="mt-3">How to Draw Winners</h6>
                      <div
                        className={`dropdown mt-3 ${
                          drawWinnersIsOpen ? "open" : ""
                        }`}
                        tabIndex="0"
                        onBlur={() => setDrawWinnersIsOpen(false)}
                      >
                        <Controller
                          name="drawnMethod"
                          control={controlToken}
                          defaultValue=""
                          render={({ field }) => (
                            <>
                              <div
                                className="dropdown-header"
                                onClick={toggleDrawWinnersOpen}
                              >
                                {field.value || "Select Method"}
                                <span
                                  className={`arrow mt-2 ${
                                    drawWinnersIsOpen ? "up" : "down"
                                  }`}
                                ></span>
                              </div>
                              {drawWinnersIsOpen && (
                                <div className="dropdown-list">
                                  <div
                                    className="dropdown-item"
                                    onClick={() => {
                                      field.onChange("Automatic");
                                      toggleDrawWinnersOpen();
                                    }}
                                  >
                                    Automatic
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    onClick={() => {
                                      field.onChange("Manual");
                                      toggleDrawWinnersOpen();
                                    }}
                                  >
                                    Manual
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        />
                        {tokenErrors.drawnMethod && (
                          <p className="text-danger fw-bold">
                            {tokenErrors.drawnMethod.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="dropdown-container mt-3">
                        <h6>Automatic Winner Selection</h6>
                        <div
                          className={`dropdown mt-3 ${
                            winnerSelectionIsOpen ? "open" : ""
                          }`}
                          tabIndex="0"
                          onBlur={() => setWinnerSelectionIsOpen(false)}
                        >
                          <Controller
                            name="winnerSelection"
                            control={controlToken}
                            defaultValue=""
                            render={({ field }) => (
                              <>
                                <div
                                  className="dropdown-header"
                                  onClick={toggleWinnerSelectionOpen}
                                >
                                  {field.value || "Select Method"}
                                  <span
                                    className={`arrow mt-2 ${
                                      winnerSelectionIsOpen ? "up" : "down"
                                    }`}
                                  ></span>
                                </div>
                                {winnerSelectionIsOpen && (
                                  <div className="dropdown-list">
                                    <div
                                      className="dropdown-item"
                                      onClick={() => {
                                        field.onChange(
                                          "Select the first N users as winners"
                                        );
                                        toggleWinnerSelectionOpen();
                                      }}
                                    >
                                      Select the first N users as winners
                                    </div>
                                    <div
                                      className="dropdown-item"
                                      onClick={() => {
                                        field.onChange(
                                          "Select N users randomly as winners"
                                        );
                                        toggleWinnerSelectionOpen();
                                      }}
                                    >
                                      Select N users randomly as winners
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          />
                          {tokenErrors.winnerSelection && (
                            <p className="text-danger fw-bold">
                              {tokenErrors.winnerSelection.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="dropdown-container mt-3">
                        <h6>How to distribute rewards</h6>
                        <div
                          className={`dropdown mt-3 ${
                            rewardDistributionIsOpen ? "open" : ""
                          }`}
                          tabIndex="0"
                          onBlur={() => setRewardDistributionIsOpen(false)}
                        >
                          <Controller
                            name="distributionType"
                            control={controlToken}
                            defaultValue=""
                            render={({ field }) => (
                              <>
                                <div
                                  className="dropdown-header"
                                  onClick={
                                    toggleRewardDistributionSelectionOpen
                                  }
                                >
                                  {field.value || "Select Distribution Type"}
                                  <span
                                    className={`arrow mt-2 ${
                                      rewardDistributionIsOpen ? "up" : "down"
                                    }`}
                                  ></span>
                                </div>
                                {rewardDistributionIsOpen && (
                                  <div className="dropdown-list">
                                    <div
                                      className="dropdown-item"
                                      onClick={() => {
                                        field.onChange("Equally");
                                        toggleRewardDistributionSelectionOpen();
                                      }}
                                    >
                                      Equally
                                    </div>
                                    <div
                                      className="dropdown-item"
                                      onClick={() => {
                                        field.onChange("Randomly");
                                        toggleRewardDistributionSelectionOpen();
                                      }}
                                    >
                                      Randomly
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          />
                          {tokenErrors.distributionType && (
                            <p className="text-danger fw-bold">
                              {tokenErrors.distributionType.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="dropdown-container mt-3">
                        <h6>Reward Distributed by</h6>

                        <div
                          className="dropdown mt-3"
                          tabIndex="0"
                          onBlur={() => setDistributedByisOpen(false)}
                        >
                          <Controller
                            name="distributedBy"
                            control={controlToken}
                            defaultValue=""
                            render={({ field }) => (
                              <>
                                <div
                                  className="dropdown-header"
                                  onClick={toogleDistributedBy}
                                >
                                  {field.value || "Select Method"}
                                  <span
                                    className={`arrow mt-2 ${
                                      distributedByisOpen ? "up" : "down"
                                    }`}
                                  ></span>
                                </div>

                                {distributedByisOpen && (
                                  <div className="dropdown-list">
                                    <div
                                      className="dropdown-item"
                                      onClick={() => {
                                        field.onChange("Taskon");
                                        toogleDistributedBy();
                                      }}
                                    >
                                      Taskon
                                    </div>
                                    <div
                                      className="dropdown-item"
                                      onClick={() => {
                                        field.onChange("Yourself");
                                        toogleDistributedBy();
                                      }}
                                    >
                                      Yourself
                                    </div>
                                  </div>
                                )}
                              </>
                            )}
                          />
                          {tokenErrors.distributedBy && (
                            <p className="text-danger fw-bold">
                              {tokenErrors.distributedBy.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="buttons my-4 ">
                      <button className="save-draft text-nowrap">
                        Save as Draft
                      </button>
                      <button className="save-draft ms-3">Previous</button>
                      <button className="next" type="submit">
                        Next
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <form onSubmit={handleSubmitOfPoints(onSubmitOfPoints)}>
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
                          className={`form-control ${
                            pointsErrors.rewardPoint ? "is-invalid" : ""
                          }`}
                          {...registerPoints("rewardPoint")}
                        />
                        <span className="token-type-badge">Points/Winner</span>
                      </div>
                      {pointsErrors.rewardPoint && (
                        <p className="text-danger fw-bold">
                          {pointsErrors.rewardPoint.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <h6 className="mt-3">Number of Winners</h6>
                      <div className="">
                        <input
                          type="number"
                          name="totalReward"
                          id="total-reward"
                          className={`form-control ${
                            pointsErrors.totalReward ? "is-invalid" : ""
                          }`}
                          {...registerPoints("totalReward")}
                        />
                      </div>
                      {pointsErrors.totalReward && (
                        <p className="text-danger fw-bold">
                          {pointsErrors.totalReward.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <h6 className="mt-3">
                        How to Draw Winners <PiWarningCircleBold />
                      </h6>
                      <div
                        className={`dropdown mt-3 ${
                          drawWinnersIsOpen ? "open" : ""
                        }`}
                        tabIndex="0"
                        onBlur={() => setDrawWinnersIsOpen(false)}
                      >
                        <Controller
                          name="drawnMethod"
                          control={controlPoints}
                          defaultValue=""
                          render={({ field }) => (
                            <>
                              <div
                                className="dropdown-header"
                                onClick={toggleDrawWinnersOpen}
                              >
                                {field.value || "Select Method"}
                                <span
                                  className={`arrow mt-2 ${
                                    drawWinnersIsOpen ? "up" : "down"
                                  }`}
                                ></span>
                              </div>
                              {drawWinnersIsOpen && (
                                <div className="dropdown-list">
                                  <div
                                    className="dropdown-item"
                                    onClick={() => {
                                      field.onChange("Automatic");
                                      toggleDrawWinnersOpen();
                                    }}
                                  >
                                    Automatic
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    onClick={() => {
                                      field.onChange("Manual");
                                      toggleDrawWinnersOpen();
                                    }}
                                  >
                                    Manual
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        />
                        {pointsErrors.drawnMethod && (
                          <p className="text-danger fw-bold">
                            {pointsErrors.drawnMethod.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h6 className="mt-3">
                        Automatic Winner Selection <PiWarningCircleBold />
                      </h6>
                      <div
                        className={`dropdown mt-3 ${
                          winnerSelectionIsOpen ? "open" : ""
                        }`}
                        tabIndex="0"
                        onBlur={() => setWinnerSelectionIsOpen(false)}
                      >
                        <Controller
                          name="winnerSelection"
                          control={controlPoints}
                          defaultValue=""
                          render={({ field }) => (
                            <>
                              <div
                                className="dropdown-header"
                                onClick={toggleWinnerSelectionOpen}
                              >
                                {field.value || "Select Method"}
                                <span
                                  className={`arrow mt-2 ${
                                    winnerSelectionIsOpen ? "up" : "down"
                                  }`}
                                ></span>
                              </div>
                              {winnerSelectionIsOpen && (
                                <div className="dropdown-list">
                                  <div
                                    className="dropdown-item"
                                    onClick={() => {
                                      field.onChange(
                                        "Select the first N users as winners"
                                      );
                                      toggleWinnerSelectionOpen();
                                    }}
                                  >
                                    Select the first N users as winners
                                  </div>
                                  <div
                                    className="dropdown-item"
                                    onClick={() => {
                                      field.onChange(
                                        "Select N users randomly as winners"
                                      );
                                      toggleWinnerSelectionOpen();
                                    }}
                                  >
                                    Select N users randomly as winners
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        />
                        {pointsErrors.winnerSelection && (
                          <p className="text-danger fw-bold">
                            {pointsErrors.winnerSelection.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="buttons my-4 ">
                      <button className="save-draft text-nowrap">
                        Save as Draft
                      </button>
                      <button className="save-draft ms-3">Previous</button>
                      <button className="next" type="submit">
                        Next
                      </button>
                    </div>
                  </div>
                </form>
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
