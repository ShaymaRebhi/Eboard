import React, {useState,useEffect} from 'react'
import './CreateTask.css'
import Accordion from "@material-ui/core/Accordion";
import AsyncSelect from 'react-select/async';
import {getOneTask, updateTask} from "../../utils/Task";
import {useHistory, useRouteMatch} from "react-router-dom";
import {toast, ToastContainer } from 'react-toastify';
function EditTask() {
    const match = useRouteMatch();
    const [task, setTask] = useState({
            Title: "",
            Theme: "",
            Description: "",
            QuestionFile: undefined,
            QuestionResponseFile: undefined
        }
    )
    const history = useHistory();
    function componentDidMount(time) {
        setTimeout(() => {history.push("/TaskList")}, time)
    }
    const getTaskWithId=()=>{
        getOneTask(match.params.id,(res)=> {
            setTask(res.data)
        })
    }
    useEffect(()=>{
        getTaskWithId()
    },[])
    const saveTask = (id) => {
        const newTask = {
            Title : task.Title,
            Theme : task.Theme,
            Description : task.Description,
            QuestionFile : task.QuestionFile

        }
        console.log(newTask);
        updateTask(id,newTask,() =>(
            toast.success('Task updated successfuly', {
                position: "bottom-right"
            }),
                componentDidMount(3000)
        ))
    }
    return (
        <div className="DisplayQuestionBox">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Accordion>
                <div className="card-HomeWork" >
                    <h1 className="addtasktitle">Update Task</h1>
                    <br/>
                    <div className="card-content-HomeWork">
                        <div style={{display:"flex"}} className="directioninput">
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <label className="labelHomeWork" htmlFor="questionTitle">Title : </label>
                                <input className="text_input_homeWork" placeholder="write title here" id="questionTitle"
                                       value={task.Title}
                                       onChange={(e) =>setTask({...task, Title: e.target.value})}/>
                            </div>
                            <div style={{display:"flex",flexDirection:"column"}} >
                                <label className="labelHomeWork" htmlFor="questionClass">Theme : </label>
                                {/*
                        <input className="text_input_homeWork" id="questionClass" value={task.Theme} onChange={(e) =>{changeTaskTheme(e.target.value,index)}} />
*/}
                                <AsyncSelect/>
                            </div>
                        </div>
                        <br/>
                        <div style={{display:"flex"}} className="directioninput">
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <label className="labelHomeWork" htmlFor="questionClasstitle">Description :</label>
                                <input className="text_input_homeWork_question" placeholder="write question here" id="questionClasstitle"
                                       value={task.Description}
                                       onChange={(e) =>setTask({...task, Description: e.target.value})} />
                            </div>
                            <div style={{display:"flex",flexDirection:"column"}} >
                                <label className="labelHomeWork" htmlFor="questionfile form-label">Choose a file</label>
                                <input type="file" id="questionfile" name="fileupload" className="inputFileHomeWork form-control"  multiple
                                       HTMLInputElement={task.QuestionFile}
                                       onChange={(e)=>setTask({...task, QuestionFile: e.target.files})} />
                            </div>
                        </div>

                    </div>
                    <br/>
                    <div className="saveadd">
                        <button className="btn btn-success" type="submit" onClick={()=>saveTask(match.params.id)}>Save Update</button>
                    </div>
                </div>
            </Accordion>
        </div>
    )
}

export default EditTask