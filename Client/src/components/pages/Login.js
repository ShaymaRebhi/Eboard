import React from 'react'
import { Link } from 'react-router-dom'
import { faUserTie,faChalkboardUser,faGraduationCap } from '@fortawesome/free-solid-svg-icons'

import Footer from '../Footer'
import './../css/Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Login = () => {
  return (
    <div>
      <div className="register-photo">
        <div className="form-container">
            <div className="image-holder">
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
            <form method="post">
               
                <h1 className="text-center ">LOGIN ACCOUNT</h1>
                <label className="text-white pt-4">Login As:</label>
                <div className="row justify-content-md-center">
                    <div className="col-md-4 col-md-offset-1 margin">
                      <input type="checkbox" className="btn-check" id="btn-check-outlined" autocomplete="off"></input>
                      <label className="btn btn-outline-primary" for="btn-check-outlined"><FontAwesomeIcon icon={faUserTie} />Organization </label>
                    </div>
                    <div className="col-md-4 col-md-offset-1 ">
                      <input type="checkbox" className="btn-check" id="btn-check-outlined" autocomplete="off"></input>
                      <label className="btn btn-outline-primary" for="btn-check-outlined"><FontAwesomeIcon icon={faChalkboardUser} /> Teacher</label>
                    </div>
                    <div className="col-md-4 col-md-offset-1 pb-3">
                      <input type="checkbox" className="btn-check" id="btn-check-outlined" autocomplete="off"></input>
                      <label className="btn btn-outline-primary" for="btn-check-outlined"><FontAwesomeIcon icon={faGraduationCap} /> Student</label>
                    </div>


                </div>
                  
                <div className="mb-3 "><input className="form-control" type="email" name="email" placeholder="Email"></input></div>
                <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Password"></input></div>
               
                <div className="mb-3">
                    <div className="form-check"><label className="form-check-label"><input class="form-check-input" type="checkbox"></input>I agree to the license terms.</label></div>
                </div>
                <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Login</button></div><Link className="already" href="#"><p> You don't have an account ?  Login here. </p></Link>
            </form>
        </div>
    </div>
    <Footer></Footer>

    </div>
  )
}

export default Login
