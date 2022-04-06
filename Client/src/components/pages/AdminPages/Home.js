import React  from 'react'
import styled from 'styled-components';
import ChartsBox from '../Charts/ChartsBox';
import PieBox from '../Charts/PieBox';
import Radar from '../Charts/Doughnut';

import { Chart } from 'primereact/chart';
import Table from '../Charts/Table/Table';
function Home() {
    const Bar = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: '2021',
                backgroundColor: '#42A5F5',
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: '2022',
                backgroundColor: '#FFA726',
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    const multiAxisData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Dataset 1',
            backgroundColor: [
                '#EC407A',
                '#AB47BC',
                '#42A5F5',
                '#7E57C2',
                '#66BB6A',
                '#FFCA28',
                '#26A69A'
            ],
            yAxisID: 'y',
            data: [65, 59, 80, 81, 56, 55, 10]
        }, {
            label: 'Dataset 2',
            backgroundColor: '#78909C',
            yAxisID: 'y1',
            data: [28, 48, 40, 19, 86, 27, 90]
        }]
    };

    const Doughnut = {
        labels: ['Computer science engineering', 'Civil engineering', 'Business'],
        datasets: [
            {
                data: [3000, 1050, 100],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
    };
    const DoughnutOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    };


    
  const basicData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Organizations widh record fonctionality',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#42A5F5',
            tension: .4
        },
        {
            label: 'Organizations widhout record fonctionality',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: '#FFA726',
            tension: .4
        }
    ]
};


  const chartData = {
    labels: ['DS', 'GL','TWIN','WIN'],
    datasets: [
        {
            data: [300, 50, 500,10],
            backgroundColor: [
                "#42A5F5",
                "#00579A",
                "#C079FF",
                "#D8CFE0"
            ],
            hoverBackgroundColor: [
                "#60B3F7",
                "#1A6DAD",
                "#CF99FF",
                "#E1E0E2"
                
            ]
        }
    ]
};

const lightOptions = {
  plugins: {
      legend: {
          labels: {
              color: '#495057'
          }
      }
  }
};
const options = [
  { value: 'ESPRIT', label: 'ESPRIT' },
  { value: 'TEK-UP', label: 'TEK-UP' },
  { value: 'SEASAME', label: 'SEASAME' },
]
const basicOptions = {
  maintainAspectRatio: false,
  aspectRatio: .6,
  plugins: {
      legend: {
          labels: {
              color: '#495057'
          }
      }
  },
  scales: {
      x: {
          ticks: {
              color: '#495057'
          },
          grid: {
              color: '#ebedef'
          }
      },
      y: {
          ticks: {
              color: '#495057'
          },
          grid: {
              color: '#ebedef'
          }
      }
  }
};
  return (
    <>
    
    <Style className='container-fluid'>
      
      <ChartsBox/>
      <div className='d-flex flex-nowrap px-5 ' >
        
          <div className='pie-charts'>
            <h1>Student Result</h1>
            <PieBox className='pie' data={chartData} options={lightOptions} option={options}/>
              
            </div>
        
      
            <div className='pie-charts'>
                <h1>Specialities</h1>
                <Chart type="doughnut" data={Doughnut} options={DoughnutOptions} />
            </div>
    
      </div>
      <div className='table-list'>
              <Chart type="line" className='line' data={basicData} options={basicOptions}  />
      </div>
      <div className='table-list'>
          <h1>Monthly Revenue 2021 vs 2022</h1>
          <Chart type='bar' className='bar' data={Bar} options={multiAxisData} />
      </div>
   
     
    </Style>
    <Table />

    
    </>
  )
}

const Style=styled.div`

 .line{
   height:100%;
 }
  display:flex;
  justify-content:center;
  h1{
      color:grey;
    }
  flex-wrap:wrap;
  
  .line-charts{
    width:600px;
    height:400px;
    box-shadow:10px 10px 20px rgba(0,0,0,0.2);
    margin-top:50px;
    border-radius:2%;
 
    padding-left:auto;
    padding-right:30px auto;
  }
  .table-list{
      h1{
        margin-top:10px;
      }
      .bar{
          padding:0 80px;
          margin-left:auto;
          margin-right:auto;
          max-width:800px;
          display:flex;
          justify-content:center;
      }
    width:100%;
    height:400px;
    max-width:1190px;
    box-shadow:10px 10px 20px rgba(0,0,0,0.2);
    margin-top:50px;
    border-radius:2%;
  }
  .pie-charts{
    
    width:600px;
    height:400px;
    box-shadow:10px 10px 20px rgba(0,0,0,0.2);
    margin-top:50px;
    margin-right:30px;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:5%;
    .pie{
      height:10%;
    }
   
  }
`
export default Home