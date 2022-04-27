import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'


import Footer from '../Footer'
import './../css/Login.css'
import Inputs from '../Inputs'
const Login = () => {
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
    className:"form-control",
    placeholder:"Password",
    errorMessage:"Wrong password ",
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
      <div className="register-photo">
        <div className="form-container">
            <div className="image-holder">
              <div className="content">
                            <h5>Nice to see you again</h5>
                            <h1>
                                WELCOME BACK
                            </h1>
                            <hr className="hr" />
                            <p>A warm welcome and lots of good wishes
                              on becoming part of our growing team.
                                Congratulations and on behalf of all the members.
                                We are all happy and excited about your inputs and contribution to our website.
                            </p>
              </div>
            </div>
            <form method="post" onSubmit={handleSubmit}>
               
                <h1 className="text-center ">LOGIN ACCOUNT</h1>
               
                  
                <div className="mb-3 pt-4">
                  <div className="col">
                   
                 
                  {input1.map(input=>(
                     <div className=" col-sm-12 mb-2" >
                        <Inputs key={input.id} {...input} value={values[input.name]} onChange={onChange} ></Inputs>
                     </div>
                  ))}
                  </div>
                 
                </div>
              
                    <div className="form-check"><label className="form-check-label"><Inputs className="form-check-input" type="checkbox"></Inputs>Stay logined.</label></div>
             
                
                <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Login</button></div><Link className="already" to="/sign-up"><p> You don't have an account ?  Sign up here. </p></Link>
               
            </form>
           
        </div>
    </div>
    <Footer></Footer>

    </div>
  )
}

export default Login
