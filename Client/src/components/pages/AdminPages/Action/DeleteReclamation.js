import axios from 'axios';
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { deleteReclamation } from '../../../../utils/api';

function DeleteReclamation() {
    const history=useHistory();
    const { id } = useParams();
    useEffect(()=>{
        axios.delete(deleteReclamation+id,{
            headers: {
                'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
            }
        }).then((message)  => {
            console.log('deleted');
        })
        .catch((err)=> {
            console.log(err);
        })
    
        
        history.push("/Eboard/Reclamations");
    },[])
  return (

    <div>DeleteReclamation</div>
  )
}

export default DeleteReclamation