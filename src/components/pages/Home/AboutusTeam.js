import React from 'react'
import AboutusCards from './AboutusCards';
import Mouheb from '../../../Assets/Images/Mouheb.jpg'
import Shayma from '../../../Assets/Images/shayma.jpg'
import Hassen from '../../../Assets/Images/hassen.jpg'
import Badis from '../../../Assets/Images/badis.jpg'
import Wael from '../../../Assets/Images/Wael.jpg'
function AboutusTeam() {
  return (
    <div className="bg-light py-5 text-dark">
        <div className="container py-5">
            <div className="row mb-4">
                <h2 className="text-center display-3   font-weight-light text-dark pt-5">TechJunkies Team</h2><br/>
                <p className='text-center font-italic text-muted ' style={{marginRight:"auto",marginLeft:"auto",fontWeight:"bold",textAlign:"justify",textJustify:"inter-word"}}>A group of students in the fourth year of engineering in computer science.
                                                We created this platform<br/> to benefit all students and professors as well as an evaluation project for our academic year.</p>

            </div>
            <hr className='hr_about_us'></hr>  
        <div className='container pt-5'>
            <div className="row text-center  ">
                <div className=' col-xs-3 col-md-4'>
                    <AboutusCards name="Mouheb Mhamdi" facebook="https://www.facebook.com/mouhebmhh" github="https://www.github.com/mouhebmhamdi" description="Full Stack Web Developer - Front & Back End - Computer Science Engineer Student - Experienced" post="Web developer" img={Mouheb}></AboutusCards>
                </div>
                <div className='col-xs-3 col-md-4'>
                    <AboutusCards name="Shayma Rebhi" facebook="https://www.facebook.com/profile.php?id=100004621634849" github="https://github.com/ShaymaRebhi" description="Full Stack Web Developer - Front & Back End - Computer Science Engineer Student - Experienced" post="Web developer" img={Shayma}></AboutusCards>
                </div>
                <div className='col-xs-3 col-md-4'>
                    <AboutusCards name="Hassen Oueslati" facebook="https://www.facebook.com/oueslati.hassen.23" github="https://github.com/hassenoueslati" description="Full Stack Web Developer - Front & Back End - Computer Science Engineer Student - Experienced"  post="Web developer" img={Hassen}></AboutusCards>
                </div>
               
                
            </div>
            <div className='row text-center d-flex justify-content-center'>
                <div className=' col-xs-3 col-md-4'>
                    <AboutusCards name="Badis Raissi" facebook="https://www.facebook.com/badis.raissi" github="https://github.com/badisraissi" post="Web developer" description="Full Stack Web Developer - Front & Back End - Computer Science Engineer Student - Experienced" img={Badis}></AboutusCards>
                </div>
              
                <div className='col-xs-3 col-md-4'>
                    <AboutusCards name="Wael Amri" facebook="https://github.com/WaelAmri91" github="https://www.facebook.com/wael.amorri" description="Full Stack Web Developer - Front & Back End - Computer Science Engineer Student - Experienced" post="Web developer" img={Wael}></AboutusCards>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default AboutusTeam;
