import React from 'react';
import {
  fetchclass,
  selectclass,
} from "./../../redux/slices/classsline";
import { useDispatch, useSelector } from "react-redux";
import { getclassApi } from "../../utils/api";
import '../css/CardClass.css';
import { useHistory } from "react-router";
import CardItemClass from './CardItemClass';

function CardClass() {
  const [classs] = useSelector(selectclass);
  const dispatch = useDispatch();
  const history = useHistory();
  const selectClass = async (classSelected) => {
    const res = await getclassApi.getclassById(classSelected);
    localStorage.setItem("idClass", JSON.stringify(res));
    history.push("/classroom");
  };
  return (
    
    <div className='cardClass' key={index}>
      <h1>Find your courses!</h1>
      {classs?.map((cl, index) => (
      <div className='cards__Class__container'>
        <div className='cards__Class__wrapper'>
        {aff(cl._id)}
          <ul className='cards__Class__items'>
          {cl.classObjet?.map((co, i) => (
            <CardItemClass key={i} onClick={() => selectClass(co._id)}
              src='images/react.jpeg'
              course={co.className}
              teacher='MR Emine Zribi'
              class={co.classSection}
              meet ='IN MEETING NOW'
              path='#'
              src1='images/emine.jpg'
            
            />
            ))}
           
            
          </ul>
        </div>
      </div>
      ))}
    </div>
    
  );
}

export default CardClass;
