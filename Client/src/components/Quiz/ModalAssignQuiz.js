import React,{useState} from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

function ModalAssignQuiz(props) {
    const assign = () => {

    }
    return (
        <>
            <Modal  className="theme"
                open={props.openModal}
                dimmer="inverted"
                size='tiny'
                /*trigger={<Button negative>Assign</Button>}*/
            >
                <Header >
                    <Icon name='archive' />
                    Assign Task
                </Header>
                <Modal.Content>
                    <p style={{color:"red"}}>
                        Title: {props.q.Title}
                    </p>
                    <p style={{color:"red"}}>
                        Description: {props.q.Description}
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button  color='red'  onClick={()=>assign()}>
                        <Icon name='remove' /> Yes
                    </Button>
                    <Button color='black'  onClick={props.onClose}>
                        <Icon name='checkmark' /> No
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}
export default ModalAssignQuiz