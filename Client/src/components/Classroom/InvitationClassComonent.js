import { Grid, Image, Label, Segment, Button, Card } from "semantic-ui-react";
import React, { useEffect } from "react";
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveClass, fetchclass, fetchInvitationclass, fetchRequestClass, selectinvitationclass } from "../../redux/slices/classline";
import { AddclassApi, ClassInvitationApi } from "../../utils/Class";



export default function InvitationClassComonent() {
  const [classinvit, err] = useSelector(selectinvitationclass);
  const idUserConnect = JSON.parse(localStorage.getItem("idStudent"))._id;
  const role =  JSON.parse(localStorage.getItem("Student")).Student.User.role;

 
  const dispatch = useDispatch();
 

  const Decline = async (idq) => {
    try {
      const res = await ClassInvitationApi.deleteClassInvitation(idq);
      dispatch(fetchInvitationclass(idUserConnect));
      dispatch(fetchActiveClass(idUserConnect));
      dispatch(fetchRequestClass(idUserConnect));
    } catch (error) {
      alert(error);
    }
  };
  const Approve = async (idinviation,idclass,idUser) => {
    try {
      const res = await AddclassApi.addUserToClass(idclass,idUser);
      const res2 = await ClassInvitationApi.deleteClassInvitation(idinviation);
      dispatch(fetchInvitationclass(idUserConnect));
      dispatch(fetchActiveClass(idUserConnect));
      dispatch(fetchRequestClass(idUserConnect));
      dispatch(fetchclass(role,idUserConnect,"Active"));
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    dispatch(fetchInvitationclass(idUserConnect));
    
  }, [dispatch]);
  return (
    <InvitationStyledCompoenent >
      <Grid columns={1} >
        <Grid.Column >
          <Segment raised className="mobile">
            <Label as="a" color="teal" ribbon>
              Class Invitation
            </Label>
            {classinvit?.map((co, i) => (
              <Grid.Column key={i} >
                
                <Card.Group className="invitations">
          <Card>
        <Card.Content>
        <Image
          floated='right'
          size='mini'
         
        />
        <Card.Header>{co.classOb.className}</Card.Header>
        <Card.Meta>{co.classOb.classOwner.FirstName+" "+co.classOb.classOwner.LastName}</Card.Meta>
        <Card.Description>
        {co.classOb.classOwner.FirstName} invited you to join this course 
        </Card.Description>
       </Card.Content>
       <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' onClick={() => Approve(co._id,co.classOb._id,co.userOb._id)}>
            Approve
          </Button>
          <Button basic color='red' onClick={() => Decline(co._id)}>
            Decline
          </Button>
        </div>
       </Card.Content>
         </Card>
        
         </Card.Group>
              </Grid.Column>
            ))}
          </Segment>
        </Grid.Column>
      </Grid>
    </InvitationStyledCompoenent>
  );
}

const InvitationStyledCompoenent=styled.div`
@media(max-width:667px){
  .mobile{
    width:75% !important;
  }
}
  
`;