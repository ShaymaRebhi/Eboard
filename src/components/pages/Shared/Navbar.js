import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from "react-dark-mode-toggle";
import '../../css/Navbar.css';

import NavHead from './NavHead';

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

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
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu} >
            E-BOARD
            <i className='fab fa-typo3' />
            
          </Link>
         
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          
            <li className='nav-item'>
              <Link to='/' 
              className='nav-links'
               title="Home" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/Aboutus'
                className='nav-links'
                onClick={closeMobileMenu}
                
              >
                About us
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/Contactus'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Contact us
              </Link>
            </li>

            
            
          </ul>
          
      
      </nav>
      
    </>
  );
}

export default Navbar;
