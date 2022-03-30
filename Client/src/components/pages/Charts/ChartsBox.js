import React from 'react'
import styled from 'styled-components'
import FirstBox from './FirstBox'

function ChartsBox(prop) {
  return (
    <Box>
        <FirstBox title="10" subtitle="Students count"/>
        <FirstBox title="125" subtitle="Teachers count"/>
        <FirstBox title="190" subtitle="Organizations count"/>
    </Box>
  )
}
const Box=styled.div`
width:1500px;
height:150px;
box-shadow:10px 10px 20px rgba(0,0,0,0.2);
display:flex;
flex-wrap:nowrap;
align-items:start;
justify-content:center;
margin:0px 20px;
h1{
    margin-top:25px;
    color:grey;
}

`
export default ChartsBox