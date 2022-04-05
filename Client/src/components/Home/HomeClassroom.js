import React from 'react';
import { Grid } from "semantic-ui-react";
import PrivateRoute from "../../Routes/PrivateRoute";
import SideBar from '../SideBar/Sidebar';
import Classroom from '../Classroom/Classroom';

import '../SideBar/Sidebar.css'
import NavbarInside from '../NavbarInside/NavbarInside';
import Calendar from '../Classroom/Calendar';
import { useHistory } from 'react-router-dom';
import Reclamation from '../Reclamations/Reclamation';


function HomeClassroom(){
    const history=useHistory();

    if(localStorage.getItem('login')===null ){
        history.push("/login");
    }
    return (
        <div>
            <div className='spacing_3la_3ajlaa'>
                <NavbarInside />
                <Grid stackable celled="internally">
                    <Grid.Row>
                        <Grid.Column className="sideb" >
                            <SideBar />
                        </Grid.Column>
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

                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>
        </div>
    )
}
export default HomeClassroom;