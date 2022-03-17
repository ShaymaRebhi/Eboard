import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import NavHead from './components/NavHead';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuizList from "./components/Quiz/QuizList";
import CreateQuiz from "./components/Quiz/CreateQuiz";
import Admin from './components/pages/Admin';
import NotFounds from './components/pages/NotFound';
import Login from './components/pages/Login';
import Classroom from './components/pages/Classroom';
function App() {
  return (
      <>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/services' component={Services} />
            <Route path='/products' component={Products} />
            <Route path='/login' component={Login} />
            <Route path='/sign-up' component={SignUp} />
            <Route path='/quizList' component={QuizList}/>
            <Route path='/formAddquiz/:id'><CreateQuiz/></Route>
            <Route path='/Eboard/auth/admin' component={Admin} />
            <Route path='/classroom' component={Classroom} />
            <Route path='**' component={NotFounds} />
          </Switch>
        </Router>
      </>
  );
}

export default App;