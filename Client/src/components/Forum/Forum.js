import React, {useEffect, useState} from 'react'
import '../css/Admin.css'
import { useParams } from "react-router"
import  * as api from "../../utils/Forum";

import {useDispatch, useSelector} from 'react-redux'
import {createComment,affichage, selectComment,supprimer,update} from "../../redux/slices/CommentSlice";



function Forum() {
    const [forum,setForum] = useState(null);

    const [form,setForm]=useState(false);

    const params = useParams();
    const getForum = async () => {
        const {data} = await api.getForumById(params.id);
        setForum(data);
    };


    const dispatch = useDispatch();
    const comments = useSelector(selectComment );

    useEffect(() => {
        getForum();
        dispatch(affichage(params.id));
    }, [dispatch]);

    const [comment,setComment]=useState({_id:"",Comment:"",User:"623113a28d227d001659e502"});

    const [commentU,setCommentU]=useState({Comment:"",Forum:params.id,User:""});

    const HandleSubmit = () => {
        if(comment.Comment==="") {
            alert("The comment is empty!");
        }
        else{
            dispatch(createComment(comment));
            setComment({Comment:"",Forum:params.id,User:"623113a28d227d001659e502"})
        }
    };

    const Delete =(id) =>{
        dispatch(supprimer(id))
    };
    const UpdateForm = (comment)=>{
        setForm(!form);
        setCommentU(comment)
    };

    const HandleUpdate = () => {
        if(commentU.Comment==="") {
            alert("The comment is empty!");
        }
        else{
            dispatch(update(commentU));
            setCommentU({_id:"",Comment:"",User:"623113a28d227d001659e502"})
            setForm(false);
        }
    };

    return (
        <div>
            
            <div className="bodyy" style={{padding: '2% 0% 2%'}}>
                <div className="container">
                    <div className="container-fluid mt-100">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <div className="media flex-wrap w-100 align-items-center"><img
                                            src="https://i.imgur.com/iNmBizf.jpg" className="d-block ui-w-40 rounded-circle"
                                            alt=""/>
                                            <div className="media-body ml-3">
                                                <a href="javascript:void(0)" data-abc="true">
                                                    {(forum!==null)?forum.Title:''}
                                                </a>
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
                                    </div>
                                </div>
                                <div className="cardd">
                                    <div className="p-3">
                                        <h6 style={{color:'#000'}}>Comments</h6>
                                    </div>

                                    <div className="mt-2">
                                        {comments.map((c,i) => (
                                            <div className="d-flex flex-row p-3">

                                                <img src="https://i.imgur.com/zQZSWrt.jpg" className="rounded-circle mr-3" style={{width:'45px',height:'45px'}}/>
                                                <div className="w-100">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-flex flex-row align-items-center">
                                                            <span className="mr-2">{c.User.email}</span>
                                                        </div>
                                                        <small>12h ago</small>
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
                                                            <i className="fa fa-heart text-danger"/>0
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <a href="javascript:void(0)" onClick={()=>UpdateForm({_id:c._id, Comment:c.Comment, User:c.User})}  ><i className="fa fa-refresh"/></a>
                                                    <a href="javascript:void(0)" onClick={()=>Delete(c._id)} ><i className="fa fa-trash"/></a>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-3 d-flex flex-row align-items-center p-3 form-color">
                                        <img
                                        src="https://i.imgur.com/zQZSWrt.jpg" width="50" className="d-block ui-w-40 rounded-circle" style={{width:'45px'}}/>
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
            
        </div>
    )
}

export default Forum
