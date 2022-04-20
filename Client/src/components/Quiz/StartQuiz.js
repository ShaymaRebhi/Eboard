import React from 'react'
import "./StartQuiz.css"
import {BiSmile} from 'react-icons/bi';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Accordion from '@material-ui/core/Accordion'

function StartQuiz(props) {
    const formatTime = time =>{
        if (time < 60){
            return time < 10 ? `0${time}s` : `${time}s`;
        }
        else {
            return Math.floor(time/60) + 'm' + (time % 60) + 's' ;
        }
    }
  return (
      <Accordion>

            <div className="card-Quiz">
                <AccordionDetails>
                        <div className="card-content-Quiz">
                          <h1 className="quiztitle">{props.quiz.Title}</h1>
                            <br/>
                            <div style={{display:"flex", flexDirection:"column", alignItems:"flex-start"}}>
                                <p className="quizdescription"><strong>Description : </strong>{props.quiz.Description}</p>
                                <p className="quizdescription"><strong>Quiz Time : </strong>{formatTime(props.quizTime)}</p>
                            </div>
                            <br/>
                          <h6 className="goodlock">Good lack <BiSmile/></h6>
                          <button className="btn btn-primary Startquizbutton" onClick={props.onQuizStart}>Start</button>
                        </div>
                </AccordionDetails>
             </div>

      </Accordion>
  )
}

export default StartQuiz