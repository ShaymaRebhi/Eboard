import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Robot from "../../../Assets/Images/bot.gif"
function Welcome() {
    const Container = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        flex-direction: column;
        

       
        @media(max-width:650px){
            display: flex;
            justify-content: Start;
            align-items: Start;
            color: white;
            margin:40px;
            img {
            
            width: 10rem;
            height:10rem;
        }
            h1{
                font-size:15px;
                width:5px;
            }
            h3{
                font-size:13px;
                width:100px;
                text-align:center;
                
            }
        }
    `;
    const [currentUser,setCurrentUser]=useState(undefined);
    const history=useHistory();
    useEffect(()=>{
        
          setCurrentUser(JSON.parse(localStorage.getItem('login')).User.email.split('@')[0])
        
    },[])
  return (
    <Container>
        <br/><br/>
        
        <h1>Welcome, <span>{currentUser}</span>  </h1> 
        <p>Please select a chat to Start messaging.</p>
        
    </Container> 
  )
}

export default Welcome