import React, {useEffect, useState} from 'react'
import './TaskList.css'
import {useHistory} from "react-router-dom";
import {FaTrash} from 'react-icons/fa' ;
import {GrUpdate} from 'react-icons/gr' ;
import {getAllTasks, deleteTask, getOneTask} from "../../utils/Task";
import {toast, ToastContainer} from "react-toastify";

function TaskList() {
    const [task, setTask] = useState([])

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
        <div className="headers text-center">
          <h1>Task List</h1>
          <button className="btn btn--primary"  onClick={handelformadd}>Add Quiz</button>
        </div>
        <div className="container pb-5 ">
          <table className="table">
            <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Theme</th>
              <th scope="col">CreationDate</th>
              <th scope="col">Action</th>
            </tr>
            </thead>

            <tbody>
            {task.map((t,i)=>(
                <tr key={i}>
                  <td>{t.Title}</td>
                  <td>{t.Theme}</td>
                  <td>{t.CreationDate}</td>
                  <td> <button className="btn btn-outline-primary"  onClick={()=>getTaskpage(t._id)}><GrUpdate/> </button>
                    <button className="btn btn-outline-danger"  onClick={()=>deleteTask(t._id, ()=>{
                        toast.success('Task deleted successfuly', {
                        position: "bottom-right"
                    })
                    },
                        getTasks()
                    )}> <FaTrash/> </button>
                      <button className="btn btn-outline-success" onClick={assignHomeWork}>Assign</button>
                  </td>
                </tr>
            ))}

            </tbody>
          </table>
        </div>
      </>
  )
}

export default TaskList