import React from 'react'
import { Button } from '../Button'
import '../css/ContactUs.css'
import Footer from '../Footer'
function ContactUs() {
  return (
    <div>
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
                        <form className="mt-4">
                        <div className="row">
                            <div className="col-lg-12">
                            <div className="form-group mt-2">
                                <input className="form-control" type="text" placeholder="name"></input>
                            </div>
                            </div>
                            <div className="col-lg-12">
                            <div className="form-group mt-2">
                                <input className="form-control" type="email" placeholder="email address"></input>
                            </div>
                            </div>
                            <div className="col-lg-12">
                            <div className="form-group mt-2">
                                <input className="form-control" type="text" placeholder="phone"></input>
                            </div>
                            </div>
                            <div className="col-lg-12">
                            <div className="form-group mt-2">
                                <textarea className="form-control" rows="3" placeholder="message"></textarea>
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
        <Footer></Footer>
    </div>
  )
}

export default ContactUs
