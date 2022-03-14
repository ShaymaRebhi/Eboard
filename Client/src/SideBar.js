import React from "react";

import styled from "styled-components";
const StyledSideNav = styled.div`
  position: fixed;     
  height: 100%;
  width: 60px;     
  z-index: 1;         
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(140,177,192,1) 0%, rgb(196,215,229) 100%); 
  overflow-x: hidden;     
  padding-top: 10px;
`;
class SideNav extends React.Component{
    render(){
        return(
            <StyledSideNav></StyledSideNav>
        );
    }
}
export default class SideBar extends React.Component{
    render(){
        return(
            <SideNav>
            </SideNav>
        );
    }
}