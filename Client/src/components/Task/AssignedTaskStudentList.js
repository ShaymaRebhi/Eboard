import React, {useEffect, useState} from 'react'
import './TaskList.css'
import {useHistory} from "react-router-dom";
import {
    getTaskByStudentAssigned
} from "../../utils/Task";
import { Header, Icon, Item, Segment, } from 'semantic-ui-react'
function AssignedTaskStudentList() {
    const idUser = JSON.parse(localStorage.getItem("idStudent"))._id;
    const history = useHistory();
    const [evaluation, setEvaluation] = useState([]);
    const idClass = JSON.parse(localStorage.getItem("idClass"))._id;
    const [searchTerm,setSearchTerm] = useState([]);

    const getTasks=()=>{
        getTaskByStudentAssigned(idClass,idUser,(res)=> {
            setEvaluation(res.data)
        })
    }

    const DisplayTaskPage = (id) => {
        history.push(`/displayTask/${id}`);
    }

    const DisplayTaskListWorked = () => {
        history.push('/WorkedTaskStudentList')
    }

    useEffect(()=>{
        getTasks();
    })

    const handelSearchTerm = (e) =>{
        let value = e.target.value.toLowerCase();
        setSearchTerm(value);
    }
    return (
        <>
            <div style={{display:"flex", justifyContent:"space-around"}}>
                <img src="images/tasks.jpg" alt="task" width="100%"/>
                <div className="headers text-center">
                    <h1>Assigned Task Student List</h1>
                </div>
            </div>
            <div className="wrap">
                <div className="search">
                    <input type="text" className="searchTerm" placeholder="Search" onChange={handelSearchTerm}/>
                    <i className="fa fa-search"></i>
                </div>
            </div>
            <div className="buttons">
                    <button className="btn btn-secondary" onClick={DisplayTaskListWorked}>Task List Worked</button>
            </div>
            <br/>
            <div className="container pb-5 ">
                {evaluation.length <= 0 ? (
                    <Segment placeholder>
                        <Header icon>
                            <Icon name='tasks' />
                            No Tasks Added .
                        </Header>

                    </Segment>
                ):(
                    evaluation.filter((e)=>{
                        return e.Task.Title.toLowerCase().includes(searchTerm)
                    }).map((e,i)=>(
                        <Segment color='grey' raised key={i}>
                            <Item.Group divided >
                                <Item>
                                    <Item.Image size='tiny' avatar src='images/task.jpg' />
                                    <Item.Content>
                                        <Item.Header>{e.Task.Title}</Item.Header>
                                        <Item.Meta>
                                            <span className='cinema'>{e.TaskStatus}</span>
                                        </Item.Meta>
                                    </Item.Content>
                                </Item>
                                <Item className="buttons">
                                    <button className="btn btn-primary"  onClick={()=>DisplayTaskPage(e.Task._id)}>Do</button>
                                </Item>
                            </Item.Group>

                        </Segment>

                    ))
                )}
            </div>
        </>
    )
}

export default AssignedTaskStudentList