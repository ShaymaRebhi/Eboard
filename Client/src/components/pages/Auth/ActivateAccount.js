import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { activate } from '../../../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import { Button } from '../Home/Buttons/Button';
import { MdAccountBox } from "react-icons/md";
function ActivateAccount() {
    const { id } = useParams();
    const history=useHistory();
    const [active,setActive]=useState(true);
    const [compte,setCompte]=useState(undefined);
    useEffect(()=>{
        const data={
            activateLink:id
        }
        axios.post("http://localhost:3000/user/activate",data).then(Response=>{
            setCompte(Response.data);
            setActive(true);
        }).catch(err=>{
            toast.error("Error ! please contact the admin to verify the problem thanks !!");
            setActive(false);
        })
    },[])
  return (
    <ACTIVATE>
    <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={'colored'}
      />
    {active &&<div className='box'>
        <div className='icon text-center'><MdAccountBox /></div>
        <h1 >Account activated</h1>
        <p>Your account <b>{compte && compte.email}</b> has been activated successfuly<br/> please click to the button below to login</p>
       <div className='text-center'> <Link to="/login"><Button 
        className='btns'
        buttonStyle='btn--primary'
        
        >Login</Button></Link></div>
    </div>}
    {!active &&<div className='box'>
        <div className='icon text-center'><MdAccountBox /></div>
        <h1 className='text-danger'>Account not activated</h1>
        <p>Sorry we have some errors please contact the admin to verif that, thanks.</p>
       <div className='text-center'> <Link to="/login"><Button 
        className='btns'
        buttonStyle='btn--primary'
        
        >Login</Button></Link></div>
    </div>}
    </ACTIVATE>

  )
}

export default ActivateAccount

const ACTIVATE=styled.div`
.icon{
    font-size:100pt;
}
.btns{
    width:100%;
}
.box{
    display: flex;
    justify-content: center;
    flex-direction: column;
   h1,p{
    text-align:center;
    b{
        color:#004D77;
    }
   }
    margin-left:auto;
    margin-right:auto;
    margin-top:100px;
    width:800px;
    height:400px;
    background: linear-gradient(90deg, rgb(2,0,36) 0%, rgb(140,177,192) 0%, rgb(140,177,192) 100%);
    color:#FFF;
}

`