import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './../../css/Login.css';
import Inputs from '../../Inputs';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/inject-style';
import 'react-toastify/dist/ReactToastify.css';
import  { useHistory } from 'react-router-dom'
import {  AxiosError } from 'axios'
import ClipLoader from "react-spinners/ClipLoader";
import styled from 'styled-components';
import { resetPwd } from '../../../utils/api';


function ResetPwdAdmin() {
    let [loading, setLoading] = useState(false);
const { id } = useParams()
const history=useHistory();
const [values,setValues]=useState({
    newPassword:"",
    cpassword:""
    
})

const password1=[
    {
      id:2,
      name:"newPassword",
      type:"password",
      className:"form-control",
      placeholder:"Password",
      errorMessage:"Wrong password ",
      pattern:"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$",
      required:true
  
    },
    {
      id:3,
      name:"cpassword",
      type:"password",
      className:"form-control",
      placeholder:"Confirme password",
      errorMessage:"Wrong password match ",
      pattern: values.newPassword,
      required:true
    }
    
  ]
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
      "resetLink":id,
      "newPassword":values.newPassword
    }
    setLoading(true)
    axios.post(resetPwd,DataSet).then(Response=>{
      setLoading(true)
      toast.success('Perfect your password has been changed please check your email to verif that ');
      
    }).catch((reason: AxiosError)=>{
          
            toast.error('Oops we have an error please try again later');
         
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
      
      <Forgetpwd >
        <div className="form-container">
          
            <div className="image-holders">
            <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-house-door-fill text-white svg_change_place" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
            </svg></Link>
            
              <div className="contents">
                    <h1 className="text-center text-white mb-4 mt-5">Reset password ?</h1>
                    <hr className="hr" />
                    <p>Follow the steps to recover your account. <br/>Please put the new password in the field and click to reset.</p>
                    <br/><Link to="/login" className="already text-white mt-5"><p > <b>Go back to the login page</b> </p></Link>
              </div>
            </div>
            
            <form method="post " onSubmit={handleSubmit} className="text-center">
                
               
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-lock-fill text-white mt-5" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                    </svg>
                    <h1 className="text-center mb-5 ">PASSWORD RESET</h1>

                    {password1.map(input=>(
                            <div className='col-sm-12 mb-2' key={input.id}>
                                <Inputs  {...input} value={values[input.name]} onChange={onChange} ></Inputs>
                            </div>
                    ))}

                <div className=""><button className="btn btn-primary d-block w-100" type="submit">{loading ? <ClipLoader color='#FFF' loading={loading}  size={20}/> : "Reset"}</button></div>
                
            </form>
           
        </div>
    </Forgetpwd>
   

    </>
  )
}
const Forgetpwd=styled.div`
.loading-spinner{
  background-color: red;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 100%;
  z-index: 9999999999;
  overflow: hidden;
}
.loading {
  position: fixed;
  left: 0px;
  top: 0;
  width: 99%;
  height: 100%;
  z-index: 9999999999;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.9);
  margin-left: auto;
  margin-right: auto;
  
}
     .svg_change_place{
   margin-left: 30px !important;
   margin-top: -20px !important;
    text-align: right;
    
  }
   background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 15%, rgba(206,220,223,1) 100%);
    height: 100%;
    min-height:100vh;
    padding: 90px 0; 
    form {
      .row .btn:hover {
        background-color: #4c7391;
    }
    .row .btn:focus {
    background-color: #4c7391;
    }
  .row .btn:active {
      background-color: #4c7391;
  }
.mobil_hom_icon{
    display: none;
  }
h2 {
    font-size: 24px;
    line-height: 1.5;
    margin-bottom: 30px;
  }
  .btn-primary:active {
    transform: translateY(1px);
  }
  .already {
    display: block;
    text-align: center;
    
    font-size: 13px;
  }
  .btn-primary:hover, .btn-primary:active {
    background: #3273a5;
  }
  .form-control {
    background: #f7f9fc;
    border: none;
    border-bottom: 1px solid #dfe7f1;
    border-radius: 0;
    box-shadow: none;
    outline: none;
    color: inherit;
    text-indent: 6px;
    height: 40px;
  }
  .form-check {
    font-size: 13px;
    line-height: 20px;
  }
  .btn-primary {
    background: #65A2D1;
    border: none;
    border-radius: 4px;
    padding: 11px;
    box-shadow: none;
    margin-top: 35px;
    text-shadow: none;
    outline: none !important;
  }
      .row .btn {
      font-size: 14px;
     color: #FFF;
     border: 1px solid #FFF;
     input[type='password']::placeholder{
      color: #BDBDBD;
    }
    input[type='Number']::placeholder{
    color: #BDBDBD;
  }
    }
    h1,label{
        color: #FFF;
    }
    border-radius: 0% 3% 3% 0% !important; 
    display: table-cell;
    height: 100% !important;
    width: 420px;
    background: #8EB2CD;
    padding: 20px 30px;
    color:#676767 ;
    input[type="email"]{

    border:10px solid #B6CDDC;
    border-top: 0px;
    border-bottom: 0px;
    border-right: 0px;

    input[type="text"]{
    border:10px solid #B6CDDC !important;
    border-top: 0px;
    border-bottom: 0px;
    border-right: 0px;

  }
}
    
  }
  .image-holders{
    
    display: table-cell;
    width: auto;
    background: url('/images/login.png') center center no-repeat; 
    background-size: cover;
    .hr{
      width: 50px;
      background-color: #FFF;
      border-radius: 30px;
      margin-left: auto;
      margin-right: auto;
      height: 10px;
  }
  h1,h2,h3,h4,h5,h6,p{
    color: #FFF;
    margin: 10px;
  
  }
  .contents{
      margin: 80px 30px 30px 30px;
    text-align: center;
  }
  
  }
  .form-container {
    border-radius: 0% 10% 10% 0% !important;
    display: table;
    max-width: 900px;
    height: 100%;
    width: 100%;
    margin: 0 auto;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.1);
  }
  @media (max-width:833px){
        .image-holders{
            display: none  !important;
          }
        .image-holders {
            
            margin-left: 50px;
            margin-right: 50px;
        }
        form{
            height: 800px !important;
          }
      }
      @media (max-width:600px) {
          form {
            padding: 40px ;
          }
          
        }
      @media (max-width:819px){
        .mobil_hom_icon{
          display: flex;
          justify-content: end;
          
        }
        .image-holders{
          display: none  !important;
        }
        .image-holders {
        margin-left: 50px;
        margin-right: 50px;
        }
        
          padding: 0px !important;
          border-radius: 0px !important;
          
        
      }
`;

export default ResetPwdAdmin