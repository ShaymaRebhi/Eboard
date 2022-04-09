import React, {useState, useEffect, useRef} from 'react'
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import "./QuestionQuiz.css"

function QuestionQuiz(props) {
    const [selected, setSelected]= useState('');
    const [error, setError] = useState('');
    const radioWrapper = useRef();

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
        props.onAnswerUpdate(prevState => [...prevState, {q: props.data.questionTitle,s:props.data.score, a:selected ,b:props.data.options.filter(option => option.IsValid)
        }]);
        setSelected('');
        if(props.activeQuestion < props.numberOfQuestions -1){
            props.onSetActiveQuestion(props.activeQuestion + 1);
        }
        else {
            props.onSetStep(3);
        }
  }
  return (
      <Accordion>

        <div className="card-Quiz">
          <AccordionDetails>
            <div className="card-content-Quiz">
                <div className="content-Quiz">
                  <h2 className="mb-5 Questionquiz">{props.data.questionTitle}</h2>
                  <div className="control-Quiz" ref={radioWrapper}>
                      {props.data.options.map((option, i ) =>(
                          <label className="radio has-background-light labeloption" key={i}>
                              <input className="inputoption" type="radio" name="option" value={option.optionText} onChange={changeHandler}/>
                              {option.optionText}

                          </label>
                      ))}
                  </div>
                  <div className="scorehandler">
                        <h6 className="scorehandler2">Score: {props.data.score}</h6>
                  </div>
                    {error && <div className="has-text-danger errorquiz">{error}</div>}
                  <button className="btn btn-primary mt-4" onClick={nextClickHandler}>Next</button>
                </div>
            </div>
          </AccordionDetails>
        </div>

      </Accordion>
  )
}

export default QuestionQuiz