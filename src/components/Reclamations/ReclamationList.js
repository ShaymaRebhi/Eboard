import React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import * as FAIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as FIIcons from "react-icons/fi";
import { Table } from 'reactstrap';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import ApiReclamationList from './ApiReclamationList';
import { ToastContainer } from 'react-toastify';

 function ReclamationList() {
    const [reclamation,setReclamation]=useState([]);
    useEffect(()=>{
   
        axios.get(`https://eboardbackend2022.herokuapp.com/reclamation/all`).then(res=>{
            setReclamation(res.data);
            console.log(res.data)
        });
       
     

  },[])
  return (
    <Container>
        
        <h1>Reclamations list</h1>
        <Link to="/claim"><Button>Add reclamation</Button></Link>


        <ApiReclamationList reclamation={reclamation} />
        
    </Container>

  )
  
}
const Container=styled.div`
        width:1000px;
        height:450px;
        margin:250px  auto 150px;
        padding:100px 50px;
        background-color:white;
        box-shadow:10px 10px 30px rgba(0,0,0,0.1);
        border-radius:10px;
        button{
            color:red;
            font-size:1.5rem;
            border:none;
            background:none;
            
        }
        .edit{
                color:#4c7391 !important;
            }
  `;
export default ReclamationList;