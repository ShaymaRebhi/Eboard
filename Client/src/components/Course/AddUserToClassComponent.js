import React, { useState } from "react";
import { Button, Modal, Form, Icon } from "semantic-ui-react";
import {MultiSelect} from "react-multi-select-component";
import { useDispatch } from "react-redux";
import { ClassInvitationApi } from "../../utils/Class";
import { fetchInvitationclass , fetchInvitationclassId } from "../../redux/slices/classline";

export default function AddUserToClassComponent(props) {
  const dispatch = useDispatch();
  const classinvit = JSON.parse(localStorage.getItem("idClass"));
  const selectedusers = [];
  const idUserConnect = JSON.parse(localStorage.getItem("idStudent"))._id;
  const [modalOpen, SetModalOpen] = useState(false);

  const handleOpen = (e) => SetModalOpen(true);
  const handleClose = (e) => SetModalOpen(false);
  let error = { visible: false, message: "" };

  const [selected, setSelected] = useState([]);
  props.users.forEach((element) => {
    selectedusers.push({
      label: element.FirstName+" "+element.LastName,
      value: element._id,
    });
  });

  const Add = async () => {
    let data = [];
    selected.forEach((itemselect) => {
      data.push(itemselect.value);
    });
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let verif1=true,verif2=true;
        for (let index11 = 0; index11 < classinvit.classUsers.length; index11++) {
        if(classinvit.classUsers[index11]._id===element)
        {
          verif1=false;
          break;
        }
      }
      for (let index22 = 0; index22 < props.members.length; index22++) {
        if(props.members[index22].userOb._id===element )
        {
          verif2=false;
          break;
        }
      
      }
      if(verif1 && verif2){
      if (data.length > 0) {

        const dataField = {
          status: "Invitation",
          classOb: classinvit._id,
          userOb: element,
        };
        try {
          await ClassInvitationApi.AddClassInvitation(dataField);
          handleClose()
          dispatch(fetchInvitationclass(idUserConnect));
          dispatch(fetchInvitationclassId(classinvit._id));
        } catch (err) {
          error = {
            visible: true,
            message: JSON.stringify(err.errors, null, 2),
          };
        }
      }
    }
    else
    console.log("error");
    }
  };
  
     
  
      
      

  return (
    <div>
      

      <Modal className="add" trigger={<Icon
       
       size="midium" color='grey' corner
        name="user plus"
        onClick={handleOpen}
      />} open={modalOpen} onClose={handleClose} dimmer="inverted">
        <Modal.Header>Add User To Class</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Field
                control={MultiSelect}
                options={selectedusers}
                value={selected}
                onChange={setSelected}
                labelledBy="search by name or email"
              />
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button.Group floated="right">
            <Button onClick={handleClose}>Cancel</Button>
            <Button.Or />
            <Button color="blue" onClick={() => Add()} type="submit">
              Add
            </Button>
          </Button.Group>
        </Modal.Actions>
        <Modal.Content></Modal.Content>
      </Modal>
    </div>
  );

      }