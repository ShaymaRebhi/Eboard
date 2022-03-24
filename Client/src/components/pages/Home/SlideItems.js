import React from 'react'
import { Link } from 'react-router-dom';
function SlideItems(props) {
  return (
    <div>
        
      
      <div className='mx-3'>
        <Link className='cards__item__links ' to={props.path}>
          <figure className='cards__item__pic-wrap' >
            <img
              className='cards__item__img'
              alt='Travel IMG'
              src={props.src}
            />
          </figure>
        </Link>
        </div>
     
    </div>
  )
}

export default SlideItems
