import React from 'react'
import { Card, Feed } from 'semantic-ui-react'
import '../css/CardClass.css';


export default function RecentActivites () {
   
    return (
        <div className='ui-card'>
        <Card >
    <Card.Content>
      <Card.Header>Recent Activity</Card.Header>
    </Card.Content>
    <Card.Content>
      <Feed>
        <Feed.Event>
          <Feed.Label image='/images/med.jpg' />
          <Feed.Content>
            <Feed.Date content='1 day ago' />
            <Feed.Summary>
              Med added <a>a new ressource</a> to the <a>Javascript Coté Serveur</a> course.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label image='/images/amina.jpg' />
          <Feed.Content>
            <Feed.Date content='3 days ago' />
            <Feed.Summary>
              Amina added <a>an announcement </a> in the <a>Architecture des SI </a> course.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label image='/images/badia.jpg' />
          <Feed.Content>
            <Feed.Date content='4 days ago' />
            <Feed.Summary>
              Badia asked a <a>question</a> in the <a>Application coté client </a> course.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Card.Content>
  </Card>
  </div>
)
    
}