import React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import * as FAIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as FIIcons from "react-icons/fi";
import { Table } from 'reactstrap';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
export default function ApiReclamationList({reclamation}) {
    
    function handleRemoveItem(id){
        axios.delete(`https://eboardbackend2022.herokuapp.com/reclamation/${id}`).then(res=>{
            toast.success("Reclamation deleted successfuly !");
        }).catch(err=>{
            toast.error("You have an error please try again");
        })
    }
   
  return (
    <div>
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
        <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Subject</th>
            <th>Message</th>
            <th>User email</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
        {reclamation &&
        reclamation.map((Reclamation,index)=>{
            console.log(Reclamation.type)
        return(
          <tr key={index}>
            <th scope="row">{index+1}</th>
            <td>{Reclamation.type}</td>
            <td>{Reclamation.subject}</td>
            <td>{Reclamation.message}</td>
            <td>{Reclamation.User.email}</td>
            <td><button className='edit '><FIIcons.FiEdit /></button> <button onClick={(e) =>handleRemoveItem(Reclamation._id)}><AiIcons.AiFillDelete /></button></td>
          </tr>
            )})}
        </tbody>
      </Table>
    </div>
  )
}
