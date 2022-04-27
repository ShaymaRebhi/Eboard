import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router,Redirect, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/pages/Auth/Login';
import 'devextreme/dist/css/dx.light.css';
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
import { LinkedInCallback } from 'react-linkedin-login-oauth2';
import ForgetPwdAdmin from './components/pages/Auth/ForetPwdAdmin';
import Profile from './components/pages/Profile/Profile';
import DeleteStudent from './components/pages/AdminPages/Action/DeleteStudent';
import ActivateAccount from './components/pages/Auth/ActivateAccount';
import ResetPwdAdmin from './components/pages/Auth/ResetPwdAdmin';
import styled,{ThemeProvider} from 'styled-components';
import {lightTheme,darkTheme,Global} from './Themes'
import DeleteReclamation from './components/pages/AdminPages/Action/DeleteReclamation';
import UpdateStudent from './components/pages/AdminPages/Action/UpdateStudent';
import DeleteTeacher from './components/pages/AdminPages/Action/DeleteTeacher';
import DeleteOrganization from './components/pages/AdminPages/Action/DeleteOrganization';
import Main from './components/Main/Main';
import Room from './components/Room/Room';
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import TimeAgo from "javascript-time-ago";
import EvaluationTeacherPage from "./components/Evaluation/EvaluationTeacherPage";
import { requestForToken, onMessageListener } from "./utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toast } from "react-bootstrap";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function App() {

    const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [theme,setTheme]=useState("light");
    
  const  themeToggler=()=>{
      theme==="light" ?setTheme("dark") :setTheme("light");
  };

  useEffect(() => {
    if (notification?.title) {
      setShow(true);
    }
  }, [notification]);

  if (!Notification) {
    alert("Desktop notifications not available in your browser. Try Chromium.");
    return;
  }

  if (Notification.permission !== "granted") Notification.requestPermission();

  requestForToken();

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      setShow(true);
      toast(payload.notification.body);
    })
    .catch((err) => console.log("failed: ", err));
    
   



  return (
    <div className="root">

      <ThemeProvider theme={theme==="light" ?lightTheme:darkTheme}>
          <Global/>
          <StyledApp>
        <div className='chatbot'>
          <Chat></Chat>
          <ToastContainer position="bottom-left" />
        </div>

        <BrowserRouter>

          <Switch>  
          <Route exact path="/meet" component={Main} />
            <Route exact path="/room/:roomId" component={Room} />
            <Route exact path="/linkedin" component={LinkedInCallback} />
            <Route exact path="/verif/:id" component={ActivateAccount} />
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
                path="/Eboard/Students/update/:id"
                exact
                render={(props) => <HomeAdmin {...props} />}
            />
            <Route
                path="/Eboard/Organizations/update/:id"
                exact
                render={(props) => <HomeAdmin {...props} />}
            />
            <Route
                path="/Eboard/Teachers/update/:id"
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
            
            <Route exact path="/Eboard/Students/delete/:id" component={DeleteStudent} />
            <Route exact path="/Eboard/Organizations/delete/:id" component={DeleteOrganization} />
            <Route exact path="/Eboard/Teachers/delete/:id" component={DeleteTeacher} />
            <Route exact path="/Eboard/Reclamations/delete/:id" component={DeleteReclamation} />
            <Route exact path='/Eboard/auth/admin' component={Admin} />
            <Route exact path='/Eboard/auth/forget' component={ForgetPwdAdmin} />

            <Route exact path='/login' component={Login} />
            <Route exact path='/profile' component={Profile} />
            <Route path="/forget" component={ForgetPwd} />
            <Route exact path='/reset/:id' component={ResetPwd} />
            <Route exact path='/Adminreset/:id' component={ResetPwdAdmin} />
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
                path="/displayTask/:id"
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
                path="/archived"
                exact
                render={(props) => <HomeClassroom {...props} />}
            />
            <Route
                path="/updateTask/:id"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
             <Route
            path="/theme/:titre/:id"
            exact
            render={(props) => <HomeCourse {...props} />}
          />
          <Route
            path="/detailCourses/:id"
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
                path="/WorkedTaskStudentList"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/detailQuiz/:id"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/detailTask/:id"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/correctTask/:idStudent/:id"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/RecommendedCourses"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/evaluation"
                exact
                render={(props) => <HomeCourse {...props} />}
            />
            <Route
                path="/evaluationTeacherPage"
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
        </StyledApp>
      </ThemeProvider>
 </div> );
}

export default App;

const StyledApp=styled.div`
color:${props=>props.theme.fontColor}

`