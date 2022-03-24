import React, {useState} from 'react'
import Accordion from "@material-ui/core/Accordion";
import './DisplayTask.css'

function DisplayTask() {
  const [task, setTask] = useState(
      [{
        Title: "React Hook",
        Theme: "seance 1",
        questionTitle: "question 1",
        QuestionFile: 'https://www.practiceportuguese.com/wp-content/uploads/2020/06/asking-questions-800x534.jpg',
        QuestionResponseFile:''
      }]
  )
    const changeTaskFile = (text, i) => {
        var newTask = [...task];
        newTask[i].QuestionResponseFile = text;
        setTask(newTask);
        console.log(newTask)
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
                        <div className="wrapper">
                            <div className="file-upload">
                                <input type="file" name="fileresponse" multiple HTMLInputElement={task.QuestionResponseFile} onChange={(e)=>{changeTaskFile(e.target.files,index)}}/>
                                <i className="fa fa-arrow-up"/>
                            </div>
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