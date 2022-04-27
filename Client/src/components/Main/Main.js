import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import socket from '../../socket';
import { useHistory } from "react-router-dom";



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


      <JoinButton onClick={clickJoin}> Join Meet </JoinButton>

  );
};

const JoinButton = styled.label`
  padding-left: 35px;
  padding-right: 35px;

  outline: none;
  border: none;
  border-radius: 15px;
  color: #d8e9ef;
  background-color: grey;
 

  :hover {
    background-color: red;
    cursor: pointer;
  }
`;

export default Main;
