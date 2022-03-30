import React  from 'react'
import Chart from 'chart.js/auto'
import { Doughnut, Line, Pie, Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import ChartsBox from '../Charts/ChartsBox';
import PieBox from '../Charts/PieBox';
function Home() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const date = new Date();
  
  const lineState = {
    labels: months,
    datasets: [
        {
            label: `Sales in ${date.getFullYear() - 2}`,
            borderColor: '#8A39E1',
            backgroundColor: '#8A39E1',
            data: [25,253,255,25,253,255,25,253,255,25,253,255],
        },
        {
            label: `Sales in ${date.getFullYear() - 1}`,
            borderColor: 'orange',
            backgroundColor: 'orange',
            data: [25,253,255,25,253,255,25,253,255,25,253,255],
        },
        {
            label: `Sales in ${date.getFullYear()}`,
            borderColor: '#4ade80',
            backgroundColor: '#4ade80',
            data: [25,253,255,25,253,255,25,253,255,25,253,255],
        },
    ],
};
const statuses = ['Processing', 'Shipped', 'Delivered'];
  return (
    <>
    <Style>
      <ChartsBox/>
      <PieBox className="PieBox"/>
      <h1>hello</h1>
    </Style>
    
    </>
  )
}

const Style=styled.div`
  margin-right:auto !important;
  margin-left:auto !important;
  display:flex;
  justify-content:center;
  
  flex-wrap:wrap;
  padding:20px;
   
`
export default Home