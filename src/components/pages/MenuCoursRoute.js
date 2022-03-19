import React, { Component } from 'react'
import QuizList from '../Quiz/QuizList';
import MenuCours from './MenuCours';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
function MenuCoursRoute() {
    return (
        <>
          <Router>
            
            <MenuCours />
            <Switch>
              <Route path='/class/flow'  />
              <Route path='/class/quizList' component={QuizList} />
            
            
            </Switch>
           
          </Router>
        </>
    );
  }
  export default MenuCoursRoute 