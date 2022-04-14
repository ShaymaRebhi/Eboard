import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Feed, Icon, Modal } from "semantic-ui-react";
import { fetchclass} from "../../redux/slices/classline";
import { Form, Input, TextArea } from "semantic-ui-react";
import axios from "axios";
import { getUserConnect } from '../../utils/api';
import React  from 'react';
import { AddclassApi } from "../../utils/Class";
import Upload from "./upload";
const options = [
  { key: 1, text: "red", value: "red" },
  { key: 2, text: "blue", value: "blue" },
  { key: 3, text: "yellow", value: "yellow" },
  { key: 4, text: "grey", value: "grey" },
  { key: 5, text: "pink", value: "pink" },
  { key: 6, text: "green", value: "green" },
  { key: 7, text: "olive", value: "olive" },
  { key: 8, text: "teal", value: "teal" },
  { key: 9, text: "violet", value: "violet" },
  { key: 10, text: "purple", value: "purple" },
  { key: 11, text: "brown", value: "brown" },
  { key: 12, text: "black", value: "black" },
  { key: 13, text: "white", value: "white" },
];

export default function ArchieveClassComponent(props) {
  const [modalOpen, SetModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [currentUser,setCurrentUser]=useState(undefined);
  const handleOpen = (e) => SetModalOpen(true);
  const handleClose = (e) => SetModalOpen(false);
  let [color, setClassColor] = useState();
  const selectedClass = (data) => {
    console.log(data.target.innerText);
    setClassColor(data.target.innerText);
  };
  color = props.classes.classColor;
  let error = { visible: false, message: "" };
  const formik = useFormik({
    initialValues: {
      className: props.classes.className,
      classSection: props.classes.classSection,
      classColor: props.classes.classColor,
      classStatus: props.classes.classStatus,
    },
    
    onSubmit: async (formData) => {
      console.log(formData);
      try {
       
        if (color === undefined) color = "red";

        const data = {
          className: formData.className,
          classSection: formData.classSection,
          classOwner: currentUser,
          classColor: color,
          classStatus: "Active",
        };
        const res = await AddclassApi.updateClass(props.classes._id, data);
        console.log(res);
        dispatch(fetchclass(currentUser,"Active"));
        handleClose();
      } catch (err) {
        error = {
          visible: true,
          message: JSON.stringify(err.errors, null, 2),
        };
      }
    },
  });
  useEffect(() => {
    axios.get(getUserConnect,{
      headers: {
          'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
      }
  }).then(rslt=>{
      setCurrentUser(rslt.data[0]._id)
  })

  }, [currentUser]);
 
  
  

  return (
    <>
      <Modal className="add"
        trigger={<Dropdown.Item onClick={handleOpen} icon="edit" text="Edit" />}
        open={modalOpen}
        onClose={handleClose}
        dimmer="inverted"
      >
        <Modal.Header>Edit Class</Modal.Header>
        <Modal.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Class Name"
                placeholder="Class Name"
                name="className"
                onChange={formik.handleChange}
                value={formik.values.className}
                error={formik.errors.className}
               
              />
              <Form.Field
                control={Input}
                label="Class Section"
                placeholder="Class Section"
                name="classSection"
                onChange={formik.handleChange}
                value={formik.values.classSection}
                error={formik.errors.classSection}
              />
              <Form.Field
                control={Dropdown}
                label="Class Color"
                placeholder="Class Color"
                name="classColor"
                clearable
                selection
                options={options}
                onChange={selectedClass}
                value={color}
              />
             
            </Form.Group>
            <Upload id={props.classes ? props.classes._id  :null} src={props.classes ? props.classes.file  :null} onChange={formik.handleChange} />



            <Button.Group floated="right">
              <Button onClick={() => handleClose()}>Cancel</Button>
              <Button.Or />
              <Button color="red" type="submit">
                Update
              </Button>
            </Button.Group>
          </Form>
        </Modal.Content>
        <Modal.Content></Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    </>
  );
}
