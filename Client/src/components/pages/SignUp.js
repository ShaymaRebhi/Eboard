import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import Footer from '../Footer';
import Inputs from '../Inputs';
import '../css/SignUp.css';
export default function SignUp() {
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




  return(
    <div>
      <div className="signup-photo">
        <div className="container signup">
           
            <form method="post" > 
               
                <h1 className="text-center ">CREATE ACCOUNT</h1>
                <div className="mb-3 pt-4">
                  <div className="col">
            
                     <div className=" col-sm-12 mb-2" >
                           <input  ></input>
                     </div>
                  
                  </div>
                 
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary d-block w-100" type="submit">Create</button>
                </div>
                <Link className="already" to="/login"><p> You  have an account ?  Sign in here. </p></Link>
               
            </form>
           
        </div>
    </div>
    <Footer></Footer>

    </div>
  )
}
