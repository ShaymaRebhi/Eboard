import React,{useState}  from 'react'
import '../css/Admin.css'
import { useDispatch } from 'react-redux'
import {createForum} from "../../redux/slices/ForumSlice";


function CreateForum() {
    const [forum,setForum]=useState({Title:"",Description:"",Tags:"",User:"623113a28d227d001659e502"});

    const dispatch = useDispatch();

    const HandleSubmit = () => {
        if((forum.Title==="") || (forum.Description==="")) {
            alert("invalid Form!");
        }
        else{
            dispatch(createForum(forum));
            setForum({Title:"",Description:"",Tags:"",User:"623113a28d227d001659e502"})
            alert("Forum added")
        }
    };
    return (
        <div >
            <div className="form">
                <div className="form-group">
                    <label style={{color:'#000'}}>Title</label>
                    <input type="text" className="form-control" placeholder="Title"
                           value={forum.Title}
                           onChange={(e) =>
                               setForum({ ...forum, Title: e.target.value })
                           }
                    />
                </div>
                <div className="form-group">
                    <label style={{color:'#000'}}>Description</label>
                    <textarea className="form-control" placeholder="Description"
                              value={forum.Description}
                              onChange={(e) =>
                                  setForum({ ...forum, Description: e.target.value })
                              }
                    />
                </div>
                <div className="form-group">
                    <label style={{color:'#000'}}>tags</label>
                    <input type="text" className="form-control" placeholder="Tags"
                           value={forum.Tags}
                           onChange={(e) =>
                               setForum({ ...forum, Tags: e.target.value })
                           }
                    />
                </div>
                <button className="btn btn-primary" onClick={HandleSubmit}>Review</button>
            </div>
        </div>
    )
}

export default CreateForum
