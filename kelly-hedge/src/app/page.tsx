'use client';
import Image from 'next/image'
import React from 'react';
import { Line } from 'react-chartjs-2';
import {  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,} from 'chart.js'
// Chart.register(ArcElement);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function Home() {
  const [answer, setAnswer] = React.useState<number>(0);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    const n = 10000; // net worth
    const w = 1000; // original potential win
    const b = 0.4; // current true odds
    const q = 0.64; // best odds to hedge
    const ans = (n * (-1 + b + q) + (-1 + b + q - b*q) * w)/(-1 + q);
    setAnswer(ans);
  };
  return (
    <div>
      <div>
        Potential Win: <input/>
        Net worth: <input />
        True odds now: <input />
        <button onClick={onClick}>Go</button>
      </div>
      <div>
        {answer}
        <Line data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        }} />


      </div>
    </div>
  );
}