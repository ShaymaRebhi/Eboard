import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faPowerOff,faLocationDot } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import './css/NavHead.css'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NavHead() {
  return (
    <div>
     
        
        <header class="header shop ">
                    <div class="topbar">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-sm-6">
                                    
                                    <div class="top-left">
                                        <ul class="list-main">
                                            <li><i class="ti-headphone-alt"></i> +216 50 566 033</li>
                                            <li><i class="ti-email"></i>eboard@esprit.tn</li>
                                        </ul>
                                    </div>

                                </div>

                                <div class="col-sm-6">
        
                                    <div class="right-content">
                                        <ul class="list-main">
                                            
                                            <li><Link to="" className="href"> <FontAwesomeIcon icon={faLocationDot} /> Location</Link></li>
                                            <li><Link to="/login" className="href"><FontAwesomeIcon icon={faPowerOff} /> Login</Link></li>
                                            
                                        </ul>
                                    </div>
       
                                </div>
                            </div>
                        </div>
                    </div>
            </header>
    </div>
  )
}

export default NavHead
