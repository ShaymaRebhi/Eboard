import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'
import { getStudentBYid, getStudentBYids, host1, updateUser } from '../../../../utils/api';
import Inputs from '../../../Inputs'
import { ToastContainer, toast } from 'react-toastify';
function UpdateTeacher() {
    const [student,setStudent]=useState({});
    const [userId,setUserId]=useState(null);
    const {id} =useParams();
    const history=useHistory();
    const options = [
      { value: 'HOMME', label: 'MEN' },
      { value: 'FEMME', label: 'WOMAN' },
    ]
    const [selectedValue, setSelectedValue] = React.useState(3);
    const [values,setValues]=React.useState({
      email:"",
      password:"",
      cpassword:"",
      Adresse:"",
      Cin:"",
      role:"TEACHER",
      Name:"",
      FirstName:"",
      LastName:"",
      Sexe:"",
      BirthDate:""
    })
    const handleChange = e => {
      setSelectedValue(e.value);
    }
    const handleSubmit =(e)=>{
      e.preventDefault();
      
      const Data= new FormData(e.target)
      
    axios.put(host1+'/user/update/'+userId,Object.fromEntries(Data.entries()),{
        headers: {
            'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
        }
    }).then((message)  => {
      toast.success('Profile updated !!')
      history.push("/Eboard/Teachers")
    }
      
      )
    .catch((err)=> {
       toast.error('Error !!'+err)}
    )
     console.log(Object.fromEntries(Data.entries()))
    
  }
  const onChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value});
    console.log(values)
    console.log(selectedValue)
    
  }
    useEffect(()=>{
        if(!id){
            history.push("/Eboard/Teachers");
        }else{
            axios.get(getStudentBYids+id,{
                headers: {
                    'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
                }}).then(res=>{
                    setStudent(res.data[0]);
                    setUserId(res.data[0].User._id);
                }).catch(err=>{
                    history.push("/Eboard/Teachers");
                })
        }
    },[])

  return (
    <UpdateStud>
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
        />
        {student && <form method="post" onSubmit={handleSubmit}>
        <input type="hidden" value={'TEACHER'} name="role" />
            <h1 className='text-white pb-5'>UPDATE STUDENT</h1>
            <div className='row'>
              <div className='col-sm-6 pb-4'>
                <div className='form-group'>
                  <label>FirstName:</label>
                  <Inputs type="text" defaultValue={student.FirstName} className="form-control" placeholder="FirstName" name="FirstName" onChange={onChange} required/>
                </div>
              </div>
              <div className='col-sm-6 pb-4'>
              <div className='form-group'>
                  <label>LastName:</label>
                  <Inputs type="text" className="form-control" placeholder="LastName" defaultValue={student.LastName} name="LastName" onChange={onChange} required/>
              </div>
              </div>
              <div className='col-sm-12 pb-4'>
                <div className='form-group'>
                    <label>Email:</label>
                    <Inputs type="email" className="form-control" placeholder="Email ID" defaultValue={student.User && student.User.email} onChange={onChange} name="email" required/>
                </div>
              </div>
              <div className='col-sm-6 pb-4'>
                <div className='form-group'>
                    <label>Cin:</label>
                    <Inputs type="number" className="form-control" placeholder="CIN" defaultValue={student.Cin} name="Cin" onChange={onChange} required/>
                </div>
              </div>
              <div className='col-sm-6 pb-4'>
                <div className='form-group'>
                    <label>Gender:</label>
                    <Inputs type="text" className="form-control" placeholder="GENRE" name="Sexe" defaultValue={student.Sexe} onChange={onChange} required/>
                </div>
              </div>
              <div className='col-sm-12 pb-4'>
                <div className='form-group'>
                    <label>Adresse:</label>
                    <Inputs type="text" className="form-control" placeholder="Adresse" name="Adresse" defaultValue={student.User && student.User.Adresse} onChange={onChange} required/>
                </div>
              </div>
            </div>
            <Button className='btn' type="submit">Update</Button>
          </form>}
    </UpdateStud>
  )
}



const UpdateStud=styled.div`
    display:flex ;
    justify-content:center;
    align-items:center;
    form{
        .btn{
            width:100%;
            margin-top:10px;
        }
        width:800px;
        margin:5px;
        padding:130px;
        background:#8EB2CD;
    }

`
export default UpdateTeacher