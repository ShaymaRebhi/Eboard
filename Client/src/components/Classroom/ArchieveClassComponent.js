import { useEffect, useState } from "react";
import React  from 'react';
import { Button, Dropdown, Modal } from "semantic-ui-react";
import { fetchActiveClass, fetchclass, fetchclassArchived } from "../../redux/slices/classline";
import { AddclassApi } from "../../utils/Class";
import { useDispatch } from "react-redux";

export default function ArchieveClassComponent(props) {
  const [modalOpen, SetModalOpen] = useState(false);
  const dispatch = useDispatch();
  const idUserConnect = JSON.parse(localStorage.getItem("idStudent"))._id;
  const handleOpen = (e) => SetModalOpen(true);
  const handleClose = (e) => SetModalOpen(false);
  
  const handleSubmit = async (e) => {
    let params = e.target.getAttribute("classid");
    let error = { visible: false, message: "" };
    try {
       await AddclassApi.updateClassActive(params);
      dispatch(fetchclass(idUserConnect,"Active"));
      dispatch(fetchclassArchived( idUserConnect,"Archive"));
      dispatch(fetchActiveClass(idUserConnect));
      handleClose();
    } catch (err) {
      error = {
        visible: true,
        message: JSON.stringify(err.errors, null, 2),
      };
    }
  };
 
  return (
    <>
      <Modal className="add"
        trigger={
          <Dropdown.Item onClick={handleOpen} icon="archive" text="Archive" />
        }
        open={modalOpen}
        onClose={handleClose}
        dimmer="inverted"
        size="tiny"
      >
        <Modal.Header>{props.headerTitle}</Modal.Header>
        <Modal.Content>
          <p className="ps">
            Are you sure you want to archive class named{" "}
            <strong>{props.classes.className}</strong> ?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={handleSubmit}
            classid={props.classes._id}
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
