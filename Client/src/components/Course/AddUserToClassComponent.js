import React, { useState } from "react";
import { Button, Modal, Form, Icon } from "semantic-ui-react";
import {MultiSelect} from "react-multi-select-component";

export default function AddUserToClassComponent(props) {
  const selectedusers = [];
  const documentData = JSON.parse(localStorage.getItem("user"));
  const [modalOpen, SetModalOpen] = useState(false);

  const handleOpen = (e) => SetModalOpen(true);
  const handleClose = (e) => SetModalOpen(false);
  
  const [selected, setSelected] = useState([]);
  let error = { visible: false, message: "" };

  const Add = async () => {
    let data = [];
    selected.forEach((itemselect) => {
      data.push(itemselect.value);
    });
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      let verif1=true,verif2=true;
    }
     
  }  
      
      

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