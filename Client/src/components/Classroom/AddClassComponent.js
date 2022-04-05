import React,{  useState } from "react";
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
import {addClass} from "../../redux/slices/ClassSlice";
import {affichage} from "../../redux/slices/ClassSlice";
import { ToastContainer, toast } from 'react-toastify';
import {getclassByYear} from '../../utils/Class'



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
 
  const id=JSON.parse(localStorage.getItem("login")).User._id;
  let error = { visible: false, message: "" };
  
  const [Class,setClass]=useState({ className: "",
  classSection: "",
  classDatePost: Date.now(),
  classColor: "",
  classStatus:"Active",
  classOwner:id ,
  picture:"",
 });

    const dispatch = useDispatch();
    
   const HandleSubmit = () => {
      
        if((Class.className==="") || (Class.classSection==="") || (Class.classColor==="")) {
          toast.error("You have an error please try again");
        }
        else{
            dispatch(addClass(Class));
           
            dis({ type: "CLOSE_MODAL" });
            toast.success("Class added successfuly !");
            
        }
    };

  
   
    

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
          <Form >
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="Class Name"
                placeholder="Class Name"
                name="className"
                onChange={(e) =>
                setClass({ ...Class, className: e.target.value }) }
               
              />
              <Form.Field
                control={Input}
                label="Class Section"
                placeholder="Class Section"
                name="classSection"
                onChange={(e) =>
                  setClass({ ...Class, classSection: e.target.value })
              }
               
              />
              <Form.Field
                control={Dropdown}
                label="Class Color"
                placeholder="Class Color"
                name="classColor"
                clearable
                selection
                options={options}
                onChange={(e) =>
                  setClass({ ...Class, classColor: e.target.value })
              }
              />
              
            </Form.Group>
            

            <Form.Group>
              {error.visible && <Form.Error>{error.message}</Form.Error>}
            </Form.Group>

            <Button.Group floated="right">
              <Button onClick={() => dis({ type: "CLOSE_MODAL" })}>
                Cancel
              </Button>
              <Button.Or />
              <Button color="blue" type="submit" onClick={HandleSubmit} >
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
