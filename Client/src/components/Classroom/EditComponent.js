import React  from 'react';
import { useState } from "react";
import {  Dropdown, Modal } from "semantic-ui-react";
export function EditComponent(){
    const [modalOpen, SetModalOpen] = useState(false);
  
 
    const handleOpen = (e) => SetModalOpen(true);
    const handleClose = (e) => SetModalOpen(false);
  
    return(
        <>
 <Modal
        trigger={
          <Dropdown.Item onClick={handleOpen} icon="edit" text="Edit" />
        }
        open={modalOpen}
        onClose={handleClose}
        dimmer="inverted"
        size="tiny"
      ></Modal>
        </>
    )
}