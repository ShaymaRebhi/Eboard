import React,{useState,useEffect,useRef} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Contact from './Contact'
import Welcome from './Welcome';
import ChatContainer from './ChatContainer';
import { io } from 'socket.io-client';
import { host } from '../../../utils/api';
export default function ChatUser() {
  const socket=useRef();
  const [contacts,setContacts]=useState([]);
  const [currentUser,setCurrentUser]=useState(undefined);

  const history=useHistory();

  const [currenChat,setCurrentChat]=useState(undefined);
  useEffect(()=>{
    console.log(JSON.parse(localStorage.getItem('login')).Role)
    axios.get(`http://localhost:3000/user/chat/all/${JSON.parse(localStorage.getItem('login')).User._id}/${JSON.parse(localStorage.getItem('login')).Role}`).then(res=>{
      setContacts(res.data);
    });
  },[])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{
    if(localStorage.getItem('login')===null ){
        history.replace("/login")
    }else{
      axios.get(`${process.env.REACT_APP_API_URL}user/connect`, { headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('login')).AccessToken}`} }).then(res => {
         console.log(res.data[0].FirstName);
        setCurrentUser(res.data[0].User)
      })
     
    }
  },[])
  useEffect(()=>{
    if(currentUser){
      socket.current=io(host);
      socket.current.emit("add-user",currentUser._id)
    }
  },[currentUser])
  
  
const handleChatChange =(chat)=>{
  setCurrentChat(chat);
}
  return (
    
        <Container>
         
            <div className='container'>
            
                  <Contact contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}></Contact>
                  {
                    currenChat===undefined ?(
                      <Welcome currentUser={currentUser}/>
                    ):(
                      <ChatContainer currenChat={currenChat} currentUser={currentUser} socket={socket}/>
                    )}
                  
                  
            </div>
        </Container>
  
  );
 
  
}


const Container=styled.div`

  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap:5rem;
  align-items:center;
  background-color:#547D9D;
.container{
  height:100vh;
  width:180vw;
  background-color:#8EB2CD;
  border-radius:5px 5px;
  display:grid;
  grid-template-columns:27% 75%;
  @media screen and (min-width:720px)and (max-width:1080px){
    grid-template-columns:35% 65%;
  }
}
`;
