  import { useContractRead, useContractWrite, useContractInfiniteReads, paginatedIndexesConfig, useAccount  } from 'wagmi';
  import React, { useState } from 'react';
  import { ethers, isError } from 'ethers';
  import abi from '../abis/src/contracts/Taskon.sol/CampaignContract.json';

  const contractDetails = {
    address: '0xe60427dE063d0D30eaF388a3937d30225c51E2fe',
    abi: abi.abi,
  };

  export function CreateCampaign(campaignData) { // Assuming default is public
    const campaignDatas=campaignData.campaignData;
    // console.log(campaignDatas.BasicInfo.campaignName);
    // console.log(campaignDatas.BasicInfo.campaignStartDate);
    // console.log(campaignDatas.BasicInfo.campaignExpairyDate);
    // console.log(campaignDatas.BasicInfo.coverImageIpfsCid);
    // console.log(campaignDatas.BasicInfo.campaignDescription);
    // console.log(campaignDatas.pointReward.totalReward);
    // console.log(campaignDatas.pointReward.rewardPoint);
    // console.log(ethers.parseEther(campaignDatas.eligibility.minBalance.toString()));
    // console.log(campaignDatas.eligibility.taskOnLevel);
    // console.log(campaignDatas.BasicInfo.visibility);
    // console.log(campaignDatas.submittedData.cid);


    const { data, isLoading, isSuccess,isError, write } = useContractWrite({
      ...contractDetails,
      functionName: 'createCampaign',
    });

    let visibility;
    let minimumBalance = ethers.parseEther(campaignDatas.eligibility.minBalance.toString());
    let pointReward=0;
    let tokenReward=0;
    let numberOfWinners=0;

    //visibility conversion
    if(campaignDatas.BasicInfo.visibility==="public"){
      visibility=true;
    }
    else if(campaignDatas.BasicInfo.visibility==="private"){
      visibility=false;
    }
    else{
      console.log("No visibility mentioned")
    }

    //pointreward check
    if(!campaignDatas.pointReward){
      tokenReward=ethers.parseEther(campaignDatas.tokenReward.rewardToken.toString());
      numberOfWinners=campaignDatas.tokenReward.totalReward;
    }
    if(!campaignDatas.tokenReward){
      pointReward=campaignDatas.pointReward.rewardPoint;
      numberOfWinners=campaignDatas.pointReward.totalReward;
    }
    const handleCreateCampaignClick = () => {
      if(!campaignData){
        return "no data"
      }
      write({
        args: [
          campaignDatas.BasicInfo.campaignName,       // name,
          campaignDatas.BasicInfo.campaignStartDate,  // startTimestamp,
          campaignDatas.BasicInfo.campaignExpairyDate,// endTimestamp,
          campaignDatas.BasicInfo.coverImageIpfsCid,  // imageCID,
          campaignDatas.BasicInfo.campaignDescription,// description : BasicInfo.description,
          tokenReward.toString(),                     // tokenReward,
          pointReward,                                // points,
          campaignDatas.eligibility.taskOnLevel,      // minimum level;,
          minimumBalance.toString(),                  // minimum balance
          numberOfWinners,                            // numberOfWinners,
          campaignDatas.submittedData.cid,            // tasksCID,
          visibility,                                 // visibility,
        ],
      }); 
    };
    return (
      <div>
        <button
          disabled={isLoading || !write}
          onClick={handleCreateCampaignClick}
        >
          {isLoading ? 'Processing...' : 'Create Campaign'}
        </button>
        {isLoading && <div>Transaction is processing. Check your wallet.</div>}
        {isSuccess && <div>Transaction successful: {JSON.stringify(data)}</div>}
      </div>
    );
  }

  export function ReadCampaign(campaignId) {
    const { data, isSuccess, isError } = useContractRead({
      ...contractDetails,
      functionName: 'getCampaign',
      args: campaignId,
    })

    return (
      {data, isSuccess, isError}
    )
  }

  export function Deposit({ amount }) {
    const { data, isLoading, isSuccess, write } = useContractWrite({
      ...contractDetails,
      functionName: 'deposit',
    });
  
    const handleDeposit = () => {
      if (!isNaN(amount)) {
        // Convert the amount to ethers format
        const amountInEth = ethers.parseEther(amount.toString());
  
        // Call the write function with the converted amount
        write({ value: amountInEth });
      } else {
        console.log("Invalid amount");
      }
    };
  
    return (
      <div>
        <button
          disabled={!write}
          onClick={handleDeposit}
        >
          Deposit
        </button>
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      </div>
    );
  }

  export function CreateEvent() { // Assuming default is public

    const { data, isLoading, isSuccess, write } = useContractWrite({
      ...contractDetails,
      functionName: 'createEvent',
      args: [],
    });
  }

  export function CreateSpace() { // Assuming default is public

    const { data, isLoading, isSuccess, write } = useContractWrite({
      ...contractDetails,
      functionName: 'createSpace',
      args: [],
    });
  }

  export function JoinCampaign({campaignId}) { // Assuming default is public

    const { data, isLoading, isSuccess, isError, error, write } = useContractWrite({
      ...contractDetails,
      functionName: 'joinCampaign',
      args: [campaignId],
    });

  return (
    <div>
      <button
  disabled={!write}
  onClick={() =>
    write({
      args: [campaignId],
    })
  }
  style={{
    padding: '5px 10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50', // Green background color
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  }}
>
  Join Campaign
</button>
      {isError && alert(error)}
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  )
}

  export function JoinEvent() { // Assuming default is public

    const { data, isLoading, isSuccess, write } = useContractWrite({
      ...contractDetails,
      functionName: 'createSpace',
      args: [],
    });
  }

  export function JoinSpace() { // Assuming default is public

    const { data, isLoading, isSuccess, write } = useContractWrite({
      ...contractDetails,
      functionName: 'createSpace',
      args: [],
    });
  }

  export function ViewCampaignParticipants(campaignId) {
    const { data, isSuccess, isError } = useContractRead({
      ...contractDetails,
      functionName: 'getCampaignParticipants',
      args: campaignId,  
    })
    return (
      {data, isSuccess, isError}
    )
  }

  export function UserView() {
    const {address, isConnected} = useAccount(); 
    const { data, isSuccess, isError } = useContractRead({
      ...contractDetails,
      functionName: 'getUser',
      args: [address],
    })

   // Function to recursively convert numbers to strings in an object
  const stringifyNumbers = obj => {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        stringifyNumbers(obj[key]); // Recursively call for nested objects
      } else if (typeof obj[key] === 'bigint' || typeof obj[key] === 'number') {
        obj[key] = obj[key].toString(); // Convert number or bigint to string
      }
    }
  };

  // Convert numbers to strings in the data object
  if (data) {
    stringifyNumbers(data);
  }

  return {
    data,
    isSuccess,
    isError,
    isConnected
  };
}