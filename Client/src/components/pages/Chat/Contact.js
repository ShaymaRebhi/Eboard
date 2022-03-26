import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../../Assets/Images/logo.png'
import * as AIICons from "react-icons/ai"
import axios from 'axios';
import { getUserConnect } from '../../../utils/api';
function Contact({contacts,currentUser,changeChat}) {
    const [currentUserName,setCurrentUserName]=useState(undefined);
    
    const [Currentselected,setCurrentSelected]=useState(undefined);
    
    
    useEffect(()=>{
        
       axios.get(getUserConnect,{
            headers: {
                'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
            }
        }).then(res=>{
            console.log(res.data);
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
                    
                    <Link to="/login" className='icon'><AIICons.AiFillHome/></Link>
               
                </div>  
                <div className='contacts'>
                    {
                        contacts.map((contact,index)=>{
                            return(
                            <div onClick={()=>changeCurrentChat(index,contact)} className={`contact ${index === Currentselected ? "selected" :""}`} key={index} >
                                <div className='avatar'>
                                    
                                        <img src={`https://ui-avatars.com/api/?name=${contact.FirstName}+${contact.LastName}`} alt='avatar'></img>
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
                <div className='avatar'>
                                <img src={`https://ui-avatars.com/api/?name=mouheb+mhamdi`} alt='avatar'></img>
                                </div>
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
          .avatar{  
              img{
                vertical-align: middle;
                height: 3rem;
                border-radius: 50%;

             }
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
            justify-content:center;
            align-items:center;
            gap:0.5rem;
            
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
                gap:0.5rem;
                .username{
                    h3{
                        font-size:1rem;
                    }
                }
                
          }
         
        }

    `
export default Contact
