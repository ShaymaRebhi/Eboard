import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import SignUp from './components/pages/SignUp';
import NavHead from './components/NavHead';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuizList from "./components/Quiz/QuizList";
import CreateQuiz from "./components/Quiz/CreateQuiz";
import Admin from './components/pages/Admin';
import NotFounds from './components/pages/NotFound';
import Login from './components/pages/Login';
import Classroom from './components/pages/Classroom';
import SideBar from './SideBar';
import AboutUs from './components/pages/AboutUs';
import ContactUs from './components/pages/ContactUs';
function App() {



  return (
      <>
        <Router>
          
          <Switch>
           <Route exact path='/Eboard/auth/admin' component={Admin} />
          
            <>
            <Navbar />
              <Route exact path='/' exact component={Home} />
              <Route exact path='/Contactus' component={ContactUs} />
              <Route exact path='/Aboutus' component={AboutUs} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/sign-up' component={SignUp} />
              <Route exact path='/quizList' component={QuizList}/>
              <Route exact path='/formAddquiz/:id'><CreateQuiz/></Route>
              <Route exact path='/classroom' component={Classroom} />
            </>
            <Route component={NotFounds} />
          </Switch>
        </Router>
      </>
  );
}

export default App;