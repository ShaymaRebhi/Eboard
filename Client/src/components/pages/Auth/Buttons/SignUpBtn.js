import React from 'react';
import { Link } from 'react-router-dom';
import styled , { css }from 'styled-components';

const Button = styled.button`
    background-color: transparent ; 
  box-shadow:5px 5px 10px rgba(0, 0, 0, 0.2) 
  color: #FFF !important;
  border:0px;
  border-radius: 2px;
  width:100%;
  padding: 10px 20px; !Important;
  margin: 0.25em 0em;
 
  ${props => props.signup && css`
    background: #65A2D1;
    color: #FFF;
    &:hover {
        background-color:#4E84AD;
    }
  `}
`;

const Container = styled.div`
  text-align: center;
`

export const SignUpBtn = ({
  text,
  type,
  onClick,
}) => {
    

  return (
    <div>    
      <Link  to="/sign-up"><Button signup
        onClick={onClick}
        type={type}
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{ marginRight: '5px' }} class="bi bi-person-plus-fill" viewBox="0 0 16 16">
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
             <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
        </svg> {text}
      </Button></Link>
    
      
      </div>
  );
  
};