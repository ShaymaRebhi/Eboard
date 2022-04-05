import React, {useEffect, useState} from 'react'
import "./QuizList.css"
import {useHistory} from "react-router-dom";
import {FaTrash} from 'react-icons/fa' ;
import {GrUpdate} from 'react-icons/gr' ;
import {getAllQuizs,deleteQuiz} from "../../utils/Quiz";
import {toast, ToastContainer} from "react-toastify";


function QuizList() {
    const history = useHistory();
    const [quiz, setQuizs] = useState([
        {Title : "",
            Theme:"",
            Description:"",
            questions :[]
        }]
    )
    const getQuizs=()=>{
        getAllQuizs((res)=> {
            setQuizs(res.data)
        })
    }
    const getQuizEditPage = (id) => {
        history.push(`/updateQuiz/${id}`);
    }
    useEffect(()=>{
        getQuizs();
    })
    const assignHomeWork= () => {
        history.push("/assignHomeWork");
    }
    const handelformadd = () => {
        history.push("/createquiz");
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
        {/*<img src="../../../public/images/quiz.jpg" alt="quizpicture" name="imagequiz" width="50%" />*/}
        <div className="headers text-center">
            <h1>Quiz List</h1>
            <button className="btn btn--primary"  onClick={handelformadd}>Add Quiz</button>
        </div>
        <div className="container pb-5 ">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Quiz Name</th>
                    <th scope="col">Theme</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>

                <tbody>
                {quiz.map((q,i)=>(
                    <tr>
                        <td>{q.Title}</td>
                        <td>{q.Theme}</td>
                        <td>{q.Description}</td>
                        <td> <button className="btn btn-outline-primary"  onClick={()=>getQuizEditPage(q._id)}><GrUpdate/> </button>
                            <button className="btn btn-outline-danger"  onClick={()=>deleteQuiz(q._id,()=>{
                                    toast.success('Task deleted successfuly', {
                                        position: "bottom-right"
                                    })
                                },
                                getQuizs()
                            )}> <FaTrash/> </button>
                            <button className="btn btn-outline-success" onClick={assignHomeWork}>Assign</button>
                        </td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
        
    </>
  )
}

export default QuizList