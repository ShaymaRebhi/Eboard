import React from 'react'
import "./StartQuiz.css"
import {BiSmile} from 'react-icons/bi';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Accordion from '@material-ui/core/Accordion'

function StartQuiz(props) {
  return (
      <Accordion>

            <div className="card-Quiz">
                <AccordionDetails>
                        <div className="card-content-Quiz">
                          <h1 className="quiztitle">{props.quiz.Title}</h1>
                            <br/>
                          <p className="quizdescription">Description : {props.quiz.Description}</p>
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