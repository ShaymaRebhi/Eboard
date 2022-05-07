import React, { useEffect, useState } from 'react'
import '../css/CardClass.css';
import CardClass from './CardClass';
import AddClassComponent from './AddClassComponent';
import InvitationClassComonent from "./InvitationClassComonent";
import RecentActivites from './RecentActivities';
import styled from 'styled-components'
import { getUserConnect } from '../../utils/api';
import axios from 'axios';
import ChartsBox2 from "../pages/Charts/ChartsBox2";



function Classroom() {
  const [role,setRole]=useState("");
  const [idUserConnect,setIdUserConnect]=useState("");
  useEffect(()=>{
    axios.get(getUserConnect,{
        headers: {
            'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
        }
    }).then(res=>{
        localStorage.setItem('Student',JSON.stringify({
           Student: res.data[0]
        }))
        setIdUserConnect(res.data[0]._id)
      })
      axios.get(getUserConnect,{
        headers: {
            'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
        }
    }).then(res=>{
        localStorage.setItem('idStudent',JSON.stringify({
           _id: res.data[0]._id
        }))
        setRole(res.data[0].User.role);
    })
},[])
  
  

  return (
    <>
    
      <ClassRoomStyle className='d-flex justify-content-start'>
      
      <div>
      { role === "TEACHER" ? (
            <AddClassComponent /> 
            ) : (
              <></>

              )}
          {role === "STUDENT" ? (

              <ChartsBox2/>

          ) : (
              <></>

          )}

            {role && idUserConnect && <CardClass role={role} idUserConnect={idUserConnect} ></CardClass> }
              
            {role && idUserConnect &&<InvitationClassComonent idclass={idUserConnect}></InvitationClassComonent>}
        </div>
        <RecentActivites idUserConnect={idUserConnect}></RecentActivites>
      </ClassRoomStyle>


    </>
    
  )
}

export default Classroom;
const ClassRoomStyle=styled.div`
@media screen and (min-width:720px)and (max-width:1080px){{
  width:50px;
 
}
`