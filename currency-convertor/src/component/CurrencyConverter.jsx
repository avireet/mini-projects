import React, { useState, useEffect } from 'react';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState('');

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(res => res.json())
      .then(data => {
        setCurrencies(Object.keys(data.rates));
      });
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(res => res.json())
        .then(data => {
          setExchangeRate(data.rates[toCurrency]);
        });
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (exchangeRate) {
        const result = (amount * exchangeRate).toFixed(2);
        setConvertedAmount(result);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [amount, exchangeRate]);

  const getFlagUrl = (currencyCode) => {
    const countryCode = currencyCode.slice(0, 2).toLowerCase();
    return `https://flagcdn.com/24x18/${countryCode}.png`;
  };

  return (
    <div className="converter-container">
      <h2>Currency Converter</h2>

      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="input-box"
      />

      <div className="dropdowns">
        <div className="dropdown-column">
          <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
            {currencies.map(curr => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>

        <span className="arrow">→</span>

        <div className="dropdown-column">
          <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
            {currencies.map(curr => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="result">
        <img src={getFlagUrl(fromCurrency)} alt={fromCurrency} className="flag" />
        {amount} {fromCurrency}
        {' = '}
        <strong>
          {convertedAmount} {toCurrency}
        </strong>
        <img src={getFlagUrl(toCurrency)} alt={toCurrency} className="flag" />
      </div>
    </div>
  );
};

export default CurrencyConverter;
