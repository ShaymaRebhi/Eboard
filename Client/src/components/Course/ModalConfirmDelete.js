import { useState } from "react";
import { Button, Dropdown, Modal } from "semantic-ui-react";
import React from "react";
import { useDispatch } from "react-redux";
import { DeleteTheme } from "../../redux/slices/Theme";

function ModalConfirmDelete(props) {
  const [modalOpen, SetModalOpen] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = (e) => SetModalOpen(true);
  const handleClose = (e) => SetModalOpen(false);
  const handleSubmit = (e) => {
    let params = e.target.getAttribute("themeid");

  dispatch(DeleteTheme(params))
  .then((response) => {
    handleClose();
    //props.onSeanceDeleted(response.data.result);
    //this.props.socket.emit("delete", response.data.result);
  })
  .catch((err) => {
    handleClose();
    throw err;
  });
};
  
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
            Are you sure you want to delete {" "}
            <strong>{props.theme.titre}</strong>?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleSubmit}
          themeid={props.theme._id}
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
