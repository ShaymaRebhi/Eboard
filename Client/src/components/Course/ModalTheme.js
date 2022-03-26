import React from "react";
import { Dropdown, Modal } from "semantic-ui-react";
import FormTheme from "./FormTheme";

function ModalTheme(props) {
  return (
    <>
      <Modal className="theme"
        trigger={
          <Dropdown.Item icon={props.icon} text={props.buttonTriggerTitle} />
        }
        dimmer="inverted"
        size="tiny"
        closeIcon="close"
      >
        <Modal.Header>{props.headerTitle}</Modal.Header>
        <Modal.Content>
          <FormTheme className="theme"
            buttonSubmitTitle={props.buttonSubmitTitle}
            buttonColor={props.buttonColor}
            seanceId={props.seanceId}
            onSeanceAdded={props.onSeanceAdded}
            onSeanceUpdated={props.onSeanceUpdated}
            Title = {props.Titre}
          />
        </Modal.Content>
      </Modal>
    </>
  );
}

export default ModalTheme;
