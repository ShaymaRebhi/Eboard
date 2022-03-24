import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import * as FAIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";
import {SidebarData} from "./SideBar";
import {IconContext} from 'react-icons';
import logo from "../../../../Assets/Images/logo.png"
function NavBar() {
    const [sidebar,setSidebar]=useState(false);

    const showSidebar=()=>setSidebar(!sidebar)
    const history=useHistory();
    const Navbar =styled.div`
    .stretched-link{
        display:flex;
        justify-content:end;
        position:absolute;
        margin-right:30px;
        right:0px;
        color:white;
        font-size:25px;
    }
    background-color:#8EB2CD;
    top:0px !important;
    height:60px;
    width:100%;
    display:flex;
    justify-content:start;
    align-items:center;
    position:fixed;
    z-index:9999;
    .navbar_brand{
        display:flex;
        justify-content:end;
        align-items:end;
        
        left:0;
        img {
            width:150px;
            margin-top:10px;
            margin-left:10px;
        }
    }
    .menu_nav_bar{
        margin-left:2rem;
        font-size:2rem;
        background:none;
    }
   
    `;
    const SideBar=styled.div`
    @media(max-width:615px){
      
    }
    .active{
            left:-100% !important;
            transition: all 1s;
    }
    .nav_menu{
        background-color:#8EB2CD;
        width:250px;
        height:100vh;
        display:flex;
        justify-content:center;
        position:fixed;
        z-index:9999;
        top:60px;
         left:0;
         transition: all 1s;
        
        .nav-menu-items{
            width:100%;
            
            .navbar-toggle{
                .menu-close-bars{
                    background-color:#060b26;
                    text-decoration:none;
                    font-size:25px;
                    display:flex;
                    align-items:center;
                    justify-content:end;
                    margin:30px;
                }
            }
            .nav-text{
                display:flex;
                justify-content:start;
                align-items:center;
                padding:8px 0px 8px 0px;
                margin-left:-15px;
                list-style:none; 
                height:60px;
                span{
                    margin-left:16px;
                }
                a{
                    text-decoration:none;
                    color:#f5f5f5;
                    font-size:18px;
                    width:95%;
                    height:100%;
                    display:flex;
                    align-items:center;
                    padding:0 16px;
                    border-radius:4px;
                }
                a:hover{
                    background-color:#1a83ff;
                }
            }
        }
    }
    
    
    `;

const [Bool, setBool] = useState(Boolean);
const logout=()=>{
    localStorage.clear();
    setBool(false);
    history.push("/Eboard/auth/admin")
}
  return (
    <>  
        <IconContext.Provider value={{color:'#fff'}}>
        <Navbar>
            <Link to="#" className='menu_nav_bar'>
                <FAIcons.FaBars onClick={showSidebar}/>
            
            </Link>
            <Link to="#"  className='navbar_brand '>
                    <img src={logo} alr="logo"></img>
            </Link>
            <Link onClick={logout} className='stretched-link'>
                <IoIcons.IoLogOut ></IoIcons.IoLogOut>
            </Link>
        </Navbar>
        <SideBar>
        <nav className={sidebar ?'nav_menu active':'nav_menu'}>
            
            <ul className='nav-menu-items' >
                
                {SidebarData.map((item,index)=>{
                    return(
                         <li key={index} className={item.cName}  >
                             <Link to={item.path}>
                                 {item.icon}
                                 <span>{item.title}</span>
                             </Link>
                         </li>
                    );
                })}
            </ul>
        </nav>
        </SideBar>
        </IconContext.Provider>
    </>
  )
}

export default NavBar