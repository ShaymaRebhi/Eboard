import React from 'react'
import PrivateRoute from "../../Routes/PrivateRoute";
import NavBar from '../pages/Shared/SideBarAdmin/NavBar';
import TeachersList from '../pages/AdminPages/TeachersList';
import Organizations from '../pages/AdminPages/Organizations';
import Students from '../pages/AdminPages/Students';
import Reclamations from '../pages/AdminPages/Claims';
import Supports from '../pages/AdminPages/Supports';
import Home from '../pages/AdminPages/Home';
import { useHistory } from 'react-router-dom';
import Claim from '../pages/AdminPages/Claims';
export default function HomeAdmin() {
    const history=useHistory();

  if(localStorage.getItem('login')===null ){
    
        history.push("/Eboard/auth/admin");
    
    }
  
  return (
    <div>
        
        <NavBar />
        <div className='spacing_3la_3ajla'>
        <PrivateRoute
              path="/Eboard/home"
              exact
              component={Home}
            />
        <PrivateRoute
              path="/Eboard/Organization"
              exact
              component={Organizations}
              
            />
        <PrivateRoute
              path="/Eboard/Teachers"
              exact
              component={TeachersList}
            />
        <PrivateRoute
              path="/Eboard/Students"
              exact
              component={Students}
            />
        <PrivateRoute
              path="/Eboard/Claim"
              exact
              component={Claim}
        />
        <PrivateRoute
              path="/Eboard/Supports"
              exact
              component={Supports}
            />
       </div>
    </div>
  )
}
