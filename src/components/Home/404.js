import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Image } from 'semantic-ui-react';

import styled from "styled-components";
export default function Page_404() {
  return (
    <div>
      <ErrorPage>
        <ErrorHeader></ErrorHeader>
        <Image centered src="/404.png" size='huge'  alt="Sad computer" /><br/>
        
        <ErrorMessage>
            <Link to="/">
            <Button color='yellow'> Home</Button>
            </Link>
        </ErrorMessage>
      </ErrorPage>
    </div>
  );
}
const ErrorPage = styled.div`
  margin: 0 0 100px;
  text-align: center;
`;
const ErrorHeader = styled.div`
  width: 112px;
`;
const ErrorTitle = styled.div`
  font-family: "Roboto", Arial, sans-serif;
  font-size: 31px;
`;
const ErrorMessage = styled.div`
margin: 1% 1% 1% 1%;
`;
