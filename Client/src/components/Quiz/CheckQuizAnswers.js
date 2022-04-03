import React from 'react'
import './CheckQuizAnswers.css'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
function CheckQuizAnswers(props) {
    let optioncorrect = "";

    return (
        <Modal isOpen={props.modal} toggle={props.toggle}>
                <div className="modal-head p-2">
                        <h2 className="modal-card-title">Your answers : </h2>
                        <button className=" btn btn-outline-danger" onClick={props.onClose}>X</button>
                </div>
                <ModalBody>
                    <ul>
                        {props.results.map((result,i) => (
                            result.b.map((op,i)=>(
                                optioncorrect=op.optionText
                            )),

                                <li key={i} className="mb-6 list-group-item">
                                    <div className="questionScore">
                                    <p className="question-quiz-option"><strong>{result.q}</strong></p>
                                    <p className="question-quiz-option"><strong>Score: {result.s}</strong></p>
                                    </div>
                                    <p className={result.a === optioncorrect ? 'backgroundsuccess  p-2' :
                                        'backgrounddanger p-2'}>Your answer: {result.a}</p>
                                    {result.a !== optioncorrect && <p className="backgroundlink p-2">Correct answer: {optioncorrect}</p> }
                                </li>
                        ))}
                    </ul>
                </ModalBody>
                <ModalFooter className="modal-card-end">
                    <button className="closeCheck btn btn-outline-danger" onClick={props.onClose}>Close</button>
                </ModalFooter>
                </Modal>
    )
}

export default CheckQuizAnswers