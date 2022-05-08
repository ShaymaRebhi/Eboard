import React, {useState,useEffect} from 'react'
import styled from 'styled-components'
import FirstBox from './FirstBox'
import {GetNumberOrganizations, GetNumberStudents, GetNumberTeachers} from "../../../utils/api";

function ChartsBox(prop) {
    const [numberStudent,setNumberStudent]= useState(0);
    const [numberTeacher,setNumberTeacher]= useState(0);
    const [numberOrganization,setNumberOrganization]= useState(0);

    const numberStudentt = async () => {
        await GetNumberStudents((res)=>{
            setNumberStudent(res.data)
        })
    }
    const numberTeacherr = async () => {
        await GetNumberTeachers((res)=>{
            setNumberTeacher(res.data)
        })
    }
    const numberOrganizationn = async () => {
        await GetNumberOrganizations((res)=>{
            setNumberOrganization(res.data)
        })
    }
    useEffect(() => {
        numberStudentt();
        numberTeacherr();
        numberOrganizationn()
    });
    


    return (
    <Box>
        <FirstBox title={numberStudent} subtitle="Number of students "/>
        <FirstBox title={numberTeacher} subtitle="Number of teachers "/>
        <FirstBox title={numberOrganization} subtitle="Number of organizations"/>
    </Box>
  )
}
const Box=styled.div`
width:92%;
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
export default ChartsBox