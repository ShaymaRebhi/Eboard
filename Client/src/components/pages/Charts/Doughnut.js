import { Chart } from 'primereact/chart'
import React from 'react'

function Doughnut(prop) {
  return (
    <div>
          <Chart type="doughnut" data={this.data} options={this.options} />
    </div>
  )
}

export default Doughnut