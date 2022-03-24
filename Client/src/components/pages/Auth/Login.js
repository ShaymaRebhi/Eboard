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

const Login = () => {
let [loading, setLoading] = useState(false);

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
        }
      }
    }
    const responseFacebook = (response) => {
      console.log(response);
      
      axios.post(`${process.env.REACT_APP_API_URL}user/facebookLogin`,{AccessToken:response.accessToken ,userID:response.userID ,email:response.email,picture:response.picture.data.url}
      ).then(response=>{
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

      }
        toast.success('Welcome', {
          position: "bottom-right" 
         });
      }).catch(err=>{
          toast.error('Erro :'+err, {
            position: "bottom-right" 
          });
      })
    }
    const responseGoogle = (response) => {
      console.log(response);
    }
  return (
    
    <>
   
    <div className='background_login'>
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
      </div>
      
      <div className="register-photo">
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
                      <Facebook text="Signin with Facebook" onClick={renderProps.onClick}></Facebook>
                      
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
                      <Gmail text2="Signin with Gmail" onClick={renderProps.onClick} disabled={renderProps.disabled}></Gmail>
                     
                    )}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    className="btnGoogle"
                    
                    cookiePolicy={'single_host_origin'}
                  />
                  <SignUpBtn text="Create account"></SignUpBtn>
                
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
         
                <div className="mb-2"><button className="btn btn-primary d-block w-100" type="submit">{loading ? <ClipLoader  color='#FFF' loading={loading}  size={20} /> : "Login"}</button></div>
                <Link to="/forget" className="already text-white"><p > Forget password ? </p></Link>
            </form>
           
        </div>
    </div>
   

    </>
  )
}

export default Login;
