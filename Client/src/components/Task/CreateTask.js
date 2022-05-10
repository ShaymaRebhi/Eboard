import React, {useEffect, useState} from 'react'
import './CreateTask.css'
import Accordion from "@material-ui/core/Accordion";
import {useHistory} from "react-router-dom";
import {toast, ToastContainer } from 'react-toastify';
import {MultiSelect} from "react-multi-select-component";
import Dropzone from "react-dropzone-uploader";
import {useDispatch, useSelector} from "react-redux";
import {Dimmer, Loader, Message} from "semantic-ui-react";
import {
    AddTask,
    AssignTask
} from "../../redux/slices/Task";
function CreateTask() {
    const id=JSON.parse(localStorage.getItem("login")).User._id;
    const currentClass = JSON.parse(localStorage.getItem("idClass"));
    const idClass = currentClass._id ;
    const [task, setTask] = useState({
            Title: "",
            Description: "",
            status:"",
            Creator:id,
            Class:idClass
        }
    )
    const [questionFile, setQuestionFile] =useState([])
    const [loader, SetLoader] = useState(false);
    const dispatch = useDispatch();
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
    const handleChangeStatus = ({ meta, file }, status) => {
        console.log(status, meta, file);

        if (status === "done") {
            setQuestionFile(questionFile.concat(file));
        }
        if (status === "removed") {
            let resources = questionFile.slice();
            resources = questionFile.filter((u) => {
                return u !== file;
            });
            setQuestionFile(resources);
        }
    };
    const  saveTask = () => {
        const listStudents = []
        selected.forEach((itemselect) => {
            listStudents.push(itemselect.value);

        })
        SetLoader(true);
        const rep = dispatch(
        AddTask(
            task.Title,
            task.Description,
            questionFile,
            task.status,
            listStudents,
            task.Class,
            task.Creator
        )
        ).then((response) => (
            SetLoader(false),
            toast.success('Task added', {
                position: "bottom-right"
            }),
                componentDidMount(3000)

    ))

    };


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
                        <br/>
                        <input className="text_input_homeWork" placeholder="write title here" id="questionTitle"
                               value={task.Title}
                               onChange={(e) =>setTask({...task, Title: e.target.value})}/>
                    </div>
                </div>
                <br/>
                <div style={{display:"flex",flexDirection:"column"}}>
                    <label className="labelHomeWork" htmlFor="questionClasstitle">Description :</label>
                    <br/>
                    <textarea className="text_input_homeWork_question"  placeholder="write Description here" id="questionClasstitle"
                              value={task.Description}
                              onChange={(e) =>setTask({...task, Description: e.target.value})} />
                </div>
                <br/>
                <div style={{display:"flex",flexDirection:"column"}}>
                        <label className="labelHomeWork">StudentList :</label>
                        <br/>
                        <MultiSelect
                            className="selectmany"
                            options ={StudentList}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select Students"
                        />
                </div>
                <br/>
                <div style={{display:"flex",flexDirection:"column"}} >
                    <label className="labelHomeWork" htmlFor="questionfile form-label">Choose a files</label>
                    <br/>
                    <Dropzone
                        styles={{ dropzone: { minHeight: 120, maxHeight: 250 } }}
                        onChangeStatus={handleChangeStatus}
                    />
                </div>
                {loader ? (
                    <Dimmer active inverted>
                        <Loader inline="centered">Preparing Files ... please wait !</Loader>
                    </Dimmer>
                ) : ("")
                }
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
                    <button className="btn btn-secondary" type="submit" onClick={BackToListTask}>Back</button>
                </div>
            </div>
        </div>
      </Accordion>
      </div>
  )
}

export default CreateTask