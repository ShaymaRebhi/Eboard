import React,{useState}  from 'react'
import '../css/Admin.css'
import { useDispatch } from 'react-redux'
import {update} from "../../redux/slices/ForumSlice";


function UpdateForum(props) {

    const [forum,setForum]=useState(props.forum);

    const dispatch = useDispatch();

    const HandleSubmit = () => {
        if((forum.Title==="") || (forum.Description==="") || (forum.Tags==="")) {
            alert("invalid Form!");
        }
        else{
            dispatch(update(forum));

            alert("Forum updated")
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
                <button className="btn btn-primary" onClick={HandleSubmit}>Update</button>
            </div>
        </div>
    )
}

export default UpdateForum
