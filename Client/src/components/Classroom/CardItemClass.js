import React, { useEffect, useState }  from 'react';
import { FaRegFolder , FaRegFile , FaRegComment ,FaRegGrinHearts,FaRegAngry,FaEllipsisV} from "react-icons/fa";
import '../css/CardClass.css';
import { Dropdown } from 'semantic-ui-react';
import ArchieveClassComponent from './ArchieveClassComponent';
import EditComponent from './EditComponent';
import { getUserConnect } from '../../utils/api';
import axios from 'axios';
import { Link } from 'react-router-dom';



function CardItemClass(props) {
  const [idUserConnect,setIdUserConnect]=useState(undefined);
  
  useEffect(()=>{
    axios.get(getUserConnect,{
      headers: {
          'Authorization':`Bearer ${JSON.parse(localStorage.getItem("login")).AccessToken}`
      }
  }).then(res=>{
    console.log(res.data[0])
      setIdUserConnect(res.data[0].User.role);
    })
    
    
  },[])
  return (
    
    <>
       
      <li className='cards__Class__item' >
        <div className='cards__Class__item__link' >
          <div className='cards__Class__item__pic-wrap' >
          <div className='drpd'>
          {props.classes.classOwner._id === props.id ? (

          <Dropdown
                                      fluid
                                     
                                      direction="left"
                                      className="icon"
                                      icon="ellipsis vertical"
                                    >
                                      <Dropdown.Menu>
                                        <EditComponent
                                          headerTitle="Archive Class"
                                          buttonTriggerTitle="Archive"
                                          classes={props.classes}
                                        />
                                        <ArchieveClassComponent
                                          id={props.id}
                                          headerTitle="Archive Class"
                                          buttonTriggerTitle="Archive"
                                          classes={props.classes}
                                        />
                                      </Dropdown.Menu>
                                    </Dropdown>
                                          ) : (
                                            <></>
                                            )}
          </div>
            <img
              className='cards__Class__item__img'
              alt='backround img'
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
            
            <h1 className='cards__Class__item__course'>{props.course}</h1>
            
            <h5 className='cards__Class__item__teacher'>{props.teacher}</h5>
            <h6 className='cards__Class__item__class'>{props.class}</h6>
            <ul className='icons'>
              
              <li> <Link to="#"> <i><FaRegFolder /> </i> </Link></li>
              <li> <Link to="#"> <i> <FaRegFile /></i></Link></li>
              <li><Link to='#'><i ><FaRegComment /></i></Link></li>
            
              
            </ul>
            <ul className='react'>
            <li><Link to='#'><i ><FaRegGrinHearts /></i></Link></li>
              <li><Link to='#'><i ><FaRegAngry /></i></Link></li>
           </ul>
        {props.meet ==='IN MEETING NOW' ? (
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



export default CardItemClass;
