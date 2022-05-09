import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Message } from "semantic-ui-react";
import { AddTheme, EditTheme, GetThemeById } from "../../redux/slices/Theme";
import '../css/CardClass.css';



function FormTheme(props) {
  const [titre, SetTitre] = useState("");
  const [description, SetDescription] = useState("");
 
  const [dateCreation, SetDateCreation] = useState(Date.now());
  const [formClassName, SetFormClassName] = useState("");
  const [formSuccessMessage, SetFormSuccessMessage] = useState("");
  const [formErrorMessage, SetFormErrorMessage] = useState("");
  const CurrentClass = JSON.parse(localStorage.getItem("idClass"));

  const themeId = props.themeId;
  const dispatch = useDispatch();

  useEffect(() => {
    if (themeId) {
      console.log(themeId);
      dispatch(GetThemeById(themeId)).then((response) => {
        console.log(response);
        SetTitre(response.payload.titre);
        SetDescription(response.payload.description);
      });
    }
  }, [dispatch]);

  const handleTitreChanges = (e) => {
    SetTitre(e.target.value);
  };
  const handleDescriptionChanges = (e) => {
    SetDescription(e.target.value);
  };

  const handleSubmit = (e) => {
   
    e.preventDefault();

   
    if (themeId) {
      const theme = {
        titre: titre,
        description: description,
        idClass: CurrentClass._id,
        dateCreation: dateCreation,
        _id: themeId,
      };

      dispatch(EditTheme(theme))
        .then((response) => {
          SetFormClassName("success ");
          SetFormSuccessMessage(response.payload.msg);
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data) {
              SetFormClassName("warning");
              SetFormErrorMessage(err.response.payload.msg);
            }
          } else {
            SetFormClassName("warning");
            SetFormErrorMessage("something wen wrong " + err);
          }
        });
    }

    if (!themeId) {
      const theme = {
        titre: titre,
        description: description,
        idClass: CurrentClass._id,
        dateCreation: dateCreation,
      };
      console.log(theme);
      dispatch(AddTheme(theme))
        .then((response) => {
          SetFormClassName("success");
          SetFormSuccessMessage(response.payload.msg);
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.data) {
              SetFormClassName("warning");
              SetFormErrorMessage(err.response.payload.msg);
            }
          } else {
            SetFormClassName("warning");
            SetFormErrorMessage("something wen wrong " + err);
          }
        });
    }
  

   
  };

  return (
    <div >
      <Form  className={formClassName} onSubmit={handleSubmit} >
        <Form.Input
          label="Titre"
          type="text"
          placeholder="Seance 1"
          name="Titre"
          maxLength="40"
          required
          value={titre}
          onChange={handleTitreChanges}
        />
        <Form.TextArea
          label="Description"
          type="TextArea"
          placeholder="In this workshop we will learn ..."
          name="Description"
          maxLength="5000"
          required
          value={description}
          onChange={handleDescriptionChanges}
        />
        <Message
          success
          color="green"
          header="Nice one! 📒 📕 📚 📖"
        />
        <Message
          warning
          color="yellow"
          header="Woah! 😱 😨"
        />
        <Button color="green" floated="right">
          Save
        </Button>
        <br /> 
      </Form>
    </div>
  );
}

export default FormTheme;
