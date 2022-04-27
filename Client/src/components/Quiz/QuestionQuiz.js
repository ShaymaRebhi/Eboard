import React, {useState, useEffect, useRef} from 'react'
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import "./QuestionQuiz.css"

function QuestionQuiz(props) {
    const [selected, setSelected]= useState('');
    const [error, setError] = useState('');
    const radioWrapper = useRef();
    const [buttonTitle ,setButtonTitle] = useState("Next");

    const formatTime = time =>{
        if (time < 60){
            return time < 10 ? `0${time}s` : `${time}s`;
        }
        else {
            return Math.floor(time/60) + 'm' + (time % 60) + 's' ;
        }
    }
    useEffect(() => {
        const findCheckedInput = radioWrapper.current.querySelector('input:checked');
        if(findCheckedInput){
            findCheckedInput.checked = false;
        }
    },[props.data])

    const changeHandler = (e) => {
        setSelected(e.target.value);
        if(error){
            setError('');
        }
    }
    const nextClickHandler = () => {
        if(props.data.required && selected === '') {
            return setError('Question required select one option!');
        }
        props.onAnswerUpdate(prevState => [...prevState, {q: props.data.questionText,s:parseInt(props.data.score), a:selected ,b:props.data.options.filter(option => option.IsValid)
        }]);
        setSelected('');
        if(props.activeQuestion < props.numberOfQuestions -1){
            props.onSetActiveQuestion(props.activeQuestion + 1);
        }
        else {
            props.onSetStep(3);
        }
        if(props.activeQuestion === props.numberOfQuestions -2){
            setButtonTitle("End Quiz")

        }
  }
  return (
      <Accordion>

        <div className="card-Quiz">
          <AccordionDetails>
            <div className="card-content-Quiz">
                <div className="content-Quiz">
                    <div style={{display:"flex"}}>
                        <h3 style={{color:"red"}}><strong>Time : </strong>{formatTime(props.quizTimeDecrement)}</h3>
                    </div>
                    <br/>
                    <div>
                        <h2 className="mb-5 Questionquiz">{props.data.questionText}</h2>
                    </div>
                  <div ref={radioWrapper}>
                      {props.data.options.map((option, i ) =>(
                          <label className="labeloption" key={i}>
                              <input className="inputoption" type="radio" name="option" value={option.optionText} onChange={changeHandler}/>
                              {option.optionText}
                              <span className="checkquizmark"></span>
                          </label>
                      ))}
                  </div>
                  <div className="scorehandler">
                        <h6 className="scorehandler2">Score: {props.data.score}</h6>
                  </div>
                    {error && <div className="has-text-danger errorquiz">{error}</div>}
                  <button className="btn btn-primary mt-4" onClick={nextClickHandler}>{buttonTitle}</button>
                </div>
            </div>
          </AccordionDetails>
        </div>

      </Accordion>
  )
}

export default QuestionQuiz