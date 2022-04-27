import React, {useState,useEffect} from 'react'
import './CreateTask.css'
import Accordion from "@material-ui/core/Accordion";
import {getOneTask} from "../../utils/Task";
import {useHistory, useRouteMatch} from "react-router-dom";
import {toast, ToastContainer } from 'react-toastify';
import Dropzone from "react-dropzone-uploader";
import {Button, Dimmer, Grid, Header, Image, List, Loader} from "semantic-ui-react";
import axios from "axios";
import {
    DeleteResourcesQuestionFile,
    UpdateResourcesQuestionFile, UpdateTask
} from "../../redux/slices/Task";
import {useDispatch, useSelector} from "react-redux";
function EditTask() {
    const match = useRouteMatch();
    const dispatch = useDispatch();
    const [task, setTask] = useState({
            Title: "",
            Theme: "",
            Description: "",
            QuestionFile: [],
        }
    )
    const [questionFile,setQuestionFile] = useState([])
    const ResourcesQuestionFile = useSelector((state) => state.task.ResourcesQuestionFile);
    const [loader, SetLoader] = useState(false);
    const history = useHistory();
    function componentDidMount(time) {
        setTimeout(() => {history.push("/TaskList")}, time)
    }
    const getTaskWithId=()=>{
        getOneTask(match.params.id,(res)=> {
            setTask(res.data)
        })
    }
    const handleChangeStatus = async ({ meta, file }, status) => {
        console.log(status, meta, file);

        if (status === "done") {
            SetLoader(true);
            var formData = new FormData();
            formData.append("QuestionFile", file);
            await axios
                .post(
                    "http://localhost:3000/task/api/uploadTaskFile",
                    formData
                )
                .then((response) => {
                    SetLoader(false);
                    console.log(response.data.result.reqFiles[0]);
                    dispatch(UpdateResourcesQuestionFile(response.data.result.reqFiles[0]));
                });
            console.log("Trigger update photo");
            console.log(ResourcesQuestionFile);
        }
        if (status === "removed") {
            let QuestionFiles = questionFile.slice();
            QuestionFiles = questionFile.filter((u) => {
                return u !== file;
            });
            setQuestionFile(QuestionFiles);
        }
    };
    const handleRemoveUpload = (e, res) => {

        dispatch(DeleteResourcesQuestionFile(res));
        console.log("Trigger remove photo");
        console.log(ResourcesQuestionFile);
    };
    useEffect(()=>{
        getTaskWithId()
    },[])
    const saveTask = () => {
        dispatch(
            UpdateTask(task._id,task.Title,task.Description,ResourcesQuestionFile)
        )
            .then((response) => {
                console.log("hassenn");
                console.log(response);
                toast.success('Task Updated Successfully', {
                    position: "bottom-right"
                })
                componentDidMount(3000)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const BackToListTask = () => {
        history.push("/TaskList")
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
                        <div style={{display:"flex",flexDirection:"column"}} >
                            <label className="labelHomeWork" htmlFor="questionfile form-label">Choose a files</label>
                            <br/>
                            <Dropzone
                                styles={{ dropzone: { minHeight: 120, maxHeight: 250 } }}
                                onChangeStatus={handleChangeStatus}
                            />
                            <br/>
                            <Grid stackable>
                                <Grid.Row>
                                    <Grid.Column width={2}></Grid.Column>
                                    <Grid.Column width={12}>
                                        <List divided verticalAlign="middle">
                                            {ResourcesQuestionFile && ResourcesQuestionFile.map((files, index) => (
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
                            <button className="btn btn-success" type="submit" onClick={saveTask}>Save Update</button>
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

export default EditTask