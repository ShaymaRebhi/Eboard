import React, {useEffect, useState} from 'react'
import './TaskList.css'
import {Link,useHistory} from "react-router-dom";
import {FaTrash} from 'react-icons/fa' ;
import {GrUpdate} from 'react-icons/gr' ;
import {getAllTasks, deleteTask, getTaskByTeacher, assignTaskAfterSave, updateTaskStatus} from "../../utils/Task";
import {toast, ToastContainer} from "react-toastify";
import { Header, Icon, Item, Segment, } from 'semantic-ui-react'
import moment from 'moment';
import {MdAssignment} from "react-icons/md";

function TaskList() {
    const idUser=JSON.parse(localStorage.getItem("login")).User._id;
    const idClass = JSON.parse(localStorage.getItem("idClass"))._id;
    const [task, setTask] = useState([])
    const [searchTerm,setSearchTerm] = useState([]);

    const getTasks=()=>{
        getTaskByTeacher(idUser,idClass,(res)=> {
            setTask(res.data)
        })
    }
    const getEditTaskPage = (id) => {
            history.push(`/updateTask/${id}`);
    }

    useEffect(()=>{
        getTasks();
    })
    const history = useHistory();
  const handelformadd = () => {
      history.push("/formAddTask/");
  }
  const assignTask= (task,id) => {
        assignTaskAfterSave(idClass,task,()=>(
            toast.success('Task assigned successfuly', {
                position: "bottom-right"
            })
        ))
      const newTask ={
          status : "Assigned"
      }
      updateTaskStatus(id,newTask,()=>(
          getTasks()
      ))
  }
  const handelSearchTerm = (e) =>{
     let value = e.target.value.toLowerCase();
     setSearchTerm(value);
  }
  return (
      <>
          <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
          />
        <div style={{display:"flex", justifyContent:"space-around"}}>
            <img src="images/tasks.jpg" alt="task" width="100%"/>
            <div className="headers text-center">
                <h1>Task List</h1>
                <button className="btn btn--primary"  onClick={handelformadd}>Add Quiz</button>
            </div>
        </div>
        <div className="wrap">
                  <div className="search">
                      <input type="text" className="searchTerm" placeholder="Search" onChange={handelSearchTerm}/>
                              <i className="fa fa-search"></i>
                  </div>
        </div>
        <div className="container pb-5 ">
            {task.length <= 0 ? (
                <Segment placeholder>
                    <Header icon>
                        <Icon name='tasks' />
                        No Tasks Added .
                    </Header>

                </Segment>
            ):(
            task.filter((t)=>{
                return t.Title.toLowerCase().includes(searchTerm)
            }).map((t,i)=>(
                <Segment color='grey' raised key={i}>
                    <Item.Group divided >
                        <Item>
                            <Item.Image size='tiny' avatar src='images/task.jpg' />
                            <Item.Content>
                                <Link to={"/DetailTask/"+t._id}>
                                <Item.Header>{t.Title}</Item.Header>
                                </Link>
                                <Item.Meta>
                                    <span className='cinema'>Created At {moment(t.CreationDate).format("MMMM Do YYYY")}</span>
                                </Item.Meta>
                                <Item.Description>{t.Description}</Item.Description>
                            </Item.Content>
                        </Item>
                        <Item className="buttons">
                            <button className="btn btn-outline-primary"  onClick={()=>getEditTaskPage(t._id)}><GrUpdate/></button>
                            <button className="btn btn-outline-danger"  onClick={()=>deleteTask(t._id, ()=>{
                                    toast.success('Task deleted successfuly', {
                                        position: "bottom-right"
                                    })
                                },
                                getTasks()
                            )}><FaTrash/></button>
                            {t.status === "Not Assigned" ? (
                            <button className="btn btn-outline-success" onClick={()=>{assignTask(t,t._id)}}><MdAssignment/></button>
                            ):("")
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

export default TaskList