import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/pages/Login';
import Admin from './components/pages/Admin';
function App() {
  return (
    <>
      <Router>
        <Navbar  />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' component={Services} />
          <Route path='/products' component={Products} />
          <Route path='/login' component={Login} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/Eboard/auth/admin' component={Admin} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
