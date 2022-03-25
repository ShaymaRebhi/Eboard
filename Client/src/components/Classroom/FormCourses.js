import React from "react";

import "react-dropzone-uploader/dist/styles.css";

import Dropzone from "react-dropzone-uploader";
import {
  Button,
  Dimmer,
  Dropdown,
  Form,
  Header,
  Loader,
  Message,
  Select,
} from "semantic-ui-react";
import styled from 'styled-components';

import { useState, useEffect } from "react";

import TextareaAutosize from "react-textarea-autosize";


function FormCourses(props) {
  const [titre, SetTitre] = useState("");
  const [description, SetDescription] = useState("");
  const [dateCreation, SetDateCreation] = useState(Date.now());
  const [multiple_resources, SetMultiple_resources] = useState([]);
  const [formClassName, SetFormClassName] = useState("");
  const [formSuccessMessage, SetFormSuccessMessage] = useState("");
  const [formErrorMessage, SetFormErrorMessage] = useState("");
  const [selectedItem, SetSelectedItem] = useState();
  const [loader, SetLoader] = useState(false);
  const members = [];
  
 
  

   

  

  
  

  

  return (
    <div>
      <Form className={formClassName} >
        <Form.Input
          label="Titre"
          type="text"
          placeholder={"Seance 1"}
          name="Titre"
          maxLength="40"
          required
        />
        <Form.Field
          control={TextareaAutosize}
          label="Description"
          type="text"
          placeholder="In this workshop we will learn ..."
          name="Description"
          required
        />
        <Header as="h5" icon="file alternate outline" content="Select Seance" />

        <select value={selectedItem} >
         
            <option >
              theme 1 
            </option>
         
        </select>

        <Header as="h5" icon="images outline" content="Select Files" />

        <Dropzone
          styles={{ dropzone: { minHeight: 120, maxHeight: 250 } }}
          
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
