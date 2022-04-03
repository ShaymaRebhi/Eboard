import React, {useState} from 'react'
import "./QuizList.css"

import uuid from "react-uuid";
import {useHistory} from "react-router-dom";
import {FaTrash} from 'react-icons/fa' ;
import {GrUpdate} from 'react-icons/gr' ;
import {Button, Statistic, Icon, Divider, Item, Header, Segment, Grid, Dropdown, Confirm,} from "semantic-ui-react";
import { Link } from "react-router-dom";


function QuizList() {
    const history = useHistory();
    const assignHomeWork= () => {
        history.push("/assignHomeWork");
    }
    const handelformadd = () => {
        history.push("/createquiz");
    }
    const [quiz, setQuizs] = useState(
        [{Title : "React Hook",
            Theme:"seance1",
            Description:"this is React Hooks quiz please answer all this question and good lock",
            questions :[

            ]

        },
        ]
    )
  return (
    <>
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
                        <td> <button className="btn btn-outline-primary"  onClick={handelformadd}><GrUpdate/> </button>
                            <button className="btn btn-outline-danger"  onClick={handelformadd}> <FaTrash/> </button>
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