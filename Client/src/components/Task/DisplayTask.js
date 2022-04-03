import React, {useState} from 'react'
import Accordion from "@material-ui/core/Accordion";
import './DisplayTask.css'
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";

function DisplayTask() {
    const [questionFile, setQuestionFile] = useState("")

    const [task, setTask] = useState(
      [{
        Title: "React Hook",
        Theme: "seance 1",
        questionTitle: "what is React ?",
        QuestionFile: 'https://www.practiceportuguese.com/wp-content/uploads/2020/06/asking-questions-800x534.jpg',
        QuestionResponseFile:questionFile
      }]
  )
    const changeTaskFile = (text, i) => {
        var newTask = [...task];
        newTask[i].QuestionResponseFile = text;
        setTask(newTask);
        console.log(newTask)
    }
    return (
      <div className="DisplayTaskkBox">
            {task.map((task,index)=>(
                <div className="card-display-task" key={index}>
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
                        <p className="taskquestion">{task.questionTitle}</p>
                      </div>
                        <br/>
                        <img src={task.QuestionFile} alt="image" />
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
                                    <input type="file" name="fileresponse" multiple HTMLInputElement={task.QuestionResponseFile} onChange={(e)=>{changeTaskFile(e.target.files,index)}}/>
                                    <i className="fa fa-arrow-up"/>
                                </div>
                            </div>
                        </div>

                        <div className="saveadd p-5">
                            <button className="btn btn-success" type="submit" onClick={()=>{}}>Send</button>
                        </div>

                    </div>

                </div>
            ))}
      </div>
  )
}

export default DisplayTask