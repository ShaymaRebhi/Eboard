import React,{useState,useEffect}  from 'react'
import "./CreateQuiz.css"
import Footer from "../Footer";

import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'
import Switch from '@material-ui/core/Switch';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ShortTextIcon from '@material-ui/icons/ShortText';
import SubjectIcon from '@material-ui/icons/Subject';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {BsTrash, BsFillDashCircleFill, BsPatchCheckFill, BsFillBookmarkPlusFill, BsFillBookmarkXFill} from 'react-icons/bs';
import {FaRegCopy} from 'react-icons/fa';
import {BiAddToQueue} from 'react-icons/bi';
import {GiChoice} from 'react-icons/gi';
import {AiFillFileAdd} from 'react-icons/ai';

import { IconButton } from '@material-ui/core';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import AddcircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography'
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
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
                open: true,
                required : false
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
                open: true,
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
                                  {/*<label htmlFor="Title" className="ca">Quiz Name :</label>*/}
                                  <input type="text" id="Title" className="Quiz_form_top_Name" placeholder="Title"
                                         value={qz.Title} onChange={(e)=>{changeQuizTitle(e.target.value, i)}} />
                                  {/*<label htmlFor="class" className="ca">class :</label>*/}
                                  <input type="text" id="class" className="Quiz_form_top_class" placeholder="Class"
                                         value={qz.Class} onChange={(e)=>{changeQuizClass(e.target.value, i)}} />
                                  {/*<label htmlFor="Description" className="ca">Description :</label>*/}
                                  <input type="text" id="Description" className="Quiz_form_top_desc" placeholder="Description"
                                         value={qz.Description} onChange={(e)=>{changeQuizDescription(e.target.value, i)}} />
                              </>
                          ))}
                      </div>
                  </div>
                  <br/>

                  {questions.map((ques,i) => (
                          <div>
                              <Accordion expanded={questions[i].open} className={questions[i].open ? 'add_border' :""}>
                                  {/*<AccordionSummary aria-controls="panel1a-content" id="panel1a-header" elevation={1} style={{width:'100%'}}>

                         {questions[i].open ? (

                             <div className="saved_questions">
                             <Typography style={{fontsize:"15px", fontWeight:"400",letterSpacing: '.1px',lineHeight:'24px',paddingBottom: "8px"}}>
                                 {i+1}. {questions[i].questionText}</Typography>

                                 {ques.options.map( (op, j)=>(
                                     <div key={j}>
                                         <div style={{display: 'flex',}}>
                                         <FormControlLabel style={{marginLeft:"Spx", marginBottom: "Spx"}} disabled control={<input type={ques.questionType}
                                             color="primary" style={{marginRight: '3px', }} required={ques.type}/>} label={
                                             <Typography style={{
                                                 fontFamily: 'Roboto,Arial, sans-serif',
                                                 fontSize: ' 13px',
                                                 fontWeight: '400',
                                                 letterSpacing: '.2px',
                                                 lineHeight: '20px',
                                                 color: '#202124'}}>
                                                 {ques.options[j].optionText}
                                             </Typography>
                                         }/>
                                         </div>
                                     </div>
                                     ))}
                             </div>
                         ):""}
                    </AccordionSummary>*/}

                                  <div className="question_boxes">
                                      <AccordionDetails className="add_question">
                                          <div className="add_question_top">
                                              <input type="text" className="question" placeholder="Question" value={ques.questionText} onChange={(e)=>{changeQuestion(e.target.value, i)}}/>
                                              {/*<CropOriginalIcon style={{color:"#5f6368"}} />*/}
                                             {/*<Select className="select" style={{color:"#5f6368", fontsize:"13px"}} >
                                                <MenuItem id="text" value="Text" > <SubjectIcon style={{marginRight:"10px"}}/> Paragraph</MenuItem>
                                                <MenuItem id="checkbox" value="checkbox"><CheckBoxIcon style={{marginRight:"10px", color:"#70757a"}} checked /> Checkbox</MenuItem>
                                                <MenuItem id="radio" value="Radio" > <Radio style={{marginRight:"10px", color:"#70757a"}} checked /> Multiple Choice </MenuItem>
                                             </Select>*/}
                                          </div>
                                          <ol type="A">
                                          {ques.options.map( (op, j)=>(
                                              <div className="add_question_body" key={j}>
                                                  {/*{
                                                      (ques.questionType!=="text") ?
                                                          <input type={ques.questionType} style={{marginRight:"10px"}}/> :
                                                          <ShortTextIcon style={{marginRight:"10px"}} />
                                                  }*/}
                                                    <li>
                                                  <div className="optionstyle">


                                                      <input type="text" className="text_input" placeholder="option" value={ques.options[j].optionText}
                                                             onChange={(e)=>{changeOptionValue(e.target.value, i , j)}}/>
                                                      <BsPatchCheckFill/>
                                                      <Switch className="text_input2" name="checkedA" color="primary" aria-label="Is Valid" checked={ques.options[j].IsValid}
                                                               onChange={(e)=>{changeIsValidValue(e.target.checked, i , j)}}/>

                                                      &nbsp;
                                                      &nbsp;
                                                      &nbsp;
                                                      &nbsp;
                                                      &nbsp;
                                                      &nbsp;
                                                      &nbsp;
                                                      &nbsp;
                                                      &nbsp;
                                                      &nbsp;
                                                      &nbsp;
                                                      &nbsp;
                                                      &nbsp;
                                                      &nbsp;

                                                      <IconButton className="delete_option_icon" aria-label="delete" >
                                                          <BsFillDashCircleFill  onClick={()=> {removeOption(i,j)}}/>
                                                          <span className="delete_option_span">Delete option</span>
                                                      </IconButton>
                                                  </div>
                                                    </li>

                                              </div>
                                          ))}

                                          {ques.options.length < 5 ? (
                                              <div className="add_question_body">
                                                  <FormControlLabel disabled control={

                                                      (ques.questionType!=="text") ?
                                                          <input type={ques.questionType}  color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} style={{marginLeft:"10px",marginRight:"10px"}} disabled/> :
                                                          <ShortTextIcon style={{marginRight:"10px"}} />

                                                  } label={
                                                      <div>
                                                            <BiAddToQueue/>
                                                          {/*<input type="text" className="text_input" style={{fontSize:"13px",width:"60px"}} placeholder="Add other"/>*/}
                                                          <Button size="small"  style={{textTransform: 'none',color:"rgba(140,177,192,1)",fontSize:"13px",fontWeight:"600"}} onClick={()=>{addOption(i)}}>Add Option</Button>
                                                      </div>
                                                  } />
                                              </div>

                                          ): ""}
                                          </ol>
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