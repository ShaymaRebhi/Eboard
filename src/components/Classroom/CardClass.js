import React from 'react';
import '../css/CardClass.css';
import CardItemClass from './CardItemClass';
import { Grid, Label, Segment ,  } from 'semantic-ui-react';


function CardClass() {
  return (
      
        
      <div className='cards__Class__wrapper'>
      <Grid columns={1} rows={3}>
    <Grid.Column>
      <Segment raised>
        <Label as='a' color='red' ribbon>
          Classes
        </Label>
      
          <ul className='cards__Class__items'>
            <CardItemClass
              src='images/react.jpeg'
              course='Application coté client 2 '
              teacher='MR Emine Zribi'
              class='4 TWIN 3'
              meet ='IN MEETING NOW'
              path='/class'
              src1='images/emine.jpg'
            
            />
            <CardItemClass
              src='images/net-framework.png'
              course='Architecture des SI'
              teacher='MRS Ameni Aoun'
              class='4 TWIN 3'
              meet ='OFFLINE'             
              path='/class'
              src1='images/amina.jpg'
            />
            
            <CardItemClass
              src='images/nodejs.jpg'
              course='Javascript coté serveur'
              teacher='MR Mohamed Amine Chebbi'
              class='4 TWIN 3'
              meet ='OFFLINE'
              path='/class'
              src1='images/med.jpg'
            />
          </ul>
       
          
      </Segment>
      </Grid.Column>
      </Grid>
      </div>
    
  );
}


export default CardClass;
