import Footer from '../Footer'
import SideBar from '../SideBar/Sidebar';
import React from 'react'
import MenuCours from './MenuCours';

function ClassInside() {
    return (
        <div>
<div style={{display: 'flex'}}> 
  <SideBar style={{flex: '0 auto '}}></SideBar> 
  <MenuCours></MenuCours>
  </div>
  <Footer></Footer>
        </div>
    )
   
}
export default ClassInside