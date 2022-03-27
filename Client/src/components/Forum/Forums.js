import React,{useState,useEffect}  from 'react'
import './Forum.css'
import Footer from "../Footer";
import {affichage, selectForum,supprimer} from "../../redux/slices/ForumSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink} from 'react-router-dom'
import Navbar from "../Navbar";
import CreateForum from "./CreateForum";

function Forums() {
    const dispatch = useDispatch();
    const  forums = useSelector(selectForum );
    useEffect(() => {
        dispatch(affichage())
    }, [dispatch]);

    const Delete =(id) =>{
        dispatch(supprimer(id))
    };

    return (
        <div>
            <Navbar />
            <div className="bodyy" style={{padding: '2% 0% 2%'}}>
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12 mb-12">
                            <div className="row text-left mb-5">
                                <div className="col-lg-6 mb-3 mb-sm-0">
                                    <input type="text" placeholder="Recherche" className="form-control"/>
                                </div>
                                <div className="col-lg-6 mb-3 mb-sm-0">
                                    <select className="form-control">
                                        <option>test</option>
                                        <option>test2</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>{(forums.length===0)? 'No data found!':''}</div><br/>

                        {forums.map((f,i) => (
                            <div
                                className="card row-hover pos-relative py-3 px-3 mb-3 border-warning border-top-0 border-right-0 border-bottom-0 rounded-0">
                                <div className="row align-items-center">
                                    <div className="col-md-8 mb-3 mb-sm-0">
                                        <h5>
                                            <NavLink to={`/forum/${(f!==null)?f._id:''}`} className="text-primary">{(f!==null)?f.Title:''}</NavLink>
                                        </h5>
                                        <p className="text-sm"><span className="op-6" style={{color:'rgb(122 116 116)'}}>Posted</span> <a className="text-black"
                                                                                                                                          href="#">{(f!==null)?f.Date:''}</a>
                                            <span className="op-6" style={{color:'rgb(122 116 116)'}} >&nbsp; by </span> <a className="text-black" href="#">aaa</a>
                                        </p>
                                        <div className="text-sm op-5"><a className="text-black mr-2" href="#">#C++</a> <a
                                            className="text-black mr-2" href="#">#AppStrap Theme</a> <a
                                            className="text-black mr-2" href="#">#Wordpress</a></div>
                                    </div>
                                    <div className="col-md-4 op-7">
                                        <div className="row text-center op-7">
                                            <div className="col px-1"><i className="ion-connection-bars icon-1x"></i> <span
                                                className="d-block text-sm">141 Votes</span></div>
                                            <div className="col px-1"><i className="ion-ios-chatboxes-outline icon-1x"></i>
                                                <span className="d-block text-sm">122 Replys</span></div>
                                            <div className="col px-1">
                                                <i className="ion-ios-eye-outline icon-1x"></i>
                                                <span className="d-block text-sm">290 Views</span>
                                            </div>
                                            <div className="col px-1">
                                                <a href="javascript:void(0)" onClick={()=>Delete(f._id)}>
                                                    <i className="fa fa-trash"/>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))}


                    </div>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                        Create a Forum
                    </button>

                    <div style={{margin:'10% 0% 0% 0%'}} className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel" style={{color:'#000'}}>Create a forum</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <CreateForum/>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default Forums
