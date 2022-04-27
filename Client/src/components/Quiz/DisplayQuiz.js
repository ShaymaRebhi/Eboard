import React, {useState,useEffect} from 'react'
import StartQuiz from "./StartQuiz";
import "./DisplayQuiz.css"
import QuestionQuiz from "./QuestionQuiz";
import EndQuiz from "./EndQuiz";
import CheckQuizAnswers from "./CheckQuizAnswers";
import {DisplayQuizStudent} from "../../utils/Quiz";
import {useRouteMatch} from "react-router-dom";
let interval;
let interval2;
function DisplayQuiz() {
    const match = useRouteMatch();
    const [step, setStep] = useState(1);
    const [activeQuestion, setActiveQuestion]= useState(0);
    const [answers, setAnswers]= useState([]);
    const [showAnswers, setShowAnswers] = useState(false);
    const [time, setTime] = useState(0);
    const [modal, setModal] = useState(false);
    const idUser = JSON.parse(localStorage.getItem("idStudent"))._id;
    const [quizdata,setQuizData] = useState({});
    const [evaluation, setEvaluation] = useState(0)

    const getQuiz = () => {
        DisplayQuizStudent(idUser,match.params.id,(res)=> {
                setQuizData(res.data.Quiz);
                setEvaluation(res.data);
            })
    }
    const quizTime = typeof quizdata.Time ==='string' ?  (Number(quizdata.Time.substr(0,2)) *3600+ Number(quizdata.Time.substr(3,1))*600 + Number(quizdata.Time.substr(4,1))*60  + Number(quizdata.Time.substr(6,2)) )  : ''
    const [quizTimeDecrement, setQuizTimeDecrement] = useState(0);

    useEffect(()=>{
        if(time === quizTime){
            setStep(3);
        }
    })
    useEffect(() => {
        getQuiz();
        setQuizTimeDecrement(quizTime);
        if(step ===3){
            clearInterval(interval);
        }

    },[step]);

    const quizStartHandler = () => {
        setStep(2);
        interval = setInterval(() => {
           setTime(prevTime => prevTime + 1);
        }, 1000);
        interval2 = setInterval(() => {
            setQuizTimeDecrement(prevTime => prevTime - 1);
        }, 1000);

    }

    const toggle = () => {
        setModal(!modal);
    }
  return (
    <div className="DisplayQuiz">
        { step === 1 && <StartQuiz
            onQuizStart={quizStartHandler}
            quiz={quizdata}
            quizTime={quizTime}
        />}
        { step === 2 && <QuestionQuiz
            data={quizdata.Questions[activeQuestion]}
            onAnswerUpdate={setAnswers}
            numberOfQuestions={quizdata.Questions.length}
            activeQuestion={activeQuestion}
            onSetActiveQuestion={setActiveQuestion}
            onSetStep={setStep}
            time={time}
            quizTime={quizTime}
            quizTimeDecrement={quizTimeDecrement}
        />}
        { step === 3 && <EndQuiz
        results={answers}
        data={quizdata.Questions}
        onAnswersCheck={() => (setShowAnswers(true), setModal(true))}
        time={time}
        idEvaluation = {evaluation._id}
        />}

        {showAnswers && <CheckQuizAnswers
            onClose={() => setShowAnswers(false)}
            results={answers}
            data={quizdata.Questions}
            numberOfQuestions={quizdata.Questions.length}
            modal = {modal}
            toggle = {toggle}
        />  }

    </div>
  )
}

export default DisplayQuiz