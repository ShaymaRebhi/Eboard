import React,{useState}  from 'react'
import "./CreateQuiz.css"
import Switch from '@material-ui/core/Switch';
import { BsFillDashCircleFill, BsPatchCheckFill, BsFillBookmarkPlusFill, BsFillBookmarkXFill} from 'react-icons/bs';
import {BiAddToQueue} from 'react-icons/bi';
import { IconButton } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom";
import Select from "react-select";


function CreateQuiz() {
    const [quiz, setQuizs] = useState(
        [{Title : "React Hook",
            Theme:null,
            Description:"this is React Hooks quiz please answer all this question and good lock",
            question : [
                {questionText: "What is React ?",
                options : [
                    {optionText: "FrameWork", IsValid : false},
                    {optionText: "Libraries", IsValid : true},
                    {optionText: "Programming Language", IsValid : false},
                    {optionText: "IDE", IsValid : false}
                        ],
                required : false,
                score:5
            }
            ]

        }]
    )
    const listTheme = [
        { value: 'seance1', label: 'seance1' },
        { value: 'seance2', label: 'seance2' },
        { value: 'seance3', label: 'seance3' }
    ]
    const history = useHistory();
    const handelListQuiz = () => {
        history.push("/quizlist");

    }

    const changeQuizTitle = (text, i) => {
        var newQuiz = [...quiz];
        newQuiz[i].Title = text ;
        setQuizs(newQuiz);
        console.log(newQuiz)
    }
    const changeQuizTheme = (text, i) => {
        var newQuiz = [...quiz];
        newQuiz[i].Theme = text ;
        setQuizs(newQuiz);
        console.log(newQuiz)
    }
    const changeQuizDescription = (text, i) => {
        var newQuiz = [...quiz];
        newQuiz[i].Description = text ;
        setQuizs(newQuiz);
        console.log(newQuiz)
    }
    const changeQuestionScore = (text, i,j) => {
        var newQuiz = [...quiz];
        newQuiz[i].question[j].score = text ;
        setQuizs(newQuiz);
        console.log(newQuiz)
    }


    const changeQuestion = (text, i,j) => {
        var newQuiz = [...quiz];
        newQuiz[i].question[j].questionText = text ;
        setQuizs(newQuiz);
        console.log(newQuiz)
    }
    const changeRequiredValue = (rq, i,j) => {
        var newQuiz = [...quiz];
        newQuiz[i].question[j].required = rq ;
        setQuizs(newQuiz);
        console.log(newQuiz)
    }
    const changeOptionValue = (text, i, j,k) => {
        var newQuiz = [...quiz];
        newQuiz[i].question[j].options[k].optionText = text;
        setQuizs(newQuiz);
        console.log(newQuiz)
    }
    const changeIsValidValue = (valid, i, j,k) => {
        var newQuiz = [...quiz];
        newQuiz[i].question[j].options[k].IsValid = valid;
        setQuizs(newQuiz);
        console.log(newQuiz)
    }


    const removeOption = (i,j,k) => {
        var newQuiz = [...quiz];
        if(newQuiz[i].question[j].options.length > 1){
            newQuiz[i].question[j].options.splice(k , 1);
          setQuizs(newQuiz)
          console.log(i + "__" + j);
        }
    }
    const addOption = (i,j) => {
        var newQuiz = [...quiz];
            newQuiz[i].question[j].options.push({optionText: "Option" , IsValid : false})
        setQuizs(newQuiz)
    }

    const deleteQuestion = (i,j) => {
        let q = [...quiz]
        if(quiz[i].question.length > 1){
            q[i].question.splice(j, 1)
        }
        setQuizs(q)
    }

    /*const requiredQuestion = (i) =>{
        var reqQuestion = [...questions];

        reqQuestion[i].required =  ! requiredQuestion[i].required

        console.log( reqQuestion[i].required+" "+i);
        setQuestions(reqQuestion)
    }*/
    const addNewQuestionField = (i) => {
        var newQuiz = [...quiz];

            newQuiz[i].question.push({questionText: "Question",
                options: [ {optionText: "Option 1" ,IsValid: false}],
                score: 0,
                required: false})
        setQuizs(newQuiz)
    }

  return (
      <div>
          <div className="Quiz_form">
              <br/>
              <div className="section">


                          {quiz.map((qz,i)=>(
                              <>
                          <div className="Quiz_title_section">
                              <div className="Quiz_form_top">
                              <>
                                  <input type="text" id="Title" className="Quiz_form_top_Name" placeholder="Title"
                                         value={qz.Title} onChange={(e)=>{changeQuizTitle(e.target.value, i)}} />
                                  <br/>
                         {/*         <input type="text" id="class" className="Quiz_form_top_class" placeholder="Class"
                                         value={qz.Theme} onChange={(e)=>{changeQuizTheme(e.target.value, i)}} />*/}
                                  {/*<select name="categorieProduit" value={qz.Theme} onChange={(e)=>{changeQuizTheme(e.target.value, i)}}>
                                              <option value=""  disabled selected>Select Theme</option>
                                              <option value="Seance1">Seance1</option>
                                              <option value="Seance2">Seance2</option>
                                              <option value="Seance3">Seance3</option>
                                  </select>*/}
                                  <Select
                                      value={qz.Theme}
                                      options={listTheme}
                                      placeholder="Select Theme"
                                   />
                                  <input type="text" id="Description" className="Quiz_form_top_desc" placeholder="Description"
                                         value={qz.Description} onChange={(e)=>{changeQuizDescription(e.target.value, i)}} />
                              </>

                                </div>
                        </div>
                        <br/>

                              {qz.question.map((ques,j) => (
                                      <div key={j}>
                                          <Accordion  className={'add_border'}>
                                              <div className="question_boxes">
                                                  <AccordionDetails className="add_question">
                                                      <div className="add_question_top">
                                                          <input type="text" className="question" placeholder="Question" value={ques.questionText} onChange={(e)=>{changeQuestion(e.target.value,i, j)}}/>
                                                          {/*<CropOriginalIcon style={{color:"#5f6368"}} />*/}
                                                      </div>
                                                      <ol type="A">
                                                      {ques.options.map( (op, k)=>(
                                                          <div className="add_question_body" key={k}>
                                                                <li>
                                                              <div className="optionstyle">


                                                                  <input type="text" className="text_input" placeholder="option" value={ques.options[k].optionText}
                                                                         onChange={(e)=>{changeOptionValue(e.target.value, i , j,k)}}/>
                                                                  <BsPatchCheckFill/>
                                                                  <Switch className="text_input2" name="checkedA" color="primary" aria-label="Is Valid" checked={ques.options[k].IsValid}
                                                                           onChange={(e)=>{changeIsValidValue(e.target.checked, i , j,k)}}/>


                                                                  <IconButton className="delete_option_icon  " aria-label="delete" >
                                                                      <BsFillDashCircleFill  onClick={()=> {removeOption(i,j,k)}}/>
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
                                                                      <Button size="small"  style={{textTransform: 'none',color:"rgba(140,177,192,1)",fontSize:"13px",fontWeight:"600"}} onClick={()=>{addOption(i,j)}}>Add Option</Button>
                                                                  </div>
                                                          </div>

                                                      ): ""}
                                                      </ol>
                                                      <div className="score_question">
                                                          <span style={{color:"blue", fontSize: "13px"}}>Score :  </span>
                                                          <input type="text" className="text_input_score" placeholder="score" value={ques.score}
                                                                 onChange={(e)=>{changeQuestionScore(e.target.value, i ,j )}}/>
                                                      </div>

                                                      <div className="add_footer">
                                                          <div className="add_question_bottom">
                                                              <IconButton className="add_question_icon" aria-label="new question" onClick={() => {addNewQuestionField(i,j)}} >
                                                                  <BsFillBookmarkPlusFill style={{color:"blue"}}/>
                                                                  <span className="new_question_span">New question</span>
                                                              </IconButton>
                                                              <IconButton className="delete_question_icon" aria-label="delete question" onClick={() => {deleteQuestion(i,j)}} >
                                                                  <BsFillBookmarkXFill style={{color:"red"}}/>
                                                                  <span className="delete_question_span">Delete question</span>
                                                              </IconButton>
                                                              <span style={{color:"#5f6368", fontSize: "13px"}}>Required </span>
                                                              <Switch name="checkedA" color="primary"  checked={ques.required} onChange={(e)=>{changeRequiredValue(e.target.checked, i,j)}}/>

                                                          </div>
                                                      </div>

                                                  </AccordionDetails>
                                              </div>
                                          </Accordion>
                                          <br/>
                                      </div>
                                  ))
                              }
                  </>
                              ))}


                  <div className="SaveQuiz">
                        <button className="btn btn-success " onClick={handelListQuiz}>Save</button>
                  </div>

              </div>


          </div>
          
      </div>
  )
}

export default CreateQuiz