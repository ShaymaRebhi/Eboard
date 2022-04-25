import React, {useEffect, useState} from 'react'
import {getAverageScoreQuizAndTaskByStudentAndClass} from "../../utils/Quiz";
import {Header, Icon, Item, Segment} from "semantic-ui-react";
import coursesRec from "./Courses.json"
import {Link} from "react-router-dom";

function Recommendation() {
  const [avgScoreModule,setAvgScoreModule] = useState(0);
  const idClass = JSON.parse(localStorage.getItem("idClass"))._id;
  const idUser = JSON.parse(localStorage.getItem("idStudent"))._id;
  const ModuleName = JSON.parse(localStorage.getItem("idClass")).className;
  const [listCourses,setListCourses] = useState([]) ;
  const courses = coursesRec;
  const getAVGQuizScoreModule=()=>{
    getAverageScoreQuizAndTaskByStudentAndClass(idUser,idClass,(res)=> {
      setAvgScoreModule(res.data)
    })
  }
  const coursesPushElement = () => {
    courses.forEach((element,i)=>{
      if(element.title.includes(ModuleName)){
        listCourses.push(element)
      }
    })
  }

  useEffect(()=>{
    coursesPushElement();
    getAVGQuizScoreModule();
    console.log("courses")
    console.log(courses)
    console.log("listCourses")
    console.log(listCourses)
    console.log(avgScoreModule);
  })
  return (
      <>
        <div style={{display:"flex"}}>
            <img src="https://previews.123rf.com/images/melitas/melitas1904/melitas190400003/120582457-partagez-et-suivez-mains-color%C3%A9es-avec-les-pouces-vers-le-haut-notion-de-r%C3%A9seau-social-positif-et-ap.jpg" alt="quizpicture" width="50px"  />
            <div className="headers text-center">
              <h1 style={{color:"rgb(140,177,192)"}}>Recommended Courses From <br/> our partner Udemy</h1>
            </div>
        </div>
        {avgScoreModule < 10 ? (

            listCourses.length <=0 ? (
                    <Segment placeholder>
                      <Header icon>
                        <Icon name='tasks' />
                        No Courses Recommended .
                      </Header>

                    </Segment>
                ) : (

             listCourses.map((c,i)=>(
                <>
                  <Segment color='grey' raised key={i}>
                    <Item.Group divided >
                      <Item>
                        <Item.Image size='tiny' avatar src={c.image} />
                        <Item.Content>
                          <a href={c.url}><h4 style={{color:"blue"}}>{c.title}</h4></a>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                  </Segment>
                </>
             )))
        ):(
            <Segment placeholder>
                <Header icon>
                  <Icon name='tasks' />
                  No Courses Recommended .
                </Header>

            </Segment>
        )}
      </>
  )
}

export default Recommendation