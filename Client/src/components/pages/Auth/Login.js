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
import { setCookie } from '../../../Helpers/Auth';
import ClipLoader from "react-spinners/ClipLoader";
import ReactFacebookLogin from  'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import { Facebook } from './Buttons/Facebook';
import { SignUpBtn } from './Buttons/SignUpBtn';
import { Gmail } from './Buttons/Gmail';
import styled from 'styled-components';
import { Captcha } from 'primereact/captcha';
import {getUserConnect} from "../../../utils/api";
const Login = () => {
const [caption,setCaption]=useState(false);
let [loading, setLoading] = useState(false);
let [Facebookloading, setFacebookLoading] = useState(false);
const history=useHistory();
const [values,setValues]=useState({
    email:"",
    password:""
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
  
  },{
    id:1,
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
  
  
var getObject={
    Logined:false
}

  const handleSubmit =(e)=>{

    e.preventDefault();
    const Data= new FormData(e.target)
    const DataSet={
      "email":values.email,
      "Password":values.password
    }
    setLoading(true)
    axios.post(`${process.env.REACT_APP_API_URL}user/login`,DataSet).then(Response=>{
      
      
      localStorage.setItem('login',JSON.stringify({
        Logined:true,
        Role:Response.data.User.role,
        AccessToken:Response.data.AccessToken,
        User:Response.data.User
      }))
        axios.get(getUserConnect,{
            headers: {
                'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
            }
        }).then(res=>{
            localStorage.setItem('idStudent',JSON.stringify({
                _id: res.data[0]._id
            }))

        })
      const token =Response.data.AccessToken;
      
      setCookie("token",token);
     
      if(Response.data.User.role==="STUDENT"){

          history.push("/classroom");

      }else if(Response.data.User.role==="TEACHER"){

        history.push("/Teacher");

      }else if(Response.data.User.role==="ORGANIZATION"){

        history.push("/Organization");

      }
    
      
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
          setLoading(false)
      
        //addToast("test error", { appearance: 'error' });
    }).finally(res=>{
      setLoading(false)
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
        }else if(getObject.Role==="ADMIN"){
          history.push("/Eboard/auth/admin");
        }
         
      }
    }
    
    const responseFacebook = (response) => {
      console.log(response);
      setFacebookLoading(true)
      axios.post(`${process.env.REACT_APP_API_URL}user/facebookLogin`,{AccessToken:response.accessToken ,userID:response.userID ,email:response.email,picture:response.picture.data.url}
      ).then(response=>{
        setFacebookLoading(false);
        localStorage.setItem('login',JSON.stringify({
          Logined:true,
          Role:response.data.User.role,
          AccessToken:response.data.AccessToken,
          User:response.data.User
        }))
        
        const token =response.data.AccessToken;
        
        setCookie("token",token);

        if(response.data.User.role==="STUDENT"){

          history.push("/classroom");

      }else if(response.data.User.role==="TEACHER"){

        history.push("/Teacher");

      }else if(response.data.User.role==="ORGANIZATION"){

        history.push("/Organization");

      }else if(response.data.User.role==="ADMIN"){
        history.push("/Eboard/auth/admin");
      }
        toast.success('Welcome', {
          position: "bottom-right" 
         });
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
        setFacebookLoading(false);
    
            //addToast("test error", { appearance: 'error' });
        }).finally(res=>{
          setFacebookLoading(false);
        })
    
    }
    const responseGoogle = (response) => {
      console.log(response);
    }
    const showResponse = (response) => {
      //call to a backend to verify against recaptcha with private key
      if(response){
        setCaption(true);
      }else{
        setCaption(false);
      }
      
      }
  return (
    
    <>
   
  
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
  
      
      <LoginWithPhoto>
        <div className="form-container">
          
            <div className="image-holder">
            <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-house-door-fill text-white svg_change_place" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
            </svg></Link>
            
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
                <div className='mobil_hom_icon'>
                    <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-house-door-fill text-white svg_change_place" viewBox="0 0 16 16">
                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
                     </svg></Link>
                </div>
                <h1 className="text-center mb-4 mt-5">LOGIN ACCOUNT</h1>
                <ReactFacebookLogin
                    appId="544343623593746"
                    render={renderProps => (
                     // Facebookloading ? <div className='text-center'><ClipLoader  color='#FFF' loading={Facebookloading}  size={20} /></div>: <Facebook text="Signin with Facebook" type="button" onClick={renderProps.onClick}></Facebook> 
                     <Facebook active={!caption ? true:false} icon={!Facebookloading} text={Facebookloading ? <ClipLoader  color='#FFF' loading={Facebookloading}  size={20} /> : "Signin with Facebook"} type="button" onClick={renderProps.onClick}></Facebook>
                    )}
                    autoLoad={false}
                    cssClass="btnFacebook"
                    fields="name,email,picture,first_name,last_name"
                    callback={responseFacebook}
                  
                     />
                 <GoogleLogin
                    clientId="714307659254-amb3fmov1ncdjcfcf2qvogl93ev90gm3.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    render={renderProps => (
                      <Gmail active={!caption ? true:false} text2="Signin with Gmail" type="button" onClick={renderProps.onClick} disabled={renderProps.disabled}></Gmail>
                     
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    className="btnGoogle"
                    
                    cookiePolicy={'single_host_origin'}
                  />
                  <SignUpBtn type="button" text="Create account"></SignUpBtn>
                
                 <div className='text-white text-center'>
                    <hr />Or login with your email
                </div>  
                <div className="mb-3 pt-4">
                  <div className="col">
                   
                 
                  {input1.map(v=>(
                     <div className=" col-sm-12 mb-2" key={v.id}>
                        <Inputs   {...v} value={values[v.name]} onChange={onChange} ></Inputs>
                     </div>
                  ))}
                  </div>
                 
                </div>
                <div className="caption">
                  <Captcha    size='normal'   className="captions" siteKey="6Le4rjEfAAAAAClt5SkfUSqQ-RCIUinyCPX0I75w" onResponse={showResponse} onloadCallback={() => console.log('loaded')}></Captcha>
                </div>
                {caption}
                <div className="mb-2"><button disabled={!caption ? true:false} className="btn btn-primary d-block w-100" type="submit">{loading ? <ClipLoader  color='#FFF' loading={loading}  size={20} /> : "Login"}</button></div>
                <Link to="/forget" className="already text-white"><p > Forget password ? </p></Link>
            </form>
           
        </div>
    </LoginWithPhoto>
   

    </>
  )
}
const LoginWithPhoto=styled.div`

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
    height: 20%;
    min-height:110vh;
    padding: 30px 0; 
    form {
      .caption{
        
        margin: 0 auto;
        width: 100%;
  
        margin-bottom: 1rem;
        margin-top:30px;
        display:flex;
        justify-content:center;
        .captions{
          background:red !important;
        }
      }
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
    height: 10% !important;
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
  .image-holder {
    
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
  .content{
      margin: 80px 30px 30px 30px;
    text-align: center;
  }
  
  }
  .form-container {
    border-radius: 0% 10% 10% 0% !important;
    display: table;
    max-width: 900px;
    height: 70%;
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
        .image-holder{
          display: none  !important;
        }
        .image-holder {
        margin-left: 50px;
        margin-right: 50px;
        }
        
          padding: 0px !important;
          border-radius: 0px !important;
          
        
      }
`;
export default Login;
