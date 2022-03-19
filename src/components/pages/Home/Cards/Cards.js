import React from 'react';
import '../../../css/Cards.css';
import CardItem from './CardItem';

import { Button } from '../Buttons/Button';
import { Link } from 'react-router-dom';


function Cards() {
  return (
    
    <div className='cards'>
     
      <h1>Actualities</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            
            <CardItem
              src='https://insights.som.yale.edu/sites/default/files/styles/square/public/2022-03/Information%20inundation.webp?h=6dade3ba&itok=ed0KKLP6'
              text='Study: An Abundance of Media Fuels Polarization'
              date='11 Aug'
              path='/'
              desc="Recent decades have seen an explosion of sources of news and information, as well as increased political polarization. Is there a relationship between the two trends? Yale SOM’s Vahideh Manshadi and her co-authors built a model showing that faced with a flood of information, an individual tends to take in material that reinforces their existing beliefs."
            />
            <CardItem
              src='https://cdn.elearningindustry.com/wp-content/uploads/2020/11/technology-and-content-trends-for-2021.png'
              text='eLearning Trends To Watch Out For In 2021'
              desc="With COVID-19 taking a grip over the world, organizations across the globe are forced to rethink how they conduct business, train, and equip their employees to meet the challenges posed by the disruption and business dynamics. How are organizations gearing up for the coming year in upskilling and reskilling their employees? We will look at some key trends that will reshape the learning landscape in the coming year and beyond.
              The pandemic has created unprecedented challenges that have forced organizations to look for alternative forms of work such as work from home or remote working and bring virtual training to the fore. Earlier, virtual training was used only for the remote workforce or people spread across geographies.
              Working from home is the new normal now. Several surveys have shown that working from home has helped people improve their productivity several notches. While the pandemic has forced this disruption, it is essential to understand that this will become a growing trend in the coming years. Organizations see the benefits of working remotely, and in some cases, businesses see work from home as the permanent solution and not a survival strategy.
              Let us first look at technology trends to watch out for in 2021." 
              date='13 JUN'
              path='/'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='https://news.elearninginside.com/wp-content/uploads/2020/12/giu-vicente-FMArg2k3qOU-unsplash-1920x604.jpg'
              text='ELEARNING TECHNOLOGY: WHAT DOES THE FUTURE HOLD?'
              date='23 Aug'
              desc="Today online education has advanced so much that it improves professional skills to help workers find better jobs or even start earning on their own. Self-starters can leverage eLearning technology to learn upskill in medical fields, launch their own business, or grow adept at stock and crypto trading. Online resources can help you learn new skills, show them to employers, or advance the work you do with everything from SEO tools to lead-capture software to the best Bitcoin wallet for Android. For example, Safetrading is one such platform that provides information about trusted crypto traders and educates how you can create a successful crypto portfolio. And you can learn all of this without leaving your home.
              In this article, we overview eLearning technology in greater detail."
              path='/'
            />
            <CardItem
              src='https://www.viewsonic.com/library/wp-content/uploads/2019/08/LB0045-hero-compressed-696x392.png'
              text='The Future of eLearning – 10 Trends To Be Aware Of'
              desc="Keeping up with the latest eLearning trends can be a challenge for even the most dedicated educator. As a quick primer, however, eLearning is moving towards more inclusive and collaborative approaches. Current digital education trends are also moving towards more engaging formats, relying heavily on AR/VR and gamification to grab and hold learners’ interest. Plus there are a few unexpected developments in eLearning. "
              date='30 Aug'
              path='/'
            />
            
          </ul>
           <ul className="text-center">
            <Link to='/' className='btn-mobile'>
              <Button buttonSize='btn--large'>More Actualities</Button>
            </Link>
           </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
