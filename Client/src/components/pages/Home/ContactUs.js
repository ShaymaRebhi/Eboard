import React, { useState } from 'react'
import { Button } from './Buttons/Button'
import '../../css/ContactUs.css'
import { contactUs } from '../../../utils/api'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

function ContactUs() {
    const [values,setValues]=useState({
        name:"",
        email:"",
        phone:"",
        message:""
    })
    const onChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value});
    }

    const handleSubmit =(e)=>{

        e.preventDefault();
        const Data= new FormData(e.target)
        const DataSet={
          "name":values.name,
          "email":values.email,
          "phone":values.phone,
          "message":values.message
        }

        axios.post(contactUs,DataSet).then(response=>{
            toast.success("Your message has been sent thank you");
        }).catch(err=>{
            toast.error("You have an error please try again");
        })
        console.log(DataSet)

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
      <div className="container  contact3 py-5">
            <div className="row no-gutters mt-5 ml-5 mr-5 mb-5">
                <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                    <div className="card-shadow">
                      
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="contact-box ">
                        <h1 className="font-weight-light mt-2">Quick Contact</h1>
                        <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-12">
                            <div className="form-group mt-2">
                                <input className="form-control" name='name' onChange={onChange} type="text" placeholder="name" required></input>
                            </div>
                            </div>
                            <div className="col-lg-12">
                            <div className="form-group mt-2">
                                <input className="form-control" type="email"  name="email" onChange={onChange} placeholder="email address" required></input>
                            </div>
                            </div>
                            <div className="col-lg-12">
                            <div className="form-group mt-2">
                                <input className="form-control" type="number" name="phone" onChange={onChange} placeholder="phone" required></input>
                            </div>
                            </div>
                            <div className="col-lg-12">
                            <div className="form-group mt-2">
                                <textarea className="form-control" rows="3" name="message" onChange={onChange} placeholder="message" required></textarea>
                            </div>
                            </div>
                            <div className="col-lg-12 mt-5">
                            <Button type="submit" ><span> Send</span></Button>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>
                    <div className="col-lg-12 ">
                    <div className="card mt-4 border-0 mb-4">
                        <div className="row margin__contact__us">
                        <div className="col-lg-4 col-md-4">
                            <div className="card-body d-flex align-items-center">
                            <div class="align-self-center">
                                    <img style={{width:"50px"}} src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon1.png"></img>
                            </div> 
                            <div className="text-dark ml-5">
                                   
                                <h6 className="font-weight-medium">Address</h6>
                                <p className="text-dark">2083 -Pole Technologic - El Ghazala.
                                 Tunis</p>
                            </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <div className="card-body d-flex align-items-center c-detail">
                            <div class="mr-3 align-self-center">
                                    <img style={{width:"50px"}} src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon2.png"></img>
                                </div>  
                                <div className="text-dark">
                                    <h6 className="font-weight-medium">Phone</h6>
                                    <p className="text-dark">+216 50 566 033</p>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4">
                            <div className="card-body d-flex align-items-center c-detail">
                            <div class="mr-3 align-self-center">
                                    <img style={{width:"50px"}} src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon3.png"></img>
                                </div>  
                                <div className="">
                                    <h6 className="font-weight-medium">Email</h6>
                                    <p className="text-dark">
                                    info@eboard.com
                                    
                                    </p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
       
    </div>
  )
}

export default ContactUs
