import React, { useEffect } from 'react'
import { Card, Feed } from 'semantic-ui-react'
import '../css/CardClass.css';
import {RetrieveCourses} from '../../redux/slices/Courses'
import { useDispatch, useSelector } from 'react-redux';


export default function RecentActivites () {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);

  useEffect(() => {

    dispatch(RetrieveCourses());
  }, [dispatch]);
    return (
        <div className='ui-card'>
        <Card >
    <Card.Content>
      <Card.Header>Recent Activity</Card.Header>
    </Card.Content>
   

    <Card.Content>
    
      <Feed>
      {courses.map((c, index) => (
        <Feed.Event key={index}>
          <Feed.Label image={c.idOwner.User.file} />
          <Feed.Content>
            <Feed.Date content='1 day ago' />
            <Feed.Summary>{console.log((c.idOwner))}
             {c.idOwner.FirstName} added a new ressource to the <a>{ c.idClass.className}</a> Class.
            </Feed.Summary>
          </Feed.Content>
          
        </Feed.Event>
      ) )}
  </Feed>     

    </Card.Content>
    
  </Card>
 
  </div>
)
    
}