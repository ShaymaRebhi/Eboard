import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff,faLocationDot,faPhone,faEnvelope } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import '../../css/NavHead.css'
import { Link } from 'react-router-dom'
import  { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'


function NavHead() {
    var getObject = JSON.parse(localStorage.getItem('login'));
    const history=useHistory(); 

const [Bool, setBool] = useState(Boolean);
const logout=()=>{
    localStorage.clear();
    setBool(false);
    history.push("/login")
}


function verifLog(){
   if(getObject!=null){
       if(getObject.Logined){
            setBool(true);
       }else if(!getObject.Logined){
        setBool(false);
       }
   }
 
}

useEffect(()=>{
    verifLog()
    
    }, [])

  return (
    <div >
       
        <header className="header shop ">
                    <div className="topbar">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-6">
                                   
                                    <div className="top-left">
                                        <ul className="list-main pt-2">
                                            <li><i className="ti-headphone-alt"></i><FontAwesomeIcon className="iconNavHead" icon={faPhone} /> +216 50 566 033</li>
                                            <li><i className="ti-email"></i><FontAwesomeIcon className="iconNavHead" icon={faEnvelope} /> eboard@esprit.tn</li>
                                        </ul>
                                    </div>

                                </div>

                                <div className="col-sm-6">
        
                                    <div className="right-content">
                                        <ul className="list-main pt-2">
                                           
                                            <li><Link to="" className="href"> <FontAwesomeIcon className="iconNavHead" icon={faLocationDot} /> Location</Link></li>
                                            <li hidden={Bool}><Link to="/login" className="href" onClick={verifLog}><FontAwesomeIcon className="iconNavHead" icon={faPowerOff} />Login</Link></li>
                                            <li hidden={!Bool}><Link to="/login" onClick={logout} className="href"><FontAwesomeIcon className="iconNavHead" icon={faPowerOff} />Logout</Link></li>
                                            
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
