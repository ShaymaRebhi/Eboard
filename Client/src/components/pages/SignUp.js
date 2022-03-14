import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import Footer from '../Footer';
import Inputs from '../Inputs';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '../css/SignUp.css';
import { faUserTie,faChalkboardUser,faGraduationCap} from '@fortawesome/free-solid-svg-icons'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {  toast, ToastContainer } from 'react-toastify';

export default function SignUp() {
  const [values,setValues]=useState({
    email:"",
    password:"",
    cpassword:"",
    Adresse:"",
    role:"",
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
    pattern: values.password,
    required:true
  },
  {
    id:4,
    name:"Adresse",
    type:"text",
    className:"form-control",
    placeholder:"Adresse",
    errorMessage:"Adresse required ",
    required:true
  }
]


  const handleSubmit =(e)=>{
    e.preventDefault();
    const Data= new FormData(e.target)
    console.log(Object.fromEntries(Data.entries()).role)


    axios.post("http://localhost:3000/user/signup",{
      "email":values.email,
      "Password":values.password,
      "role":values.role,
      "Adresse":values.Adresse
   
      
    }).then(Response=>{
      
      toast.success('Account added successfuly please sign in  ', {
        position: "bottom-right" 
      });
       
    }).catch(err=>{
          
          toast.error('Error  ', {
                    position: "bottom-right" 
            });
       
        //addToast("test error", { appearance: 'error' });
    })
  }

  const onChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value});
    console.log(values)
  }
  




  return(
    <div>
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
      <div className="signup-photo">
        <div className="container signup">
           
            <form method="post" onSubmit={handleSubmit}> 
               
                <h1 className="text-center ">CREATE ACCOUNT</h1>
                <label className="text-white pt-4">Login As:</label>
                <div className="row ">
                    <div className="col-md-4 ml-5">
                      <input type="radio" onChange={onChange} className="btn-check" id="btn-check-outlined" autoComplete="off" name="role" value="ORGANIZATION" required></input>
                      <label className="btn btn-outline-primary" htmlFor="btn-check-outlined"><FontAwesomeIcon icon={faUserTie} /> School</label>
                    </div>
                    <div className="col-md-4 ">
                      <input type="radio" onChange={onChange} className="btn-check" id="btn-check-outlined1" autoComplete="off" name="role" value="TEACHER" required></input>
                      <label className="btn btn-outline-primary" htmlFor="btn-check-outlined1"><FontAwesomeIcon icon={faChalkboardUser} /> Teacher</label>
                    </div>
                    <div className="col-md-4 ">
                      <input type="radio" onChange={onChange} className="btn-check" id="btn-check-outlined2" autoComplete="off" name="role" value="STUDENT" required></input>
                      <label className="btn btn-outline-primary" htmlFor="btn-check-outlined2"><FontAwesomeIcon icon={faGraduationCap} /> Student</label>
                    </div>


                </div>
                <div className="mb-3 pt-4">
                  <div className="col">
            
                     <div className=" col-sm-12 mb-2" >
                        {input1.map(input=>(
                            <div className=" col-sm-12 mb-2" >
                                <Inputs key={input.id} {...input} value={values[input.name]} onChange={onChange} ></Inputs>
                            </div>
                        ))}
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
