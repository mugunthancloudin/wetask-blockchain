import React,{useState} from "react";
import "./campaignModule.css";
import balance from "../../../assets/campaign/balance.svg";
import level from "../../../assets/campaign/level.svg";

export default function Eligiblity() {

  const [formDetails, setFormDetails] = useState({
    network: '',
    tokenList: '',
    minBalance: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  return (
    <>
      <div className="row">
        <div className="col-lg-8">
          <h6>Who are eligible for this Campaign?</h6>
          <div className="row ">
            <div className="col-lg-6">
              <button className="eligiblityBtn text-nowrap w-100 ">
                <img src={balance} className="me-2" alt="balance" />
                Minimum Token Balance
              </button>
            </div>
            <div className="col-lg-6 ps-lg-5">
              <button className="eligiblityBtn w-100 text-nowrap ">
                <img src={level} alt="level" /> TaskOn Level
              </button>
            </div>
          </div>
          <hr />
          <div className="card eligiblityLevelCard">
            <div className="card-body">
              <div className="row">
                <div className="d-flex">
                  <img src={level} alt="level" className="titleImg" />{" "}
                  <h5 className="mt-2 ms-2">Taskon Level</h5>
                </div>

                <div className="baseCardContent">
                  <div className="lableWarp p-4">
                    <div className="row d-flex lableField">
                      <div className=" col-lg-3 lableFieldLable ">
                        Task On Level
                      </div>
                      <div className="col-lg-9 lableFieldInput">
                        <input type="number" className="form-control ms-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-3 eligiblityLevelCard">
            <div className="card-body">
              <div className="row">
                <div className="d-flex">
                  <img src={balance} alt="balance" className="titleImg" />{" "}
                  <h5 className="mt-2 ms-2">Minimum Token Balance</h5>
                </div>

                <div className="baseCardContent">
                  <div className="labelWrap p-4">
                    {/* Network Field */}
                    <div className="row d-lg-flex labelField">
                      <div className="col-lg-3 labelFieldLabel">Network</div>
                      <div className="col-lg-9 labelFieldInput">
                        <select
                          name="network"
                          className="form-control ms-3"
                          value={formDetails.network}
                          onChange={handleInputChange}
                        >
                          <option className="" value="Ethereum">Ethereum</option>
                          <option value="Binance Smart Chain">
                            Binance Smart Chain
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Token List Field */}
                    <div className="row d-flex labelField mt-3">
                      <div className="col-lg-3 labelFieldLabel">
                        Pick From List
                      </div>
                      <div className="col-lg-9 labelFieldInput">
                        <select
                          name="tokenList"
                          className="form-control ms-3"
                          value={formDetails.tokenList}
                          onChange={handleInputChange}
                        >
                          <option className="" value="Eth">Eth</option>
                        </select>
                      </div>
                    </div>

                    {/* Minimum Balance Field */}
                    <div className="row d-flex labelField mt-3">
                      <div className="col-lg-3 labelFieldLabel">
                        Min.Balance
                      </div>
                      <div className="col-lg-9 labelFieldInput">
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
        </div>
        <div className="col-lg-4">&nbsp;</div>
      </div>
    </>
  );
}
