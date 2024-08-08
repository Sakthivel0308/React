import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const[convertedAmount, setConvertedAmount] = useState(null);
  const[exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const getExchangeRate = async () => {
      try{
      let url = `https://v6.exchangerate-api.com/v6/b123f225d5c37d4285569cc4/latest/${fromCurrency}`;
      const res = await axios.get(url);
      console.log(res);
      setExchangeRate(res.data.conversion_rates[toCurrency]);
      }catch(error){
      console.error("Error fetching data",error);
      }
    };
    getExchangeRate();
  },[fromCurrency,toCurrency]);

  useEffect(() => {
  if(exchangeRate !== null){
    setConvertedAmount((amount * exchangeRate).toFixed(2));
  }
  },[amount,exchangeRate]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(isNaN(value)?0:value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };
return (
  <>
    <div className="currency-container">
      <div className="box"></div>
      <div className="data">
        <h1>CURRENCY CONVERTOR</h1>
        <div className="input-container">
          <label htmlFor="amt">AMOUNT:</label>
          <input
            type="number"
            id="amt"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="from-currency">From Currency:</label>
          <select
            id="from-currency"
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="CAD">CAD</option>
            <option value="AUD">AUD</option>
            <option value="CHF">CHF</option>
            <option value="CNY">CNY</option>
            <option value="SGD">SGD</option>
            <option value="KRW">KRW</option>
            <option value="MYR">MYR</option>
            <option value="NZD">NZD</option>
            <option value="BRL">BRL</option>
            <option value="PHP">PHP</option>
            <option value="THB">THB</option>
            <option value="RUB">RUB</option>
            <option value="TRY">TRY</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="to-currency">From Currency:</label>
          <select
            id="to-currency"
            value={toCurrency}
            onChange={handleToCurrencyChange}
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="CAD">CAD</option>
            <option value="AUD">AUD</option>
            <option value="CHF">CHF</option>
            <option value="CNY">CNY</option>
            <option value="SGD">SGD</option>
            <option value="KRW">KRW</option>
            <option value="MYR">MYR</option>
            <option value="NZD">NZD</option>
            <option value="BRL">BRL</option>
            <option value="PHP">PHP</option>
            <option value="THB">THB</option>
            <option value="RUB">RUB</option>
            <option value="TRY">TRY</option>
          </select>
        </div>
        <div className="result">
          <p>
            {amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}
          </p>
        </div>
      </div>
    </div>
  </>
);
}

export default App
