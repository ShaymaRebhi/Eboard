import React, {useEffect, useState} from 'react'
import './DisplayTask.css'
import "react-dropzone-uploader/dist/styles.css";
import {useHistory, useRouteMatch} from "react-router-dom";
import {DisplayTaskStudent, updateTaskStudentStatus} from "../../utils/Task";
import {toast, ToastContainer} from "react-toastify";

function DisplayTask() {
    const match = useRouteMatch();
    const idUser = JSON.parse(localStorage.getItem("idStudent"))._id;
    const history = useHistory();
    const [questionFile] = useState("")
    const [evaluation, setEvaluation] = useState(0)
    const [task, setTask] = useState(
      [{
        Title: "",
        Theme: "",
        Description: "",
        QuestionFile: '',
        QuestionResponseFile:questionFile
      }]
  )
    const getTask = () => {
        DisplayTaskStudent(idUser,match.params.id,(res)=> {
            setTask(res.data.Task);
            setEvaluation(res.data);
        })
    }
    const changeTaskFile = (text, i) => {
        var newTask = [...task];
        newTask[i].QuestionResponseFile = text;
        setTask(newTask);
        console.log(newTask)
    }
    useEffect(()=>{
        getTask()
    },[])
    function componentDidMount(time) {
        setTimeout(() => {history.push("/assignedTaskStudentList")}, time)
    }
    const send = () => {
        const newEvaluation ={
            TaskStatus : "Worked",
            TaskCorrected : "Not Corrected",
            Score : 0
        }
        updateTaskStudentStatus(evaluation._id,newEvaluation,()=> {
            toast.success('Task Sent Successfully', {
                position: "bottom-right"
            })
            componentDidMount(3000)
        })
    }
    return (
        <>
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
            <div className="DisplayTaskkBox">
                <div className="card-display-task" >
                    <div className="task-data">
                      <div>
                        <h1 className="tasktitle"><strong>Task : </strong>{task.Title}</h1>
                      </div>
                        <br/>
                      <div className="taskTheme ">
                        <h3 className="taskquestion"><strong>Theme : </strong>{task.Theme}</h3>
                      </div>
                            <br/>
                      <div>
                        <p className="taskquestion"><strong>Description : </strong>{task.Description}</p>
                      </div>
                        <br/>
                      <div>
                        <img src={task.QuestionFile} alt="image" />
                      </div>
                    </div>
                    <div className="task-response">

                        <h1 className="taskresponse1">Response</h1>
                        {/*<div className="wrapper">
                            <div className="file-upload">
                                <input type="file" name="fileresponse" multiple HTMLInputElement={task.QuestionResponseFile} onChange={(e)=>{changeTaskFile(e.target.files,index)}}/>
                                <i className="fa fa-arrow-up"/>
                            </div>
                        </div>*/}
                        <div>
                            <div className="wrapper">
                                <div className="file-upload">
                                    <input type="file" name="fileresponse" multiple HTMLInputElement={task.QuestionResponseFile} onChange={(e)=>{changeTaskFile(e.target.files)}}/>
                                    <i className="fa fa-arrow-up"/>
                                </div>
                            </div>
                        </div>

                        <div className="saveadd p-5">
                            <button className="btn btn-success" type="submit" onClick={send}>Send</button>
                        </div>

                    </div>

                </div>
            </div>
        </>
  )
}

export default DisplayTask