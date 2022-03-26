import React from 'react';
import '../css/CardClass.css';
import CardItemClass from './CardItemClass';

function CardClass() {
  return (
    <div className='cardClass'>
      <h1>Find your courses!</h1>
      <div className='cards__Class__container'>
        <div className='cards__Class__wrapper'>
          
          <ul className='cards__Class__items'>
            <CardItemClass
              src='images/react.jpeg'
              course='Application coté client 2 '
              teacher='MR Emine Zribi'
              class='4 TWIN 3'
              meet ='IN MEETING NOW'
              path='#'
              src1='images/emine.jpg'
            
            />
            <CardItemClass
              src='images/net-framework.png'
              course='Architecture des SI'
              teacher='MRS Ameni Aoun'
              class='4 TWIN 3'
              meet ='OFFLINE'             
              path='#'
              src1='images/amina.jpg'
            />
            <CardItemClass
              src='images/nodejs.jpg'
              course='Javascript coté serveur'
              teacher='MR Mohamed Amine Chebbi'
              class='4 TWIN 3'
              meet ='OFFLINE'
              path='#'
              src1='images/med.jpg'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CardClass;
