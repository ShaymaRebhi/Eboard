import React from 'react';
import { Link } from 'react-router-dom';
import ReactShowMoreText from 'react-show-more-text';
function CardItem(props) {
  return (
    <>
      <li className='cards__item'>
        <Link className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Travel IMG'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
          <div className="row">
            <div className="col-sm-3">
                 <div className="dateCaption">{props.date}</div>
            </div>
            <div className="col-sm-9">
                    <h1 className='cards__item__text'>{props.text}</h1>
            </div>    
          </div>
          
          </div>
          <p className=" text-center image___caption___description">
           
            <ReactShowMoreText more="Show more" less="Show less" lines={3}>
              {props.desc}
            </ReactShowMoreText>
           
            </p> 
        </Link>
        
      </li>
    </>
  );
}

export default CardItem;
