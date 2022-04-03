import React from 'react'
import styled from 'styled-components'
import FirstBox from './FirstBox'

function ChartsBox(prop) {
  return (
    <Box>
        <FirstBox title="10" subtitle="Number of students "/>
        <FirstBox title="125" subtitle="Number of teachers "/>
        <FirstBox title="190" subtitle="Number of organizations"/>
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