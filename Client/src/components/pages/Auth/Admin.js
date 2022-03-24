import axios from 'axios';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { setCookie } from '../../../Helpers/Auth';
import '../../css/Admin.css'
import Inputs from '../../Inputs'
import { ToastContainer, toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
function Admin() {
  let [loading, setLoading] = useState(false);
  const history=useHistory();


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
    className:"form-control ",
    placeholder:"Password",
    errorMessage:"Wrong field password must be not empty",
    required:true
  
  }
]


  const handleSubmit =(e)=>{
    e.preventDefault();
    const Data= new FormData(e.target)
    const DataSet={
      "email":values.email,
      "Password":values.password
    }
    setLoading(true);
    axios.post(`${process.env.REACT_APP_API_URL}user/admin/login`,DataSet).then(Response=>{
      localStorage.setItem('login',JSON.stringify({
        Logined:true,
        Role:Response.data.User.role,
        AccessToken:Response.data.AccessToken,
        User:Response.data.User
      }))
      const token =Response.data.AccessToken;
      setCookie("token",token);
      setLoading(false);
      history.push("/Eboard/home");

    }).catch(err=>{
      setLoading(false);
      toast.error('Email or password inccorect', {
        position: "bottom-right" 
       });
    });
    console.log(Object.fromEntries(Data.entries()))
  }

  const onChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value});
  }
  console.log(values)
  var getObject = JSON.parse(localStorage.getItem('login'));
    if(localStorage.getItem('login')!==null ){
      if(getObject.Logined){
          history.push("/Eboard/home");
      }
  }
  return (
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
              theme={'colored'}
      />
    <section className="login-clean ">
        <form method="post" onSubmit={handleSubmit}>
            <h2 className="visually-hidden">Login Form</h2><small>Super user</small><img src="/images/Groupe%20125.png" alt="logo"></img>
            <div className="illustration"></div>
           
            {input1.map(input=>(
                     <div className=" col-sm-12 mb-2" key={input.id}>
                        <Inputs  {...input} value={values[input.name]} onChange={onChange} ></Inputs>
                     </div>
            ))}
        
    
            <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">{loading ? <ClipLoader  color='#FFF' loading={loading}  size={20} /> : "Login"}</button></div><Link className="forgot" to="#">Forgot your email or password?</Link>
        </form>
    </section>

  </div>
  )
}

export default Admin
