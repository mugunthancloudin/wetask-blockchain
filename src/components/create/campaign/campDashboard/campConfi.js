// navConfig.js
import { FaHome, FaCog, FaUser } from 'react-icons/fa'; // Example icons

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
    Icon: FaHome, 
  },
  {
    link: '/camp/campaigntasks', 
    label: 'Tasks',
    Icon: FaCog,
  },
];


export default navItems;
