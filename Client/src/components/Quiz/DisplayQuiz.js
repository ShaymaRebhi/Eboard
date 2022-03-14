import React, {useState,useEffect} from 'react'
import StartQuiz from "./StartQuiz";
import "./DisplayQuiz.css"
import QuestionQuiz from "./QuestionQuiz";
import quizdata from './../../Quiz.json';

function DisplayQuiz() {
    const [step, setStep] = useState(1);
    const [activeQuestion, setActiveQuestion]= useState(0);
    const [answers, setAnswers]= useState([]);
    const quizStartHandler = () => {
        setStep(2);
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
    </div>
  )
}

export default DisplayQuiz