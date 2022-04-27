import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Admin.css'


function Admin() {
  return (
    <div>
    
   
    <section className="login-clean">
        <form method="post">
            <h2 className="visually-hidden">Login Form</h2><small>Super user</small><img src="/images/Groupe%20125.png" alt="logo"></img>
            <div className="illustration"></div>
            <div className="mb-3"><input className="form-control" type="email" name="email" placeholder="Email"></input></div>
            <div className="mb-3"><input className="form-control" type="password" name="password" placeholder="Password"></input></div>
            <div className="mb-3"><button className="btn btn-primary d-block w-100" type="submit">Log In</button></div><Link className="forgot" to="#">Forgot your email or password?</Link>
        </form>
    </section>

  </div>
  )
}

export default Admin
