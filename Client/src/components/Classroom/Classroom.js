import React from 'react'
import '../css/CardClass.css';
import CardClass from './CardClass';
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