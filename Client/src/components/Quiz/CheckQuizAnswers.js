import React from 'react'
import './CheckQuizAnswers.css'
import { Modal, ModalBody, ModalFooter} from 'reactstrap';
function CheckQuizAnswers(props) {
    let optioncorrect = "";
    let resultLength = props.results.length;
    const QuestionQuiz = props.data;

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
                    <ul>
                        {props.data.map((question,index)=>(
                            question.options.map((op,i=resultLength)=>(
                                optioncorrect=op.optionText
                            )),
                                index < resultLength ? ("") : (
                                    <li key={index} className="mb-6 list-group-item">
                                        <div className="questionScore">
                                            <p className="question-quiz-option"><strong>{question.questionText}</strong></p>
                                            <p className="question-quiz-option"><strong>Score: {question.score}</strong></p>
                                        </div>
                                        <p className={'' === optioncorrect ? 'backgroundsuccess  p-2' :
                                            'backgrounddanger p-2'}>Your answer: {""}</p>
                                        {"" !== optioncorrect && <p className="backgroundlink p-2">Correct answer: {optioncorrect}</p> }
                                    </li>
                                )


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