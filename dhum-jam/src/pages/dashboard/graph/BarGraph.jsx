import React from 'react'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Colors,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    Colors,
    LineElement
)

  
const BarGraph = ({data, options}) => {
  return (
    <div>
        <Bar data={data} options={options} height={600} width={600}/>
    </div>
  )
}

export default BarGraph