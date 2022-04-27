import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {Item, Segment} from "semantic-ui-react";
import {getAverageScoreQuizAndTaskByStudentAndClass} from "../../utils/Quiz";

function Evaluation() {
  const idClass = JSON.parse(localStorage.getItem("idClass"))._id;
  const idUser = JSON.parse(localStorage.getItem("idStudent"))._id;

  const [avgScoreModule,setAvgScoreModule] = useState(1);

  const getAVGQuizScoreModule=()=>{
    getAverageScoreQuizAndTaskByStudentAndClass(idUser,idClass,(res)=> {
      setAvgScoreModule(res.data)
    })
  }
  useEffect(()=>{
    getAVGQuizScoreModule();
  })
  return (
    <>
      <div style={{display:"flex"}}>
        <img src="https://www.bienenseigner.com/wp-content/uploads/2021/08/auto-evaluation-1280x720.jpeg" alt="quizpicture" width="60%"  />
        <div className="headers text-center">
          <h1 style={{color:"rgb(140,177,192)",fontSize:"50px"}}>Evaluation</h1>
        </div>
      </div>
      <div style={{display:"flex" ,flexDirection:"column-reverse"}}>
        {avgScoreModule < 10 ? (
            <h3 style={{color:"red",textAlign:"center"}}>Low</h3>
        ) :("")
        }
        {avgScoreModule > 10 && avgScoreModule <=13 ? (
            <h3 style={{color:"blue", textAlign:"center"}}>You can do better</h3>
        ): ("")
        }
        {avgScoreModule > 13 && avgScoreModule <=16 ? (
            <h3 style={{color:"green", textAlign:"center"}}>Good</h3>
        ): ("")
        }
        {avgScoreModule > 16 && avgScoreModule <=18 ? (
            <h3 style={{color:"green", textAlign:"center"}}>Very Good</h3>
        ): ("")
        }
        {avgScoreModule > 18  ? (
            <h3 style={{color:"green", textAlign:"center"}}>Excellent</h3>
        ): ("")
        }
        <h3 style={{color:"black", textAlign:"center"}}>Average Module Score  : {Number(avgScoreModule).toFixed(2)}</h3>
      </div>
      <br/>
      <div style={{display:"flex",justifyContent: "space-evenly" ,margin:0}}>
        <Segment color='grey' raised style={{margin:0}}>
          <Item.Group divided>
            <Item>
              <Item.Image size='tiny' avatar src='images/quizz.jpg' />
              <Item.Content>
                <Link to={"/assignedQuizStudentList"}>
                  <Item.Header><h3 style={{color:"blue"}}>Quizs</h3></Item.Header>
                </Link>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        &nbsp;
        <Segment color='grey' raised  style={{margin:0}}>
          <Item.Group divided>
            <Item>
              <Item.Image size='tiny' avatar src='images/task.jpg' />
              <Item.Content>
                <Link to={"/assignedTaskStudentList"}>
                  <Item.Header><h3 style={{color:"blue"}}>Tasks</h3></Item.Header>
                </Link>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </div>
    </>
  )
}

export default Evaluation