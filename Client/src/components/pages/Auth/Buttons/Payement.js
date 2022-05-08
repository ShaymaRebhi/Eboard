import React from 'react';
import styled , { css }from 'styled-components';
import * as FAICons from "react-icons/fa"


export const PayementButton = ({
  text,
  type,
  onClick,
  icon,
  active
}) => {
    

  return (
    <Cont>
      <Button payement
        onClick={onClick}
        type={type}
        showIcon={icon}
        disabled={active}
      >
         <FAICons.FaCcMastercard  className='icon' /> <FAICons.FaCcVisa  className='icon' /> <FAICons.FaCcAmex  className='icon' />  <FAICons.FaCcDiscover  className='icon' /> {text}
      </Button>
    
      
      </Cont>
  );
  
};

const Cont =styled.div`

 .icon{
  font-size:50px;
 }
 
`

const Button = styled.button`
    background-color: transparent ; 
    box-shadow:5px 5px 10px rgba(0, 0, 0, 0.2) 
    color: #FFF !important;
    border:0px;
    border-radius: 2px;
    width:100%;
    padding: 15px 20px;
    margin: 0.25em 0em;
 
  ${props => props.payement && css`
    background: linear-gradient(90deg, rgb(2,0,36) 0%, rgb(140,177,192) 0%, rgb(140,177,192) 100%);
    color: white;
    &:hover {
        background-color:#000 !important;
    }
    &:disabled{
      border: 1px solid #999999;
      background-color: #4970BF;
      color: #EFEFEF;
    }
  `}
 
  
`;

const Container = styled.div`
  text-align: center;
`