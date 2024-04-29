  import React, { useState,useEffect } from "react";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import "./campaignModule.css";
  import balance from "../../../assets/campaign/balance.svg";
  import level from "../../../assets/campaign/level.svg";
  import { useNavigate } from "react-router-dom";
  import { useFormContext } from "./formprovider";

  const createEligibilitySchema = (showBalanceCard, showLevelCard) => {
    let schemaFields = {};
  
    if (showBalanceCard) {
      schemaFields = {
        ...schemaFields,
        network: yup.string().required("*Network is required"),
        tokenList: yup.string().required("*Token list selection is required"),
        minBalance: yup
          .number()
          .positive("*Balance must be positive")
          .min(0, "Minimum balance must be greater than or equal to 0")
          .required("*Minimum balance is required"),
      };
    }
  
    if (showLevelCard) {
      schemaFields = {
        ...schemaFields,
        taskOnLevel: yup
          .number()
          .positive("Level must be a positive number")
          .required("Task on level is required"),
      };
    }
  
    return yup.object(schemaFields).required();
  };
  
  export default function Eligibility() {
    const [showBalanceCard, setShowBalanceCard] = useState(false);
    const [showLevelCard, setShowLevelCard] = useState(false);
    const navigate = useNavigate();
    const { updateFormData } = useFormContext();
  
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
  
    const [formDetails, setFormDetails] = useState({
      taskOnLevel: 0,
      network: "",
      tokenList: "",
      minBalance: 0,
    });
  
    const formSchema = createEligibilitySchema(showBalanceCard, showLevelCard);
  
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      reset,
    } = useForm({
      resolver: yupResolver(formSchema),
    });
  
    // Dynamically set validation schema based on state
    useEffect(() => {
      reset(); // Reset form state to trigger re-validation
    }, [showBalanceCard, showLevelCard, reset]);
  
    const onSubmit = async (data) => {
      try {
        // Set default values if the card is not selected
        if (!showBalanceCard) {
          data.minBalance = 0;
        }
        if (!showLevelCard) {
          data.taskOnLevel = 0;
        }
  
        console.log("Form Submitted with Data:", data);
        updateFormData({ eligibility: data });
        navigate(`/camp/campaigntasks`);
      } catch (error) {
        console.error("Error during form submission:", error);
      }
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
  
      setFormDetails((prevState) => ({
        ...prevState,
        [name]: name === "minBalance" ? parseFloat(value) : value,
      }));
      setValue(name, value);
    };

    return (
      <>
        <div className="row">
          <div className="col-lg-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h6>Who are eligible for this Campaign?</h6>
              <div className="row mt-4">
                <div className="col-lg-6">
                  <button
                    type="button"
                    className="eligiblityBtn text-nowrap w-100"
                    onClick={handleBalanceClick}
                  >
                    <img src={balance} className="me-2" alt="balance" />
                    Minimum Token Balance
                  </button>
                </div>
                <div className="col-lg-6 ps-lg-5">
                  <button
                    type="button"
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
                        <h5
                          className="eligiblityLevelClose"
                          onClick={closeLevelCard}
                        >
                          x
                        </h5>
                      </div>

                      <div className="baseCardContent">
                        <div className="lableWarp p-4">
                          <div className="row d-flex lableField">
                            <div className=" col-lg-4 lableFieldLable ">
                              Task On Level
                            </div>
                            <div className="col-lg-8 labelFieldInput">
                              <select
                                name="taskOnLevel"
                                className="form-control ms-3"
                                 onChange={handleInputChange}
                                {...register("taskOnLevel")}
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  Select the level...
                                </option>
                                {[...Array(10).keys()].map((number) => (
                                  <option key={number + 1} value={number + 1}>
                                    {number + 1}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          {errors.taskOnLevel && (
                            <p className="fw-bold text-danger pt-3">
                              {errors.taskOnLevel.message}
                            </p>
                          )}
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
                        <h5
                          className="eligiblityClose"
                          onClick={closeBalanceCard}
                        >
                          x
                        </h5>
                      </div>

                      <div className="baseCardContent">
                        <div className="lableWarp p-4">
                          <div className="row d-lg-flex lableField">
                            <div className="col-lg-4 lableFieldLable ">
                              Network
                            </div>
                            <div className="col-lg-8 lableFieldInput">
                              <select
                                name="network"
                                className="form-control ms-3"
                                value={formDetails.network}
                                onChange={handleInputChange}
                                {...register("network")}
                              >
                                <option value="Ethereum">Ethereum</option>
                                <option value="Binance Smart Chain">
                                  Binance Smart Chain
                                </option>
                              </select>
                            </div>
                          </div>
                          {errors.network && (
                            <p className="fw-bold text-danger">
                              {errors.network.message}
                            </p>
                          )}

                          <div className="row d-flex lableField mt-3">
                            <div className="col-lg-4 lableFieldLable ">
                              Pick From List
                            </div>
                            <div className="col-lg-8 lableFieldInput">
                              <select
                                name="tokenList"
                                className="form-control ms-3"
                                // value={formDetails.tokenList}
                                onChange={handleInputChange}
                                {...register("tokenList")}
                              >
                                <option value="" disabled>
                                  Select a token...
                                </option>

                                <option value="Eth">Eth</option>
                              </select>
                            </div>
                          </div>
                          {errors.tokenList && (
                            <p className="fw-bold text-danger">
                              {errors.tokenList.message}
                            </p>
                          )}

                          <div className="row d-flex lableField mt-3">
                            <div className="col-lg-4 lableFieldLable ">
                              Min.Balance
                          </div>
                            <div className="col-lg-8 lableFieldInput">
                              <input
                                type="number"
                                name="minBalance"
                                className="form-control ms-3"
                                onChange={handleInputChange}
                                {...register("minBalance")}
                              />
                            </div>
                          </div>
                          {errors.minBalance && (
                            <p className="fw-bold text-danger">
                              {errors.minBalance.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="buttons my-4 ">
                <button className="save-draft text-nowrap">Save as Draft</button>
                <button className="save-draft ms-3">Previous</button>
                <button type="submit" className="next">
                  Next
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-4">&nbsp;</div>
        </div>
      </>
    );
  }
