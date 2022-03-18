import React from 'react';
import '../../../App.css';
import Cards from './Cards/Cards';
import HeroSection from './HeroSection';
import Footer from '../Shared/Footer';
import Navbar from '../Shared/Navbar';

function Home() {
  return (
    <>
     <Navbar /> 
     <div className='top-spacing'>
      <HeroSection />
      <Cards />
      <Footer />
      </div>
    </>
  );
}

export default Home;
