import React  from 'react';
import { Link } from 'react-router-dom';
import { FaRegFolder , FaRegFile , FaRegComment ,FaRegGrinHearts,FaRegAngry,FaEllipsisV} from "react-icons/fa";
import '../css/CardClass.css';
import { Dropdown } from 'semantic-ui-react';
import ArchieveClassComponent from './ArchieveClassComponent';

import ActivedClassComponent from './ActivedClassComponent';


function CardItemClassArchived(props) {
  return (
    
    <>
       
      <li className='cards__Class__item_Archived' >
        <div className='cards__Class__item__link' >
          <div className='cards__Class__item__pic-wrap' >
          <div className='drpd'>
            
                                  <Dropdown
                                      fluid
                                     
                                      direction="left"
                                      className="icon"
                                      icon="ellipsis vertical"
                                    >
                                      <Dropdown.Menu>
                                        <ActivedClassComponent
                                          headerTitle="Archive Class"
                                          buttonTriggerTitle="Archive"
                                          classes={props.classes}
                                        />
                                      </Dropdown.Menu>
                                    </Dropdown>
        
          </div>
            <img
              className='cards__Class__item__img'
              alt='backround image'
              src={props.src}
            />
            
          </div>
          <div className='image-container'>
              <img 
              className='image-container'
              alt='profil'
              src={props.src1}
              />
              </div>
          <div className='cards__Class__item__info'>
            <Link to={props.path} >
            <h1 className='cards__Class__item__course'>{props.course}</h1>
            </Link>
            <h5 className='cards__Class__item__teacher'>{props.teacher}</h5>
            <h6 className='cards__Class__item__class'>{props.class}</h6>
            <ul className='icons'>
              
              <li> <a href="#"> <i><FaRegFolder /> </i> </a></li>
              <li> <a href="#"> <i> <FaRegFile /></i></a></li>
              <li><a href='#'><i ><FaRegComment /></i></a></li>
            
              
            </ul>
            <ul className='react'>
            <li><a href='#'><i ><FaRegGrinHearts /></i></a></li>
              <li><a href='#'><i ><FaRegAngry /></i></a></li>
           </ul>
        {props.meet =='IN MEETING NOW' ? (
        <div className='meet-btns'>        
        <h5><i className='fas fa-circle' /> {props.meet} 
        </h5>
        </div> ) : (
          <div className='offline-btns'>        
          <h5><i className='fas fa-circle' /> {props.meet} 
          </h5>
          </div>
        )}

        </div>
        
          
        </div>
        
      </li>
      
    </>
    
  );
}



export default CardItemClassArchived;
