import React, { useEffect } from 'react'
import '../css/CardClass.css';
import CardClass from './CardClass';
import AddClassComponent from './AddClassComponent';
import InvitationClassComonent from "./InvitationClassComonent";
import RecentActivites from './RecentActivities';
import { useHistory } from 'react-router-dom';

function Classroom() {
  const history=useHistory();
  useEffect(() => {
    var getObject = JSON.parse(localStorage.getItem('login'));
    if(localStorage.getItem('login') ===null ){
      if (!getObject.Logined){
        history.replace('/login')
      }
    }
},[]);

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