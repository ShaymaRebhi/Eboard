import React, {useState} from 'react'
import './CreateTask.css'
import Accordion from "@material-ui/core/Accordion";
import AsyncSelect from 'react-select/async';
import {addTask, assignTask} from "../../utils/Task";
import {useHistory} from "react-router-dom";
import {toast, ToastContainer } from 'react-toastify';
import {MultiSelect} from "react-multi-select-component";
function CreateTask() {
    const id=JSON.parse(localStorage.getItem("login")).User._id;
    const currentClass = JSON.parse(localStorage.getItem("idClass"));
    const idClass = currentClass._id ;
    const [task, setTask] = useState({
            Title: "",
            Theme: "",
            Description: "",
            QuestionFile: undefined,
            Creator:id,
            Class:idClass
        }
    )
    const StudentList = [];
    currentClass.classUsers.forEach((element) => {
        StudentList.push({ label: element.FirstName +" "+element.LastName, value: element._id });
    });
    const [selected, setSelected] = useState([]);

    const history = useHistory();
    function componentDidMount(time) {
        setTimeout(() => {history.push("/TaskList")}, time)
    }

    const BackToListTask = () => {
        history.push("/TaskList")
    }
    const saveTask = () => {
        const listStudents = []
        selected.forEach((itemselect) => {
            listStudents.push(itemselect.value);

        })
        const newTask = {
            Title : task.Title,
            Theme : task.Theme,
            Description : task.Description,
            QuestionFile : task.QuestionFile,
            Creator : task.Creator,
            Class:task.Class,
            listStudents :listStudents

        }
        console.log(newTask);
        addTask(newTask,() =>(
            toast.success('Task added successfuly', {
                position: "bottom-right"
            }),
         componentDidMount(3000)
        ))
    }

    const AssignTask = () => {
        const listStudents = []
        selected.forEach((itemselect) => {
            listStudents.push(itemselect.value);

        })
        const newTask = {
            Title : task.Title,
            Theme : task.Theme,
            Description : task.Description,
            QuestionFile : task.QuestionFile,
            Creator : task.Creator,
            Class:task.Class,
            listStudents :listStudents

        }
        assignTask(idClass,newTask,() =>(
            toast.success('Task assigned ', {
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
            <h1 className="addtasktitle">Add Task</h1>
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
                    <div style={{display:"flex",flexDirection:"column"}}>
                        <label className="labelHomeWork">StudentList :</label>
                        <MultiSelect
                            className="selectmany"
                            options ={StudentList}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select Students"
                        />
                    </div>
                </div>
                <div style={{display:"flex",flexDirection:"column"}} >
                    <label className="labelHomeWork" htmlFor="questionfile form-label">Choose a file</label>
                    <input type="file" id="questionfile" name="fileupload" className="inputFileHomeWork form-control"  multiple
                           HTMLInputElement={task.QuestionFile}
                           onChange={(e)=>setTask({...task, QuestionFile: e.target.files})} />
                </div>
            </div>
            <br/>
            <div style={{display:"flex" , justifyContent:"end"}}>
                <div className="saveadd">
                    <button className="btn btn-success" type="submit" onClick={saveTask}
                            disabled={
                                task.Title === "" ||
                                task.Description === ""
                            }>Save</button>
                </div>
                &nbsp;
                <div className="saveadd">
                    <button style={{backgroundColor:"red"}} className="btn btn-primary" type="submit" onClick={AssignTask}
                            disabled={
                                task.Title === "" ||
                                task.Description === ""
                            }>Assign</button>
                </div>
                &nbsp;
                <div className="saveadd">
                    <button className="btn btn-secondary" type="submit" onClick={BackToListTask}>Back</button>
                </div>
            </div>
        </div>
      </Accordion>
      </div>
  )
}

export default CreateTask