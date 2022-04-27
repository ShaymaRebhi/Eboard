import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../../Assets/Images/logo.png'
import * as AIICons from "react-icons/io5"
import axios from 'axios';
import { getUserConnect } from '../../../utils/api';
import { Avatar } from 'primereact/avatar';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
function Contact({contacts,currentUser,changeChat}) {
    const [currentUserName,setCurrentUserName]=useState(undefined);
    const [connect,SetConnect]=useState(undefined);
    const [Currentselected,setCurrentSelected]=useState(undefined);
    
    
    useEffect(()=>{
        
       axios.get(getUserConnect,{
            headers: {
                'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
            }
        }).then(res=>{
            SetConnect(res.data[0]);
            setCurrentUserName(res.data[0].FirstName+' '+res.data[0].LastName)
        })
     
    },[currentUser])
    const changeCurrentChat=(index,contacts)=>{
        setCurrentSelected(index);
        changeChat(contacts);
    }

    
  return (
    <>
             <Container>
                <div className='brand'>
                    <img src={logo} alt="logo"></img>
                    
                    <Link to="/login" className='icon'><AIICons.IoArrowBackCircleOutline/></Link>
               
                </div>  
                <div className='contacts'>
                    {
                        contacts.map((contact,index)=>{
                            return(
                            <div onClick={()=>changeCurrentChat(index,contact)} className={`contact ${index === Currentselected ? "selected" :""}`} key={index} >
                                <div className='avatar'>
                                        { contact.User.file!=null ?<img  src={contact.User.file} alt='avatar' onError={(e) => e.target.src=`https://ui-avatars.com/api/?name=${contact.FirstName}+${contact.LastName}`}></img>
                                        :<img src={`https://ui-avatars.com/api/?name=${contact.FirstName}+${contact.LastName}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}  alt='avatar'></img>}
                                </div>
                                <div className='username'>
                                    <h3>{contact.FirstName+" "+contact.LastName}</h3>
                                    
                                </div>
                            </div>
                            )
                        })
                    }
                    
                     
                </div>
                <div className='current-user'>
                        
                        
                            
                                {connect && connect.User.file!=null ?  <Avatar className='currentAvatar' image={connect.User.file}  shape="circle" size="large"  /> :<Avatar image={`https://ui-avatars.com/api/?name=mouheb+mhamdi`} className='currentAvatar' shape="circle" size="large"  />}
                         
                                <div className='username'>
                                    <h3>{currentUserName}</h3>
                                    
                                </div>
                </div>
             </Container>
         
     
    </>
  )
}
const Container=styled.div`
        display:grid;
        grid-template-rows:10% 75% 15%;
        overflow:hidden;
        background-color:#4c7391;
        @media(max-width: 615px) {
            .currentAvatar{
                margin-left:-40px;
            }
            h3{
                display:none;
            }
        max-width: 34%;
        .brand{
           
            img{
                display:none;
            }
        }
        
      }
        .brand{
            display:flex;
            align-items:center;
            justify-content:center;
            width:20%;
            margin:13% 25%;
            gap:1rem;
            img{
                height:2rem;
            }
            .icon{
                position: absolute;
                color:white;
                font-size:3rem;
                right:3%;
                
               
            }
            h3{
                color:white;
                text-transform:uppercase;

            }
        }
        .contacts{
            display:flex;
            flex-direction:column;
            align-items:center;
            overflow:auto;
            gap:0.8rem;
            width:100% !important;
            margin-right:25px;
            &::::-webkit-scrollbar{
                
                width:00.2rem;
                &-thumb{
                    background-color:#ffffff39;
                    width:0.1rem; 
                }
            }
            .selected{
                background-color:#0d4b7a !important;
                
            }
            .contact{
                background-color:#ffffff39;
                min-height:5rem;
                width:99% !important;
                cursor:pointer;
                border-radius:0.2rem;
                padding:0.4rem;
                gap:1rem;
                align-items:center;
                display:flex;
                transition:0.5s ease-in-out;
            } 
          
          .username{
              h3{
                  color:white;
                  font-size:1rem;
              }
          }
          .select{
              background-color:red;
          }
        }
        .current-user{
            background-color:#4c7391;
            display:flex;
            margin:auto 0px 0px 0px;
            width:100%;
            padding:50px;
            .avatar{
                margin-bottom:20px;
                img{
                    height:4rem;
                    max-inline-size:100%;
                    border-radius:50%;
                }
                
            }
            .username{
                
                margin-right:25px;
                    h3{
                        color:white !important;
                        
                    }
            }
            @media screen and (min-width:720px)and (max-width:1080px){
                
                .username{
                    h3{
                        font-size:1rem;
                    }
                }
                
          }
         
        }

    `
export default Contact
