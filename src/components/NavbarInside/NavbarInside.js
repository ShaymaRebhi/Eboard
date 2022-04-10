import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import * as AiIcons from "react-icons/ai";
import * as MDIcons from "react-icons/md"
import {SiGoogleclassroom} from "react-icons/si"
import {BiArchive} from "react-icons/bi"
import NavHead from '../pages/Shared/NavHead';
import * as AIICons from "react-icons/ai";
import * as MDICons from "react-icons/md";
import { Tooltip } from 'primereact/tooltip';
import styled from 'styled-components';
function NavbarInside() {
  const [click, setClick] = useState(false);
  const [ Button,setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);
  
  
  return (
    <>
    
      <NavHead></NavHead>
      <Navbar>
          <Link to='/' className='navbar_brand ' onClick={closeMobileMenu} >
            E-BOARD
            <i className='fab fa-typo3' />
            
          </Link>
          
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active ' : 'nav-menu hs'}>
          
          <li>
            <Link to='/' className='nav-links pt-4 mb-3' title="Home"  onClick={closeMobileMenu}>
              <h3><AIICons.AiOutlineHome className='hide-icon ' /><span className='disp'>Home</span></h3>
              </Link>
          </li>
          <li>
              <Link to='/Reclamation' className='nav-links pt-4  mb-3' title="Reclamation"  onClick={closeMobileMenu}>
                <h3><MDICons.MdFeedback className='hide-icon'/><span className='disp'>Reclamation</span></h3>
              </Link>
            </li>
            
            <li className='disp'>
            <Link to='/classroom' className='nav-links' title="classroom"  onClick={closeMobileMenu}>
              <h3 className='disp'>Classroom</h3>
            </Link>
            </li>
            <li className='disp'>
            <Link to='/forums' className='nav-links' title="forums"  onClick={closeMobileMenu}>
               <h3 className='disp'>Forums</h3>
            </Link>
            </li>
            <li className='disp'>
            <Link to='#' className='nav-links' title="#" onClick={closeMobileMenu}>
              <h3 className='disp'>Archive</h3>
            </Link>
            </li>

           
          
      </ul>
      </Navbar>
      
    </>
  );
}

export default NavbarInside;

const Navbar =styled.div`

  .hs{
      width:86vh !important; 
      margin-top:10px !important;
  }

.navmenu {
  display: flex;
  grid-template-columns: repeat(4, auto);
  grid-gap: 5px;
  list-style: none;
  text-decoration: none;
  text-align: left;
  justify-content:center;
  align-items:center;
  
  &:hover{
  color: #fff;
  }
  .disp{
    display: none;
  }
  .hide-icon{
    display: initial;
  }
}
@media screen and (max-width: 960px) {
  .navmenu {
    display: initial;
    flex-direction: column;
    width: 100%;
    min-height: 800px;
    position: absolute;
    top: 70px;
    left: -100%;
    
    z-index: 333333333;
    transition: all 0.5s ease;
    .active {
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(140,177,192,1) 0%, rgba(196,215,229,1) 100%);
    left: 0;
    opacity: 1;
    transition: all 0.5s ease;
    z-index: 333333333;
  }
  .disp{
    display: initial;
  }
  .hide-icon{
    display: none;
  }
  }
}
@media(max-width:615px){
  .navbar_brand{
    margin-left:-5rem;
  }
}

    background:linear-gradient(90deg, rgb(2,0,36) 0%, rgb(140,177,192) 0%, rgb(140,177,192) 100%);
    top:40px ;
    height:60px;
    width:99%;
    display:flex;
    justify-content:start;
    align-items:center;
    position:fixed;
    z-index:9999;
.navbar_brand{
   display:flex;
   justify-content:start;
   align-items:center;
   color:white;
   font-size:20pt;
   width:50%;
   margin-left:3rem;
}
.menu_nav_bar{
   margin-left:2rem;
   font-size:2rem;
   background:none;
   .mobile-icon{
       
   }
}

`;