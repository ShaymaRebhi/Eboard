import React, {useState} from 'react'
import './TaskList.css'

//import uuid from "react-uuid";
import {useHistory} from "react-router-dom";
import {FaTrash} from 'react-icons/fa' ;
import {GrUpdate} from 'react-icons/gr' ;

function TaskList() {
  const history = useHistory();
  const handelformadd = () => {
      history.push("/formAddTask/");
  }
    const assignHomeWork= () => {
        history.push("/formAddTask/");
    }
  const Date1 = new Date(Date.now())
  const [homeWork] = useState(
      [{Title : "React Hook",
          Theme:"seance 1",
          CreationDate : Date1.getDate() + "/" + (Date1.getMonth() + 1) + "/" + Date1.getFullYear(),
          questionTitle: "question 1",
          QuestionFile: '',
          QuestionResponseFile:""
      },]
  )
  return (
      <>
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
            {homeWork.map((h,i)=>(
                <tr>
                  <td>{h.Title}</td>
                  <td>{h.Theme}</td>
                  <td>{h.CreationDate}</td>
                  <td> <button className="btn btn-outline-primary"  onClick={handelformadd}><GrUpdate/> </button>
                    <button className="btn btn-outline-danger"  onClick={handelformadd}> <FaTrash/> </button>
                      <button className="btn btn-outline-success"onClick={assignHomeWork}>Assign</button>
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