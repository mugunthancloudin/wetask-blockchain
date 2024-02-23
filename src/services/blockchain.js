import { useContractRead, useContractWrite, useContractInfiniteReads, paginatedIndexesConfig  } from 'wagmi';
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

export function JoinCampaign() { // Assuming default is public

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...contractDetails,
    functionName: 'createSpace',
    args: [],
  });
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
