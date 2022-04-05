import React from 'react'
import styled from 'styled-components'

function FirstBox(prop) {
  return (
    <First>
        <p>{prop.subtitle}</p>
        <h1>{prop.title}</h1>
    </First>
  )
}
const First=styled.div`
margin:0px 80px;
p{
    color:grey;
    margin:30px 30px -20px;
}
h1{
    
   
}

`
export default FirstBox