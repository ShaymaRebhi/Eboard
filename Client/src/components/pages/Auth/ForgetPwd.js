import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../../css/Login.css';
import Inputs from '../../Inputs';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/inject-style';
import 'react-toastify/dist/ReactToastify.css';
import  { useHistory } from 'react-router-dom'
import {  AxiosError } from 'axios'
import ClipLoader from "react-spinners/ClipLoader";
const ForgetPwd = () => {
let [loading, setLoading] = useState(false);

const history=useHistory();
const [values,setValues]=useState({
    email:""
    
})
const input1=[
  {
    id:0,
    name:"email",
    type:"email",
    className:"form-control ",
    placeholder:"Email ID",
    errorMessage:"It should be a valid email adress!",
    required:true
  
  }
]

const onChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value});
    console.log(values)
}
  
  
var getObject={
    Logined:false
}
    function componentDidMount(p) {
    setTimeout(() => {history.push("/login")}, p) // redirect in 5 secs
  }
  const handleSubmit =(e)=>{

    e.preventDefault();
    const Data= new FormData(e.target)
    const DataSet={
      "email":values.email
    }
    setLoading(true)
    axios.post(`${process.env.REACT_APP_API_URL}user/forgetpassword`,DataSet).then(Response=>{
      setLoading(true)
      toast.success('Please check your email: '+values.email);
      
    }).catch((reason: AxiosError)=>{
          
            toast.error('Your don\'t have an account widh this email adress please try to create one or contact the admin');
         
          setLoading(false)
      
        //addToast("test error", { appearance: 'error' });
    }).finally(res=>{
      setLoading(false)
      componentDidMount(5000)
    })
  }
  
  var getObject = JSON.parse(localStorage.getItem('login'));
    if(localStorage.getItem('login')!==null ){
      if(getObject.Logined){
        if(getObject.Role==="STUDENT"){
          history.push("/classroom");
        }else if(getObject.Role==="ORGANIZATION"){
          history.push("/ORG");
        }if(getObject.Role==="TEACHER"){
          history.push("/Teacher");
        }
      }
    }
  
  return (
    
    <>
   
    <div>
    <ToastContainer
        position="bottom-right"
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
      </div>
      
      <div className="register-photo">
        <div className="form-container">
          
            <div className="image-holders">
            <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-house-door-fill text-white svg_change_place" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
            </svg></Link>
            
              <div className="contents">
                    <h1 className="text-center text-white mb-4 mt-5">Forget password ?</h1>
                    <hr className="hr" />
                    <p>Follow the steps to recover your account. <br/>An email will be sent to you contain a url click to him and put the new password and enjoy.</p>
                   
              </div>
            </div>
            
            <form method="post " onSubmit={handleSubmit} >
                
               <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-lock-fill text-white mt-5" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                    </svg></div>
                    <h1 className="text-center mb-5 ">PASSWORD RESET</h1>
                <Inputs type="email" onChange={onChange} name="email" className="form-control" placeholder="Email ID" errorMessage="It should be a valid email adress!" required></Inputs>
                <div className=""><button className="btn btn-primary d-block w-100" type="submit">{loading ? <ClipLoader color='#FFF' loading={loading}  size={20}/> : "Reset"}</button></div>
                <Link to="/login" className="already text-white mt-5"><p > <b>Go back to the login page</b> </p></Link>
            </form>
           
        </div>
    </div>
   

    </>
  )
}

export default ForgetPwd;