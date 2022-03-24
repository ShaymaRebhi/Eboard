import React, {useState} from 'react'
import './CreateTask.css'
import Accordion from "@material-ui/core/Accordion";
import axios from "axios";
//import {useHistory} from "react-router-dom";

function CreateTask() {
    const [task, setTask] = useState(
        [{
            Title: "React Hook",
            Theme: "seance 1",
            questionTitle: "question 1",
            QuestionFile: '',
            QuestionResponseFile:""
        }]
    )
    //const history = useHistory();
    const changeTaskTitle = (text, i) => {
        var newTask = [...task];
        newTask[i].Title = text;
        setTask(newTask);
        console.log(newTask)
    }

    const changeTaskTheme = (text, i) => {
        var newTask = [...task];
        newTask[i].Theme = text;
        setTask(newTask);
        console.log(newTask)
    }
    const changeTaskQuestionTitle = (text, i) => {
        var newTask = [...task];
        newTask[i].questionTitle = text;
        setTask(newTask);
        console.log(newTask)
    }
    const changeTaskFile = (text, i) => {
        var newTask = [...task];
        newTask[i].QuestionFile = text;
        setTask(newTask);
        console.log(newTask)
    }
    const saveTask = (e) => {
        e.preventDefault();
        const newTask = {
            Title : task.Title,
            Theme : task.Theme,
            questionTitle : task.questionTitle

        }
        axios.post('http://localhost:3000/task/add', newTask).then(res => console.log(res.data));
        //history.push("/TaskList");

    }
  return (
      <div className="DisplayQuestionBox">
      <Accordion>
          <form method="post" onSubmit={saveTask}>
          {task.map((task,index)=>(
        <div className="card-HomeWork" key={index}>
            <div className="card-content-HomeWork">
                <label className="labelHomeWork" htmlFor="questionTitle">Title : </label>
                <input className="text_input_homeWork" id="questionTitle" value={task.Title} onChange={(e) =>{changeTaskTitle(e.target.value,index)}}/>
                <label className="labelHomeWork" htmlFor="questionClass">Theme : </label>
                <input className="text_input_homeWork" id="questionClass" value={task.Theme} onChange={(e) =>{changeTaskTheme(e.target.value,index)}} />
                    <div>
                        <label className="labelHomeWork" htmlFor="questionClasstitle">Question :</label>
                        <input className="text_input_homeWork_question" id="questionClasstitle" value={task.questionTitle} onChange={(e) =>{changeTaskQuestionTitle(e.target.value,index)}} />
                        <label className="labelHomeWork" htmlFor="questionfile form-label">Choose a file</label>
                        <input type="file" id="questionfile" name="fileupload" className="inputFileHomeWork form-control"  multiple HTMLInputElement={task.QuestionFile} onChange={(e)=>{changeTaskFile(e.target.files,index)}} />

                    </div>

            </div>
            <div className="saveadd">
                <button className="btn btn-success" type="submit">Save</button>
            </div>
        </div>
          ))}
          </form>
      </Accordion>
      </div>
  )
}

export default CreateTask