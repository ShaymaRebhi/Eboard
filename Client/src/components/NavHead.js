import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff,faLocationDot,faPhone,faEnvelope } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import './css/NavHead.css'
import { Link } from 'react-router-dom'

function NavHead() {
  return (
    <div>
     
        
        <header className="header shop ">
                    <div className="topbar">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-6">
                                    
                                    <div className="top-left">
                                        <ul className="list-main">
                                            <li><i className="ti-headphone-alt"></i><FontAwesomeIcon className="iconNavHead" icon={faPhone} /> +216 50 566 033</li>
                                            <li><i className="ti-email"></i><FontAwesomeIcon className="iconNavHead" icon={faEnvelope} /> eboard@esprit.tn</li>
                                        </ul>
                                    </div>

                                </div>

                                <div className="col-sm-6">
        
                                    <div className="right-content">
                                        <ul className="list-main">
                                            
                                            <li><Link to="" className="href"> <FontAwesomeIcon className="iconNavHead" icon={faLocationDot} /> Location</Link></li>
                                            <li><Link to="/login" className="href"><FontAwesomeIcon className="iconNavHead" icon={faPowerOff} /> Login</Link></li>
                                            
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
