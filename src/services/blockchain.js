import { useContractReads, useContractWrite  } from 'wagmi';
import React, { useState } from 'react';
import { ethers, isError } from 'ethers';
import abi from '../abis/src/contracts/Taskon.sol/Taskon.json';

const contractDetails = {
  address: '0xec5E5b240d64BB4Ab6F346C98cb38f91881Bc162',
  abi: abi.abi,
};

export function CreateCampaign(campaignData) { // Assuming default is public
  const campaignDatas=campaignData.campaignData;
  // console.log(campaignDatas.BasicInfo.campaignName);

  const { data, isLoading, isSuccess,isError, write } = useContractWrite({
    ...contractDetails,
    functionName: 'createCampaign',
    args: [
      campaignDatas.BasicInfo.campaignName,       // name,
      campaignDatas.BasicInfo.campaignStartDate,  // startTimestamp,
      campaignDatas.BasicInfo.campaignEndDate,    // endTimestamp,
      campaignDatas.BasicInfo.coverImageIpfsCid,  // imageCID,
      campaignDatas.BasicInfo.campaignDescription,// description : BasicInfo.description,
      campaignDatas.pointReward.totalReward,      // tokenReward,
      campaignDatas.pointReward.rewardPoint,      // points,
      campaignDatas.eligibility.minbalance,       // minimumLevel,
      campaignDatas.eligibility.taskOnLevel,      // minimumBalance,
      campaignDatas.pointReward.totalReward,      // numberOfWinners,
      campaignDatas.BasicInfo.visibility,         // visibility,
      campaignDatas.submittedData.cid,            // tasksCID,
    ],
  });
    return (
      <div>
        {write}
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
        {isError && alert("error in creating campaign")}
      </div>
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
