import React from "react";
import { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import '../css/CardClass.css';



function FormTheme(props) {
  const [titre, SetTitre] = useState("");
  const [description, SetDescription] = useState("");

  const [formClassName] = useState("");


  

  const handleTitreChanges = (e) => {
    SetTitre(e.target.value);
  };
  const handleDescriptionChanges = (e) => {
    SetDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    // Prevent browser refresh
    e.preventDefault();

    // Acknowledge that if the user id is provided, we're updating via PUT
    // Otherwise, we're creating a new data via POST
  

   
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
