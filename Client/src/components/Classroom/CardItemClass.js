import React  from 'react';
import { Link } from 'react-router-dom';
import { FaRegFolder , FaRegFile , FaRegComment ,FaRegGrinHearts,FaRegAngry,FaEllipsisV} from "react-icons/fa";
import '../css/CardClass.css';


function CardItemClass(props) {
  return (
    
    <>
       
      <li className='cards__Class__item' >
        <Link className='cards__Class__item__link' to={props.path}>
          <div className='cards__Class__item__pic-wrap' >
          <div className='dropdown'><FaEllipsisV></FaEllipsisV> 
         
        
          </div>
          
            <img
              className='cards__Class__item__img'
              alt='Travel Image'
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
        <h6><i className='fas fa-circle' /> {props.meet} 
        </h6>
        </div> ) : (
          <div className='offline-btns'>        
          <h6><i className='fas fa-circle' /> {props.meet} 
          </h6>
          </div>
        )}

        </div>
        
          
        </Link>
        
      </li>
      
    </>
    
  );
}



export default CardItemClass;
