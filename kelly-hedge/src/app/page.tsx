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

ChartJS.defaults.font.size=18;
ChartJS.defaults.font.weight="bold";
ChartJS.defaults.font.family="Helvetica Neue";

const get_hedge_amount = (n: number, w: number, b: number, q: number) => {
  return (n * (-1 + b + q) + (-1 + b + q - b*q) * w)/(-1 + q);
}
const get_hedge_amount_plus = (n: number, w: number, b: number, q: number) => {
  // return max of hedge amount and 0:
  return Math.max(get_hedge_amount(n,w,b,q), 0);
}

type InputContainerProps = {
  children: React.ReactNode;
}
const InputContainer = (props: InputContainerProps) => {
  return (<div className="">
    {props.children}
  </div>);
}

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
const Input = (props: InputProps) => {
  return (<input
  className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-24 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm"
  {...props}
  >{props.children}</input>);

}

export default function Home() {
  const [answer, setAnswer] = React.useState<number>(0);
  const [data, setData] = React.useState<{ [x: string]: number }>({
    potentialWin: 4000,
    netWorth: 100000,
    trueOdds: 0.3,
    hedgeOdds: 0.715,
  });
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    const valueNum = Number(value);
    setData(prevState => ({ ...prevState, [name]: valueNum }));
  }
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {potentialWin, netWorth, trueOdds, hedgeOdds} = data;
    // const n = 10000; // net worth
    // const w = 1000; // original potential win
    // const b = 0.4; // current true odds
    // const q = 0.64; // best odds to hedge
    // const ans = (netWorth * (-1 + trueOdds + hedgeOdds) + (-1 + trueOdds + hedgeOdds - trueOdds*hedgeOdds) * potentialWin)/(-1 + hedgeOdds);
    setAnswer(get_hedge_amount(netWorth, potentialWin, trueOdds, hedgeOdds));
  };
  const XVALS = [100, 200, 400, 800, 1000, 2000, 4000, 6000, 7000, 8000, 10000, 20000, 30000, 40000, 50000, 64000, 100000, 200000];
  const yvals = XVALS.map(nw => {
    const {potentialWin, netWorth, trueOdds, hedgeOdds} = data;
    return get_hedge_amount_plus(nw, potentialWin, trueOdds, hedgeOdds);
  });
  const chartData = XVALS.map((x, i) => ({x:x, y:yvals[i]}));

  return (
    <div className='p-8'>
      <div className="flex gap-4">
        <InputContainer>Potential Win: <Input type="number" name="potentialWin" value={data.potentialWin} onChange={handleInputChange} /></InputContainer>
        <InputContainer>Net worth: <Input type="number" name="netWorth" value={data.netWorth} onChange={handleInputChange} /></InputContainer>
        <InputContainer>True odds now: <Input type="number" name="trueOdds" value={data.trueOdds} onChange={handleInputChange} /></InputContainer>
        <InputContainer>Best hedge odds: <Input type="number" name="hedgeOdds" value={data.hedgeOdds} onChange={handleInputChange} /></InputContainer>
        <button onClick={onClick}>Go</button>
      </div>
      <div>
        {answer}
        <Line
          data={{
            // labels: XVALS,
            datasets: [{
              label: 'My First Dataset',
              data: chartData,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 5,
              tension: 0.1
            }],
          }}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Hedge Amount vs Starting Net Worth'
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Starting Net Worth'
                },
                type: 'linear',
                grace: '5%'
              },
              y: {
                title: {
                  display: true,
                  text: 'Hedge Amount',
                }
              }
            },
          }}
        />


      </div>
      <div><a href="https://github.com/VitamintK/kelly-hedge">https://github.com/VitamintK/kelly-hedge</a></div>
    </div>
  );
}