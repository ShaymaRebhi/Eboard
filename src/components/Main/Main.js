import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import socket from '../../socket';
import { useHistory } from "react-router-dom";
import { Button } from 'primereact/button';
import { SiGooglemeet } from "react-icons/si";

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

const Main = (props) => {
  
  
  const history = useHistory();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const currentClass = JSON.parse(localStorage.getItem("idClass"));
  const currentUser = JSON.parse(localStorage.getItem("Student")).Student;
  useEffect(() => {

    socket.on('FE-error-user-exist', ({ error }) => {
      if (!error) {
        
        const roomName = currentClass._id;
        const userName = currentUser.FirstName+" "+currentUser.LastName;

        sessionStorage.setItem('user', userName);
        history.push(`/room/${roomName}`);
      } else {
        setErr(error);
        setErrMsg('User name already exist');
      }
    });
  }, [props.history]);

  function clickJoin() {
    const roomName = currentClass._id;
    const userName = currentUser.FirstName+" "+currentUser.LastName;

    if (!roomName || !userName) {
      setErr(true);
      setErrMsg('Enter Room Name or User Name');
    } else {
      socket.emit('BE-check-user', { roomId: roomName, userName });
     
    }
    sessionStorage.setItem('user', userName);
    history.push(`/room/${roomName}`);

  }

  return (

    <JoinButton>
        <Button className='btn p-button-raised p-button-danger' onClick={clickJoin} label={`Join meet`} icon="pi pi-video"> </Button>
      </JoinButton>
  );
};

const JoinButton = styled.label`
width:100% !important;
position:relative;
top:280px;

 Button{
   width:100% !important;
   font-size:10pt;
   vertical-align:middle;
   text-align:center;
  
   
 }
`;

export default Main;
