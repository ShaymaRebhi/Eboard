import React from 'react';
import styled , { css }from 'styled-components';
import * as BSICons from "react-icons/bs"
const Button = styled.button`
    background-color: transparent ; 
  box-shadow:5px 5px 10px rgba(0, 0, 0, 0.2) 
  color: #FFF !important;
  border:0px;
  border-radius: 2px;
  width:100%;
  padding: 10px 20px; !Important;
  margin: 0.25em 0em;
 
  ${props => props.facebook && css`
    background: #4267B2;
    color: white;
    &:hover {
        background-color:#3C5D9F;
    }
  `}
 
  
`;

const Container = styled.div`
  text-align: center;
`

export const Facebook = ({
  text,
  type,
  onClick,
  icon
}) => {
    

  return (
    <Cont>
      <Button facebook
        onClick={onClick}
        type={type}
        showIcon={icon}
      >
        {icon && <BSICons.BsFacebook  className='icon' />} {text}
      </Button>
    
      
      </Cont>
  );
  
};

const Cont =styled.div`

 .icon{
  font-size:16px;
 }
 
`