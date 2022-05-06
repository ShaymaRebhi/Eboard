import React,{useEffect,useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import {IoChevronBackCircleSharp} from "react-icons/io5";
import { getUserConnect } from '../../../utils/api';
import axios from 'axios';
import Images from '../../Images'
import {updateUser} from '../../../utils/api';
import Inputs from '../../Inputs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/inject-style';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'primereact/button';
function OrganizationProfile() {
    const [values,setValues]=useState({
        FirstName:"",
        LastName:"",
        email:"",
        Cin:"",
        Adresse:""
    })
    const onChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value});
        
    }
    
    const handleSubmit= (e)=>{
        e.preventDefault();
        const Data= new FormData(e.target)
        
        let data={
            FirstName:Data.get('FirstName'),
            LastName:Data.get('LastName'),
            email:Data.get('email'),
            Cin:Data.get('Cin'),
            Adresse:Data.get('Adresse')
        }


        updateUser(data,currentUser.User._id)
        
    }
    const [currentUser,setCurrentUser]=useState(undefined);
    const [org,setOrg]=useState(false);
    const history=useHistory();
    if(localStorage.getItem("login")!==null){
        var data=  JSON.parse(localStorage.getItem('login'));
    }
    const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
          return null;
        }
      };
    useEffect(()=>{
        if(localStorage.getItem("login")!==null){
        const  decodedToken = parseJwt(data.AccessToken);
        if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.clear();
                history.replace("/404");
          }else{
            
          }
        }
    },[]);

    useEffect(()=>{
        if(localStorage.getItem("login")===null){
            history.push("/login");
        }else{
            axios.get(getUserConnect,{
                headers: {
                    'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
                }
            }).then(res=>{
                setCurrentUser(res.data[0]);
                
            })
        }
        
        
    },[])
    if(currentUser!=null){
        var date =new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(currentUser.User.updatedAt));

    }
    
      const input2=[
        {
            id:0,
            name:"Name",
            type:"text",
            label:"Name",
            className:"form-control ",
            defaults:currentUser ? currentUser.Name :"",
            placeholder:"Name",
            errorMessage:"The Name is required !",
            required:true
        
          
          
        },{id:1,
            name:"email",
            type:"email",
            label:"Email ID",
            className:"form-control ",
            defaults:currentUser ? currentUser.User.email :"",
            placeholder:"Email ID",
            errorMessage:"It should be a valid email adress!",
            required:true
        
          }
      ]

      useEffect(()=>{
         
        if(currentUser && currentUser.User.role==="ORGANIZATION"){
            setOrg(true);
        }else{
            setOrg(false);
        }
      },[])
  return (
    <Container>
 
       <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={'colored'}
      />
        <div className="container">
            <div className="row gutters holla">
                <div className="col-sm-4">
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="account-settings">
                                <div className="user-profile">
                                
                                    <div className="user-avatar">
                                        
                                        <Images text={`update`} id={currentUser ? currentUser.User._id  :null} src={currentUser ? currentUser.User.file  :null}/>
                                       
                                    </div>
                                    <h5 className="user-name">{currentUser ? currentUser.Name :""}</h5>
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
                           
                            <form method='post' onSubmit={handleSubmit}>
                             
                                <div className="row gutters">
                                    <div className="col-sm-12 col-sm-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-3 text-primary">Personal Details</h6>
                                    </div>
                                
                                { input2.map(v=>(
                                            <div className=" col-sm-6 col-sm-6 col-md-6 col-sm-6 col-12" key={v.id}>
                                                <div className="form-group">
                                                    <Inputs  {...v}  onChange={onChange} ></Inputs>
                                                </div>
                                            </div>
                                    ))}
                                    {console.log(currentUser)}
                                    
                                </div>
                                <div className="row gutters">
                                    <div className="col-sm-12 col-sm-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-3 text-primary">Address</h6>
                                    </div>
                                    <div className="col-sm-6 col-sm-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label for="Street">Full Address</label>
                                            <textarea onChange={onChange}  name="Adresse" rows="30" cols="33" defaultValue={currentUser ? currentUser.User.Adresse :""} className="form-control" placeholder="Adress" required></textarea>
                                           
                                        </div>
                                    </div>
                                   
                                </div>
                                
                            
                                <div className="row gutters">
                                    <div className="col-sm-12 col-sm-12 col-md-12 col-sm-12 col-12">
                                        <div className="text-right ">
                                            <Button label="update" className="p-button-info mt-4" icon="pi pi-user-edit" type="submit" />
                                        
                                            
                                        </div>
                                    </div>
                                </div>
                                </form>
                            
                            
                            </div>
                        </div>
                        
	            </div>
            </div>
        </div>
        
    </Container>
  )
}
const Container =styled.div`
.container{
    margin-top:100px;
    width:50%;
}
.card-body{
        
        height:500px !important;
       }
@media(max-width:615px){
    .card-body{
        width:88%;
        height:1500px !important;
       }
    .container{
        height:1800px !important;
       
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

        .update{
            top:41.001% !important;
            left:44% !important;
            width:130px !important;
        }
    }
    
}
margin-top:30px;

height:100%;
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
            border-radius:20% 20% 0% 0%;
            box-shadow:10px 10px 30px rgba(0,0,0,0.1);
            cursor:pointer;
         
            &:hover{
                opacity: 0.8;
            }
        }
        .update{
            position: absolute;
                top: 31.01%;
                left: 50%;
                transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                background-color: rgba(0,0,0,0.7);
                color: white;
                font-size: 13px;
                
                padding: 5px 10px 10px 10px ;
                border: none;
                cursor: pointer;
                border-radius: 5px;
                text-align: center;
                height:30px !important;
                width:36.5%;
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
export default OrganizationProfile