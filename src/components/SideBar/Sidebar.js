import { Link } from "react-router-dom";
import {
  Card,
  Image, 
  Icon,
  Message,
  Menu,  
  Label,
  Grid, 
  Divider,
  Dropdown,
  Segment,
  Step,
} from "semantic-ui-react";
import React  from 'react';
import '../css/Sidebar.css';
import './Sidebar.css'


function SideBar(){

  return (
    <div  >
<Grid stackable  >
        <Card stackable  >         
            <Menu size="small" fluid vertical className="menuS">
              <Link to="/classroom">
                <Menu.Item>                    
                <Icon  name='list alternate outline' size='large' />
                </Menu.Item>
              </Link>
              <Link to="/">
                <Menu.Item>
                <Icon  name='comment outline' size='large'  />
                </Menu.Item>
              </Link>

              <Link to="/">
                <Menu.Item>
                <Icon  name='calendar outline' size='large'  />
                </Menu.Item>
              </Link>
              <Link to="/">
                <Menu.Item>
                <Icon  name='file archive outline' size='large'  />
                </Menu.Item>
              </Link>
              
            </Menu>
        
          <Card.Content extra>
            <a>
            
        <div className="avatar">
          <img src='images/asma.jpg' alt="user" />
        </div>
       
            </a>
          </Card.Content>
        </Card>
      </Grid>
    </div>
  )
}
export default SideBar;
