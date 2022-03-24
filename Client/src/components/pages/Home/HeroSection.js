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
      <p>La formation en ligne, terme recommandé en France par la DGLFLF,
         ou encore l'apprentissage en ligne, l'e-formation ou l'e-learning, désignent
         l'ensemble des solutions et moyens permettant l'apprentissage par des moyens
          électroniques.</p>
      
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
