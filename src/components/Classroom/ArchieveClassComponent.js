import { useState } from "react";
import React, { components }  from 'react';
import { Button, Dropdown, Modal } from "semantic-ui-react";
import { useDispatch } from "react-redux";


export default function ArchieveClassComponent(props) {
  const [modalOpen, SetModalOpen] = useState(false);
  
 
  const handleOpen = (e) => SetModalOpen(true);
  const handleClose = (e) => SetModalOpen(false);

 
  return (
    <>
      <Modal
        trigger={
          <Dropdown.Item onClick={handleOpen} icon="archive" text="Archive" />
        }
        open={modalOpen}
        onClose={handleClose}
        dimmer="inverted"
        size="tiny"
      >
        <Modal.Header></Modal.Header>
        <Modal.Content>
          <p>
            Are you sure you want to archive class named
            <strong></strong> ?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick
           
            color="red"
          >
            Yes
          </Button>
          <Button onClick={handleClose} color="black">
            No
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
