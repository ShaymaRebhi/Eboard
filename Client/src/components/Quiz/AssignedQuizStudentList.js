import React, {useEffect, useState} from 'react'
import {getQuizByStudentAssigned} from "../../utils/Quiz";
import {Header, Icon, Item, Segment} from "semantic-ui-react";
import {useHistory} from "react-router-dom";

function AssignedQuizStudentList() {
    const idClass = JSON.parse(localStorage.getItem("idClass"))._id;
    const history = useHistory();
    const [evaluation, setEvaluation] = useState([]);
    const idUser = JSON.parse(localStorage.getItem("idStudent"))._id;
    const [searchTerm,setSearchTerm] = useState([]);
    const getQuizs=()=>{
        getQuizByStudentAssigned(idClass,idUser,(res)=> {
            setEvaluation(res.data)
        })
    }
    const DisplayQuizPage = (id) => {
            history.push(`/displayQuiz/${id}`);
    }

    const DisplayQuizListWorked = () => {
        history.push('/WorkedQuizStudentList')
    }

    useEffect(()=>{
        getQuizs();
        console.log(evaluation);
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
                    <h1>Quiz Student List</h1>
                </div>
            </div>
            <div style={{display:"flex" ,justifyContent:"space-between"}}>
                <div className="wrap">
                    <div className="search">
                        <input type="text" className="searchTerm" placeholder="Search" onChange={handelSearchTerm}/>
                    </div>
                </div>
                <div>
                    <div className="buttons">
                        <button className="btn btn-secondary" onClick={DisplayQuizListWorked}>Quiz List Worked</button>
                    </div>
                </div>
            </div>
            <br/>
            <div className="container pb-5 ">
                {evaluation.length <= 0 ? (
                    <Segment placeholder>
                        <Header icon>
                            <Icon name='tasks' />
                            No quizs Assigned .
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
                                        </Item.Content>
                                    </Item>
                                    <Item className="buttons">
                                        <button className="btn btn-primary" onClick={()=>DisplayQuizPage(e.Quiz._id)}>Do</button>
                                    </Item>
                                </Item.Group>
                            </Segment>


                    ))

                )}

            </div>


        </>
    )
}

export default AssignedQuizStudentList