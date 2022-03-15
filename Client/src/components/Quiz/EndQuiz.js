import React, {useEffect, useState } from 'react'
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import "./EndQuiz.css";

function EndQuiz({results, data, onAnswersCheck, time}) {
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const formatTime = time =>{
    if (time < 60){
      return time < 10 ? `0${time}s` : `${time}s`;
    }
    else {
      return Math.floor(time/60) + 'm' + (time % 60) + 's' ;
    }
        }


  useEffect(() => {
    let correct = 0;
    console.log(results)
    results.forEach((result, index) => {
      if(result.a === 'true'){
        correct++;
        console.log(result);
      }
    });
    setCorrectAnswers(correct);
  },[]);


  return (
      <Accordion>

        <div className="card-Quiz">
          <AccordionDetails>
            <div className="card-content-Quiz">
              <div className="content-Quiz">
                <h3 className="resultsQuiz">Your Results</h3>
                <p className="scoreQuiz">{correctAnswers} of {data.length}</p>
                <p className="scoreQuiz2"><strong>{Math.floor((correctAnswers / data.length) * 100)} %</strong></p>
                <p className="timeQuiz"><strong>Your time :</strong> {formatTime(time)}</p>
                <button className="btn btn-info " onClick={onAnswersCheck}>Check your answers</button>
              </div>
            </div>
          </AccordionDetails>
        </div>

      </Accordion>
  )
}

export default EndQuiz