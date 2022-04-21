import React, {useEffect, useState} from 'react'
import {getQuizByStudentWorked} from "../../utils/Quiz";
import {Header, Icon, Item, Segment} from "semantic-ui-react";
import {useHistory} from "react-router-dom";

function WorkedQuizStudentList() {
    const idClass = JSON.parse(localStorage.getItem("idClass"))._id;
    const history = useHistory();
    const [evaluation, setEvaluation] = useState([]);
    const idUser = JSON.parse(localStorage.getItem("idStudent"))._id;
    const [searchTerm,setSearchTerm] = useState([]);
    const getQuizs=()=>{
        getQuizByStudentWorked(idClass,idUser,(res)=> {
            setEvaluation(res.data)
        })
    }
    const BackToAssignedQuizStudentList = (id) => {
        history.push('/assignedQuizStudentList');
    }

    useEffect(()=>{
        getQuizs();
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