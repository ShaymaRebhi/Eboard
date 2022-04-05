import React from 'react';
import { Link } from 'react-router-dom';

import '../../../App.css';
import { Button } from '../../pages/Home/Buttons/Button';
import '../../css/HeroSection.css';
import Sliders from './Slider';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function HeroSection() {

  return (
    <>
    
    <div className="container-fluid mb-5">
    <div className='hero-container'>

      <h1>E-BOARD LEARNING</h1><br />
      <p>Online training, a term recommended in Tunisia by the DGLFLF, or online learning, e-training or e-learning, refer to all the solutions and means allowing learning by electronic means.</p>
      
      <div className='hero-btns'>
        
      <Link to='/login' className='btn-mobile'> <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          GET STARTED <i className='far fa-play-circle' />
        </Button></Link>
       
      </div>
     
    </div>
   
    </div>
    
    <div className="container">
      <Sliders></Sliders>
    </div>
    
    </>
  );
}

export default HeroSection;
