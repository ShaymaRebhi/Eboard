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
      <nav className='navbar'>
          <Link to='/' className='navbar-logo ' onClick={closeMobileMenu} >
            E-BOARD
            <i className='fab fa-typo3' />
            
          </Link>
          
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          
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
      </nav>
      
    </>
  );
}

export default NavbarInside;