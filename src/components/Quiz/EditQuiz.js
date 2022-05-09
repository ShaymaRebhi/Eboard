import React, {useEffect, useState} from 'react'
import "./CreateQuiz.css"
import Switch from '@material-ui/core/Switch';
import { BsFillDashCircleFill, BsPatchCheckFill, BsFillBookmarkPlusFill, BsFillBookmarkXFill} from 'react-icons/bs';
import {BiAddToQueue} from 'react-icons/bi';
import { IconButton } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import {useHistory, useRouteMatch} from "react-router-dom";
import {getOneQuiz, updateQuiz} from "../../utils/Quiz";
import {toast, ToastContainer} from "react-toastify";
import {MultiSelect} from "react-multi-select-component";
import TimeField from "react-simple-timefield";


function EditQuiz() {
    const match = useRouteMatch();
    const [Questions,setQuestions] = useState([
        {questionText: "",
            options : [
                {optionText: "", IsValid : false},
            ],
            required : false,
            score:0
        }]
    )
    const [quiz, setQuizs] = useState(
        {Title : "",
            Theme:null,
            Description:""
        }
    )

    const listTheme = [
    ]
    const history = useHistory();
    const changeQuizTitle = (text) => {
        var newQuiz = {...quiz};
        newQuiz.Title = text ;
        setQuizs(newQuiz);
        console.log(newQuiz)
    }
    const changeQuizDescription = (text) => {
        var newQuiz = {...quiz};
        newQuiz.Description = text ;
        setQuizs(newQuiz);
        console.log(newQuiz)
    }
    const changeQuestionScore = (text,j) => {
        var newQuestion = [...Questions];
        newQuestion[j].score = text ;
        setQuestions(newQuestion);
        console.log(newQuestion)
    }


    const changeQuestion = (text,j) => {
        var newQuestion = [...Questions];
        newQuestion[j].questionText = text ;
        setQuestions(newQuestion);
        console.log(newQuestion)
    }
    const changeRequiredValue = (rq,j) => {
        var newQuestion = [...Questions];
        newQuestion[j].required = rq ;
        setQuestions(newQuestion);
        console.log(newQuestion)
    }
    const changeOptionValue = (text, j,k) => {
        var newQuestion = [...Questions];
        newQuestion[j].options[k].optionText = text;
        setQuestions(newQuestion);
        console.log(newQuestion)
    }
    const changeIsValidValue = (valid, j,k) => {
        var newQuestion = [...Questions];
        newQuestion[j].options[k].IsValid = valid;
        setQuestions(newQuestion);
        console.log(newQuestion)
    }
    const changeQuizTime = (text) => {
        var newQuiz = {...quiz};
        newQuiz.Time = text ;
        setQuizs(newQuiz);
        console.log(newQuiz)
    }


    const removeOption = (j,k) => {
        var newQuestion = [...Questions];
        newQuestion[j].options.splice(k , 1);
        setQuestions(newQuestion)
        console.log("__" + j);
    }
    const addOption = (j) => {
        var newQuestion = [...Questions];
        newQuestion[j].options.push({optionText: "" , IsValid : false})
        setQuestions(newQuestion)
    }

    const deleteQuestion = (j) => {
        var q = [...Questions];
        if(Questions.length > 1){
            q.splice(j, 1)
        }
        setQuestions(q)
    }
    const addNewQuestionField = () => {
        var newQuestion = [...Questions];

        newQuestion.push({questionText: "",
            options: [{optionText: "" ,IsValid: false}],
            score: 0,
            required: false})
        setQuestions(newQuestion)
    }
    function componentDidMount(time) {
        setTimeout(() => {history.push("/QuizList")}, time)
    }
    const getQuizWithId = () =>{
        getOneQuiz(match.params.id,(res)=> {
            setQuizs(res.data)
            setQuestions(res.data.Questions)
        })
    }
    useEffect(()=>{
        getQuizWithId()
    },[])
    const SaveQuiz = (id) => {
        const newQuiz ={
            Title : quiz.Title,
            Theme : quiz.Theme,
            Description : quiz.Description,
            Questions:Questions
        }
        console.log(newQuiz);

        updateQuiz(id,newQuiz,() =>(
            toast.success('Task updated successfuly', {
                position: "bottom-right"
            }),
                componentDidMount(3000)
        ))

    }

    const BackToListQuiz =() =>{
        history.push("/QuizList")
    }


    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="Quiz_form">
                <br/>
                <div className="section">
                    <>
                        <div className="Quiz_title_section">
                            <div className="Quiz_form_top">
                                <>
                                    <h1 style={{color:"rgba(140,177,192,1)",fontSize:"35px"}}>Add Quiz</h1>
                                    <br/>
                                    <div style={{display:"flex"}}>
                                        <h1 style={{color:"black",fontSize:"32px", textAlign:"left"}}>Title: </h1>
                                        &nbsp;
                                        <input type="text" id="Title" className="Quiz_form_top_Name" placeholder="Write Title here"
                                               value={quiz.Title} onChange={(e)=>{changeQuizTitle(e.target.value)}} />
                                    </div>
                                    <div style={{display:"flex",flexDirection:"column"}}>
                                        <h3 style={{color:"black", textAlign:"left"}}>Description : </h3>
                                        <textarea id="Description" className="Quiz_form_top_desc" placeholder="Write Description here"
                                                  value={quiz.Description} onChange={(e)=>{changeQuizDescription(e.target.value)}} />
                                    </div>
                                    <br/>
                                    <div style={{display:"flex",flexDirection:"column"}}>
                                        <h3 style={{color:"black", textAlign:"left"}}>Time : </h3>
                                        <TimeField
                                            value={quiz.Time}
                                            onChange={(e)=>{changeQuizTime(e.target.value)}}
                                            colon=":"
                                            showSeconds ={true}
                                        />
                                    </div>
                                </>

                            </div>
                        </div>
                        <br/>

                        {Questions.map((ques,j) => (
                            <div key={j}>
                                <Accordion  className={'add_border'}>
                                    <div className="question_boxes">
                                        <AccordionDetails className="add_question">
                                            <div className="add_question_top">
                                                <input type="text" className="question" placeholder="Question" value={ques.questionText} onChange={(e)=>{changeQuestion(e.target.value,j)}}/>
                                                {/*<CropOriginalIcon style={{color:"#5f6368"}} />*/}
                                            </div>
                                            <ol type="A">
                                                {ques.options.map( (op, k)=>(
                                                    <div className="add_question_body" key={k}>
                                                        <li>
                                                            <div className="optionstyle">


                                                                <input type="text" className="text_input" placeholder="option" value={ques.options[k].optionText}
                                                                       onChange={(e)=>{changeOptionValue(e.target.value,j,k)}}/>
                                                                <BsPatchCheckFill/>
                                                                <Switch className="text_input2" name="checkedA" color="primary" aria-label="Is Valid" checked={ques.options[k].IsValid}
                                                                        onChange={(e)=>{changeIsValidValue(e.target.checked,j,k)}}/>


                                                                <IconButton className="delete_option_icon  " aria-label="delete" >
                                                                    <BsFillDashCircleFill  onClick={()=> {removeOption(j,k)}}/>
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
                                                            <Button size="small"  style={{textTransform: 'none',color:"rgba(140,177,192,1)",fontSize:"13px",fontWeight:"600"}} onClick={()=>{addOption(j)}}>Add Option</Button>
                                                        </div>
                                                    </div>

                                                ): ""}
                                            </ol>
                                            <div className="score_question">
                                                <span style={{color:"blue", fontSize: "13px"}}>Score :  </span>
                                                <input type="text" className="text_input_score" placeholder="score" value={ques.score}
                                                       onChange={(e)=>{changeQuestionScore(e.target.value, j )}}/>
                                            </div>

                                            <div className="add_footer">
                                                <div className="add_question_bottom">
                                                    <IconButton className="add_question_icon" aria-label="new question" onClick={() => {addNewQuestionField(j)}} >
                                                        <BsFillBookmarkPlusFill style={{color:"blue"}}/>
                                                        <span className="new_question_span">New question</span>
                                                    </IconButton>
                                                    <IconButton className="delete_question_icon" aria-label="delete question" onClick={() => {deleteQuestion(j)}} >
                                                        <BsFillBookmarkXFill style={{color:"red"}}/>
                                                        <span className="delete_question_span">Delete question</span>
                                                    </IconButton>
                                                    <span style={{color:"#5f6368", fontSize: "13px"}}>Required </span>
                                                    <Switch name="checkedA" color="primary"  checked={ques.required} onChange={(e)=>{changeRequiredValue(e.target.checked,j)}}/>

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


                    <div style={{display:"flex",justifyContent:"flex-end"}}>
                        <div className="SaveQuiz">
                            <button className="btn btn-success " onClick={()=>SaveQuiz(match.params.id)}>Save Update</button>
                        </div>
                        &nbsp;
                        <div className="SaveQuiz">
                            <button className="btn btn-secondary " onClick={BackToListQuiz}>Back</button>
                        </div>
                    </div>

                </div>


            </div>

        </div>
    )
}

export default EditQuiz