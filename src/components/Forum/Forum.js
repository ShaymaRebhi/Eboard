import React, {useEffect, useState} from 'react'
import '../css/Admin.css'
import { useParams } from "react-router"
import  * as api from "../../utils/Forum";

import {useDispatch, useSelector} from 'react-redux'
import {createComment,affichageComment, selectComment,supprimer,update,like,dislike} from "../../redux/slices/CommentSlice";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";
import CreateForum from "./CreateForum";
import UpdateForum from "./UpdateForum";
import {selectForum, getForumById, selectF} from "../../redux/slices/ForumSlice";
import {WhatsappShareButton,EmailShareButton,LinkedinShareButton} from "react-share";
import  {EmailIcon,WhatsappIcon, LinkedinIcon}from "react-share";

import FacebookShareButton from "react-share/es/FacebookShareButton";
import FacebookIcon from "react-share/es/FacebookIcon";
import axios from 'axios';
import { getUserConnect } from '../../utils/api';
import { Link } from 'react-router-dom';



function Forum() {
    const  forum = useSelector(selectF );

    const [form,setForm]=useState(false);
    const [forumForm,setForumForm]=useState(false);

    const params = useParams();


    const dispatch = useDispatch();
    const comments = useSelector(selectComment );

    useEffect(() => {
        dispatch(getForumById(params.id));
        dispatch(affichageComment(params.id));
    }, [dispatch]);



    const login=JSON.parse(localStorage.getItem('login'));

    const [comment,setComment]=useState({_id:"",Comment:"",Forum:params.id,User:login.User._id});

    const [commentU,setCommentU]=useState({Comment:"",Forum:params.id,User:login.User._id});

    const HandleSubmit = () => {
        if(comment.Comment==="") {
            alert("The comment is empty!");
        }
        else{
            dispatch(createComment(comment));
            setComment({Comment:"",Forum:params.id,User:login.User._id})
        }
    };

    const Delete =(id) =>{
        dispatch(supprimer(id))
    };
    const UpdateForm = (comment)=>{
        setForm(!form);
        setCommentU(comment)
    };

    const UpdateForumForm = ()=>{
        setForumForm(!forumForm);
    };

    const HandleUpdate = () => {
        if(commentU.Comment==="") {
            alert("The comment is empty!");
        }
        else{
            dispatch(update(commentU));
            setCommentU({_id:"",Comment:"",User:login.User._id});
            setForm(false);
        }
    };

    const Like = (l) => {
        dispatch(like(l));
    };

    const Dislike = (l) => {
        dispatch(dislike(l));
    };
    const [UserConnect,setUserconnect]=useState(undefined);
    const [image,setImage]=useState(undefined);
    const [name,setName]=useState(undefined);
    useEffect(()=>{
        axios.get(getUserConnect,{
            headers: {
                'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
            }
        }).then(res=>{
            
            setUserconnect(res.data[0])
            setImage(res.data[0].User.file)
            setName(res.data[0].FirstName+' '+res.data[0].LastName)
          })
    },[])
    return (
        <div>
         
            <div className="bodyy" style={{padding: '2% 0% 2%'}}>
                <div className="container">
                    <div className="container-fluid mt-100">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <div className="media flex-wrap w-100 align-items-center">
                                            
                                            <div className="media-body mt-3 mb-5">
                                            <img
                                            src={(forum!==null)?forum.User.file:''} className="d-block ui-w-40 rounded-circle"
                                            alt=""/>
                                                <Link to="javascript:void(0)" data-abc="true">
                                                    {(forum!==null)?forum.Title:''}
                                                </Link>
                                                <div className="text-muted small">{(forum!==null)?forum.Date:''}</div>
                                            </div>
                                            <div className="text-muted small ml-3">
                                                <div></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p>
                                            {(forum!==null)?forum.Description:''}
                                        </p>

                                    </div>
                                    <div
                                        className="card-footer d-flex flex-wrap justify-content-between align-items-center px-0 pt-0 pb-3">
                                        <div className="px-4 pt-3">
                                             <span className="text-muted d-inline-flex align-items-center align-middle ml-4">
                                                 <span className="align-middle">{(forum!==null)?forum.Tags:''}</span>
                                             </span>
                                        </div>
                                        <div className="row">
                                            {(forum!==null)?
                                                (forum.User !== login.User._id) ? '' :
                                                    <a href="javascript:void(0)" onClick={() => UpdateForumForm()}
                                                       data-toggle="modal" data-target="#exampleModal"><i className="fa fa-refresh"/></a>
                                                :''
                                            }
                                            {(forum!==null)?
                                            <div>
                                                <FacebookShareButton
                                                    url={"https://eboardfrontendapplication.herokuapp.com/forum/"+forum._id}
                                                    quote={forum.Title}
                                                    hashtag={'#EBOARD'}
                                                    description={forum.Description}
                                                    className="Demo__some-network__share-button"
                                                >
                                                    <FacebookIcon size={32} round />
                                                </FacebookShareButton>

                                                 <WhatsappShareButton
                                                 url={"https://eboardfrontendapplication.herokuapp.com/forum/"+forum._id}
                                                 title={forum.Title}
                                                 >
                                                     <WhatsappIcon size={32} round />
                                                 </WhatsappShareButton>
                                                
                                                 <LinkedinShareButton
                                                 url={"https://eboardfrontendapplication.herokuapp.com/forum/"+forum._id}
                                                 title={forum.Title}
                                                 summary={forum.Description}
                                                 

                                                 >
                                                     <LinkedinIcon size={32} round />
                                                 </LinkedinShareButton>
                                                 </div>
                                             
                                                :
                                                ''
                                                
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className="cardd">
                                    <div className="p-3">
                                        <h6 style={{color:'#000'}}>Comments</h6>
                                    </div>

                                    <div className="mt-2">
                                        {comments.map((c,i) => (
                                            <div className="d-flex flex-row p-3">
                                                {console.log(c)}
                                                <img src={c.User ?c.User.file :""} alt='immmg' className="rounded-circle mr-3" style={{width:'45px',height:'45px'}}/>
                                                <div className="w-100">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-flex flex-row align-items-center">
                                                            <span className="mr-2">{c.User.email}</span>
                                                        </div>
                                                       
                                                    </div>
                                                    {(form &&(c._id===commentU._id))?
                                                        <div>
                                                            <div className="form-group">
                                                                <input type="text" className="form-control" value={commentU.Comment}
                                                                       onChange={(e)=>setCommentU({...commentU, Comment:e.target.value})} />
                                                                       <button className="btn btn-primary" onClick={HandleUpdate}>update</button>
                                                            </div>
                                                        </div>
                                                        :
                                                        <p className="text-justify comment-text mb-0" style={{color:'#000'}}>
                                                            {c.Comment}
                                                        </p>
                                                    }
                                                    <div className="d-flex flex-row user-feed">
                                                    <span className="wish">
                                                            {(c.Likes.findIndex((item) => item.User === login.User._id) === -1) ?
                                                                <a href="javascript:void(0)" onClick={() => Like({
                                                                    User: login.User._id,
                                                                    Comment: c._id
                                                                })}><i className="fa fa-heart text-hover-black"/></a>
                                                            :
                                                                <a href="javascript:void(0)" onClick={() => Dislike({
                                                                    User: login.User._id,
                                                                    Comment: c._id
                                                                })}><i className="fa fa-heart text-danger"/></a>
                                                            }
                                                            {c.Likes.length}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    {(c.User._id !== login.User._id) ? '' :
                                                        <a href="javascript:void(0)" onClick={() => UpdateForm({
                                                            _id: c._id,
                                                            Comment: c.Comment,
                                                            User: c.User
                                                        })}><i className="fa fa-refresh"/></a>
                                                    }
                                                    {(c.User._id !== login.User._id) ? '' :
                                                        <a href="javascript:void(0)" onClick={()=>Delete(c._id)} ><i className="fa fa-trash"/></a>
                                                    }
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-3 d-flex flex-row align-items-center p-3 form-color barbouzo">
                                        <img
                                        src={image ?image :""} width="50" className="d-block  rounded-circle" style={{width:'45px'}}/>
                                        <input type="text" className="form-control" placeholder="Enter your comment..." value={comment.Comment}
                                        onChange={(e)=>setComment({...comment,Comment:e.target.value})}
                                        />
                                        <button className="btn btn-primary" onClick={HandleSubmit}>Reply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div style={{margin:'10% 0% 0% 0%'}} className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel" style={{color:'#000'}}>Update a forum</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {(forum!==null)?
                                <UpdateForum forum={forum}/>
                                :
                                ''
                            }

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    )
}

export default Forum
