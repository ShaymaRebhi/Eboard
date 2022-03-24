import React,{useState,useEffect} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Contact from './Contact'
import Welcome from './Welcome';
import ChatContainer from './ChatContainer';
export default function ChatUser() {

  const [contacts,setContacts]=useState([]);
  const [currentUser,setCurrentUser]=useState(undefined);
  const [currentProfile,setCurrentProfile]=useState(undefined);
  const history=useHistory();

  const [currenChat,setCurrentChat]=useState(undefined);
  useEffect(()=>{
   
        axios.get(`http://localhost:3000/user/chat/all/6234fff2f1638600163deaf1`).then(res=>{
          setContacts(res.data);
        });
       
     

  },[])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async()=>{
    if(localStorage.getItem('login')===null ){
        history.replace("/login")
    }else{
      axios.get("http://localhost:3000/user/connect", { headers: {"Authorization" : `Bearer ${JSON.parse(localStorage.getItem('login')).AccessToken}`} }).then(res => {
         console.log(res.data[0].FirstName);
        setCurrentUser(res.data[0].User)
      })
     
    }
  },[])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  



  const Container=styled.div`
        height:100vh;
        width:100vw;
        display:flex;
        flex-direction:column;
        justify-content:center;
        gap:1rem;
        align-items:center;
        background-color:#fff;
        .container{
          height:80vh;
          width:70vw;
          background-color:#8EB2CD;
          border-radius:5px 5px;
          display:grid;
          grid-template-columns:27% 75%;
          @media screen and (min-width:720px)and (max-width:1080px){
            grid-template-columns:35% 65%;
          }
        }
`;

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
                      <ChatContainer currentUser={currentUser}/>
                    )}
                  
                  
            </div>
        </Container>
  
  );
 
  
}


