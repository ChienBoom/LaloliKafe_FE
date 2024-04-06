import { Chart } from 'chart.js/auto'
import { useEffect, useRef } from 'react'

export function RevenueChart(props: any) {
  const { label, labels, revenues, typeChart } = props
  const canvasRef1 = useRef<HTMLCanvasElement>(null)
  const chartRef = useRef<Chart>()

  useEffect(() => {
    if (canvasRef1.current) {
      const ctx = canvasRef1.current.getContext('2d')
      if (ctx) {
        if (chartRef.current) {
          chartRef.current.destroy()
        }
        chartRef.current = new Chart(ctx, {
          type: typeChart,
          data: {
            labels: labels,
            datasets: [
              {
                label: label,
                data: revenues,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              // yAxes: [{
              //   ticks: {
              //     beginAtZero: true
              //   }
              // }]
            }
          }
        })
      }
    }
  }, [label, labels, revenues, typeChart])

  return <canvas id="myChart" ref={canvasRef1}></canvas>
}

export default RevenueChart
