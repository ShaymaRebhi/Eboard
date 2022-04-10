import React from 'react'
import '../css/CardClass.css';
import CardClass from './CardClass';
import AddClassComponent from './AddClassComponent';
import InvitationClassComonent from "./InvitationClassComonent";
import RecentActivites from './RecentActivities';
import styled from 'styled-components'



function Classroom() {

  return (
    <>
      <classRoomStyle className='d-flex justify-content-start'>
      
      <div>
            <AddClassComponent /> 
            
            <CardClass></CardClass> 
          
            <InvitationClassComonent></InvitationClassComonent>
        </div>
        <RecentActivites></RecentActivites>
      </classRoomStyle>


    </>
    
  )
}

export default Classroom;
const classRoomStyle=styled.div`
@media screen and (min-width:720px)and (max-width:1080px){{
  width:50px;
 
}
`