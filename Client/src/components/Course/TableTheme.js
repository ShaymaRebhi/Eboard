import React , {useState} from "react";
import {
  Card,
  Dropdown,
  Grid,
  Header,
  Segment,
  
} from "semantic-ui-react";
import ModalConfirmDelete from "./ModalConfirmDelete";
import { Link  } from "react-router-dom";
import ModalTheme from "./ModalTheme";
import '../css/CardClass.css';
import Courses from "./Courses";


function TableTheme ()  {
 const [show,setShow] = useState(false) 
  
    
  return (
    <div>
      
        <div>
          <br />
          <Segment>
            <Link to="/feed">
              <Header color="grey" as="h3" textAlign="center">
                All Themes
              </Header>
            </Link>
          </Segment>

         
          <Card.Group className="cardt">
          
              <Card fluid >
              
                <Card.Content>
                
                  <Card.Header>                  
                    <Grid stackable>
                      <Grid.Row>
                        <Grid.Column width={15}>  
                                          
                            <Header as="h3" color="black" onClick={()=>setShow(!show)} > 
                              <a>Introduction</a>
                            </Header>
                           
                        </Grid.Column>
                        <Grid.Column >
                          
                            <Dropdown
                              fluid
                              pointing
                              direction="left"
                              className="icon"
                              icon="ellipsis vertical"
                            >
                              <Dropdown.Menu>
                                <ModalTheme
                                  headerTitle="Edit Seance"
                                  buttonTriggerTitle="Edit"
                                  buttonSubmitTitle="Save"
                                  buttonColor="black"
                                  icon="edit"
                                 
                                 
                                />

                                <ModalConfirmDelete 
                                  headerTitle="Delete Theme"
                                  buttonTriggerTitle="Delete"
                                  buttonColor="red"
                                  icon="trash"
                                 
                                />
                              </Dropdown.Menu>
                            </Dropdown>
                       
                            <></>
                        
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                   
                  </Card.Header>  

                 

                  {
                    show?
                   
                    <Courses  />:null
                  }
                
                </Card.Content>
              
              </Card>
              

              <Card fluid >
                <Card.Content>
                  <Card.Header>
                    <Grid stackable>
                      <Grid.Row>
                        <Grid.Column width={15}>
                          
                            <Header as="h3" color="black" >
                              Hooks
                            </Header>
                         
                        </Grid.Column>
                        <Grid.Column >
                          
                            <Dropdown
                              fluid
                              pointing
                              direction="left"
                              className="icon"
                              icon="ellipsis vertical"
                            >
                              <Dropdown.Menu>
                                <ModalTheme
                                  headerTitle="Edit Seance"
                                  buttonTriggerTitle="Edit"
                                  buttonSubmitTitle="Save"
                                  buttonColor="black"
                                  icon="edit"
                                 
                                 
                                />

                                <ModalConfirmDelete 
                                  headerTitle="Delete Theme"
                                  buttonTriggerTitle="Delete"
                                  buttonColor="red"
                                  icon="trash"
                                 
                                />
                              </Dropdown.Menu>
                            </Dropdown>
                       
                            <></>
                        
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Card.Header>
                 
                
                </Card.Content>
              </Card>
           
          </Card.Group>
        </div>
     
    </div>
  );
}
export default TableTheme ;
