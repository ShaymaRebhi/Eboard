import React from 'react'
import Footer from '../pages/Shared/Footer'
//import CardItem from '../CardItem';
import '../css/CardClass.css';
import CardClass from './CardClass';
import SideBar from '../SideBar/Sidebar' ;
import AddClassComponent from './AddClassComponent';
import InvitationClassComonent from "./InvitationClassComonent";
import RecentActivites from './RecentActivities';

function Classroom() {
  return (
    <div>
  <div style={{display: 'flex'}}>
  
 <div>
  <AddClassComponent /> 
  
  <CardClass></CardClass> 
 
  <InvitationClassComonent></InvitationClassComonent>
  </div>
  <RecentActivites></RecentActivites>
  </div>


    </div>
    
  )
}

export default Classroom