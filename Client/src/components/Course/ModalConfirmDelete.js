import { useState } from "react";
import { Button, Dropdown, Modal } from "semantic-ui-react";
import React from "react";

function ModalConfirmDelete(props) {
  const [modalOpen, SetModalOpen] = useState(false);

  const handleOpen = (e) => SetModalOpen(true);
  const handleClose = (e) => SetModalOpen(false);

  
  return (
    <>
      <Modal className="theme"
        trigger={
          <Dropdown.Item onClick={handleOpen} icon="delete" text="Delete" />
        }
        open={modalOpen}
        onClose={handleClose}
        dimmer="inverted"
        size="tiny"
      >
        <Modal.Header>{props.headerTitle}</Modal.Header>
        <Modal.Content>
          <p>
            Are you sure you want to delete this theme ?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
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

export default ModalConfirmDelete;
