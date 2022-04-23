import React, {useEffect, useState} from 'react'
import './DisplayTask.css'
import "react-dropzone-uploader/dist/styles.css";
import {useHistory, useParams, useRouteMatch} from "react-router-dom";
import {DisplayTaskStudent, updateTaskStudentScore} from "../../utils/Task";
import {toast, ToastContainer} from "react-toastify";
import {Grid, Header} from "semantic-ui-react";
import QierPlayer from "qier-player";
import ReactPlayer from "react-player";

function CorrectionTask() {
    const match = useRouteMatch();
    const params = useParams();
    const history = useHistory();
    const [evaluation, setEvaluation] = useState({})
    const [student, setStudent] = useState({})
    const [taskResponseFile,setTaskResponseFile]= useState([])

    const getEvaluation = () => {
        DisplayTaskStudent(params.idStudent,params.id,(res)=> {
            setEvaluation(res.data);
            setStudent(res.data.Student);
            setTaskResponseFile(res.data.TaskResponseFile);
        })
    }

    useEffect(()=>{
        console.log("task"+match.params.id)
        console.log("Student" + match.params.idStudent);
        getEvaluation()
        console.log(evaluation)
    },[])
    function componentDidMount(time) {
        setTimeout(() => {history.push("/TaskList")}, time)
    }
    const send = () => {
        const newEvaluation ={
            TaskCorrected : "Corrected",
            Score : evaluation.Score,
            Comment : evaluation.Comment
        }
        updateTaskStudentScore(evaluation._id,newEvaluation,()=> {
            toast.success('Task Corrected', {
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
                            <h1 className="taskresponse1">Response</h1>
                            <h3 style={{color:"black"}}>Student : {student.FirstName} {student.LastName}</h3>
                            <div>
                                {taskResponseFile && taskResponseFile.map((files, index) =>
                                    files.type === "application/pdf" ? (
                                        <div key={index}>
                                            <a
                                                href={files.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <div>
                                                    <Grid.Column width={3}>
                                                        <img
                                                            src={
                                                                process.env.PUBLIC_URL +
                                                                "/files-type/" +
                                                                "pdf" +
                                                                ".png"
                                                            }
                                                            style={{
                                                                margin: "10px",
                                                                height: "100px",
                                                                width: "100px",
                                                            }}
                                                            alt=""
                                                        />
                                                    </Grid.Column>
                                                    <Grid.Column width={3}>
                                                        <Grid.Row>
                                                            <Header as="h4" color="red">
                                                                {files.originalname}
                                                            </Header>
                                                        </Grid.Row>
                                                        <Grid.Row>
                                                            <Header as="h4" color="grey">
                                                                {files.type.slice(0, 7)} File
                                                            </Header>
                                                        </Grid.Row>
                                                    </Grid.Column>
                                                </div>
                                            </a>
                                        </div>
                                    ) : files.type ===
                                    "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? (
                                        <div key={index}>
                                            <a
                                                href={files.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <div>
                                                    <Grid.Column width={3}>
                                                        <img
                                                            src={
                                                                process.env.PUBLIC_URL +
                                                                "/files-type/" +
                                                                "pptx" +
                                                                ".png"
                                                            }
                                                            style={{
                                                                margin: "10px",
                                                                height: "100px",
                                                                width: "100px",
                                                            }}
                                                            alt=""
                                                        />
                                                    </Grid.Column>
                                                    <Grid.Column width={3}>
                                                        <Grid.Row>
                                                            <Header as="h4" color="red">
                                                                {files.originalname}
                                                            </Header>
                                                        </Grid.Row>
                                                        <Grid.Row>
                                                            <Header as="h4" color="grey">
                                                                {files.type.slice(0, 7)} File
                                                            </Header>
                                                        </Grid.Row>
                                                    </Grid.Column>
                                                </div>
                                            </a>
                                        </div>
                                    ) : files.type ===
                                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                                        <div key={index}>
                                            <a
                                                href={files.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <div>
                                                    <Grid.Column width={3}>
                                                        <img
                                                            src={
                                                                process.env.PUBLIC_URL +
                                                                "/files-type/" +
                                                                "docx" +
                                                                ".png"
                                                            }
                                                            style={{
                                                                margin: "10px",
                                                                height: "100px",
                                                                width: "100px",
                                                            }}
                                                            alt=""
                                                        />
                                                    </Grid.Column>
                                                    <Grid.Column width={3}>
                                                        <Grid.Row>
                                                            <Header as="h4" color="red">
                                                                {files.originalname}
                                                            </Header>
                                                        </Grid.Row>
                                                        <Grid.Row>
                                                            <Header as="h4" color="grey">
                                                                {files.type.slice(0, 7)} File
                                                            </Header>
                                                        </Grid.Row>
                                                    </Grid.Column>
                                                </div>
                                            </a>
                                        </div>
                                    ) : files.type === "video/mp4" ? (
                                        <div>
                                            <Grid.Column width={3}>
                                                <QierPlayer
                                                    width={250}
                                                    height={100}
                                                    language="en"
                                                    themeColor="#000000"
                                                    srcOrigin={files.url}
                                                />
                                            </Grid.Column>
                                            <Grid.Column width={3}>
                                                <Grid.Row>
                                                    <Header as="h4" color="red">
                                                        {files.originalname.slice(0, 7)}
                                                    </Header>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Header as="h4" color="grey">
                                                        {files.type.slice(0, 7)} File
                                                    </Header>
                                                </Grid.Row>
                                            </Grid.Column>
                                        </div>
                                    ) : files.type === "audio/mpeg" ? (
                                        <div>
                                            <Grid.Column width={3}>
                                                <div className="player-wrapper">
                                                    <ReactPlayer
                                                        key={index}
                                                        width="250px"
                                                        height="100px"
                                                        controls={true}
                                                        url={files.url}
                                                    />
                                                </div>
                                            </Grid.Column>
                                            <Grid.Column width={3}>
                                                <Grid.Row>
                                                    <Header as="h4" color="red">
                                                        {files.originalname.slice(0, 7)}
                                                    </Header>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Header as="h4" color="grey">
                                                        {files.type.slice(0, 7)} File
                                                    </Header>
                                                </Grid.Row>
                                            </Grid.Column>
                                        </div>
                                    ) : files.type === "image/png" ||
                                    files.type === "image/jpg" ||
                                    files.type === "image/jpeg" ||
                                    files.type === "image/gif" ? (
                                        <div>
                                            <Grid.Column width={3}>
                                                <a
                                                    href={files.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src={files.url}
                                                        alt={files.type}
                                                        style={{
                                                            margin: "10px",
                                                            height: "100px",
                                                            width: "100px",
                                                        }}
                                                    />
                                                </a>
                                            </Grid.Column>
                                            <Grid.Column width={3}>
                                                <Grid.Row>
                                                    <Header as="h4" color="red">
                                                        {files.originalname}
                                                    </Header>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Header as="h4" color="grey">
                                                        {files.type.slice(0, 7)} File
                                                    </Header>
                                                </Grid.Row>
                                            </Grid.Column>
                                        </div>
                                    ) : (

                                        <a
                                            href={files.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <div>
                                                <Grid.Column width={3}>
                                                    <img
                                                        style={{
                                                            margin: "10px",
                                                            height: "100px",
                                                            width: "100px",
                                                        }}
                                                        src={
                                                            process.env.PUBLIC_URL +
                                                            "/files-type/" +
                                                            "noFile.png"
                                                        }
                                                        alt={files.type}
                                                    />
                                                </Grid.Column>
                                                <Grid.Column width={3}>
                                                    <Grid.Row>
                                                        <Header as="h4" color="red">
                                                            {files.originalname}
                                                        </Header>
                                                    </Grid.Row>
                                                    <Grid.Row>
                                                        <Header as="h4" color="grey">
                                                            {files.type.slice(0, 7)} File
                                                        </Header>
                                                    </Grid.Row>
                                                </Grid.Column>
                                            </div>
                                        </a>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="task-response">
                        <h1 className="taskresponse1">Correction</h1>
                        <div style={{display:"flex"}} className="directioninput">
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <label className="labelHomeWork" htmlFor="questionscore">Score :</label>
                                <input className="text_input_homeWork_question" placeholder="write score here" id="questionscore"
                                       value={evaluation.Score}
                                       onChange={(e) =>setEvaluation({...evaluation, Score: e.target.value})} />
                            </div>
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <label className="labelHomeWork" htmlFor="questionscore">Comment :</label>
                                <input className="text_input_homeWork_question" placeholder="write comment here" id="questionscore"
                                       value={evaluation.Comment}
                                       onChange={(e) =>setEvaluation({...evaluation, Comment: e.target.value})} />
                            </div>
                        </div>

                        <div className="saveadd p-5">
                            <button className="btn btn-success" type="submit" onClick={send}>save</button>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default CorrectionTask