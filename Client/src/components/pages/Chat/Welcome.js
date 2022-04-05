import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { getUserConnect } from '../../../utils/api';
function Welcome() {
    
    const [currentUser,setCurrentUser]=useState(undefined);
    useEffect(()=>{
        axios.get(getUserConnect ,{
            headers: {
                'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
            }
        }).then(res=>{
            console.log(res.data);
            setCurrentUser(res.data[0].FirstName+' '+res.data[0].LastName)
        })
        
        
    },[])
  return (
    <Container>
        <br/><br/>
        
        <h1>Welcome, <span>{currentUser}</span>  </h1> 
        <p>Please select a chat to Start messaging.</p>
        
    </Container> 
  )
}
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
export default Welcome