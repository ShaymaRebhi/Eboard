import axios from 'axios';
import React, { Component, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Divider , List ,Image , Header, Segment, Icon, Grid} from "semantic-ui-react";
import { fetchclass, fetchInvitationclassId, fetchUsers, selectmembers, selectusers } from '../../redux/slices/classline';
import { getUserConnect } from '../../utils/api';
import { AddclassApi, ClassInvitationApi, getclassApi } from '../../utils/Class';
import AddUserToClassComponent from './AddUserToClassComponent';

export default function Members() {
  const history = useHistory();
  const idUserConnect = JSON.parse(localStorage.getItem("idStudent"))._id;

  const classinvit = JSON.parse(localStorage.getItem("idClass"));
  console.log(classinvit);
  const [members] = useSelector(selectmembers);
  const dispatch = useDispatch();
  const [usersList] = useSelector(selectusers);
 
  
  const Remove = async (idclass, idUser) => {
    try {
      const res = await AddclassApi.removeUserFromClass(idclass, idUser);
      console.log(res);
      const res2 = await getclassApi.getclassById(classinvit._id);

      localStorage.setItem("idClass", JSON.stringify(res2));
      dispatch(fetchclass(idUserConnect,"Active"));
      history.push("/members");
    } catch (error) {
     console.log(error);
    }
  };

  const RemoveInvitation = async (idq) => {
    try {
      await ClassInvitationApi.deleteClassInvitation(idq);
      dispatch(fetchInvitationclassId(classinvit._id));
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    dispatch(fetchInvitationclassId(classinvit._id));
    dispatch(fetchUsers());
    
  }, [dispatch]);
    return (
      <div>
      {classinvit.classOwner._id === idUserConnect && (
        <AddUserToClassComponent floated="right" users={usersList} members={members} />
      )}
      <Header as="h2" icon textAlign="center">
        <Icon name="users" size="big" />
        Accounts
      </Header>
      <Segment raised color="red">
        <div>
          <Header.Subheader>
            {classinvit.classUsers?.map((co, i) => (
              <div key={i}>
                <Grid stackable>
                  <Grid.Row>
                    <Grid.Column width={1}>
                      <Image
                        circular
                        size="mini"
                        src={co.User.file}
                      />
                    </Grid.Column>
                    <Grid.Column width={14}>{co.FirstName+" "+co.LastName}</Grid.Column>
                    <Grid.Column width={1}>
                      {classinvit.classOwner._id === idUserConnect ? (
                        <Icon
                          name="delete"
                          size="tiny"
                          link
                          onClick={() => Remove(classinvit._id, co._id)}
                        />
                      ) : (
                        <></>
                      )}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            ))}
          </Header.Subheader>
        </div>
      </Segment>
      <Header as="h2" icon textAlign="center">
        <Icon name="add user" size="big" />
        Pending Accounts
      </Header>
      <Segment raised color="orange">
        <div>
          <Header.Subheader>
            {members?.map((co, i) => (
              <div key={i}>
                <Grid stackable>
                  <Grid.Row>
                    <Grid.Column width={1}>
                      <Image
                        circular
                        size="mini"
                        src={co.userOb.User.file}
                      />
                    </Grid.Column>
                    <Grid.Column width={14}>{co.userOb.FirstName+" "+co.userOb.LastName}</Grid.Column>
                    <Grid.Column width={1}>
                    {classinvit.classOwner._id === idUserConnect ? (
                        <Icon
                          name="delete"
                          size="tiny"
                          link
                          onClick={() => RemoveInvitation(co._id)}
                        />
                      ) : (
                        <></>
                      )}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
          
            ))}
          </Header.Subheader>
        </div>
      </Segment>
    </div>
    )
  
}
