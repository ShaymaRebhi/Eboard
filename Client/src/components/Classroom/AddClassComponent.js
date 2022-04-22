import React,{  useState , useEffect } from "react";
import '../css/CardClass.css';
import {
  Button,
  Modal,
  Form,
  Input,
  TextArea,
  Dropdown,
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from 'react-redux'
import {addClass , fetchclass} from "../../redux/slices/classline";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { getUserConnect } from '../../utils/api';
import Upload from "./upload";



function exampleReducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { open: true, dimmer: action.dimmer };
    case "CLOSE_MODAL":
      return { open: false };
    default:
      throw new Error();
  }
}
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


export default function AddClassComponent() {
 
  const idUserConnect = JSON.parse(localStorage.getItem("idStudent"))._id;

  
  let [color, setClassColor] = useState();
  let error = { visible: false, message: "" };
  const selectedClass = (data) => {
    setClassColor(data.target.innerText);
  };
    const dispatch = useDispatch();
     
      const formik = useFormik({
    initialValues: {
      _id:"",
      classUsers: [],
      className: "",
      classSection: "",
      classDatePost: Date.now(),
      classOwner: "",
      classColor: "",
      classStatus:"Active",
     
    },
    validationSchema: Yup.object({
      className: Yup.string().required(),
      classSection: Yup.string()
        .required()
        .matches(
          /^[1-5]([A-Z])\w+$/,
          "first letter of classSection must be in 1-5"
        ),
   
    }),
    onSubmit: async (formData) => {
      try {
        

        const data = {
          className: formData.className,
          classSection: formData.classSection,
          classOwner: idUserConnect,
          classColor: color,
          classStatus:"Active",
         
        };

        dispatch(addClass(data));
        dis({ type: "CLOSE_MODAL" });
        dispatch(fetchclass(idUserConnect,"Active"));
        
      } catch (err) {
        error = {
          visible: true,
          message: JSON.stringify(err.errors, null, 2),
        };
      }
    },
  });
  
    

  const [state, dis] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  });
  const { open, dimmer } = state;
  

  return (
    <div>
       <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={'colored'}
      />
      <Button 
        circular
        content="Create Class"
        icon="add"
        onClick={() => dis({ type: "OPEN_MODAL", dimmer: "blurring" })}
      />

      <Modal  className="add"

        dimmer={dimmer}
        open={open}
        onClose={() => dis({ type: "CLOSE_MODAL" })}
        
      >
        <Modal.Header>Add Class</Modal.Header>
        <Modal.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Class Name"
                placeholder="Class Name"
                name="className"
                onChange={formik.handleChange}
                error={formik.errors.className}
               
              />
              <Form.Field
                control={Input}
                label="Class Section"
                placeholder="Class Section"
                name="classSection"
                onChange={formik.handleChange}
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
              />
              
            </Form.Group>
            <Form.Group>

            
            </Form.Group>
            <Form.Group>
              {error.visible && <Form.Error>{error.message}</Form.Error>}
            </Form.Group>

            <Button.Group floated="right">
              <Button onClick={() => dis({ type: "CLOSE_MODAL" })}>
                Cancel
              </Button>
              <Button.Or />
              <Button color="blue" type="submit" >
                Save
              </Button>
            </Button.Group>
          </Form>
        </Modal.Content>
        <Modal.Content></Modal.Content>
        <Modal.Actions></Modal.Actions>
      </Modal>
    </div>
  );
}
