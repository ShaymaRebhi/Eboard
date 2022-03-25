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
        questionTitle: "question 1",
        QuestionFile: 'https://www.practiceportuguese.com/wp-content/uploads/2020/06/asking-questions-800x534.jpg',
        QuestionResponseFile:questionFile
      }]
  )
    const handleChangeStatus = ({ meta, file }, status) => {
        console.log(meta, file, status);
        if (status === "done") {
            setQuestionFile(questionFile.concat(file));
            console.log("hassen"+questionFile)
        }
        if (status === "removed") {
            let questionFile = questionFile.slice();
            questionFile = questionFile.filter((u) => {
                return u !== file;
            });
            setQuestionFile(questionFile);
            console.log("hassen"+questionFile)
        }
    }

    return (
      <div className="DisplayQuestionBox">
        <Accordion>
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
                        <p className="taskquestion"><strong>Question : </strong>{task.questionTitle}</p>
                      </div>
                        <br/>
                        <img src={task.QuestionFile} alt="image" />
                    </div>
                    <div className="task-response">

                        <h1 className="tasktitle">Response</h1>
                        {/*<div className="wrapper">
                            <div className="file-upload">
                                <input type="file" name="fileresponse" multiple HTMLInputElement={task.QuestionResponseFile} onChange={(e)=>{changeTaskFile(e.target.files,index)}}/>
                                <i className="fa fa-arrow-up"/>
                            </div>
                        </div>*/}
                        <div>
                            <Dropzone onChangeStatus={handleChangeStatus}
                                styles={{ dropzone: { minHeight: 120, maxHeight: 250 } }}
                            />
                        </div>
                        <div className="saveadd">
                            <button className="btn btn-success" type="submit" onClick={()=>{}}>Send</button>
                        </div>
                    </div>
                </div>
            ))}
        </Accordion>
      </div>
  )
}

export default DisplayTask