import axios from 'axios';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { setCookie } from '../../../Helpers/Auth';
import '../../css/Admin.css'
import Inputs from '../../Inputs'
import { ToastContainer, toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import { adminforgetPwd } from '../../../utils/api';
function ForgetPwdAdmin() {
  let [loading, setLoading] = useState(false);
  const history=useHistory();


  const [values,setValues]=useState({
    email:""

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
  
  }
]


  const handleSubmit =(e)=>{
    e.preventDefault();
    const Data= new FormData(e.target)
    const DataSet={
      "email":values.email
    }
    setLoading(true);
   
    axios.post(adminforgetPwd,{email:values.email}).then(response=>{
      toast.success("Please check your email to reset your password !");
    }).catch(err=>{
      setLoading(false);
      toast.error("Error please try again !");
    }).finally(res=>{
      setLoading(false);
    })
    
  }

  const onChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value});
  }
  
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
            <h2 className="visually-hidden">Forget password</h2><small>Super user | Forget password</small><img src="/images/Groupe%20125.png" alt="logo"></img>
            <div className="illustration"></div>
           
            {input1.map(input=>(
                     <div className=" col-sm-12 mb-2" key={input.id}>
                        <Inputs  {...input} value={values[input.name]} onChange={onChange} ></Inputs>
                     </div>
            ))}
        
    
            <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">{loading ? <ClipLoader  color='#FFF' loading={loading}  size={20} /> : "Send"}</button></div><Link className="forgot" to="/Eboard/auth/admin">Login page</Link>
        </form>
    </section>

  </div>
  )
}

export default ForgetPwdAdmin
