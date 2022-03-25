import React, {useState} from 'react'
import "./QuizList.css"

import Footer from "../pages/Shared/Footer";
import uuid from "react-uuid";
import {useHistory} from "react-router-dom";
import {FaTrash} from 'react-icons/fa' ;
import {GrUpdate} from 'react-icons/gr' ;


function QuizList() {
    const history = useHistory();
    const handelformadd = () => {
        const id_ = uuid();
        history.push("/formAddquiz/"+id_);
    }
    const [quiz, setQuizs] = useState(
        [{Title : "React Hook",
            Class:"4TWIN3",
            Description:"this is React Hooks quiz please answer all this question and good lock",
            questions :[

            ]

        }]
    )
  return (
    <>
        <div className="headers text-center">
            <h1>Quiz List</h1>
            <button className="btn btn--primary"  onClick={handelformadd}>Add Quiz</button>
        </div>
        <div className="container pb-5 ">
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Quiz Name</th>
                    <th scope="col">Class</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>

                <tbody>
                {quiz.map((q,i)=>(
                    <tr>
                        <th scope="row">{i+1}</th>
                        <td>{q.Title}</td>
                        <td>{q.Class}</td>
                        <td>{q.Description}</td>
                        <td> <button className="btn btn-outline-primary"  onClick={handelformadd}><GrUpdate/> </button>
                            &nbsp;
                            &nbsp;
                            <button className="btn btn-outline-danger"  onClick={handelformadd}> <FaTrash/> </button>
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