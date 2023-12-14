import { BarElement, ChartData } from "chart.js"
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
  } from "chart.js";
import { HookCallbacks } from "async_hooks";
  
  ChartJS.register(
        BarElement,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Tooltip
    )


export const YearRevenueChart: React.FC<{yearRevenue: number[]}> = (props) => {
    
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "2021",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: props.yearRevenue,
            },

        ],
    };

    return (
        <Bar data={data}></Bar>
    )
}