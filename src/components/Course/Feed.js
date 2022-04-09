import React from 'react';
import { Button, Form,  TextArea, Segment , Image } from "semantic-ui-react";
import { useState } from "react";
import "./Feed.css";
import Courses from './Courses';

function FeedClass () {
    const Date1 = new Date(Date.now())
    const [post, setPost] = useState(
         [{Title : "React Hook",
          Class:"seance 1",
          CreationDate : Date1.getDate() + "/" + (Date1.getMonth() + 1) + "/" + Date1.getFullYear(),
        
            TypeRec: ''
          
        },
        ]
    )
      
     
   
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
            <Image className='image-feed' src="images/react.jpeg" />
            </div>
            <br/>
        <Segment raised color="grey">
        <Form >
        
            <Form.Field
              control={TextArea}
              placeholder="Announce something to your class"
              label="Content"
              name="Body"
            />
         

  
            <div style={{ float: "right", marginRight: "5%" }}>
                    <Button
                      style={{ maxHeight: "40px" }}
                      type="submit"
                      content="Reply"
                      icon="edit"
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    
                  <input type="file" id="postfile" name="fileupload" className="inputFilePost form-control"  multiple HTMLInputElement={p.TypeRec} onChange={(e)=>{changePostFile(e.target.files,index)}} />

                
                   
                  </div>
          </Form>
        </Segment>
      </div>
       ))}
       <br/>
       <Courses />
      </div>
    );
  
}

export default FeedClass ;