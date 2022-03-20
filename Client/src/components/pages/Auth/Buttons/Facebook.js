import React from 'react';
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
}) => {
    

  return (
    <div>
      <Button facebook
        onClick={onClick}
        type={type}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook "style={{ marginRight: '5px' }} viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
        </svg> {text}
      </Button>
    
      
      </div>
  );
  
};