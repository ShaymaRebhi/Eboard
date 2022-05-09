import React, { useEffect } from 'react';
import { Button, Form,  TextArea, Segment , Image } from "semantic-ui-react";
import { useState } from "react";
import "./Feed.css";
import { useDispatch , useSelector } from 'react-redux';
import TableCourses from './TableCourses';

function FeedClass () {
    const Date1 = new Date(Date.now())
    const courses = useSelector((state) => state.courses.seance);
    const [listCourses, setListCourses] = useState(courses);
    const ModulePicture = JSON.parse(localStorage.getItem("idClass")).file;

    const [post, setPost] = useState(
         [{Title : "React Hook",
          Class:"seance 1",
          CreationDate : Date1.getDate() + "/" + (Date1.getMonth() + 1) + "/" + Date1.getFullYear(),
        
            TypeRec: ''
          
        },
        ]
    )
      
    const dispatch = useDispatch();

   
    const changePostFile = (text, i) => {
        var newPost = [...post];
        newPost[i].TypeRec = text   ;
        setPost(newPost);
        console.log(newPost)
    }
  
  
   
    return (
        <div>
            {post.map((p,index)=>(
                
           
        <div key={index}>
            <div className='top-image-feed'>
            <Image className='image-feed' src={ModulePicture} />
            </div>
            <br/>
      </div>
       ))}
       <br/>
               
       <TableCourses courses={listCourses} />

      </div>
    );
  
}

export default FeedClass ;
