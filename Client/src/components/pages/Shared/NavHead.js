import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff,faLocationDot,faPhone,faEnvelope } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import '../../css/NavHead.css'
import { Link } from 'react-router-dom'
import  { useHistory } from 'react-router-dom'
import styled , { css }from 'styled-components';
import DropdownExampleInline from './DropdownExampleInline'

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
      
    <div>
        <div className="topbar px-4">
                        <div className="container-fluid navHeadItems">
                            <div className=" d-flex flex-nowrap">
                            
                                    <div className="infoSoc position-absolute top-10 start-0 translate-middle-y">
                                        <ul className="d-flex flex-nowrap ">
                                            <li className='href'><i className="ti-headphone-alt "></i><FontAwesomeIcon className="iconNavHead href" icon={faPhone} /> +216 50 566 033</li>
                                            <li className='href'><i className="ti-email "></i><FontAwesomeIcon className="iconNavHead " icon={faEnvelope} /> eboard@esprit.tn</li>
                                        </ul>
                                    </div>

                                    <div className="position-absolute top-10 end-0 translate-middle-y">
                                        <ul className="list-main pt-2  d-flex flex-nowrap">
                        
                                            <li><Link to="" className="href"> <FontAwesomeIcon className="iconNavHead" icon={faLocationDot} /> Location</Link></li>
                                            <li hidden={Bool}><Link to="/login" className="href" onClick={verifLog}><FontAwesomeIcon className="iconNavHead" icon={faPowerOff} />Login</Link></li>
                                            <li hidden={!Bool}><Link to="/login" onClick={logout} className="href"><FontAwesomeIcon className="iconNavHead" icon={faPowerOff} />Logout</Link></li>
                                    
                                        </ul>
                                    </div>
                            </div>
                        </div>
        </div>
   
    </div>
  )
}

export default NavHead
