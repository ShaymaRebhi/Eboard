import React from 'react'
import { useHistory } from 'react-router-dom'
import PrivateRoute from '../../Routes/PrivateRoute'
import Footer from '../pages/Shared/Footer'
import Navbar from '../pages/Shared/Navbar'
import Reclamation from '../Reclamations/Reclamation'
import ReclamationList from '../Reclamations/ReclamationList'

export default function NavBarAndFooterForTheAuth() {
    const history=useHistory();

  if(localStorage.getItem('login')===null ){
        history.push("/login");  
    }
  return (
    <div>
        
         <Navbar />
         <div className='spacing_3la_3ajla'>
            <PrivateRoute
                path="/Claim"
                exact
                component={Reclamation}
                />
                <PrivateRoute
                path="/ClaimList"
                exact
                component={ReclamationList}
                />
         </div>
        <Footer />
    </div>
  )
}
