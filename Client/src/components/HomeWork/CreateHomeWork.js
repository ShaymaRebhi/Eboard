import React, {useState} from 'react'
import './CreateHomeWork.css'
import Accordion from "@material-ui/core/Accordion";
import Images from "../Images";

function CreateHomeWork() {
  const Date1 = new Date(Date.now())
  const [homeWork, setHomeWork] = useState(
      [{Title : "React Hook",
        Class:"seance 1",
        CreationDate : Date1.getDate() + "/" + (Date1.getMonth() + 1) + "/" + Date1.getFullYear(),
        HomeWorkQuestion : [{
          questionTitle:"question 1",
          TypeRec: ''
        }],
        HomeWorkResponse : [{
          Response:"",
          TypeRec: ''
        }]
      },
      ]
  )
    const changeHomeWorkTitle = (text, i) => {
        var newHomeWork = [...homeWork];
        newHomeWork[i].Title = text ;
        setHomeWork(newHomeWork);
        console.log(newHomeWork)
    }

    const changeHomeWorkClass = (text, i) => {
        var newHomeWork = [...homeWork];
        newHomeWork[i].Class = text ;
        setHomeWork(newHomeWork);
        console.log(newHomeWork)
    }
    const changeHomeWorkFile = (text, i, j ) => {
        var newHomeWork = [...homeWork];
        newHomeWork[i].HomeWorkQuestion[j].TypeRec = text   ;
        setHomeWork(newHomeWork);
        console.warn("data file", text);
        console.log(newHomeWork);
    }
    const changeHomeWorkQuestionTitle = (text, i, j) => {
        var newHomeWork = [...homeWork];
        newHomeWork[i].HomeWorkQuestion[j].questionTitle = text   ;
        setHomeWork(newHomeWork);
        console.log(newHomeWork)
    }
  return (
      <div className="DisplayQuestionBox">
      <Accordion>
          {homeWork.map((homework,index)=>(
        <div className="card-HomeWork" key={index}>
            <div className="card-content-HomeWork">
                <label className="labelHomeWork" htmlFor="questionTitle">Title : </label>
                <input className="text_input_homeWork" id="questionTitle" value={homework.Title} onChange={(e) =>{changeHomeWorkTitle(e.target.value,index)}}/>
                <label className="labelHomeWork" htmlFor="questionClass">Class : </label>
                <input className="text_input_homeWork" id="questionClass" value={homework.Class} onChange={(e) =>{changeHomeWorkClass(e.target.value,index)}} />
                    {homework.HomeWorkQuestion.map((homeworkquestion,j)=>(
                    <div key={j}>
                        <label className="labelHomeWork" htmlFor="questionClasstitle">Question :</label>
                        <input className="text_input_homeWork_question" id="questionClasstitle" value={homework.HomeWorkQuestion[j].questionTitle} onChange={(e) =>{changeHomeWorkQuestionTitle(e.target.value,index,j)}} />
                        <label className="labelHomeWork" htmlFor="questionfile form-label">Choose a file</label>
                        <input type="file" id="questionfile" name="fileupload" className="inputFileHomeWork form-control"  multiple HTMLInputElement={homework.HomeWorkQuestion[j].TypeRec} onChange={(e)=>{changeHomeWorkFile(e.target.files,index,j)}} />

                    </div>
                        ))}
            </div>
            <div className="saveadd">
                <button className="btn btn-success" onClick={()=>{}}>Save</button>
            </div>
        </div>
          ))}
      </Accordion>
      </div>
  )
}

export default CreateHomeWork