import React from 'react';

import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuizList from "./components/Quiz/QuizList";
import CreateQuiz from "./components/Quiz/CreateQuiz";

import NotFounds from './components/pages/NotFound';

import SignUp from './components/pages/Auth/SignUp';

import ContactUs from './components/pages/Home/ContactUs';
import AboutUs from './components/pages/Home/AboutUs';
import Login from './components/pages/Auth/Login';
import Admin from './components/pages/Auth/Admin';
import Home from './components/pages/Home/Home';
import Navbar from './components/pages/Shared/Navbar';
import ClassInside from './components/Course/ClassInside';
import Classroom from './components/Classroom/Classroom';
import DisplayQuiz from './components/Quiz/DisplayQuiz';

function App() {



  return (
      <>
        <Router>
          
          <Switch>
                
                  <Route exact path='/Eboard/auth/admin' component={Admin} />
                   <Route exact path='/login' component={Login} />
                
            <>
            <Navbar />
              <Route exact path='/'  component={Home} />
              <Route exact path='/Contactus' component={ContactUs} />
              <Route exact path='/Aboutus' component={AboutUs} />
              
              <Route exact path='/sign-up' component={SignUp} />
              <Route exact path='/quizList' component={QuizList}/>
              <Route exact path='/displayQuiz' component={DisplayQuiz}/>
              
              <Route exact path='/formAddquiz/:id'><CreateQuiz/></Route>
              <Route exact path='/classroom' component={Classroom} />
              <Route path='/class' component={ClassInside} />
            </>
            <Route component={NotFounds} />
           
          </Switch>
          
        </Router>
      </>
  );
}

export default App;