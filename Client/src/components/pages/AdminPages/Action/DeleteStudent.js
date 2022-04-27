import axios from 'axios';
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { deleteStudent } from '../../../../utils/api';

function DeleteStudent() {
    const history=useHistory();
    const { id } = useParams()
    useEffect(()=>{
        axios.delete(deleteStudent+id,{
            headers: {
                'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
            }
        }).then((message)  => {
            console.log('deleted');
        })
        .catch((err)=> {
            console.log(err);
        })
    
        
        history.push("/Eboard/Students");
    },[])
  return (
    <div>
        
    </div>
  )
}

export default DeleteStudent