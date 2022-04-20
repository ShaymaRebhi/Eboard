import React from 'react';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router,Redirect, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/pages/Auth/Login';
import Admin from './components/pages/Auth/Admin';
import HomeEboard from './components/Home/HomeEboard';
import { BrowserRouter }  from "react-router-dom";
import HomeClassroom from './components/Home/HomeClassroom';
import HomeCourse from './components/Home/HomeCourse';
import Page_404 from './components/Home/404';
import ForgetPwd from './components/pages/Auth/ForgetPwd';
import ResetPwd from './components/pages/Auth/ResetPwd';
import SignUp from './components/pages/Auth/SignUp';
import Chat from './components/ChatBot/Chat';
import ChatUser from './components/pages/Chat/ChatUser';
import HomeAdmin from './components/Home/HomeAdmin';

import ForgetPwdAdmin from './components/pages/Auth/ForetPwdAdmin';
import Profile from './components/pages/Profile/Profile';

function App() {



  return (
      <>
        <div className='chatbot'>
          <Chat></Chat>
        </div>

        <BrowserRouter>

          <Switch>

            <Route
                path="/Eboard/home"
                exact
                render={(props) => <HomeAdmin {...props} />}
            />
            <Route
                path="/Eboard/Teachers"
                exact
                render={(props) => <HomeAdmin {...props} />}
            />
            <Route
                path="/Eboard/Organization"
                exact
                render={(props) => <HomeAdmin {...props} />}
            />
            <Route
                path="/Eboard/Students"
                exact
                render={(props) => <HomeAdmin {...props} />}
            />
            <Route
                path="/Eboard/Reclamations"
                exact
                render={(props) => <HomeAdmin {...props} />}
            />
            <Route
                path="/Eboard/Supports"
                exact
                render={(props) => <HomeAdmin {...props} />}
            />
            <Route exact path="/chat" component={ChatUser} />
            <Route exact path='/Eboard/auth/admin' component={Admin} />
            <Route exact path='/Eboard/auth/forget' component={ForgetPwdAdmin} />

            <Route exact path='/login' component={Login} />
            <Route exact path='/profile' component={Profile} />
            <Route path="/forget" component={ForgetPwd} />
            <Route exact path='/reset/:id' component={ResetPwd} />
            <Route  exact path='/sign-up' component={SignUp} />
            <Route
                path="/"
                exact
                render={(props) => <HomeEboard {...props} />}
            />
            <Route
                path="/Map"
                exact
                render={(props) => <HomeEboard {...props} />}
            />
            
            {/* <Route path='/forum/new' component={CreateForum} /> */}
            {/* <Route path='/forums' component={Forums} />
            <Route path='/forum/:id' component={Forum} /> */}
            <Route
                path="/Reclamation"
                exact
                render={(props) => <HomeClassroom {...props} />}
            />
            <Route
                path="/forum/new"
                exact
                render={(props) => <HomeClassroom {...props} />}
            />
             <Route
                path="/archived"
                exact
                render={(props) => <HomeClassroom {...props} />}
            />
             <Route
                path="/forums"
                exact
                render={(props) => <HomeClassroom {...props} />}
            />
             <Route
                path="/forum/:id"
                exact
                render={(props) => <HomeClassroom {...props} />}
            />
            <Route
                path="/Contactus"
                exact
                render={(props) => <HomeEboard {...props} />}
            />
            <Route
                path="/Aboutus"
                exact
                render={(props) => <HomeEboard {...props} />}
            />

            <Route
                path="/classroom"
                exact
                render={(props) => <HomeClassroom {...props} />}
            />
            <Route
                path="/calendar"
                exact
                render={(props) => <HomeClassroom {...props} />}
            />
            <Route
                path="/class"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/quizlist"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/createquiz"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/updateQuiz/:id"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/feed"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/theme"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/members"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/displayQuiz/:id"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/displayTask"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/tasklist"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/formAddTask"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/updateTask/:id"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/assignedQuizStudentList"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/WorkedQuizStudentList"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/assignedTaskStudentList"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/detailQuiz/:id"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/404"
                exact
                render={(props) => <Page_404 {...props} />}
            />
            <Redirect to="/404" />


          </Switch>


        </BrowserRouter>

      </>
  );
}

export default App;