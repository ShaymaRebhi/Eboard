import React,{useState}  from 'react'
import '../css/Admin.css'
import Footer from "../Footer";
import { useDispatch } from 'react-redux'
import {createForum} from "../../redux/slices/ForumSlice";


function CreateForum() {
    const [forum,setForum]=useState({Title:"",Description:"",Tags:""});

    const dispatch = useDispatch();

    const HandleSubmit = () => {
        if((forum.title==="") || (forum.description==="")) {
            alert("invalid Form!");
        }
        else{
            dispatch(createForum(forum));
            console.log(forum);
        }
    };
    return (
        <div className="bodyy">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mb-12" style={{padding:'2%'}}>
                        <div className="form">
                            <div className="form-group">
                                <label style={{color:'#000'}}>Title</label>
                                <input type="text" className="form-control" placeholder="Title"
                                       onChange={(e) =>
                                           setForum({ ...forum, Title: e.target.value })
                                       }
                                />
                            </div>
                            <div className="form-group">
                                <label style={{color:'#000'}}>Description</label>
                                <textarea className="form-control" placeholder="Description"
                                          onChange={(e) =>
                                              setForum({ ...forum, Description: e.target.value })
                                          }
                                />
                            </div>
                            <div className="form-group">
                                <label style={{color:'#000'}}>tags</label>
                                <input type="text" className="form-control" placeholder="Tags"
                                       onChange={(e) =>
                                           setForum({ ...forum, Tags: e.target.value })
                                       }
                                />
                            </div>
                            <button className="btn btn-primary" onClick={HandleSubmit}>Review</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default CreateForum
