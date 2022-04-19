import React, {useEffect, useState} from 'react'
import "./QuizList.css"
import {Link, useHistory} from "react-router-dom";
import {FaTrash} from 'react-icons/fa' ;
import {GrUpdate} from 'react-icons/gr' ;
import {MdAssignment} from 'react-icons/md'
import {assignQuizAfterSave, deleteQuiz, getQuizByTeacher, updateQuizStatus} from "../../utils/Quiz";
import {toast, ToastContainer} from "react-toastify";
import {Header, Icon, Item, Segment} from "semantic-ui-react";


function QuizList() {
    const idUser=JSON.parse(localStorage.getItem("login")).User._id;
    const idClass = JSON.parse(localStorage.getItem("idClass"))._id;
    const history = useHistory();
    const [quiz, setQuizs] = useState([
        {Title : "",
            Theme:"",
            Description:"",
            questions :[],
            creator:idUser
        }]
    )
    const [searchTerm,setSearchTerm] = useState([]);
    const getQuizs=()=>{
        getQuizByTeacher(idUser,idClass,(res)=> {
            setQuizs(res.data)
        })
    }

    const getQuizEditPage = (id) => {
        history.push(`/updateQuiz/${id}`);
    }
    useEffect(()=>{
        getQuizs();
    })
    const handelformadd = () => {
        history.push("/createquiz");
    }
    const handelSearchTerm = (e) =>{
        let value = e.target.value.toLowerCase();
        setSearchTerm(value);
    }
    const assignQuiz = (quiz,id) => {
        assignQuizAfterSave(idClass,quiz, () => (
            toast.success('Quiz assigned successfuly', {
                position: "bottom-right"
            })
        ))
        const newQuiz ={
            status : "Assigned"
        }
        updateQuizStatus(id,newQuiz,()=>(
            getQuizs()
        ))
    }
  return (
    <>
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
        <div style={{display:"flex"}}>
            <img src="images/quizlist2.jpg" alt="quizpicture" width="60%"  />
            <div className="headers text-center">
                <h1>Quiz List</h1>
                <button className="btn btn--primary"  onClick={handelformadd}>Add Quiz</button>
            </div>
        </div>
        <div className="wrap">
            <div className="search">
                <input type="text" className="searchTerm" placeholder="Search" onChange={handelSearchTerm}/>
                <i className="fa fa-search"></i>
            </div>
        </div>
        <div className="container pb-5 ">
            {quiz.length <= 0 ? (
                <Segment placeholder>
                    <Header icon>
                        <Icon name='tasks' />
                        No quizs Added .
                    </Header>

                </Segment>
            ):(
                quiz.filter((q)=>{
                    return q.Title.toLowerCase().includes(searchTerm)
                }).map((q,i)=>(
                    <>
                    <Segment color='grey' raised >
                        <Item.Group divided key={i}>
                            <Item>
                                <Item.Image size='tiny' avatar src='images/quizz.jpg' />
                                <Item.Content>
                                    <Link to={"/DetailQuiz/"+q._id}>
                                    <Item.Header >{q.Title}</Item.Header>
                                    </Link>
                                    <Item.Meta>
                                        <span className='cinema'>{q.Theme}</span>
                                    </Item.Meta>
                                    <Item.Description>{q.Description}</Item.Description>
                                </Item.Content>
                            </Item>
                            <Item className="buttons">
                                <button className="btn btn-outline-primary"  onClick={()=>getQuizEditPage(q._id)}><GrUpdate/> </button>
                                <button className="btn btn-outline-danger"  onClick={()=>deleteQuiz(q._id,()=>{
                                        toast.success('Task deleted successfuly', {
                                            position: "bottom-right"
                                        })
                                    },
                                    getQuizs()
                                )}> <FaTrash/> </button>
                                {q.status === "Not Assigned" ? (
                                <button className="btn btn-outline-success" onClick={()=>{assignQuiz(q,q._id)}}><MdAssignment/></button>
                                ):("")
                                }
                            </Item>
                        </Item.Group>
                    </Segment>
                    </>

                ))

            )}

        </div>

        
    </>
  )
}

export default QuizList