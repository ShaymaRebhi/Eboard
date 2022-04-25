import React, {  useState } from 'react'
import {  Label, Menu , Icon, Header } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import Main from '../Main/Main';

function MenuCours()  {


  const handleItemClick = (e, { name }) => setActiveItem(name);

  const [activeItem, setActiveItem] = useState("flow");


 

  
    return (
      <Menu size='large' vertical>
           <Header as='h2' image='/images/school.png' content='React Course' />
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
        <Link to="/TaskList">
        <Menu.Item
          name='task'
          active={activeItem === 'task'}
          onClick={handleItemClick}
        >
          <Label>51</Label>
          <Icon name='file alternate' /> Task
        </Menu.Item>
</Link>
<Link to ="/displayQuiz">
        <Menu.Item
          name='exam'
          active={activeItem === 'exam'}
          onClick={handleItemClick}
        >
          <Label>1</Label>
          <Icon name='compose' /> Exam
          
        </Menu.Item>
        </Link>
        <Link to ="/quizlist">
        <Menu.Item
          name='quiz'
          active={activeItem === 'quiz'}
          onClick={handleItemClick}
        >
          <Label>1</Label>
          <Icon name='time' /> Quiz
        </Menu.Item>
        </Link>
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