import React, {useEffect, useState} from 'react'
import "./QuizList.css"
import {Link, useHistory} from "react-router-dom";
import {FaTrash} from 'react-icons/fa' ;
import {GrUpdate} from 'react-icons/gr' ;
import {MdAssignment} from 'react-icons/md'
import {assignQuizAfterSave, deleteQuiz, getQuizByTeacher, updateQuizStatus} from "../../utils/Quiz";
import {toast, ToastContainer} from "react-toastify";
import {Header, Icon, Item, Segment} from "semantic-ui-react";
import ReactPaginate from "react-paginate";


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

    const [pageNumber, setPageNumber] = useState (0)
    const quizsPerPage = 2;
    const pagesVisited = pageNumber * quizsPerPage;
    const pageCount = Math.ceil(quiz.length / quizsPerPage);

    const changePage = ({ selected }) => {

            setPageNumber(selected);
        };

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
                <h1 style={{color:"rgb(140,177,192)" ,fontSize:"50px"}}>Quiz List</h1>
            </div>
        </div>
        <div style={{display:"flex" ,justifyContent:"space-between"}}>
            <div className="wrap">
                <div className="search">
                    <input type="text" className="searchTerm" placeholder="Search" onChange={handelSearchTerm}/>
                </div>
            </div>
            <div className="buttons">
                <button className="btn btn--primary"  onClick={handelformadd}>Add Quiz</button>
            </div>
        </div>
        <br/>
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
                }).slice(pagesVisited, pagesVisited + quizsPerPage).map((q,i)=>(
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
                                {q.status === "Not Assigned" ? (
                                    <div className="edit_quiz_icon">
                                        <button className="btn btn-outline-primary"  onClick={()=>getQuizEditPage(q._id)}><GrUpdate/> </button>
                                        <span className="edit_quiz_span">Update Quiz</span>
                                    </div>
                                ):("")
                                }
                               <div className="delete_quiz_icon">
                                   <button className="btn btn-outline-danger"  onClick={()=>deleteQuiz(q._id,()=>{
                                            toast.success('Quiz deleted successfuly', {
                                                position: "bottom-right"
                                            })
                                        },
                                        getQuizs()
                                    )}> <FaTrash/> </button>
                                   <span className="delete_quiz_span">Delete Quiz</span>
                               </div>

                                {q.status === "Not Assigned" ? (
                                    <div className="assign_quiz_icon">
                                        <button className="btn btn-outline-success" onClick={()=>{assignQuiz(q,q._id)}}><MdAssignment/></button>
                                        <span className="assign_quiz_span">Assign Quiz</span>
                                    </div>
                                ):("")
                                }
                            </Item>
                        </Item.Group>
                    </Segment>
                    </>


                ))

            )}
            {quiz.length <= 0 ? ("") :(
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}

                />
            )}


        </div>


        
    </>
  )
}

export default QuizList