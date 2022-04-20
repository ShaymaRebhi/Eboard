import React, {useEffect, useState } from 'react'
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import "./EndQuiz.css";
import {useHistory} from "react-router-dom";
import {updateStudentScore} from "../../utils/Quiz";

function EndQuiz(props) {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [nbCorrectAnswers, setNbCorrectAnswers] = useState(0);
  const [scoreTotal, setScoreTotal] = useState(0);
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState('');

  const formatTime = time =>{
    if (time < 60){
      return time < 10 ? `0${time}s` : `${time}s`;
    }
    else {
      return Math.floor(time/60) + 'm' + (time % 60) + 's' ;
    }
        }


  const ScoreFinal = (correctAnswers * (20 / scoreTotal)).toFixed(2);
  const setStudentScore = (id) => {
    const newEvaluation ={
      Score : ScoreFinal,
      Comment :message
    }
    updateStudentScore(id,newEvaluation,() =>{
      console.log(newEvaluation);
    })
  }
  useEffect(() => {
    let ScoreAnswer = 0;
    let correct = 0;
    let score = 0;
    let optioncorrect = "";
    console.log(props.results)
    props.data.forEach((op,i)=> {
      score = score + op.score

    })
    setScoreTotal(score)
    console.log(score)
    props.results.forEach((result, index) => {
      result.b.map((op,i)=>(
      optioncorrect=op.optionText
      ))
      if(result.a === optioncorrect){
        correct++;
        ScoreAnswer = ScoreAnswer + result.s

      }
    });
    setCorrectAnswers(ScoreAnswer)
    setNbCorrectAnswers(correct)
  },[]);
  useEffect(()=>{
    setStudentScore(props.idEvaluation);
    ScoreMessage();
    console.log(props.results)
    console.log("Totale : "+scoreTotal )
  })

  const BackToListQuiz = () => {
    history.push('/assignedQuizStudentList');
  }

  
  const ScoreMessage = () => {
    if(ScoreFinal < 10 ){
      setMessage("Low")
      setMessageColor('#fc0414')
    }
    if(ScoreFinal > 10 && ScoreFinal <= 13 ){
      setMessage("You can do better")
      setMessageColor('#2212ff')
    }
    if(ScoreFinal > 13 && ScoreFinal <= 16 ){
      setMessage("Good")
      setMessageColor('#2fc406')
    }
    if(ScoreFinal > 16 && ScoreFinal <= 18 ){
      setMessage("Very Good")
      setMessageColor('#04e122')
    }
    if(ScoreFinal > 18){
      setMessage("Excellent")
      setMessageColor('#04e122')
    }
  }


  return (
      <Accordion>

        <div className="card-Quiz">
          <AccordionDetails>
            <div className="card-content-Quiz">
              <div>
                <h1 className="resultsQuiz">Your Results</h1>
              </div>
              <br/>
              <br/>
              <div className="content-Quiz-End">
                <p className="scoreQuiz"><strong>Number Correct Answers :  </strong>{nbCorrectAnswers} of {props.data.length}</p>
                <p className="scoreQuiz"><strong>Score :  </strong>{ScoreFinal} / 20</p>
                <p className="timeQuiz"><strong>Your time :  </strong>{formatTime(props.time)}</p>
                <p><strong style={{color:"black"}}>Feedback :  </strong>
                  <strong style={{color:messageColor,textAlign:"right"}}>{message}</strong>
                </p>
              </div>
              <br/>
              <br/>
              <div>
                <button className="btn btn-info mr-2 " onClick={props.onAnswersCheck}>Check your answers</button>
                &nbsp;
                <button className="btn btn-secondary mr-2 " onClick={BackToListQuiz}>Back To List Quiz</button>
              </div>
            </div>
          </AccordionDetails>
        </div>

      </Accordion>
  )
}

export default EndQuiz