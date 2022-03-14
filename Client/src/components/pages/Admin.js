import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/Admin.css'
import Inputs from '../Inputs'


function Admin() {
  const [values,setValues]=useState({
    email:"",
    password:"",
    actor:""

  })
const input1=[
  {
    id:1,
    name:"email",
    type:"email",
    className:"form-control ",
    placeholder:"Email ID",
    errorMessage:"It should be a valid email adress!",
    required:true
  
  },{
    id:2,
    name:"password",
    type:"password",
    className:"form-control ",
    placeholder:"Password",
    errorMessage:"Wrong field password must be not empty",
    required:true
  
  }
]


  const handleSubmit =(e)=>{
    e.preventDefault();
    const Data= new FormData(e.target)
    console.log(Object.fromEntries(Data.entries()))
  }

  const onChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value});
  }
  console.log(values)
  return (
    <div>
    
   
    <section className="login-clean ">
        <form method="post">
            <h2 className="visually-hidden">Login Form</h2><small>Super user</small><img src="/images/Groupe%20125.png" alt="logo"></img>
            <div className="illustration"></div>
           
            {input1.map(input=>(
                     <div className=" col-sm-12 mb-2" >
                        <Inputs key={input.id} {...input} value={values[input.name]} onChange={onChange} ></Inputs>
                     </div>
            ))}
        
    
            <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Log In</button></div><Link className="forgot" to="#">Forgot your email or password?</Link>
        </form>
    </section>

  </div>
  )
}

export default Admin
