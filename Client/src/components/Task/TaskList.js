import React, {useEffect, useState} from 'react'
import './TaskList.css'
import {useHistory} from "react-router-dom";
import {FaTrash} from 'react-icons/fa' ;
import {GrUpdate} from 'react-icons/gr' ;
import {getAllTasks, deleteTask} from "../../utils/Task";
import {toast, ToastContainer} from "react-toastify";
import { Header, Icon, Item, Segment, } from 'semantic-ui-react'
import moment from 'moment';
import {MdAssignment} from "react-icons/md";

function TaskList() {
    const [task, setTask] = useState([])
    const [searchTerm,setSearchTerm] = useState([]);

    const getTasks=()=>{
        getAllTasks((res)=> {
            setTask(res.data)
        })
    }
    const getTaskpage = (id) => {
            history.push(`/updateTask/${id}`);
    }

    useEffect(()=>{
        getTasks();
    })
    const history = useHistory();
  const handelformadd = () => {
      history.push("/formAddTask/");
  }
  const assignHomeWork= () => {
        history.push("/formAddTask/");
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
                                <Item.Header>{t.Title}</Item.Header>
                                <Item.Meta>
                                    <span className='cinema'>Created At {moment(t.CreationDate).format("MMMM Do YYYY")}</span>
                                </Item.Meta>
                                <Item.Description>{t.Theme}</Item.Description>
                            </Item.Content>
                        </Item>
                        <Item className="buttons">
                            <button className="btn btn-outline-primary"  onClick={()=>getTaskpage(t._id)}><GrUpdate/></button>
                            <button className="btn btn-outline-danger"  onClick={()=>deleteTask(t._id, ()=>{
                                    toast.success('Task deleted successfuly', {
                                        position: "bottom-right"
                                    })
                                },
                                getTasks()
                            )}><FaTrash/></button>
                            <button className="btn btn-outline-success" onClick={assignHomeWork}><MdAssignment/></button>
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