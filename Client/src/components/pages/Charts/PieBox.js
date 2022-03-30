import { style } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function PieBox(prop) {
  return (
    <PieBoxSTYLE>
        <div class="main-part">
            <div class="cpanel">
                <div class="icon-part">
                    <i class="fa fa-users" aria-hidden="true"></i><br/>
                    <h1>Members</h1>
                    <h3>985</h3>
                </div>
                <div class="card-content-part">
                    <Link to="#" >Show list </Link>
                </div>
            </div>
        </div>
    </PieBoxSTYLE>
  )
}
const PieBoxSTYLE=styled.div`
font-family: 'Raleway', sans-serif;
.main-part{
    width:850px;
    margin:0 auto;
    text-align: center;
    padding: 0px;
    i{
        font-size: 30px;
        padding:10px;
        border:1px solid #fff;
        border-radius:50%;
        color:white !important;
        margin-top:-25px;
        margin-bottom: 10px;
        background-color:#34495E;
}
}
.cpanel{
    width:32%;
    display: inline-block;
    background-color:white;
    box-shadow:10px 10px 20px rgba(0,0,0,0.2);
    color:grey;
    margin-top: 50px;
    .card-content-part:hover{
    background-color: #5a5a5a;
    cursor: pointer;
}
}
.icon-part{
    h3{
        margin:0px;
        font-size: 20px;
        padding-bottom: 10px;
    }
    small{
        text-align:center;
        padding-bottom: 10px;
    }
}
.card-content-part{
    background-color: #2F4254;
    color:#fff;
    padding: 5px 0px;
}
`
export default PieBox