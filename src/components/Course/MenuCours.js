import React, { Component } from 'react'
import { Input, Label, Menu , Icon, Header } from 'semantic-ui-react'
import { Link } from "react-router-dom";
export default class MenuCours extends Component {
  state = { activeItem: 'inbox' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu size='large' vertical>
           <Header as='h2' image='/images/school.png' content='React Course' />
           <Link to="/quizlist">
        <Menu.Item
        
          name='flow'
          active={activeItem === 'flow'}
          onClick={this.handleItemClick}
        >
          <Label color='teal'>1</Label>
          <Icon name='sitemap' />Flow
        </Menu.Item>
        </Link>
        <Link to="/createquiz">
        <Menu.Item
          name='homework'
          active={activeItem === 'homework'}
          onClick={this.handleItemClick}
        >
          <Label>51</Label>
          <Icon name='file alternate' /> Homework
        </Menu.Item>
</Link>
<Link to ="/displayQuiz">
        <Menu.Item
          name='exam'
          active={activeItem === 'exam'}
          onClick={this.handleItemClick}
        >
          <Label>1</Label>
          <Icon name='compose' /> Exam
          
        </Menu.Item>
        </Link>
        <Link to ="/hi">
        <Menu.Item
          name='quiz'
          active={activeItem === 'quiz'}
          onClick={this.handleItemClick}
        >
          <Label>1</Label>
          <Icon name='time' /> Quiz
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
        <Menu.Item
          name='members'
          active={activeItem === 'members'}
          onClick={this.handleItemClick}
        >
          <Label>1</Label>
          <Icon name='user' /> Members
        </Menu.Item>
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