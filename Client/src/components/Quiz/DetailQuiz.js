import React, {useEffect, useState } from 'react'
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import "./EndQuiz.css";
import {useHistory, useRouteMatch} from "react-router-dom";
import {
    GetNumberStudentAssignedQuiz,
    GetNumberStudentByQuizEvaluation,
    GetNumberStudentWorkedQuiz
} from "../../utils/Quiz";
import {PieChart,Pie,Cell} from "recharts";

function DetailQuiz() {
    const match = useRouteMatch();
    const history = useHistory();
    const [nbStudent,setNbStudent] = useState();
    const [nbAssigned,setNbAssigned] = useState();
    const [nbWorked,setNbWorked] = useState();

    const numberStudent = (id) => {
        GetNumberStudentByQuizEvaluation(id,(res)=>{
            setNbStudent(res.data);
        })
    }
    const numberWorked = (id) => {
        GetNumberStudentWorkedQuiz(id,(res)=>{
            setNbWorked(res.data);
        })
    }
    const numberAssigned = (id) => {
        GetNumberStudentAssignedQuiz(id,(res)=>{
            setNbAssigned(res.data);
        })
    }

    useEffect(()=>{
        numberStudent(match.params.id);
        numberAssigned(match.params.id);
        numberWorked(match.params.id);
    })

    const BackToListQuiz = () => {
        history.push('/QuizList');
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
                    <div style={{display:"flex", justifyContent:"space-around"}}>
                        <div className="card-content-Quiz">
                            <div className="content-Quiz">
                                <h1 className="resultsQuiz">Quiz State</h1>
                                <p className="scoreQuiz2"><strong>Student :</strong>{nbStudent} </p>
                                <p className="scoreQuiz2" style={{color:"#3f12ff"}}><strong>Assigned :</strong>{nbAssigned} </p>
                                <p className="scoreQuiz2" style={{color:"#04e122"}}><strong>Worked :</strong>{nbWorked} </p>
                            </div>
                        </div>
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
                    </div>
                    <div>
                        <button className="btn btn-secondary mr-2 " onClick={BackToListQuiz}>Back</button>
                    </div>
                </AccordionDetails>

            </div>

        </Accordion>
    )
}

export default DetailQuiz