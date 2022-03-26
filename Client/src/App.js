import React from 'react';

import './App.css';


import { BrowserRouter as Router,Redirect, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import CreateQuiz from "./components/Quiz/CreateQuiz";

import NotFounds from './components/pages/NotFound';
import Login from './components/pages/Login';
import Classroom from './components/pages/Classroom';
import CreateForum from "./components/Forum/CreateForum";
import Forums from "./components/Forum/Forums";
import Forum from "./components/Forum/Forum";


import SignUp from './components/pages/Auth/SignUp';

import ContactUs from './components/pages/Home/ContactUs';
import AboutUs from './components/pages/Home/AboutUs';
import Admin from './components/pages/Auth/Admin';
import Home from './components/pages/Home/Home';
import Navbar from './components/pages/Shared/Navbar';


import DisplayQuiz from './components/Quiz/DisplayQuiz';
import HomeEboard from './components/Home/HomeEboard';
import { BrowserRouter }  from "react-router-dom";
import HomeClassroom from './components/Home/HomeClassroom';
import HomeCourse from './components/Home/HomeCourse';
import Page_404 from './components/Home/404';
import ForgetPwd from './components/pages/Auth/ForgetPwd';
import ResetPwd from './components/pages/Auth/ResetPwd';


function App() {



  return (
      <>
        <BrowserRouter>
          
          <Switch>
             <Route path='/forum/new' component={CreateForum} />
            <Route path='/forums' component={Forums} />
            <Route path='/forum/:id' component={Forum} />            
             
           
            <Route exact path='/Eboard/auth/admin' component={Admin} />
            <Route exact path='/login' component={Login} />
            <Route path="/forget" component={ForgetPwd} />
            <Route exact path='/reset/:id' component={ResetPwd} />
                
            <Route
            path="/"
            exact
            render={(props) => <HomeEboard {...props} />}
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
            path="/sign-up"
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
