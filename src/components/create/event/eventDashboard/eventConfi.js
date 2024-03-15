// EventNavConfig.js
import { FaHome, FaCog, FaUser,FaTasks  } from 'react-icons/fa'; // Example icons

const eventNavItems = [
    
  {
    link: '/event/eventbasicInfo ', 
    label: 'Basic Info',
    Icon: FaHome,
  },

  {
    link: '/event/eventcampaign', 
    label: 'Campaigns   ',
    Icon: FaUser,
    size:"50%",
     
  },

  {
    link: '/event/eventrewards', 
    label: 'Rewards',
    Icon: FaCog,
  },
];


export default eventNavItems;
