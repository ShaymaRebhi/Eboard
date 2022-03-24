import React from 'react';
import { Grid } from "semantic-ui-react";
import PrivateRoute from "../../Routes/PrivateRoute";
import SideBar from '../SideBar/Sidebar';
import Classroom from '../Classroom/Classroom';

import '../SideBar/Sidebar.css'
import NavbarInside from '../NavbarInside/NavbarInside';
import { useHistory } from 'react-router-dom';


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
            
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      </div>
        </div>
    )
}
export default HomeClassroom;