import React from 'react'
import {Link} from "react-router-dom";
import {Item, Segment} from "semantic-ui-react";

function EvaluationTeacherPage() {
    return (
        <>
            <div style={{display:"flex"}}>
                <img src="https://www.bienenseigner.com/wp-content/uploads/2021/08/auto-evaluation-1280x720.jpeg" alt="quizpicture" width="60%"  />
                <div className="headers text-center">
                    <h1 style={{color:"rgb(140,177,192)" ,fontSize:"50px"} }>Evaluation</h1>
                </div>
            </div>
            <br/>
            <div style={{display:"flex",justifyContent: "space-evenly" ,margin:0}}>
                <Segment color='grey' raised style={{margin:0}}>
                    <Item.Group divided>
                        <Item>
                            <Item.Image size='tiny' avatar src='images/quizz.jpg' />
                            <Item.Content>
                                <Link to={"/quizlist"}>
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
                                <Link to={"/TaskList"}>
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

export default EvaluationTeacherPage