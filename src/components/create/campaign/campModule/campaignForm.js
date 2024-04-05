// // CampaignForm.js
// import React, { useState } from 'react';
// import BasicInfo from './basicinfoasicInfo';
// import Rewards from './rewards';
// import Eligibility from './eligiblityligibility';
// import Task from './task';

// function CampaignForm() {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     campaignName: '',
//     rewards: {},
//     eligibility: {},
//     tasks: [],
//   });


//   const next = () => setStep(step + 1);
   
//   const prev = () => setStep(step - 1);

//   const updateFormData = (newData) => {
//     setFormData(prev => ({ ...prev, ...newData }));
//   };

//   // Handle the final submission of the form
//   const submitForm = () => { 
//     console.log('Final form data:', formData);
//     // Here, you would typically make an API call to submit your formData
//   };

//   // Render the current step
//   const renderStep = () => {
//     switch(step) {
//       case 1:
//         return <BasicInfo formData={formData} updateFormData={updateFormData} next={next} />;
//       case 2:
//         return <Rewards formData={formData} updateFormData={updateFormData} next={next} prev={prev} />;
//       case 3:
//         return <Eligibility formData={formData} updateFormData={updateFormData} next={next} prev={prev} />;
//       case 4:
//         return <Task formData={formData} updateFormData={updateFormData} submitForm={submitForm} prev={prev} />;
//       default:
//         return <div>Unknown Step</div>;
//     }
//   };


//   return (
//     <div>
//       {renderStep()}
//     </div>
//   );
// }

// export default CampaignForm;
