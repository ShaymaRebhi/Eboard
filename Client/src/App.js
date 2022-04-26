import React from "react";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Toast } from "react-bootstrap";
import Login from "./components/pages/Auth/Login";
import Admin from "./components/pages/Auth/Admin";
import HomeEboard from "./components/Home/HomeEboard";
import { BrowserRouter } from "react-router-dom";
import HomeClassroom from "./components/Home/HomeClassroom";
import HomeCourse from "./components/Home/HomeCourse";
import Page_404 from "./components/Home/404";
import ForgetPwd from "./components/pages/Auth/ForgetPwd";
import ResetPwd from "./components/pages/Auth/ResetPwd";
import SignUp from "./components/pages/Auth/SignUp";
import Chat from "./components/ChatBot/Chat";
import ChatUser from "./components/pages/Chat/ChatUser";
import HomeAdmin from "./components/Home/HomeAdmin";
import Forums from "./components/Forum/Forums";
import Forum from "./components/Forum/Forum";
import CreateForum from "./components/Forum/CreateForum";
import ForgetPwdAdmin from "./components/pages/Auth/ForetPwdAdmin";
import { requestForToken, onMessageListener } from "./utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

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
      <div className="chatbot">
        <Chat></Chat>
        <ToastContainer position="bottom-left" />
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
          <Route exact path="/Eboard/auth/admin" component={Admin} />
          <Route exact path="/Eboard/auth/forget" component={ForgetPwdAdmin} />

          <Route exact path="/login" component={Login} />
          <Route path="/forget" component={ForgetPwd} />
          <Route exact path="/reset/:id" component={ResetPwd} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route path="/" exact render={(props) => <HomeEboard {...props} />} />

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
            path="/displayQuiz"
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
            path="/404"
            exact
            render={(props) => <Page_404 {...props} />}
          />
          <Redirect to="/404" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
