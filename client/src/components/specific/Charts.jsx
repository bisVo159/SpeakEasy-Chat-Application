import React from 'react'
import {Line,Doughnut} from "react-chartjs-2"
import { ArcElement, CategoryScale, Chart as Charjs, LineElement, LinearScale, PointElement, plugins, scales,Filler } from 'chart.js'
import { getLast7Days } from '../../lib/features'

Charjs.register(CategoryScale,LinearScale,PointElement,LineElement,ArcElement,Filler,plugins)

const labels=getLast7Days()

const lineChartOptions={
    responsive:true,
    plugins:{
        legend:{
            display:false
        },
        title:{
            display:false
        }
    },
    scales:{
        x:{
            grid:{
                display:false
            }
        },
        y:{
            beginAtZero:true,
            grid:{
                display:false
            }
        }
    }
}

function LineChart({value=[]}) {
    const data={
        labels,
        datasets:[
            {
                label: 'Messages',
                data: value,
                fill: true,
                backgroundColor: 'rgba(175, 12, 192, 0.2)',
                borderColor:'rgba(175, 12, 192, 1)'
            }
        ]
    }
  return (
    <Line data={data} options={lineChartOptions}/>
  )
}

const DoughnutOptions={
    responsive:true,
    plugins:{
        legend:{
            display:false
        },
    },
    cutout:120
}
function DoughnutChart({value=[],labels=[]}) {
    const data={
        labels,
        datasets:[
            {
                data: value,
                fill: true,
                backgroundColor: ['rgba(175, 12, 192, 0.2)','rgba(45, 12, 84, 0.2)'],
                borderColor:['rgba(175, 12, 192, 1)','rgba(92, 12, 81, 1)'],
                hoverBackgroundColor:['rgba(175, 12, 192, 0.7)','rgba(45, 12, 84, 0.7)'],
                offset:40
            }
        ]
    }
 
  return (
    <Doughnut className='z-10' data={data} options={DoughnutOptions}/>
  )
}

export {LineChart,DoughnutChart}