import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../../../App.css';

import Inputs from '../../Inputs';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '../../css/SignUp.css';
import { faUserTie,faChalkboardUser,faGraduationCap} from '@fortawesome/free-solid-svg-icons'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {  toast, ToastContainer } from 'react-toastify';

import Select from 'react-select'
import ClipLoader from "react-spinners/ClipLoader";
import { signup } from '../../../utils/api';
export default function SignUp() {
  let [loading, setLoading] = useState(false);
  const history=useHistory();
  function componentDidMount(p) {
    setTimeout(() => {history.push("/login")}, p) // redirect in 5 secs
  }
  const options = [
    { value: 'HOMME', label: 'MEN' },
    { value: 'FEMME', label: 'WOMAN' },
  ]
  const [selectedValue, setSelectedValue] = useState(3);
  const [values,setValues]=useState({
    email:"",
    password:"",
    cpassword:"",
    Adresse:"",
    Cin:"",
    role:"",
    Name:"",
    FirstName:"",
    LastName:"",
    Sexe:"",
    BirthDate:""
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

const password1=[
  {
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
  }
  
]


  const handleSubmit =(e)=>{
    e.preventDefault();
    
    const Data= new FormData(e.target)
  
    console.log(Object.fromEntries(Data.entries()).role)

    setLoading(true)
    axios.post(signup,{
      "email":values.email,
      "Password":values.password,
      "role":values.role,
      "Adresse":values.Adresse,
      "Cin":Number(values.Cin),
      "Name":values.Name,
      "FirstName":values.FirstName,
      "LastName":values.LastName,
      "Sexe":selectedValue,
      "BirthDate":values.BirthDate
   
      
    }).then(Response=>{
      toast.success('Please check your email to activate your account !! ');
      componentDidMount(5000);
    }).catch(err => {
          
          toast.error('Account already exist try to login or contact the admin');
       
        //addToast("test error", { appearance: 'error' });
    }).finally(res=>{
      setLoading(false)
    })
  }

  const onChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value});
    console.log(values)
    console.log(selectedValue)
    
  }
  const handleChange = e => {
    setSelectedValue(e.value);
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
                <div className="flex-nowrap w-100 p-4" onClick={onChange}>
                    
                      <input type="radio"  className="btn-check " id="btn-check-outlined" autoComplete="off" name="role" value="ORGANIZATION" required></input>
                      <label className="btn btn-outline-primary " htmlFor="btn-check-outlined"><FontAwesomeIcon icon={faUserTie} />Organization </label>
                
                      <input type="radio" className="btn-check " id="btn-check-outlined1" autoComplete="off" name="role" value="TEACHER" required></input>
                      <label className="btn btn-outline-primary " htmlFor="btn-check-outlined1"><FontAwesomeIcon icon={faChalkboardUser} /> Teacher</label>
                  
                      <input type="radio"   className="btn-check " id="btn-check-outlined2" autoComplete="off" name="role" value="STUDENT" required></input>
                      <label className="btn btn-outline-primary " htmlFor="btn-check-outlined2"><FontAwesomeIcon icon={faGraduationCap} /> Student</label>
                   


                </div>
                <div className="mb-3 ">
                  <div className='row'>
                    <div className='col-sm-6'>
                       <Inputs name="FirstName" type="text" className="form-control" placeholder="FirstName" errorMessage="FirstName required " disabled={values.role==="ORGANIZATION"} onChange={onChange} hide={values.role==="ORGANIZATION"} required></Inputs>
                      
                    </div>
                    <div className='col-sm-6'>
                     <Inputs name="LastName" type="text" className="form-control" placeholder="LastName" errorMessage="LastName required " disabled={values.role==="ORGANIZATION"} onChange={onChange} hide={values.role==="ORGANIZATION"} required></Inputs>
    
                    </div>
                    <div className='col-sm-12 mt-3 mb-2'>
                     <Inputs name="BirthDate" type="date" className="form-control"  errorMessage="Birth Date required " disabled={values.role==="ORGANIZATION"} onChange={onChange} hide={values.role==="ORGANIZATION"} required></Inputs>

                    </div>
                  </div>
                  <div className="col">
                    
                     <div className=" col-sm-12 mb-2 mt-2" >
                        
                     <Inputs name="Name" type="text" className="form-control" placeholder="Name" errorMessage="Name required " disabled={values.role!=="ORGANIZATION"} onChange={onChange} hide={values.role!=="ORGANIZATION"} required></Inputs>
                      <div className='row'>
                        <div className='col-sm-6'>
                          <Inputs name="Cin" type="text" className="form-control" placeholder="Cin" maxLength={8} minLength={8} errorMessage="Cin required " onChange={onChange} disabled={values.role==="ORGANIZATION"} hide={values.role==="ORGANIZATION"} required></Inputs>

                        </div>
                        <div className='col-sm-6'>
                          {values.role!=="ORGANIZATION" && <Select options={options} name="Sexe" onChange={handleChange} value={options.find(obj => obj.value === selectedValue)}  placeholder="Gender"/>}
                        </div>
                      </div>

                        {input1.map(input=>(
                            <div className=" col-sm-12 mb-2 mt-2"key={input.id} >
                                <Inputs  {...input} value={values[input.name]} onChange={onChange} ></Inputs>
                            </div>
                        ))}
                        
                     </div>
                     <div className='row'>
                        {password1.map(input=>(
                            <div className='col-sm-6 mb-2' key={input.id}>
                                <Inputs  {...input} value={values[input.name]} onChange={onChange} ></Inputs>
                            </div>
                        ))}
                      <div className='col-sm-12'>
                        <Inputs name="Adresse" type="text" className="form-control" placeholder="Adresse" errorMessage="Adresse required " onChange={onChange} required></Inputs>
                      </div>
            </div>
                  
                  </div>
                 
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary d-block w-100" type="submit">{loading ? <ClipLoader  color='#FFF' loading={loading}  size={20} /> : "Create"}</button>
                </div>
                <Link className="already" to="/login"><p> You  have an account ?  Sign in here. </p></Link>
               
            </form>
           
        </div>
    </div>

    </div>
  )
}
