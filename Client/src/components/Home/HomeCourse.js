import React from 'react';
import SideBar from '../SideBar/Sidebar';
import { Grid } from "semantic-ui-react";
import Navbar from '../pages/Shared/Navbar';
import QuizList from "../Quiz/QuizList";
import MenuCours from '../Course/MenuCours';
import PrivateRoute from "../../Routes/PrivateRoute";
import CreateQuiz from '../Quiz/CreateQuiz';
import DisplayQuiz from '../Quiz/DisplayQuiz';
import '../SideBar/Sidebar.css'
import NavbarInside from '../NavbarInside/NavbarInside';

function HomeCourse(){
    return (
        <div>
             <NavbarInside />
          <Grid stackable celled="internally">
            <Grid.Row >
              <Grid.Column className="sideb">
                <SideBar />
              </Grid.Column>
              <Grid.Column width={3}>
                <MenuCours />
              </Grid.Column>
              <Grid.Column width={12} >
                  <div className="insideCour">
            <PrivateRoute
              path="/quizlist"
              exact component={QuizList}
            />
            <PrivateRoute
              path="/createquiz"
              exact component={CreateQuiz}
            />
            <PrivateRoute
              path="/displayQuiz"
              exact component ={DisplayQuiz}
            />
           </div>
            </Grid.Column>

              </Grid.Row>
              </Grid>
              </div>
    )
}
export default HomeCourse ;