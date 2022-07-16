
import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { options } from '../options';
import './charts.css'




export default function Charts({id}) {

  const [price, setPrice] = useState([])
  const [days, setDays] = useState(1)

  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      };
    });
  };

  useEffect(()=>{
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=gbp&days=${days}`)
    .then(res=>{
      setPrice(formatData(res.data.prices))
      console.log(price)
    })
    .catch(err=>console.log(err))
  }, [days]);

  let times =() => {
    if (days > 1) { return price.map(val=> new Date(val.t).toLocaleDateString())}
    else {
      return price.map(val=> new Date(val.t).toLocaleTimeString())
    }}
  let time = times();
  let values = price.map(val => val.y)

  let ChartData =  {
    labels: time,
    datasets: [{
        label: 'Price in GBP',
        data: values,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'black',
        borderWidth: 0.5
    }]
};

  return (
    <div className='chart-container'>
      <div className='chart-buttons'>
        <button className='chart-button' autoFocus onClick={()=> setDays(1)}>24h</button>
        <button className='chart-button' onClick={()=> setDays(7)}>7d</button>
        <button className='chart-button' onClick={()=> setDays(30)}>30d</button>
        <button className='chart-button' onClick={()=> setDays(365)}>1y</button>
      </div>
        <Line data={ChartData} options={options} className="line-chart"
      />
    </div>
  )
}
