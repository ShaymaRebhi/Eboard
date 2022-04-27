import React , {useState ,  useEffect } from "react";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import {
  Card,
  Dropdown,
  Grid,
  Header,
  Image,
  Segment,
  
} from "semantic-ui-react";
import ModalConfirmDelete from "./ModalConfirmDelete";
import { Link  } from "react-router-dom";
import ModalTheme from "./ModalTheme";
import '../css/CardClass.css';
import Courses from "./Courses";
import {
  GetThemeByIdClass,
} from "../../redux/slices/Theme";
import { useDispatch, useSelector } from "react-redux";


function TableTheme ()  {
 const [show,setShow] = useState(false) 
 const themes = useSelector((state) => state.theme.theme);

 const CurrentClass = JSON.parse(localStorage.getItem("idClass"));
 const role =  JSON.parse(localStorage.getItem("Student")).Student.User.role;

 const dispatch = useDispatch();
 useEffect(() => {
   dispatch(GetThemeByIdClass(CurrentClass._id));
 }, []);
    
  return (
    <div>
      {themes.length === 0 ? (
        <>
          <br />
          <Image
            centered
            size="medium"
            src={process.env.PUBLIC_URL + "/NothingToDisplay.png"}
          />
          <Header as="h4" textAlign="center">
            <Header.Content>No themes found </Header.Content>
          </Header>
        </>
      ) : (
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
          {themes.map((theme) => (
          <Card key={theme._id}>
                <Card.Content>   
                  <Card.Header>                  
                    <Grid stackable>
                      <Grid.Row>
                        <Grid.Column width={15}>  
                        <Link to={`/theme/${theme.titre}/${theme._id}`}>             
                            <Header as="h3" color="black" onClick={()=>setShow(!show)} > 
                            {theme.titre}
                            </Header>
                           </Link>
                        </Grid.Column>
                        <Grid.Column >
                        {role === "TEACHER" ? (

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
                                  themeId={theme._id}
                                 
                                />

                                <ModalConfirmDelete 
                                  headerTitle="Delete Theme"
                                  buttonTriggerTitle="Delete"
                                  buttonColor="red"
                                  icon="trash"
                                  theme={theme}
                                />
                              </Dropdown.Menu>
                            </Dropdown>
                            ) : (

                            <></>
                            )}
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                   
                  </Card.Header>  
                  <Card.Meta>
                    <ReactTimeAgo date={theme.dateCreation} locale="en-US" />
                  </Card.Meta>
                  <Card.Description>{theme.description}</Card.Description>
                </Card.Content>
              </Card>
            ))}
               
              
            
          
           
          </Card.Group>
        </div>
      )}
    </div>
  );
}
export default TableTheme ;
