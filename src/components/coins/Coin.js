import React, {useState} from 'react'
import './Coin.css'
import Charts from '../chart/charts.js';

export default function Coin({ id, name, image, symbol, price, volume, priceChange, marketCap}) {

    const [showChart, setShowChart] = useState(false)

  return (
    <div className='coin-container'>
        <div className='coin-row'>
            <div className='coin'>
                <img src={image} alt='crypto'/>
                <h1>{name}</h1>
                <p className='coin-symbol'>{symbol}</p>
            </div>
            <div className='coin-data'>
                <p className='coin-price'>£{price}</p>
                <p className='coin-volume'>£{volume.toLocaleString()}</p>
                {priceChange < 0 ? (
                    <p className='coin-percent red'>{priceChange.toFixed(2)}%</p>
                ) : (<p className='coin-percent green'>{priceChange.toFixed(2)}%</p>)}
                <p className='coin-cap'>Market Cap: £{marketCap.toLocaleString()}</p>
                <div className='arrow' onClick={()=>setShowChart(!showChart)}></div>
            </div>
        </div>     
         {showChart ? <div className="chart">
         <Charts id={id}/>
         </div> : null}
    </div>
  )
}
