import React from 'react'
import {  Accordion, Segment ,Feed, Divider } from "semantic-ui-react";
function Courses() {
 
    return (
        <div>
                   
         <Divider />
        <Accordion>
            
        <Segment raised color="grey">
           <Feed>
     <Feed.Event>
       <Feed.Label>
         <img src='images/emine.jpg' />
       </Feed.Label>
       <Feed.Content>
        <strong>Emine Zribi </strong>  added a new cours :  <a> Correction atelier</a>
       </Feed.Content>
     </Feed.Event>
   </Feed>
   </Segment>
   </Accordion>
   <br/>
   <Accordion>
        <Segment raised color="grey">
           <Feed>
     <Feed.Event>
       <Feed.Label>
         <img src='images/emine.jpg' />
       </Feed.Label>
       <Feed.Content>
        <strong>Emine Zribi </strong>  added a new quiz :  <a> React quiz </a>
       </Feed.Content>
     </Feed.Event>
   </Feed>
   </Segment>
   </Accordion>
        </div>
    );
 
}



export default Courses ;