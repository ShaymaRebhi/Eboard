import React from 'react';
import { Container, Grid } from "semantic-ui-react";
import PrivateRoute from "../../Routes/PrivateRoute";
import SideBar from '../SideBar/Sidebar';
import Classroom from '../Classroom/Classroom';
import ClassInside from '../Course/ClassInside';
import QuizList from "../Quiz/QuizList";
import CreateQuiz from "../Quiz/CreateQuiz";
import Navbar from '../pages/Shared/Navbar';
import '../SideBar/Sidebar.css'
import NavbarInside from '../NavbarInside/NavbarInside';


function HomeClassroom(){
    return (
        <div>
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
    )
}
export default HomeClassroom;