import React , {useEffect} from "react";

import "react-dropzone-uploader/dist/styles.css";

import Dropzone from "react-dropzone-uploader";
import {
  Button,
  Dimmer,
  Form,
  Header,
  Loader,
  Message,
 
} from "semantic-ui-react";
import {
  AddCourses,
  RetrieveCoursesByIdClass,
} from "../../redux/slices/Courses";
import { useState } from "react";
import { isAuth } from "../../Helpers/Auth";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import { getUserConnect } from '../../utils/api';
const ENDPOINT = "http://localhost:3000/user/connect";


function FormCourses(props) {
  const socket = io(ENDPOINT);
  const themes = useSelector((state) => state.theme.theme);
  const { id } = useParams();
  const [currentUser,setCurrentUser]=useState(undefined);
  const [titre, SetTitre] = useState("");
  const [description, SetDescription] = useState("");
  const [multiple_resources, SetMultiple_resources] = useState([]);
  const [formClassName, SetFormClassName] = useState("");
  const [formSuccessMessage, SetFormSuccessMessage] = useState("");
  const [formErrorMessage, SetFormErrorMessage] = useState("");
  const [selectedItem, SetSelectedItem] = useState();
  const [loader, SetLoader] = useState(false);
  const CurrentClass = JSON.parse(localStorage.getItem("idClass"));
  const idClass = CurrentClass._id;
  const members = [];
  for (let i = 0; i < CurrentClass.classUsers.length; i++) {
    members.push(CurrentClass.classUsers[i]._id);
  }
  const SeanceOptions = [{ key: Number, text: "", value: "" }];
  const dispatch = useDispatch();
  for (let i = 0; i < themes.length; i++) {
    const option = {
      key: themes[i]._id,
      text: themes[i].titre,
      value: themes[i].titre,
    };

    SeanceOptions.push(option);
  }

  const [notif] = useState({
    Message: "new Courses was added check your timeline ! !",
    Owner: [],
    Course: { _id: "" },
  });

  const handleChangeSelect = async (e) => {
    console.log(e.target.value);
    await SetSelectedItem(e.target.value);
    await console.log(selectedItem);
  };
  const handleTitreChanges = (e) => {
    console.log(id);
    SetTitre(e.target.value);
  };
  const handleDescriptionChanges = (e) => {
    SetDescription(e.target.value);
  };
  const AddCourse = (e) => {
    console.log(members);
    e.preventDefault();
    const idOwner = currentUser;
    console.log(idOwner);

    SetLoader(true);
    const rep = dispatch(
      AddCourses(
        selectedItem,
        titre,
        description,
        multiple_resources,
        idOwner,
        idClass
      )
    )
      .then((response) => {
        SetLoader(false);
        console.log(response);
        notif.Owner = members;
        notif.Course = response.result._id;
      
        socket.emit("add-new-notification", members);

        console.log(response);

        const CurrentClass = JSON.parse(localStorage.getItem("idClass"));
        console.log(CurrentClass._id);
        dispatch(RetrieveCoursesByIdClass(CurrentClass._id));
        console.log(response);
        SetFormClassName("success");
        SetFormSuccessMessage(response.msg);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data) {
            SetFormClassName("warning");
            SetFormErrorMessage(err.response.msg);
          }
        } else {
          SetFormClassName("warning");
          SetFormErrorMessage("Something wen wrong " + err);
        }
      });
  };

  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);

    if (status === "done") {
      SetMultiple_resources(multiple_resources.concat(file));
    }
    if (status === "removed") {
      let multiple_resource = multiple_resources.slice();
      multiple_resource = multiple_resources.filter((u) => {
        return u !== file;
      });
      SetMultiple_resources(multiple_resource);
    }
  };
  useEffect(() => {
  
      axios.get(getUserConnect,{
        headers: {
            'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
        }
    }).then(rslt=>{
        setCurrentUser(rslt.data[0]._id);
    })
   
  
    }, [currentUser]);
  return (
    <div>
      <Form className={formClassName} onSubmit={AddCourse} >
        <Form.Input
          label="Titre"
          type="text"
          placeholder={"Seance 1"}
          name="Titre"
          maxLength="40"
          required
          value={titre}
          onChange={handleTitreChanges}
        />
        <Form.Field
          control={TextareaAutosize}
          label="Description"
          type="text"
          placeholder="In this workshop we will learn ..."
          name="Description"
          required
          value={description}
          onChange={handleDescriptionChanges}
        />
        <Header as="h5" icon="file alternate outline" content="Select Seance" />

        <select value={selectedItem} onChange={handleChangeSelect}>
         
        {SeanceOptions.map((c, index) => (
            <option key={index} value={c.key}>
              {c.text}
            </option>
          ))}
         
        </select>

        <Header as="h5" icon="images outline" content="Select Files" />

        <Dropzone
          styles={{ dropzone: { minHeight: 120, maxHeight: 250 } }}
          onChangeStatus={handleChangeStatus}
        />
        <br />
        {loader ? (
          <Dimmer active inverted>
            <Loader inline="centered">Preparing Files ... please wait !</Loader>
          </Dimmer>
        ) : (
          <>
            <Message
              success
              color="green"
              header="Nice one! 📒 📕 📚 📖"
              content={formSuccessMessage}
            />
            <Message
              warning
              color="yellow"
              header="Woah! 😱 😨"
              content={formErrorMessage}
            />
          </>
        )}

        <br />
        <Button color="black" floated="right">
          Add
        </Button>
        <br />
        <br />
      </Form>
    </div>
  );
}

export default FormCourses;
