import React, {useEffect, useState} from 'react'
import './TaskList.css'
import {useHistory} from "react-router-dom";
import {
    getTaskByStudentWorked
} from "../../utils/Task";
import { Header, Icon, Item, Segment, } from 'semantic-ui-react'
import {getAverageScoreTaskByStudentAndClass} from "../../utils/Task";
import ReactPaginate from "react-paginate";
function WorkedTaskStudentList() {
    const idUser = JSON.parse(localStorage.getItem("idStudent"))._id;
    const history = useHistory();
    const [evaluation, setEvaluation] = useState([]);
    const idClass = JSON.parse(localStorage.getItem("idClass"))._id;
    const [searchTerm,setSearchTerm] = useState([]);
    const [avgScore,setAvgScore] = useState(0);

    const getTasks=()=>{
        getTaskByStudentWorked(idClass,idUser,(res)=> {
            setEvaluation(res.data)
        })
    }
    const getAVGQuizScore=()=>{
        getAverageScoreTaskByStudentAndClass(idUser,idClass,(res)=> {
            setAvgScore(res.data)
        })
    }
    const BackToAssignedTaskStudentList = () => {
        history.push('/AssignedTaskStudentList')
    }

    useEffect(()=>{
        getTasks();
        getAVGQuizScore();
        console.log(avgScore);
    })

    const handelSearchTerm = (e) =>{
        let value = e.target.value.toLowerCase();
        setSearchTerm(value);
    }
    const [pageNumber, setPageNumber] = useState (0)
    const quizsPerPage = 2;
    const pagesVisited = pageNumber * quizsPerPage;
    const pageCount = Math.ceil(evaluation.length / quizsPerPage);

    const changePage = ({ selected }) => {

        setPageNumber(selected);
    };

    return (
        <>
            <div style={{display:"flex", justifyContent:"space-around"}}>
                <img src="images/tasks.jpg" alt="task" width="100%"/>
                <div className="headers text-center">
                    <h1 style={{color:"rgb(140,177,192)" ,fontSize:"50px"}}>Worked Task Student List</h1>
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
                    <h3 style={{color:"black", textAlign:"center"}}>Average Task Score Module  : {avgScore}</h3>
                </div>
            )}
            <div style={{display:"flex" ,justifyContent:"space-between"}}>
                <div className="wrap">
                    <div className="search">
                        <input type="text" className="searchTerm" placeholder="Search" onChange={handelSearchTerm}/>
                    </div>
                </div>
                <div className="buttons">
                    <button className="btn btn-secondary" onClick={BackToAssignedTaskStudentList}>Back</button>
                </div>
            </div>
            <br/>
            <div className="container pb-5 ">
                {evaluation.length <= 0 ? (
                    <Segment placeholder>
                        <Header icon>
                            <Icon name='tasks' />
                            No Tasks Worked .
                        </Header>

                    </Segment>
                ):(
                    evaluation.filter((e)=>{
                        return e.Task.Title.toLowerCase().includes(searchTerm)
                    }).slice(pagesVisited, pagesVisited + quizsPerPage).map((e,i)=>(
                        <Segment color='grey' raised key={i}>
                            <Item.Group divided >
                                <Item>
                                    <Item.Image size='tiny' avatar src='images/task.jpg' />
                                    <Item.Content>
                                        <Item.Header>{e.Task.Title}</Item.Header>
                                        <Item.Meta>
                                            <span className='cinema'>{e.TaskCorrected}</span>
                                        </Item.Meta>
                                        {e.Score === null ? ("") :(
                                        <Item.Meta>
                                            <span className='cinema'>Score : {e.Score} / 20</span>
                                        </Item.Meta>
                                        )}

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
            {evaluation.length <= 0 ? ("") :(
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}

                />
            )}
            <br/>
            <br/>
            <br/>
            <br/>
        </>
    )
}

export default WorkedTaskStudentList