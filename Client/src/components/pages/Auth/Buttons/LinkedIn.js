

import React from 'react';
import styled , { css }from 'styled-components';
import * as AIICons from "react-icons/ai"


export const LinkedIn = ({
 
  text2,
  icon,
  type,
  onClick,
  active
}) => {
    

  return (
    <Cont>

    
    
     <Button linkedIn
        onClick={onClick}
        type={type}
        disabled={active}
        showIcon={icon}
      >
        {icon && <AIICons.AiFillLinkedin className='icon'/>} {text2}
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
 
  ${props => props.linkedIn && css`
    background: #0072b1;
    color: white;
    &:hover {
        background-color:#027DC1;
    }
    &:disabled{
     
      background-color: #2C87B9;
      color: #ECEBEB;
    }
  `}
 
`;

