import React from 'react'
import { Link } from 'react-router-dom';
import ReactShowMoreText from 'react-show-more-text';
function SlideItems(props) {
  return (
    <div>
        
       <li className='cards__item'>
      
        <Link className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' >
            <img
              className='cards__item__img'
              alt='Travel IMG'
              src={props.src}
            />
          </figure>
        </Link>
        
      </li>
    </div>
  )
}

export default SlideItems
