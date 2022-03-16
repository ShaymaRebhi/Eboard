import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Footer from '../Footer';
import './../css/Login.css';
import Inputs from '../Inputs';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/inject-style';
import 'react-toastify/dist/ReactToastify.css';
import  { useHistory } from 'react-router-dom'
import { AxiosResponse, AxiosError } from 'axios'
import { sessionService } from 'redux-react-session';

const Login = () => {
  
 
  
const history=useHistory();
const state={
      email:null,
      password:null,
      login:false,
      store:null
    }
    
const [values,setValues]=useState({
    email:"",
    password:""
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

  const onChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value});
  }
  
  


  const handleSubmit =(e)=>{

    e.preventDefault();
    const Data= new FormData(e.target)
    

    axios.post("https://eboardbackend2022.herokuapp.com/user/login",{
      "email":values.email,
      "Password":values.password
    }).then(Response=>{
      
      localStorage.setItem('login',JSON.stringify({
        Logined:true,
        Role:Response.data.User.role,
        AccessToken:Response.data.AccessToken
      }))

      const token =Response.data.AccessToken;

      sessionService.saveSession(token).then(()=>{
           sessionService.saveUser(Response.data.User).then(()=>{
                console.log("session creacted")
           }).catch(err=>console.error(err));
      }).catch(err=>console.error(err))
      if(Response.data.User.role=="STUDENT"){
        history.push("/classroom");
      }else if(Response.data.User.role=="TEACHER"){
        history.push("/Teacher");
      }else if(Response.data.User.role=="ORGANIZATION"){
        history.push("/Organization");
      }
     
       // history.replace("/classroom")
      
    }).catch((reason: AxiosError)=>{
          if(reason.response.status===408) {
            toast.error('Please contact the admin to activate your account', {
              position: "bottom-right" 
            });
          }else{
            toast.error('Email or password inccorect', {
              position: "bottom-right" 
             });
          }
            
      
        //addToast("test error", { appearance: 'error' });
    })
  }
  var getObject = JSON.parse(localStorage.getItem('login'));

  return (
    
    <>

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
      />
      </div>
  
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
              
                    <div className="form-check"><label className="form-check-label"><Inputs className="form-check-input" type="checkbox"></Inputs>Stay logined for a week.</label></div>
             
                
                <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Login</button></div><Link className="already" to="/sign-up"><p> You don't have an account ?  Sign up here. </p></Link>
               
            </form>
           
        </div>
    </div>
    <Footer></Footer>

    </>
  )
}

export default Login;
