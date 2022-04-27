import React, {useEffect, useState } from 'react'
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import "./EndQuiz.css";
import {useHistory, useRouteMatch} from "react-router-dom";
import {
    GetAverageScore,
    GetNumberStudentAssignedQuiz,
    GetNumberStudentByQuizEvaluation,
    GetNumberStudentWorkedQuiz, getStudentListByQuizWorked
} from "../../utils/Quiz";
import {PieChart,Pie,Cell} from "recharts";

function DetailQuiz() {
    const match = useRouteMatch();
    const history = useHistory();
    const [nbStudent,setNbStudent] = useState();
    const [nbAssigned,setNbAssigned] = useState();
    const [nbWorked,setNbWorked] = useState();
    const [averageScore,setAverageScore] = useState();
    const idClass = JSON.parse(localStorage.getItem("idClass"))._id;
    const [evaluation, setEvaluation] = useState([]);

    const numberStudent = async (id) => {
        await GetNumberStudentByQuizEvaluation(id,(res)=>{
            setNbStudent(res.data);
        })
    }
    const  numberWorked = async (id) => {
        await GetNumberStudentWorkedQuiz(id,(res)=>{
            setNbWorked(res.data);
        })
    }
    const numberAssigned = async (id) => {
        await GetNumberStudentAssignedQuiz(id,(res)=>{
            setNbAssigned(res.data);
        })
    }
    const avgScore = (id) => {
        GetAverageScore(id,(res)=>{
            setAverageScore(res.data);
        })
    }

    const getEvaluations =  (id) => {
        getStudentListByQuizWorked(idClass,id,(res)=>{
            setEvaluation(res.data)
        })
    }

    useEffect(()=>{
        numberStudent(match.params.id);
        numberAssigned(match.params.id);
        numberWorked(match.params.id);
        avgScore(match.params.id);
        getEvaluations(match.params.id);

    })

    const BackToListQuiz = () => {
        history.push('/QuizList');
    }
    const data = [
        {name : "Worked" , value : nbWorked , color :'#04e122'},
        {name : "Assigned" , value : nbAssigned, color:'#3f12ff'}
    ]

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel =  ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <Accordion>

            <div>
                <AccordionDetails style={{display:"flex", flexDirection:"column"}}>
                    <h1 className="resultsQuiz">Quiz State</h1>
                    <br/>
                    <div style={{display:"flex", justifyContent:"space-evenly"}}>
                        <div className="card-content-Quiz">
                            <div className="content-Quiz">
                                <br/>
                                <br/>
                                <p className="scoreQuiz2"><strong>Students : </strong>{nbStudent} </p>
                                <p className="scoreQuiz2" style={{color:"black"}}><strong>Assigned : </strong>{nbAssigned}</p>
                                <p className="scoreQuiz2" style={{color:"black"}}><strong>Worked : </strong>{nbWorked}</p>
                                <p className="scoreQuiz2" style={{color:"black"}}><strong>Average Score : </strong>{averageScore} </p>
                            </div>
                        </div>
                        <div>
                            <PieChart width={200} height={200}>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                            <div>
                                <p style={{color:"#3f12ff"}}>Assigned: {Math.floor((nbAssigned/nbStudent) * 100)}%</p>
                                <p style={{color:"#04e122"}}>Worked: {Math.floor((nbWorked/nbStudent) * 100)}%</p>
                            </div>
                        </div>

                    </div>
                    {evaluation.length <= 0 ? (""):(
                        <div>
                        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                            <h3 style={{color:"black"}} >List Student</h3>
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Score</th>
                                </tr>
                                </thead>
                                <tbody>
                                {evaluation.map((e,i)=>(
                                    <tr key={i}>
                                        <td>{e.Student.FirstName}</td>
                                        <td>{e.Student.LastName}</td>
                                        <td>{e.Score}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <br/>
                        <br/>
                        </div>
                        )}
                    <div>
                        <button className="btn btn-secondary mr-2 " onClick={BackToListQuiz}>Back</button>
                    </div>
                </AccordionDetails>

            </div>

        </Accordion>
    )
}

export default DetailQuiz