import React,{useState}  from 'react'
import "./CreateQuiz.css"
import Footer from "../pages/Shared/Footer";
import Switch from '@material-ui/core/Switch';
import { BsFillDashCircleFill, BsPatchCheckFill, BsFillBookmarkPlusFill, BsFillBookmarkXFill} from 'react-icons/bs';
import {FaRegCopy} from 'react-icons/fa';
import {BiAddToQueue} from 'react-icons/bi';
import { IconButton } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {useHistory} from "react-router-dom";


function CreateQuiz() {
    const [questions, setQuestions] = useState(
        [{questionText: "What is React ?",
                questionType:"checkbox",
                options : [
                        {optionText: "FrameWork", IsValid : false},
                        {optionText: "Libraries", IsValid : true},
                        {optionText: "Programming Language", IsValid : false},
                        {optionText: "IDE", IsValid : false}
                ],
                required : false,
                score:5
                }]
    )
    const [quiz, setQuizs] = useState(
        [{Title : "React Hook",
            Class:"4TWIN3",
            Description:"this is React Hooks quiz please answer all this question and good lock",
            question :questions

        }]
    )
    const history = useHistory();
    const handelListQuiz = () => {
        setQuizs({
            Title:"React Hook",
            Class:"4TWIN3",
            Description:"this is React Hooks quiz please answer all this question and good lock",
            questions :[{questionText: "What is React ?",
                questionType:"checkbox",
                options : [
                    {optionText: "FrameWork", IsValid : false},
                    {optionText: "Libraries", IsValid : true},
                    {optionText: "Programming Language", IsValid : false},
                    {optionText: "IDE", IsValid : false}
                ],
                required : false
            }
            ]
        })
        history.push("/quizlist");

    }

    const changeQuizTitle = (text, i) => {
        var newQuiz = [...quiz];
        newQuiz[i].Title = text ;
        setQuizs(newQuiz);
        console.log(newQuiz)
    }
    const changeQuestionScore = (text, i) => {
        var newQuestion = [...questions];
        newQuestion[i].score = text ;
        setQuestions(newQuestion);
        console.log(newQuestion)
    }
    const changeQuizClass = (text, i) => {
        var newQuiz = [...quiz];
        newQuiz[i].Class = text ;
        setQuizs(newQuiz);
        console.log(newQuiz)
    }
    const changeQuizDescription = (text, i) => {
        var newQuiz = [...quiz];
        newQuiz[i].Description = text ;
        setQuizs(newQuiz);
        console.log(newQuiz)
    }
    const changeQuestion = (text, i) => {
            var newQuestion = [...questions];
            newQuestion[i].questionText = text ;
            setQuestions(newQuestion);
            console.log(newQuestion)
    }

    const changeOptionValue = (text, i, j) => {
        var OptionsQuestion = [...questions];
        OptionsQuestion[i].options[j].optionText= text ;
        setQuestions(OptionsQuestion);
        console.log(OptionsQuestion);
    }
    const changeIsValidValue = (valid, i, j) => {
        var OptionsQuestion = [...questions];
        OptionsQuestion[i].options[j].IsValid= valid ;
        setQuestions(OptionsQuestion);
        console.log(OptionsQuestion);
    }
    const changeRequiredValue = (rq, i) => {
        var rqQuestion = [...questions];
        rqQuestion[i].required = rq ;
        setQuestions(rqQuestion);
        console.log(rqQuestion);
    }

    const removeOption = (i, j) => {
        var RemoveOptionQuestion = [...questions];
        if(RemoveOptionQuestion[i].options.length > 1){
            RemoveOptionQuestion[i].options.splice(j , 1);
          setQuestions(RemoveOptionQuestion)
          console.log(i + "__" + j);
        }
    }
    const addOption = (i) => {
        var optionOfQuestion = [...questions];
        if(optionOfQuestion[i].options.length <5){
            optionOfQuestion[i].options.push({optionText: "Option" , IsValid : false  + (optionOfQuestion[i].options.length + 1) })
        }
        else {
            console.log("Max 5 options");
        }
        setQuestions(optionOfQuestion)
    }

    const copyQuestion = (i) => {
        let cq = [...questions]
        var newQuestion = cq[i]

        setQuestions([...questions, newQuestion])
    }

    const deleteQuestion = (i) => {
        let q = [...questions]
        if(questions.length > 1){
            q.splice(i, 1)
        }
        setQuestions(q)
    }

    /*const requiredQuestion = (i) =>{
        var reqQuestion = [...questions];

        reqQuestion[i].required =  ! requiredQuestion[i].required

        console.log( reqQuestion[i].required+" "+i);
        setQuestions(reqQuestion)
    }*/
    const addNewQuestionField = () => {
        setQuestions([...questions, {questionText: "Question",
                                           questionType: "radio",
                                           options: [ {optionText: "Option 1" ,IsValid: false}],
                                           open: true,
                                           required: false}])
    }

  return (
      <div>
          <div className="Quiz_form">
              <br/>
              <div className="section">
                  <div className="Quiz_title_section">
                      <div className="Quiz_form_top">
                          {quiz.map((qz,i)=>(
                              <>
                                  <input type="text" id="Title" className="Quiz_form_top_Name" placeholder="Title"
                                         value={qz.Title} onChange={(e)=>{changeQuizTitle(e.target.value, i)}} />
                                  <input type="text" id="class" className="Quiz_form_top_class" placeholder="Class"
                                         value={qz.Class} onChange={(e)=>{changeQuizClass(e.target.value, i)}} />
                                  <input type="text" id="Description" className="Quiz_form_top_desc" placeholder="Description"
                                         value={qz.Description} onChange={(e)=>{changeQuizDescription(e.target.value, i)}} />
                              </>
                          ))}
                      </div>
                  </div>
                  <br/>

                  {questions.map((ques,i) => (
                          <div>
                              <Accordion  className={'add_border'}>
                                  <div className="question_boxes">
                                      <AccordionDetails className="add_question">
                                          <div className="add_question_top">
                                              <input type="text" className="question" placeholder="Question" value={ques.questionText} onChange={(e)=>{changeQuestion(e.target.value, i)}}/>
                                              {/*<CropOriginalIcon style={{color:"#5f6368"}} />*/}
                                          </div>
                                          <ol type="A">
                                          {ques.options.map( (op, j)=>(
                                              <div className="add_question_body" key={j}>
                                                    <li>
                                                  <div className="optionstyle">


                                                      <input type="text" className="text_input" placeholder="option" value={ques.options[j].optionText}
                                                             onChange={(e)=>{changeOptionValue(e.target.value, i , j)}}/>
                                                      <BsPatchCheckFill/>
                                                      <Switch className="text_input2" name="checkedA" color="primary" aria-label="Is Valid" checked={ques.options[j].IsValid}
                                                               onChange={(e)=>{changeIsValidValue(e.target.checked, i , j)}}/>


                                                      <IconButton className="delete_option_icon px-5 " aria-label="delete" >
                                                          <BsFillDashCircleFill  onClick={()=> {removeOption(i,j)}}/>
                                                          <span className="delete_option_span">Delete option</span>
                                                      </IconButton>
                                                  </div>
                                                    </li>

                                              </div>
                                          ))}

                                          {ques.options.length < 5 ? (
                                              <div className="add_question_body">
                                                      <div>
                                                          <BiAddToQueue/>
                                                          <Button size="small"  style={{textTransform: 'none',color:"rgba(140,177,192,1)",fontSize:"13px",fontWeight:"600"}} onClick={()=>{addOption(i)}}>Add Option</Button>
                                                      </div>
                                              </div>

                                          ): ""}
                                          </ol>
                                          <div className="score_question">
                                              <span style={{color:"blue", fontSize: "13px"}}>Score :  </span>
                                              <input type="text" className="text_input_score" placeholder="score" value={ques.score}
                                                     onChange={(e)=>{changeQuestionScore(e.target.value, i )}}/>
                                          </div>

                                          <div className="add_footer">
                                              <div className="add_question_bottom">
                                                  <IconButton className="add_question_icon" aria-label="new question" onClick={() => {addNewQuestionField(i)}} >
                                                      <BsFillBookmarkPlusFill style={{color:"blue"}}/>
                                                      <span className="new_question_span">New question</span>
                                                  </IconButton>
                                                  <IconButton className="Copy_question_icon" aria-label="Copy question" onClick={() => {copyQuestion(i)}}>
                                                         <FaRegCopy/>
                                                         <span className="Copy_question_span">Copy question</span>
                                                  </IconButton>
                                                  <IconButton className="delete_question_icon" aria-label="delete question" onClick={() => {deleteQuestion(i)}} >
                                                      <BsFillBookmarkXFill style={{color:"red"}}/>
                                                      <span className="delete_question_span">Delete question</span>
                                                  </IconButton>
                                                  <span style={{color:"#5f6368", fontSize: "13px"}}>Required </span>
                                                  <Switch name="checkedA" color="primary"  checked={ques.required} onChange={(e)=>{changeRequiredValue(e.target.checked, i)}}/>

                                              </div>
                                          </div>

                                      </AccordionDetails>
                                  </div>
                              </Accordion>
                              <br/>
                          </div>
                      ))
                  }

                  <div className="SaveQuiz">
                        <button className="btn btn-success " onClick={handelListQuiz}>Save</button>
                  </div>
              </div>


          </div>
          <Footer/>
      </div>
  )
}

export default CreateQuiz