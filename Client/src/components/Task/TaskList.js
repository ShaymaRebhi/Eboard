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
import ReactPaginate from "react-paginate";
import {deleteQuiz} from "../../utils/Quiz";

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
    const [pageNumber, setPageNumber] = useState (0)
    const quizsPerPage = 2;
    const pagesVisited = pageNumber * quizsPerPage;
    const pageCount = Math.ceil(task.length / quizsPerPage);

    const changePage = ({ selected }) => {

        setPageNumber(selected);
    };

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
                <h1 style={{color:"rgb(140,177,192)" ,fontSize:"50px"}}>Task List</h1>
            </div>
        </div>
          <div style={{display:"flex" ,justifyContent:"space-between"}}>
              <div className="wrap">
                  <div className="search">
                      <input type="text" className="searchTerm" placeholder="Search" onChange={handelSearchTerm}/>
                  </div>
              </div>
              <div className="buttons">
                  <button className="btn btn--primary"  onClick={handelformadd}>Add Task</button>
              </div>
          </div>
          <br/>
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
            }).slice(pagesVisited, pagesVisited + quizsPerPage).map((t,i)=>(
                <Segment color='grey' raised key={i}>
                    <Item.Group divided >
                        <Item>
                            <Item.Image size='tiny' avatar src='images/task.jpg' />
                            <Item.Content>
                                <Link to={"/DetailTask/"+t._id}>
                                <Item.Header>{t.Title}</Item.Header>
                                </Link>
                                <Item.Meta>
                                    <span className='cinema'>Status : {t.status}</span>
                                </Item.Meta>
                                <Item.Description>{t.Description}</Item.Description>
                            </Item.Content>
                        </Item>
                        <Item className="buttons">
                            {t.status === "Not Assigned" ? (
                                <>
                                    <div className="edit_quiz_icon">
                                        <button className="btn btn-outline-primary"  onClick={()=>getEditTaskPage(t._id)}><GrUpdate/> </button>
                                        <span className="edit_quiz_span">Update Task</span>
                                    </div>

                                </>
                            ):("")
                            }
                            <div className="delete_quiz_icon">
                                <button className="btn btn-outline-danger"  onClick={()=>deleteTask(t._id, ()=>{
                                        toast.success('Task deleted successfuly', {
                                            position: "bottom-right"
                                        })
                                    },
                                    getTasks()
                                )}><FaTrash/>
                                </button>
                                <span className="delete_quiz_span">Delete Task</span>
                            </div>
                            {t.status === "Not Assigned" ? (
                                <div className="assign_quiz_icon">
                                    <button className="btn btn-outline-success" onClick={()=>{assignTask(t,t._id)}}><MdAssignment/></button>
                                    <span className="assign_quiz_span">Assign Task</span>
                                </div>
                            ):("")
                            }
                        </Item>
                    </Item.Group>

                </Segment>

                ))
            )}
        </div>
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
      </>
  )
}

export default TaskList