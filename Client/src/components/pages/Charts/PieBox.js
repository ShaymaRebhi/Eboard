
import React, { useState } from 'react'
import Select from 'react-select'
import { Chart } from 'primereact/chart';
import styled from 'styled-components';
function PieBox(prop) {
    const [selectedValue, setSelectedValue] = useState(3);
    const handleChange = e => {
        setSelectedValue(e.value);
      }
  return (
    <Box>
        <Select options={prop.option} name="Univercity" onChange={handleChange} value={prop.option.find(obj => obj.value === selectedValue)}  placeholder="Univercity"/>
        <Chart className='chart' type="pie" data={prop.data} options={prop.options} />
    </Box>
  )
}
const Box=styled.div`
.chart{
    margin-top:20px;
}


`
export default PieBox