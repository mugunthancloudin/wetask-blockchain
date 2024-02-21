// navConfig.js
import { FaHome, FaCog, FaUser,FaTasks  } from 'react-icons/fa'; // Example icons

const navItems = [
  {
     link: '/camp/basicinfo', 
    label: 'Basic Info',
    Icon: FaHome,
  },
  {
    link: '/camp/campaignrewards', 
    label: 'Rewards',
    Icon: FaCog,
  },
  {
    link: '/camp/campaigneligibility', 
    label: 'Eligibility',
    Icon: FaUser,
    size:"50%",
     
  },
  {
    link: '/camp/campaigntasks', 
    label: 'Tasks',
    Icon: FaTasks ,
  },
];


export default navItems;
