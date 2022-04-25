import React, {useEffect, useState } from 'react'
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import "./../Quiz/EndQuiz.css";
import {useHistory, useRouteMatch} from "react-router-dom";

import {PieChart,Pie,Cell} from "recharts";
import {
    GetNumberStudentAssignedTask,
    GetNumberStudentByTaskEvaluation,
    GetNumberStudentWorkedTask,
    GetAverageTaskScore, getListTaskWorkedNotCorrected, getListTaskWorkedCorrected, getOneTask,
} from "../../utils/Task";
import {Item, Segment} from "semantic-ui-react";

function DetailTask() {
    const match = useRouteMatch();
    const history = useHistory();
    const idClass = JSON.parse(localStorage.getItem("idClass"))._id;
    const [nbStudent,setNbStudent] = useState();
    const [nbAssigned,setNbAssigned] = useState();
    const [nbWorked,setNbWorked] = useState();
    const [evaluationNotCorrected,setEvaluationNotCorrected] = useState([])
    const [evaluationCorrected,setEvaluationCorrected] = useState([])
    const [task,setTask]=useState({});

    const getOnetask = (id) => {
        getOneTask(id,(res)=>{
            setTask(res.data)
        })
    }
    const [averageScore,setAverageScore] = useState();

    const avgScore = (id) => {
        GetAverageTaskScore(id,(res)=>{
            setAverageScore(res.data);
        })
    }
    const numberStudent = (id) => {
        GetNumberStudentByTaskEvaluation(id,(res)=>{
            setNbStudent(res.data);
        })
    }
    const numberWorked = (id) => {
        GetNumberStudentWorkedTask(id,(res)=>{
            setNbWorked(res.data);
        })
    }
    const numberAssigned = (id) => {
        GetNumberStudentAssignedTask(id,(res)=>{
            setNbAssigned(res.data);
        })
    }
    const listNotCorrected = (id) => {
        getListTaskWorkedNotCorrected(idClass,id,(res)=>{
            setEvaluationNotCorrected(res.data);
        })
    }
    const listCorrected = (id) => {
        getListTaskWorkedCorrected(idClass,id,(res)=>{
            setEvaluationCorrected(res.data);
        })
    }


    useEffect(()=>{
        getOnetask(match.params.id);
        avgScore(match.params.id);
        numberStudent(match.params.id);
        numberAssigned(match.params.id);
        numberWorked(match.params.id);
        listNotCorrected(match.params.id);
        listCorrected(match.params.id);

    },[])

    const getCorrectionTaskPage = (idStudent,id) => {
        history.push(`/correctTask/${idStudent}/${id}`);
    }

    const BackToListTask = () => {
        history.push('/TaskList');
    }
    const data = [
        {name : "Worked" , value : nbWorked , color :'#04e122'},
        {name : "Assigned" , value : nbAssigned, color:'#3f12ff'}
    ]

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
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
                    <h1 className="resultsQuiz" style={{textAlign:"center"}}>{task.Title} Task State</h1>
                    <br/>
                    <div style={{display:"flex", justifyContent:"space-around"}}>
                        <div className="card-content-Quiz">
                            <div className="content-Quiz">
                                <br/>
                                <br/>
                                <p className="scoreQuiz2"><strong>Students :</strong>{nbStudent} </p>
                                <p className="scoreQuiz2" style={{color:"black"}}><strong>Assigned : </strong>{nbAssigned} </p>
                                <p className="scoreQuiz2" style={{color:"black"}}><strong>Worked : </strong>{nbWorked} </p>
                                <p style={{color:"black"}}><strong>Average Score : </strong>{averageScore} </p>

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
                    {/*{evaluationNotCorrected.length <= 0 ? ("") : (
                        <div>
                            <h2 style={{color: "black"}}>Not Corrected :</h2>
                            {evaluationNotCorrected.map((enc, i) => (
                                <Segment color='grey' raised key={i}>
                                    <Item.Group divided>
                                        <Item>
                                            <Item.Image size='tiny' avatar src='images/quizz.jpg'/>
                                            <Item.Content>
                                                <Item.Header>{enc.Student.FirstName} {enc.Student.LastName}</Item.Header>
                                            </Item.Content>
                                        </Item>
                                        <Item className="buttons">
                                            <button className="btn btn-primary" onClick={() => {
                                            }}>Check Answer
                                            </button>
                                        </Item>
                                    </Item.Group>
                                </Segment>

                            ))}

                        </div>
                    )
                    }*/}
                    {evaluationNotCorrected.length <= 0 ? (""):(
                        <div>
                            <h3 style={{color:"black"}}>Not Corrected :</h3>
                            <div>
                                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th scope="col">First Name</th>
                                            <th scope="col">Last Name</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {evaluationNotCorrected.map((e,i)=>(
                                            <tr key={i}>
                                                <td>{e.Student.FirstName}</td>
                                                <td>{e.Student.LastName}</td>
                                                <td>
                                                    <button className="btn btn-primary" onClick={() => {getCorrectionTaskPage(e.Student._id,e.Task._id)}}>
                                                        Check Answer
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                <br/>
                                <br/>
                            </div>
                        </div>
                    )}
                    {evaluationCorrected.length <= 0 ? (""):(
                    <div>
                        <h3 style={{color:"black"}}>Corrected :</h3>
                            <div>
                                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th scope="col">First Name</th>
                                            <th scope="col">Last Name</th>
                                            <th scope="col">Score</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {evaluationCorrected.map((e,i)=>(
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
                    </div>
                    )}
                    <div>
                        <button className="btn btn-secondary mr-2 " onClick={BackToListTask}>Back</button>
                    </div>
                </AccordionDetails>

            </div>

        </Accordion>
    )
}

export default DetailTask