import React, {useEffect, useState} from 'react'
import {getAverageScoreQuizByStudentAndClass, getQuizByStudentWorked} from "../../utils/Quiz";
import {Header, Icon, Item, Segment} from "semantic-ui-react";
import {useHistory} from "react-router-dom";

function WorkedQuizStudentList() {
    const idClass = JSON.parse(localStorage.getItem("idClass"))._id;
    const history = useHistory();
    const [evaluation, setEvaluation] = useState([]);
    const idUser = JSON.parse(localStorage.getItem("idStudent"))._id;
    const [searchTerm,setSearchTerm] = useState([]);
    const [avgScore,setAvgScore] = useState([]);
    const getQuizs=()=>{
        getQuizByStudentWorked(idClass,idUser,(res)=> {
            setEvaluation(res.data)
        })
    }
    const getAVGQuizScore=()=>{
        getAverageScoreQuizByStudentAndClass(idUser,idClass,(res)=> {
            setAvgScore(res.data)
        })
    }
    const BackToAssignedQuizStudentList = (id) => {
        history.push('/assignedQuizStudentList');
    }

    useEffect(()=>{
        getQuizs();
        getAVGQuizScore();
    })
    const handelSearchTerm = (e) =>{
        let value = e.target.value.toLowerCase();
        setSearchTerm(value);
    }
    return (
        <>
            <div style={{display:"flex"}}>
                <img src="images/quizlist2.jpg" alt="quizpicture" width="60%"  />
                <div className="headers text-center">
                    <h1>Student Quiz List Worked</h1>
                </div>
            </div>
            {evaluation.length <=0 ? ("") :(
                <div style={{display:"flex" ,flexDirection:"column-reverse"}}>
                    {avgScore < 10 ? (
                        <h3 style={{color:"red",textAlign:"center"}}>Low</h3>
                    ) :("")
                    }
                    {avgScore > 10 && avgScore <=13 ? (
                        <h3 style={{color:"blue", textAlign:"center"}}>You can do better</h3>
                    ): ("")
                    }
                    {avgScore > 13 && avgScore <=16 ? (
                        <h3 style={{color:"green", textAlign:"center"}}>Good</h3>
                    ): ("")
                    }
                    {avgScore > 16 && avgScore <=18 ? (
                        <h3 style={{color:"green", textAlign:"center"}}>Very Good</h3>
                    ): ("")
                    }
                    {avgScore > 18  ? (
                        <h3 style={{color:"green", textAlign:"center"}}>Excellent</h3>
                    ): ("")
                    }
                    <h3 style={{color:"black", textAlign:"center"}}>Average Quiz Score Module  : {avgScore.toFixed(2)}</h3>
                </div>
            )}
            <div style={{display:"flex" ,justifyContent:"space-between"}} >
                <div className="wrap">
                    <div className="search">
                        <input type="text" className="searchTerm" placeholder="Search" onChange={handelSearchTerm}/>
                    </div>
                </div>
                <div className="buttons">
                    <button className="btn btn-secondary" onClick={BackToAssignedQuizStudentList}>Back</button>
                </div>
            </div>

                    <br/>
                    <div className="container pb-5 ">
                        {evaluation.length <= 0 ? (
                            <Segment placeholder>
                                <Header icon>
                                    <Icon name='tasks' />
                                    No quizs Worked .
                                </Header>

                            </Segment>
                        ):(
                            evaluation.filter((e)=>{
                                return e.Quiz.Title.toLowerCase().includes(searchTerm)
                            }).map((e,i)=>(

                                <Segment color='grey' raised key={i}>
                                    <Item.Group divided >
                                        <Item>
                                            <Item.Image size='tiny' avatar src='images/quizz.jpg' />
                                            <Item.Content>
                                                <Item.Header>{e.Quiz.Title}</Item.Header>
                                                <Item.Meta>
                                                    <span className='cinema'>{e.TaskStatus}</span>
                                                </Item.Meta>
                                                <Item.Meta>
                                                    <span className='cinema'>Score : {e.Score} / 20</span>
                                                </Item.Meta>
                                            </Item.Content>
                                        </Item>
                                        <Item className="buttons">
                                            {e.Score < 10 ? (
                                                    <h3 style={{color:"red"}}>{e.Comment}</h3>
                                                ) :("")
                                            }
                                            {e.Score === 10 ? (
                                                <h3 style={{color:"blue"}}>{e.Comment}</h3>
                                            ): ("")
                                            }
                                            {e.Score > 10 && e.Score <=13 ? (
                                            <h3 style={{color:"blue"}}>{e.Comment}</h3>
                                                ): ("")
                                            }
                                            {e.Score > 13 ? (
                                                <h3 style={{color:"green"}}>{e.Comment}</h3>
                                                ): ("")
                                            }

                                        </Item>
                                    </Item.Group>
                                </Segment>

                            ))
                        )}

                    </div>

        </>
    )
}

export default WorkedQuizStudentList