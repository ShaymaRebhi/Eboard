import React, {  useState } from 'react'
import {  Label, Menu , Icon, Header } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import Main from '../Main/Main';

function MenuCours()  {


  const handleItemClick = (e, { name }) => setActiveItem(name);

  const [activeItem, setActiveItem] = useState("flow");
  const ModuleName = JSON.parse(localStorage.getItem("idClass")).className;
  const role =  JSON.parse(localStorage.getItem("Student")).Student.User.role;

 

  
    return (
      <Menu size='large' vertical>
           <Header as='h2' image='/images/school.png' content={ModuleName} />
           <Link to="/feed">
        <Menu.Item
        
          name='flow'
          active={activeItem === 'flow'}
          onClick={handleItemClick}
        >
          <Label color='teal'>1</Label>
          <Icon name='sitemap' />Flow
        </Menu.Item>
        </Link>
        <Link to="/theme">
        <Menu.Item
        
          name='Theme'
          active={activeItem === 'Theme'}
          onClick={handleItemClick}
        >
          <Label >1</Label>
          <Icon name='server' />Theme
        </Menu.Item>
        </Link>
          {role === "TEACHER" ? (
                  <Link to ="/evaluationTeacherPage">
                      <Menu.Item
                          name='evaluation'
                          active={activeItem === 'evaluation'}
                          onClick={handleItemClick}
                      >
                          <Label>1</Label>
                          <Icon name='time' /> Evaluation

                      </Menu.Item>
                  </Link>):("")
          }
          {role === "STUDENT" ? (
              <Link to ="/evaluation">
                  <Menu.Item
                      name='evaluation'
                      active={activeItem === 'evaluation'}
                      onClick={handleItemClick}
                  >
                      <Label>1</Label>
                      <Icon name='time' /> Evaluation

                  </Menu.Item>
              </Link>
          ):("")
          }
          {role === "STUDENT" ? (
              <Link to ="/RecommendedCourses">
                  <Menu.Item
                      name='RecommendedCourses'
                      active={activeItem === 'RecommendedCourses'}
                      onClick={handleItemClick}
                  >
                      <Label>1</Label>
                      <Icon name='file alternate' /> Recommendation
                  </Menu.Item>
              </Link>
          ):("")
          }
        <Menu.Item
          name='disc'
          active={activeItem === 'disc'}
          onClick={handleItemClick}
        >
          <Label>1</Label>
          <Icon name='chat' /> Discussion
        </Menu.Item>
        <Link to="/members">
        <Menu.Item
          name='members'
          active={activeItem === 'members'}
          onClick={handleItemClick}
        >
          <Label>1</Label>
          <Icon name='user' /> Members
        </Menu.Item>
        </Link>
        <Main></Main>
        <br>
        </br>
        <br></br>
        <br></br>
        <br>
        </br>
        <br></br>
        <br></br>
        <br>
        </br>
        <br></br>
        <br></br>
        <br>
        </br>
        <br></br>
        <br></br>
      </Menu>
    )
  }

  export default MenuCours;