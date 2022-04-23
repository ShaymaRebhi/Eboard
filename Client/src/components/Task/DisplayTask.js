import React, {useEffect, useState} from 'react'
import './DisplayTask.css'
import "react-dropzone-uploader/dist/styles.css";
import {useHistory, useRouteMatch} from "react-router-dom";
import {DisplayTaskStudent, updateTaskStudentStatus} from "../../utils/Task";
import {toast, ToastContainer} from "react-toastify";
import {Feed,Grid, Header} from "semantic-ui-react";
import QierPlayer from "qier-player";
import ReactPlayer from "react-player";
import Dropzone, {Preview} from "react-dropzone-uploader";
import {DeleteResources, UpdateEvaluation, UpdateResources} from "../../redux/slices/Task";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {
    Button,
    Dimmer,
    Image,
    List,
    Loader
} from "semantic-ui-react";
function DisplayTask() {
    const match = useRouteMatch();
    const idUser = JSON.parse(localStorage.getItem("idStudent"))._id;
    const history = useHistory();
    const [questionFile,setQuestionFile] = useState([])
    const [taskResponseFile,setTaskResponseFile] = useState([])
    const [evaluation, setEvaluation] = useState(0)
    const dispatch = useDispatch();
    const [loader, SetLoader] = useState(false);
    const ResourcesResponse = useSelector((state) => state.task.ResourcesResponse);
    const [task, setTask] = useState(
      [{
        Title: "",
        Theme: "",
        Description: "",
        QuestionFile: []
      }]
  )
    const getTask = () => {
        DisplayTaskStudent(idUser,match.params.id,(res)=> {
            setTask(res.data.Task);
            setEvaluation(res.data);
            setQuestionFile(res.data.Task.QuestionFile)
        })
    }

    useEffect(()=>{
        getTask();
        console.log("task")
        console.log(task);
        console.log("evaluation")
        console.log(evaluation)
    })
    function componentDidMount(time) {
        setTimeout(() => {history.push("/assignedTaskStudentList")}, time)
    }

    const handleRemoveUpload = (e, res) => {

        dispatch(DeleteResources(res));
        console.log("Trigger remove photo");
        console.log(ResourcesResponse);
    };
    const handleChangeStatus = async ({ meta, file }, status) => {
        console.log(status, meta, file);

        if (status === "done") {
            SetLoader(true);
            var formData = new FormData();
            formData.append("TaskResponseFile", file);
            await axios
                .post(
                    "http://localhost:3000/task/api/upload",
                    formData
                )
                .then((response) => {
                    SetLoader(false);
                    console.log(response.data.result.reqFiles[0]);
                    dispatch(UpdateResources(response.data.result.reqFiles[0]));
                });
            console.log("Trigger update photo");
            console.log(ResourcesResponse);
        }
        if (status === "removed") {
            let taskResponseFiles = taskResponseFile.slice();
            taskResponseFiles = taskResponseFile.filter((u) => {
                return u !== file;
            });
            setTaskResponseFile(taskResponseFiles);
        }
    };
    const send = () => {
        console.log(questionFile);
        dispatch(
            UpdateEvaluation(evaluation._id,evaluation.TaskStatus,evaluation.TaskCorrected,ResourcesResponse)
        )
            .then((response) => {
                console.log("hassenn");
                console.log(response);
                toast.success('Task Sent Successfully', {
                    position: "bottom-right"
                })
                componentDidMount(3000)
            })
            .catch((error) => {
                console.log(error);
            });

        /*const newEvaluation ={
            TaskStatus : "Worked",
            TaskCorrected : "Not Corrected"
        }
        updateTaskStudentStatus(evaluation._id,newEvaluation,()=> {
            toast.success('Task Sent Successfully', {
                position: "bottom-right"
            })
            componentDidMount(3000)
        })*/
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
                          <Feed.Extra images>
                              <Grid stackable>
                                  <Grid.Row>
                              {questionFile && questionFile.map((files, index) =>
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
                                  </Grid.Row>
                              </Grid>
                          </Feed.Extra>
                      </div>
                    </div>
                    <div className="task-response">

                        <h1 className="taskresponse1">Response</h1>
                        <Dropzone
                            styles={{ dropzone: { minHeight: 120, maxHeight: 250 } }}
                            inputContent="Drop Files here or click to choose ..."
                            onChangeStatus={handleChangeStatus}
                            canCancel={false}
                            canRemove={false}
                            canRestart={false}
                            PreviewComponent={Preview}
                        />
                        <br/>
                        <Grid stackable>
                            <Grid.Row>
                                <Grid.Column width={2}></Grid.Column>
                                <Grid.Column width={12}>
                                    <List divided verticalAlign="middle">
                                        {ResourcesResponse.map((files, index) => (
                                            <List.Item>
                                                <List.Content floated="right">
                                                    <Button
                                                        circular
                                                        size="small"
                                                        color="red"
                                                        icon="trash"
                                                        onClick={(e) => {
                                                            handleRemoveUpload(e, files.url);
                                                        }}
                                                    ></Button>
                                                </List.Content>
                                                {files.type === "image/png" ||
                                                files.type === "image/jpg" ||
                                                files.type === "image/jpeg" ||
                                                files.type === "image/gif" ? (
                                                    <Image src={files.url} rounded size="mini" />
                                                ) : files.type === "application/pdf" ? (
                                                    <Image
                                                        rounded
                                                        size="mini"
                                                        src={
                                                            process.env.PUBLIC_URL +
                                                            "/files-type/" +
                                                            "pdf" +
                                                            ".png"
                                                        }
                                                    />
                                                ) : files.type ===
                                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                                                    <Image
                                                        rounded
                                                        size="mini"
                                                        src={
                                                            process.env.PUBLIC_URL +
                                                            "/files-type/" +
                                                            "docx" +
                                                            ".png"
                                                        }
                                                    />
                                                ) : files.type ===
                                                "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? (
                                                    <Image
                                                        rounded
                                                        size="mini"
                                                        src={
                                                            process.env.PUBLIC_URL +
                                                            "/files-type/" +
                                                            "pptx" +
                                                            ".png"
                                                        }
                                                    />
                                                ) : files.type === "video/mp4" ? (
                                                    <Image
                                                        rounded
                                                        size="mini"
                                                        src={
                                                            process.env.PUBLIC_URL +
                                                            "/files-type/" +
                                                            "mp4" +
                                                            ".png"
                                                        }
                                                    />
                                                ) : files.type === "audio/mpeg" ? (
                                                    <Image
                                                        rounded
                                                        size="mini"
                                                        src={
                                                            process.env.PUBLIC_URL +
                                                            "/files-type/" +
                                                            "mp3" +
                                                            ".png"
                                                        }
                                                    />
                                                ) : (
                                                    <Image
                                                        rounded
                                                        size="mini"
                                                        src={
                                                            process.env.PUBLIC_URL + "/files-type/" + "noFile.png"
                                                        }
                                                    />
                                                )}

                                                <List.Content>
                                                    <Header as="h4" color="red">
                                                        {files.originalname.slice(0, 20)}
                                                    </Header>
                                                    <highlight>
                                                        <strong>{files.type.slice(0, 40)}</strong>
                                                    </highlight>
                                                </List.Content>
                                            </List.Item>
                                        ))}
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={2}></Grid.Column>
                            </Grid.Row>
                        </Grid>

                        {loader ? (
                            <Dimmer active inverted>
                                <Loader inline="centered">Preparing Files ... please wait !</Loader>
                            </Dimmer>
                        ) : (
                            <></>
                        )}


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