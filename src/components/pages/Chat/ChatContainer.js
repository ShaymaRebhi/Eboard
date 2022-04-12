import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import { getAllMessagesRoute, getUserConnect, sendMessagesRoute } from '../../../utils/api';
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from "uuid";
import { useHistory } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';

export default function ChatContainer({currentUser,currenChat,socket}) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [userName,SetUserName]=useState(undefined);
    const [UserConnect,SetUserConnect]=useState(undefined);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const data=  JSON.parse(localStorage.getItem('login'));
    const history=useHistory();
    const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
          return null;
        }
      };
    useEffect(()=>{
        
        const  decodedToken = parseJwt(data.AccessToken);
        if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.clear();
                history.push("/login");
          }else{
            console.log("stay logedIn  "+decodedToken.exp);
          }
          console.log(currenChat.FirstName)
    },[])
    useEffect(()=>{
        
      axios.get(getUserConnect,{
           headers: {
               'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
           }
       }).then(res=>{
           console.log(res.data);
           SetUserName(res.data[0].FirstName+' '+res.data[0].LastName);
           SetUserConnect(res.data[0]);
       })
    
   },[userName])

    useEffect(()=>{
      if(currenChat && currentUser){
         axios.post(getAllMessagesRoute,{
          from:currentUser._id,
          to:currenChat.User._id,
        }).then(res=>{
          setMessages(res.data);
        })
      }
    },[messages]);

    const handleSendMsg=(msg)=>{
      socket.current.emit("send-msg",{
        to: currenChat.User._id,
        from: currentUser._id,
        message: msg
      });


       axios.post(sendMessagesRoute,{
        from: currentUser._id,
        to:currenChat.User._id,
        message:msg
      });

    

      
      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);


    };
    useEffect(()=>{
      if(socket.current){
         socket.current.on("msg-recieve",(msg)=>{
          console.log({msg});
          setArrivalMessage({ fromSelf: false, message: msg });
        })
      }
    },[]);

    useEffect(()=>{
       arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    },[arrivalMessage])
    
    useEffect(()=>{
        // eslint-disable-next-line no-unused-expressions
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    },[messages])
  return (
    <Container>
     
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
               
                {currenChat.User && currenChat.User.file!==null ?  <Avatar onError={(e) => e.target.src=`https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg`} image={currenChat.User.file}  shape="circle" size="large"  /> :<Avatar image={`https://ui-avatars.com/api/?name=${currenChat.FirstName+' '+currenChat.LastName}`} shape="circle" size="large"  />}
                    
                </div>
                
                <div className='username'>
                    <h3>{currenChat.FirstName +' '+currenChat.LastName} </h3>
                </div>
            </div>
        </div>
        <div className="chat-messages">
        {messages && messages.map((message) => {
          return (
            <div ref={scrollRef}  key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
                
              </div>
            </div>
          );
        })}
      </div>
        <ChatInput handleSendMsg={handleSendMsg}/>
    </Container>
  )
}
const Container = styled.div`
display: grid;
grid-template-rows: 10% 10% 10%;

overflow: hidden;
@media screen  {
  grid-template-rows: 15% 70% 15%;
 
}
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .user-details {
    background-color:#0d4b7a;
      width:99%;
      max-width: 100%;
      overflow-wrap: break-word;
      padding: 1rem;
      margin-top:-30px;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;
      @media (max-width: 720px)  {
        max-width: 70%;
      }
   
    gap: 0.5rem;
    .avatar {
      img {
        border-radius:50%;
        
          width:3rem;
          height:3rem;
      }
    }
    .username {
      h3 {
        color: white;
      }
    }
  }
}
.chat-messages {
 
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.8rem;
    &-thumb {
      background-color: #0d4b7a;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .message {
   
    display: flex;
    align-items: center;
    .content {
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;
      @media(max-width: 615px) {
        max-width: 70%;
      }
    }
  }
  .sended {
    justify-content: flex-end;
    .content {
      background-color: #4f04ff21;
    }
  }
  .recieved {
    justify-content: flex-start;
    .content {
      background-color: #9900ff20;
    }
  }
}
`;