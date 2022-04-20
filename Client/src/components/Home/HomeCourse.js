import React, { useEffect } from 'react';
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
import Feed from '../Course/Feed';
import { Theme } from '../Course/Theme';
import Members from '../Course/Members';
import DisplayTask from "../Task/DisplayTask";
import CreateTask from "../Task/CreateTask";
import TaskList from "../Task/TaskList";
import { useHistory } from 'react-router-dom';
import EditTask from "../Task/EditTask";
import EditQuiz from "../Quiz/EditQuiz";
import AssignedQuizStudentList from "../Quiz/AssignedQuizStudentList";
import WorkedQuizStudentList from "../Quiz/WorkedQuizStudentList";
import DetailQuiz from "../Quiz/DetailQuiz";
import AssignedTaskStudentList from "../Task/AssignedTaskStudentList";

function HomeCourse(){

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
                history.push("/login");
          }else{
            console.log("stay logedIn  "+decodedToken.exp);
          }
    },[])
    if(localStorage.getItem('login')===null ){
        history.push("/login");
    }
    return (
        <div>
            <div className='spacing_3la_3ajlaa'>
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
                                    path="/feed"
                                    exact component={Feed}
                                />
                                <PrivateRoute
                                    path="/theme"
                                    exact component={Theme}
                                />
                                <PrivateRoute
                                    path="/quizlist"
                                    exact component={QuizList}
                                />
                                <PrivateRoute
                                    path="/createquiz"
                                    exact component={CreateQuiz}
                                />
                                <PrivateRoute
                                    path="/updateQuiz/:id"
                                    exact component ={EditQuiz}
                                />
                                <PrivateRoute
                                    path="/displayQuiz/:id"
                                    exact component ={DisplayQuiz}
                                />
                                <PrivateRoute
                                    path="/displayTask"
                                    exact component ={DisplayTask}
                                />
                                <PrivateRoute
                                    path="/formAddTask"
                                    exact component ={CreateTask}
                                />
                                <PrivateRoute
                                    path="/updateTask/:id"
                                    exact component ={EditTask}
                                />
                                <PrivateRoute
                                    path="/tasklist"
                                    exact component ={TaskList}
                                />
                                <PrivateRoute
                                    path="/members"
                                    exact component ={Members}
                                />
                                <PrivateRoute
                                    path="/assignedQuizStudentList"
                                    exact component={AssignedQuizStudentList}
                                />
                                <PrivateRoute
                                    path="/workedQuizStudentList"
                                    exact component={WorkedQuizStudentList}
                                />
                                <PrivateRoute
                                    path="/assignedTaskStudentList"
                                    exact component={AssignedTaskStudentList}
                                />
                                <PrivateRoute
                                    path="/detailQuiz/:id"
                                    exact component ={DetailQuiz}
                                />
                            </div>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
            </div>
        </div>
    )
}
export default HomeCourse ;