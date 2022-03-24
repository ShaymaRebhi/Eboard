import React, {useState} from 'react'
import './TaskList.css'

import Footer from "../pages/Shared/Footer";
//import uuid from "react-uuid";
import {useHistory} from "react-router-dom";
import {FaTrash} from 'react-icons/fa' ;
import {GrUpdate} from 'react-icons/gr' ;

function TaskList() {
  const history = useHistory();
  const handelformadd = () => {
    //const id_ = uuid();
    //history.push("/formAddHomeWork/"+id_);
      history.push("/formAddHomeWork/");
  }
  const Date1 = new Date(Date.now())
  const [homeWork, setHomeWork] = useState(
      [{Title : "React Hook",
        Class:"4TWIN3",
        CreationDate : Date1.getDate() + "/" + (Date1.getMonth() + 1) + "/" + Date1.getFullYear(),
        HomeWorkQuestion : [{
          questionTitle:"",
          TypeRec:""
        }],
        HomeWorkResponse : [{
              Response:"",
              TypeRec:""
        }]
      },]
  )
  return (
      <>
        <div className="headers text-center">
          <h1>Home Work List</h1>
          <button className="btn btn--primary"  onClick={handelformadd}>Add Quiz</button>
        </div>
        <div className="container pb-5 ">
          <table className="table">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">HomeWork Title</th>
              <th scope="col">Class</th>
              <th scope="col">CreationDate</th>
              <th scope="col">Action</th>
            </tr>
            </thead>

            <tbody>
            {homeWork.map((h,i)=>(
                <tr>
                  <th scope="row">{i+1}</th>
                  <td>{h.Title}</td>
                  <td>{h.Class}</td>
                  <td>{h.CreationDate}</td>
                  <td> <button className="btn btn-outline-primary"  onClick={handelformadd}><GrUpdate/> </button>
                    &nbsp;
                    &nbsp;
                    <button className="btn btn-outline-danger"  onClick={handelformadd}> <FaTrash/> </button>
                  </td>
                </tr>
            ))}

            </tbody>
          </table>
        </div>
        <Footer/>
      </>
  )
}

export default TaskList