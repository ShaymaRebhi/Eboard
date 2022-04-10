import React ,{useEffect}from 'react';
import { Grid } from "semantic-ui-react";
import PrivateRoute from "../../Routes/PrivateRoute";
import SideBar from '../SideBar/Sidebar';
import Classroom from '../Classroom/Classroom';

import '../SideBar/Sidebar.css'
import NavbarInside from '../NavbarInside/NavbarInside';
import Calendar from '../Classroom/Calendar';
import { useHistory } from 'react-router-dom';
import Reclamation from '../Reclamations/Reclamation';
import CreateForum from '../Forum/CreateForum';
import Forums from '../Forum/Forums';
import Forum from '../Forum/Forum';
import { useJwt } from "react-jwt";

function HomeClassroom(){
    
    
      
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
                       
                            <SideBar />
                       
                        <Grid.Column width={13} >
                            <div className='mcontainer'>
                                <PrivateRoute
                                    path="/classroom"
                                    exact
                                    component={Classroom}
                                />
                                <PrivateRoute
                                    path="/calendar"
                                    exact
                                    component={Calendar}
                                />
                                <PrivateRoute
                                    path="/Reclamation"
                                    exact
                                    component={Reclamation}
                                />
                                <PrivateRoute
                                    path="/forum/new"
                                    exact
                                    component={CreateForum}
                                />
                                <PrivateRoute
                                    path="/forums"
                                    exact
                                    component={Forums}
                                />
                                <PrivateRoute
                                    path="/forum/:id"
                                    exact
                                    component={Forum}
                                />

                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>
        </div>
    )
}
export default HomeClassroom;