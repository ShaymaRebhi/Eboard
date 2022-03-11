import React from 'react';
import { Navbar } from 'reactstrap';
import '../App.css';
import { Button } from './Button';
import './css/HeroSection.css';

function HeroSection() {
  return (
    <>
    
    <div className="container-fluid">
    <div className='hero-container'>
      
      <h1>E-BOARD <br/>LEARNING</h1><br />
      <p>Lorem ipsum dolor sit amet, consectetuer <br />
      adipiscing elit, sed diam nonummy nibh<br />
      euismod tincidunt ut laoreet dolore magna </p>
      
      <div className='hero-btns'>
        
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          GET STARTED <i className='far fa-play-circle' />
        </Button>
       
      </div>
    </div>
    </div>
    </>
  );
}

export default HeroSection;
