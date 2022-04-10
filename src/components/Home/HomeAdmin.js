import React, { useEffect } from 'react'
import PrivateRoute from "../../Routes/PrivateRoute";
import NavBar from '../pages/Shared/SideBarAdmin/NavBar';
import TeachersList from '../pages/AdminPages/TeachersList';
import Organizations from '../pages/AdminPages/Organizations';
import Students from '../pages/AdminPages/Students';
import Reclamations from '../pages/AdminPages/Reclamations';
import Supports from '../pages/AdminPages/Supports';
import Home from '../pages/AdminPages/Home';
import { useHistory } from 'react-router-dom';
export default function HomeAdmin() {
    const history=useHistory();
    const data=  JSON.parse(localStorage.getItem('login'));
   
    const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
          return null;
        }
      };
    useEffect(()=>{
        const  decodedToken = parseJwt(data.AccessToken);
        if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.clear();
                history.push("/Eboard/auth/admin");
          }else{
            console.log("stay logedIn  "+decodedToken.exp);
          }
    },[])
  if(localStorage.getItem('login')===null ){
        history.push("/Eboard/auth/admin");
    }else{
      if(data.User.role!=="ADMIN"){
       
        history.push("/404");
      }
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
              path="/Eboard/Reclamations"
              exact
              component={Reclamations}
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
