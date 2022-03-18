import React, {useState, useEffect, useRef} from 'react'
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import "./QuestionQuiz.css"

function QuestionQuiz({data , onAnswerUpdate, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep}) {
    const [selected, setSelected]= useState('');
    const [error, setError] = useState('');
    const radioWrapper = useRef();

    useEffect(() => {
        const findCheckedInput = radioWrapper.current.querySelector('input:checked');
        if(findCheckedInput){
            findCheckedInput.checked = false;
        }
    },[data])

    const changeHandler = (e) => {
        setSelected(e.target.value);
        if(error){
            setError('');
        }
    }
    const nextClickHandler = () => {
        if(data.required && selected === '') {
            return setError('Question required select one option!');
        }
        onAnswerUpdate(prevState => [...prevState, {q: data.questionTitle,s:data.score, a:selected ,b:data.options.filter(option => option.IsValid)
        }]);
        setSelected('');
        if(activeQuestion < numberOfQuestions -1){
            onSetActiveQuestion(activeQuestion + 1);
        }
        else {
            onSetStep(3);
        }
  }
  return (
      <Accordion>

        <div className="card-Quiz">
          <AccordionDetails>
            <div className="card-content-Quiz">
                <div className="content-Quiz">
                  <h2 className="mb-5 Questionquiz">{data.questionTitle}</h2>
                  <div className="control-Quiz" ref={radioWrapper}>
                      {data.options.map((option, i ) =>(
                          <label className="radio has-background-light labeloption" key={i}>
                              <input className="inputoption" type="radio" name="option" value={option.optionText} onChange={changeHandler}/>
                              {option.optionText}

                          </label>
                      ))}
                  </div>
                  <div className="scorehandler">
                        <h6 className="scorehandler2">Score: {data.score}</h6>
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