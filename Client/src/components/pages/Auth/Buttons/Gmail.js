

import React from 'react';
import { Link } from 'react-router-dom';
import styled , { css }from 'styled-components';
import * as AIICons from "react-icons/ai"


export const Gmail = ({
  text1,
  text2,
  text3,
  type,
  onClick,
  active
}) => {
    

  return (
    <Cont>

    
    
     <Button gmail
        onClick={onClick}
        type={type}
        disabled={active}
      >
        <AIICons.AiFillGoogleCircle className='icon'/> {text2}
      </Button>
    
      
    </Cont>
  );
  
};
const Cont =styled.div`

 .icon{
  font-size:19px;
 }
 
`


const Button = styled.button`
    background-color: transparent ; 
  box-shadow:5px 5px 10px rgba(0, 0, 0, 0.2) 
  color: #FFF !important;
  border:0px;
  border-radius: 2px;
  width:100%;
  padding: 10px 20px; !Important;
  margin: 0.25em 0em;
 
  ${props => props.gmail && css`
    background: #EA4335;
    color: white;
    &:hover {
        background-color:#C5392D;
    }
    &:disabled{
     
      background-color: #F04739;
      color: #ECEBEB;
    }
  `}
 
`;

const Container = styled.div`
  text-align: center;
`