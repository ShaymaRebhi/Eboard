import React ,{useEffect}from 'react';
import { Grid } from "semantic-ui-react";
import '../SideBar/Sidebar.css'
import NavbarInside from '../NavbarInside/NavbarInside';
import { useHistory } from 'react-router-dom';


import OrganizationSideBar from '../SideBar/OrganizationSideBar';
import PrivateRoute from '../../Routes/PrivateRoute';
import Payement from '../pages/Organization/Payement';

function HomeOrganization() {
   
    
      
    const history=useHistory();
  
    if(localStorage.getItem('login')===null ){
        history.push("/login");
    }
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
                history.push("/login");
          }else{
            console.log("stay logedIn  "+decodedToken.exp);
          }
    },[])
    return (
        <div>
            <div className='spacing_3la_3ajlaa'>
                <NavbarInside />
                <Grid stackable celled="internally">
                    <Grid.Row>
                       
                            <OrganizationSideBar />
                            
                            <PrivateRoute
                                    path="/Organization/payement"
                                    exact
                                    component={Payement}
                                />

                    </Grid.Row>
                </Grid>

            </div>
        </div>
    )
}

export default HomeOrganization