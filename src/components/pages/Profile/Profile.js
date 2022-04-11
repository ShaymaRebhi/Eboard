import React,{useEffect,useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import {IoChevronBackCircleSharp} from "react-icons/io5";
import { getUserConnect } from '../../../utils/api';
import axios from 'axios';
import Images from '../../Images'
import { Tooltip } from 'primereact/tooltip';
function Profile() {
    const [currentUser,setCurrentUser]=useState(undefined);
    const history=useHistory();
    useEffect(()=>{
        if(localStorage.getItem("login")===null){
            history.push("/login");
        }
        axios.get(getUserConnect,{
            headers: {
                'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
            }
        }).then(res=>{
            setCurrentUser(res.data[0]);
        })
    },[])
    if(currentUser!=null){
        var date =new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(currentUser.User.updatedAt));

    }
    console.log(date)
  return (
    <Container>
       
        <div className="container">
            <div className="row gutters holla">
                <div className="col-sm-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="account-settings">
                                <div className="user-profile">
                                <Tooltip target={`.img`} content="Click to upload other photo" />
                                    <div className="user-avatar">
                                        
                                        <Images id={currentUser ? currentUser.User._id  :null} src={currentUser ? currentUser.User.file  :null}/>
                                        
                                    </div>
                                    <h5 className="user-name">{currentUser ? currentUser.FirstName +' ' +currentUser.LastName  :""}</h5>
						            <h6 className="user-email">{currentUser ? currentUser.User.email  :""}</h6>
                                </div>
                                <div className="about">
						            <h5 className="mb-2 text-primary">Last update</h5>
						            <p className="mb-2 text-white">{date ? date  :""}</p>
                                    
                                </div>
                                <Link to="/login" className=' back'><IoChevronBackCircleSharp/> Go back </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-8 hollas">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row gutters">
                                    <div className="col-sm-12 col-sm-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-3 text-primary">Personal Details</h6>
                                    </div>
                                    <div className="col-sm-6 col-sm-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label for="fullName">First Name</label>
                                            <input type="text" defaultValue={currentUser ? currentUser.FirstName :""} className="form-control" id="fullName" placeholder="Enter full name"></input>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-sm-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label for="fullName">Last Name</label>
                                            <input type="text" defaultValue={currentUser ? currentUser.LastName :""} className="form-control" id="fullName" placeholder="Enter full name"></input>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-sm-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label for="eMail">Email</label>
                                            <input type="email" defaultValue={currentUser ? currentUser.User.email :""} className="form-control" id="eMail" placeholder="Enter email ID"></input>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-sm-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label for="phone">CIN</label>
                                            <input type="text" defaultValue={currentUser ? currentUser.Cin :""} className="form-control" id="phone" placeholder="Enter phone number"></input>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="row gutters">
                                    <div className="col-sm-12 col-sm-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-3 text-primary">Address</h6>
                                    </div>
                                    <div className="col-sm-6 col-sm-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label for="Street">Full Address</label>
                                            <textarea rows="30" cols="33" defaultValue={currentUser ? currentUser.User.Adresse :""} className="form-control" id="Street" placeholder="Adress"></textarea>
                                        </div>
                                    </div>
                                   
                                </div>
                                <div className="row gutters">
                                    <div className="col-sm-12 col-sm-12 col-md-12 col-sm-12 col-12">
                                        <div className="text-right">
                                            <button type="button" id="submit" name="submit" className="btn btn-secondary">Cancel</button>
                                            <button type="button" id="submit" name="submit" className="btn btn-primary">Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
	            </div>
            </div>
        </div>
        
    </Container>
  )
}
const Container =styled.div`
@media(max-width:615px){
    
    .container{
        
       .card-body{
        width:88%;
       }
        .form-group{
            width:78%;
            margin-left:40px;
        }
        .btn{
            width:80%;
            margin-right:30px;
        }
        top:0px !important;
        width:-500px !important;
        .holla{
            top:-50px;
            margin:-50px 60px;
            margin-left:90px;
            
        }
        .hollas{
            margin:0px 60px;
            margin-left:10px;
        
        }
    }
}
margin-top:30px;
height:100%;
min-height:130vh;
color: #FFF;
background: #FFF;
.card {
    background: linear-gradient(90deg, rgb(2,0,36) 0%, rgb(140,177,192) 0%, rgb(140,177,192) 100%);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: 0;
    margin-bottom: 1rem;
}
.account-settings {
    .back{
        font-size:13pt;
        display:flex;
        justify-content:center;
        margin-top:50px;
        color:white;
    }
    .user-profile {
    margin: 0 0 1rem 0;
    padding-bottom: 1rem;
    text-align: center;
    .user-avatar {
         margin: 30px 0 1rem 0;
         img {
            width: 130px;
            height: 150px;
            border-radius:20%;
            box-shadow:10px 10px 30px rgba(0,0,0,0.1);
            cursor:pointer;
         
            
        }
        
    }
    h5{
        .user-name {
            margin: 0 0 0.5rem 0;
        }
    }
    h6{
        .user-email {
                margin: 0;
                font-size: 0.8rem;
                font-weight: 400;
        }
    }
}
.about {
    margin: 1rem 0 0 0;
    font-size: 0.8rem;
    text-align: center;
   
}
}
.form-control {
    border: 1px solid #596280;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    font-size: .825rem;
    background: rgba(255,255,255,0.5);
    color: black;
}
`
export default Profile