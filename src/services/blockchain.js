import { useContractReads, useContractWrite  } from 'wagmi';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import abi from '../abis/src/contracts/Taskon.sol/Taskon.json';

const contractDetails = {
  address: '0xec5E5b240d64BB4Ab6F346C98cb38f91881Bc162',
  abi: abi.abi,
};

export function CreateCampaign(BasicInfo,eligibility,pointReward,submittedData) { // Assuming default is public

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...contractDetails,
    functionName: 'createCampaign',
    args: [
      BasicInfo.campaignName,       // name,
      BasicInfo.campaignStartDate,  // startTimestamp,
      BasicInfo.campaignEndDate,    // endTimestamp,
      BasicInfo.coverImageIpfsCid,  // imageCID,
      BasicInfo.campaignDescription,// description : BasicInfo.description,
      pointReward.totalReward,      // tokenReward,
      pointReward.rewardPoint,      // points,
      eligibility.minbalance,       // minimumLevel,
      eligibility.taskOnLevel,      // minimumBalance,
      pointReward.totalReward,      // numberOfWinners,
      BasicInfo.visibility,         // visibility,
      submittedData.cid,            // tasksCID,
    ],
  });
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
