import React from 'react'
import { Chart } from 'react-chartjs-2'

export default function LineChart(prop) {
  return (
    <div>
         <Chart type="line"  data={prop.data} options={prop.options}  />
    </div>
  )
}
