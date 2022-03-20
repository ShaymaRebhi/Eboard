import React,{useState}  from 'react'
import '../css/Admin.css'
import Footer from "../Footer";
import {Link} from "react-router-dom";



function CreateForum() {
    const [forum,setForum]=useState({title:"",description:""});

    const HandleSubmit = async () => {
        if((forum.title==="") || (forum.description==="")) {
            alert("invalid Form!");
        }
        else{
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
                                <input type="text" className="form-control" placeholder="Title"/>
                            </div>
                            <div className="form-group">
                                <label style={{color:'#000'}}>Description</label>
                                <textarea className="form-control" placeholder="Description"></textarea>
                            </div>
                            <div className="form-group">
                                <label style={{color:'#000'}}>tags</label>
                                <input type="text" className="form-control" placeholder="Tags"/>
                            </div>
                            <button className="btn btn-primary">Review</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default CreateForum
