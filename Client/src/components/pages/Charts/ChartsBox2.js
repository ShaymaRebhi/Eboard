import React, {useState,useEffect} from 'react'
import styled from 'styled-components'
import FirstBox from './FirstBox'
import {getAverageScoreStudent, getNumberEvaluationAssigned, getNumberEvaluationWorked} from "../../../utils/Quiz";
import { Grid } from 'semantic-ui-react';

function ChartsBox2(prop) {
    const [numberTaskAssigned,setnumberTaskAssigned]= useState(0);
    const [numberTaskWorked,setnumberTaskWorked]= useState(0);
    const [averageScore,setAverageScore]= useState(0);
    const idUser = JSON.parse(localStorage.getItem("idStudent"))._id;

    const numberTaskAssignedd = async () => {
        await getNumberEvaluationAssigned(idUser,(res)=>{
            setnumberTaskAssigned(res.data)
        })
    }
    const numberTaskWorkedd = async () => {
        await getNumberEvaluationWorked(idUser,(res)=>{
            setnumberTaskWorked(res.data)
        })
    }
    const AverageScoree = async () => {
        await getAverageScoreStudent(idUser,(res)=>{
            setAverageScore(res.data.toFixed(2))
        })
    }
    useEffect(() => {
        numberTaskAssignedd();
        numberTaskWorkedd();
        AverageScoree()
    });



    return (
        <Box>
            <FirstBox title={numberTaskAssigned} subtitle="Number Evaluation Assigned " style={{color:"blue"}}/>
            <FirstBox title={numberTaskWorked} subtitle="Number Evaluation Worked " style={{color:"green"}}/>
            <FirstBox title={averageScore} subtitle="Average Student Score"/>
        </Box>
    )
}
const Box=styled.div`
width:100%;
height:150px;
box-shadow:10px 10px 20px rgba(0,0,0,0.2);
display:flex;
flex-wrap:nowrap;
align-items:start;
justify-content:center;

h1{
    margin-top:25px;
    color:grey;
}

`
export default ChartsBox2