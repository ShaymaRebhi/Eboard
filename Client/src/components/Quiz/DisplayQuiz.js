import React, {useState,useEffect} from 'react'
import StartQuiz from "./StartQuiz";
import "./DisplayQuiz.css"
import QuestionQuiz from "./QuestionQuiz";
import quizdata from './../../Quiz.json';
import EndQuiz from "./EndQuiz";
import CheckQuizAnswers from "./CheckQuizAnswers";
let interval;
function DisplayQuiz() {
    const [step, setStep] = useState(1);
    const [activeQuestion, setActiveQuestion]= useState(0);
    const [answers, setAnswers]= useState([]);
    const [showAnswers, setShowAnswers] = useState(false);
    const [time, setTime] = useState(0);
    const [modal, setModal] = useState(false);


    useEffect(() => {
        if(step ===3){
            clearInterval(interval);
        }
    },[step]);

    const quizStartHandler = () => {
        setStep(2);
        interval = setInterval(() => {
           setTime(prevTime => prevTime + 1);
        }, 1000);

    }

    const toggle = () => {
        setModal(!modal);
    }
  return (
    <div className="DisplayQuiz">
        { step === 1 && <StartQuiz onQuizStart={quizStartHandler}/>}
        { step === 2 && <QuestionQuiz
            data={quizdata.question[activeQuestion]}
            onAnswerUpdate={setAnswers}
            numberOfQuestions={quizdata.question.length}
            activeQuestion={activeQuestion}
            onSetActiveQuestion={setActiveQuestion}
            onSetStep={setStep}
        />}
        { step === 3 && <EndQuiz
        results={answers}
        data={quizdata.question}
        onAnswersCheck={() => (setShowAnswers(true), setModal(true))}
        time={time}
        />}

        {showAnswers && <CheckQuizAnswers
            onClose={() => setShowAnswers(false)}
            results={answers}
            data={quizdata.question}
            modal = {modal}
            toggle = {toggle}
        />  }

    </div>
  )
}

export default DisplayQuiz