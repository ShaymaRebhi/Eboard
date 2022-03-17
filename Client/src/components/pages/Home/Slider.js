import React, { Component } from "react";
import Slider from "react-slick";


import SlideItems from "./SlideItems";


export default class Sliders extends Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }
  play() {
    this.slider.slickPlay();
  }
  pause() {
    this.slider.slickPause();
  }
  render() {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000
    };
    return (
      <div>
          
          <h1 className="pb-5">Our partners</h1>
        <Slider ref={slider => (this.slider = slider)} {...settings}>
          <div >
          <SlideItems
              src='https://d7ieeqxtzpkza.cloudfront.net/wp-content/uploads/2020/04/maxresdefault-1.jpg'
              path='/'
            />
           
          </div>
          <div>
          <SlideItems
              src='https://thd.tn/wp-content/uploads/2020/02/focus-1024x630.png'
              path='/'
            />
          </div>
          <div>
          <SlideItems
              src='https://www.channelnews.fr/wp-content/uploads/2019/09/Sopra-HR.jpg'
              path='/'
            
            />
          </div>
          <div>
          <SlideItems
              src='https://siecledigital.fr/wp-content/uploads/2019/07/huawei-logo.jpg'
              path='/'
            />
          </div>
          <div>
          <SlideItems
              src='https://pbs.twimg.com/media/EyjQfGYU8AEs0xE.jpg'
              path='/'
             
            />
          </div>
          <div>
          <SlideItems
              src='https://img.jobi.tn/adb15777-bfe5-ac45-c115-51a2fe358d87/version/resize/300x300'
              path='/'
             
            />
          </div>
        </Slider>
      <br />
 
      </div>
    );
  }
}