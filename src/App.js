import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Coin from './components/coins/Coin.js';

function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(()=>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res=>{
      setCoins(res.data)
    })
    .catch(err=>console.log(err))
  }, []);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin=>
    coin.name.toLowerCase().includes(search.toLocaleLowerCase())
    )

  return (
    <div className="App">
      <div className='coin-search'>
        <h1 className='coin-header'>Search Crypto</h1>
        <form>
          <input type='text' placeholder='Search' className='coin-input' onChange={handleChange}/>
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <div>
          <Coin 
          key={coin.id} 
          id={coin.id}
          name={coin.name} 
          image={coin.image} 
          symbol={coin.symbol} 
          volume={coin.total_volume} 
          price={coin.current_price} 
          priceChange={coin.price_change_percentage_24h}
          marketCap={coin.market_cap} />
          </div>
        )
      })}
      <div className='footer'>Piotr Paszkiewicz | 2022</div>
    </div>
  );
}

export default App;
