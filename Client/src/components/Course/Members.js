import React, { Component } from 'react'
import { Divider , List ,Image , Header, Segment, Icon} from "semantic-ui-react";
import AddUserToClassComponent from './AddUserToClassComponent';

export default class Members extends Component {
  render() {
    return (
      <div>
          <Segment>
          <Header  floated='right'> 
         <AddUserToClassComponent />
             </Header>
            
          <Divider horizontal>Teachers
          
          </Divider>
          
          
          <List selection verticalAlign='middle' size='huge'>
    <List.Item>
      <Image avatar src='images/emine.jpg' />
      <List.Content>
        <List.Header>Amine Zribi</List.Header>
      </List.Content>
    </List.Item>
 
  </List>
  </Segment>
  <br/>
  <Segment>
  <Header  floated='right'> 
  <AddUserToClassComponent />
             </Header>
  <Divider horizontal>Students</Divider>
   
    <List selection verticalAlign='middle' size='huge'>
    <List.Item>
      <Image avatar src='images/shayma.jpg' />
      <List.Content>
        <List.Header>  Shayma Rebhi</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
      <Image avatar src='images/hassen.jpg' />
      <List.Content>
        <List.Header>  Hassen Oueslati</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
      <Image avatar src='images/20220131_023759.jpg' />
      <List.Content>
        <List.Header>  Mouheb Mhamdi</List.Header>
      </List.Content>
    </List.Item>
 
  </List>
  </Segment>
      </div>
    )
  }
}
