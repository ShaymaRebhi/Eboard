import React, { Component } from 'react'
import {  Label, Menu , Icon, Header } from 'semantic-ui-react'
import { Link } from "react-router-dom";
export default class MenuCours extends Component {
  state = { activeItem: 'inbox' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu size='large' vertical>
           <Header as='h2' image='/images/school.png' content='React Course' />
           <Link to="/feed">
        <Menu.Item
        
          name='flow'
          active={activeItem === 'flow'}
          onClick={this.handleItemClick}
        >
          <Label color='teal'>1</Label>
          <Icon name='sitemap' />Flow
        </Menu.Item>
        </Link>
        <Link to="/theme">
        <Menu.Item
        
          name='Theme'
          active={activeItem === 'Theme'}
          onClick={this.handleItemClick}
        >
          <Label >1</Label>
          <Icon name='server' />Theme
        </Menu.Item>
        </Link>
        <Link to ="/evaluation">
        <Menu.Item
          name='evaluation'
          active={activeItem === 'evaluation'}
          onClick={this.handleItemClick}
        >
          <Label>1</Label>
          <Icon name='time' /> Evaluation
          
        </Menu.Item>
        </Link>
        <Link to="/TaskList">
              <Menu.Item
                  name='task'
                  active={activeItem === 'task'}
                  onClick={this.handleItemClick}
              >
                  <Label>51</Label>
                  <Icon name='file alternate' /> Task
              </Menu.Item>
        </Link>
        <Link to ="/quizlist">
        <Menu.Item
          name='quiz'
          active={activeItem === 'quiz'}
          onClick={this.handleItemClick}
        >
          <Label>1</Label>
          <Icon name='time' /> Quiz
        </Menu.Item>
        </Link>
          <Link to ="/RecommendedCourses">
              <Menu.Item
                  name='RecommendedCourses'
                  active={activeItem === 'RecommendedCourses'}
                  onClick={this.handleItemClick}
              >
                  <Label>1</Label>
                  <Icon name='file alternate' /> Recommendation
              </Menu.Item>
          </Link>
        <Menu.Item
          name='disc'
          active={activeItem === 'disc'}
          onClick={this.handleItemClick}
        >
          <Label>1</Label>
          <Icon name='chat' /> Discussion
        </Menu.Item>
        <Link to="/members">
        <Menu.Item
          name='members'
          active={activeItem === 'members'}
          onClick={this.handleItemClick}
        >
          <Label>1</Label>
          <Icon name='user' /> Members
        </Menu.Item>
        </Link>
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
}