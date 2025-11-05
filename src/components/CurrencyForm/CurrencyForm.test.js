import React, { useState } from 'react';
import './CurrencyForm.scss';

const CurrencyForm = ({ action }) => {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('PLN');
  const [to, setTo] = useState('USD');

  const handleSubmit = e => {
    e.preventDefault();
    action({
      amount: parseFloat(amount),
      from,
      to,
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        <span>Amount:</span>
        <input
          className="input"
          type="text"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          data-testid="amount"
        />
      </label>

      <label>
        <span>From</span>
        <select
          className="select"
          value={from}
          onChange={e => setFrom(e.target.value)}
          data-testid="from"
        >
          <option value="PLN">PLN</option>
          <option value="USD">USD</option>
        </select>
      </label>

      <label>
        <span>To</span>
        <select
          className="select"
          value={to}
          onChange={e => setTo(e.target.value)}
          data-testid="to"
        >
          <option value="PLN">PLN</option>
          <option value="USD">USD</option>
        </select>
      </label>

      <button
        className="button"
        type="submit"
        data-testid="submit"
      >
        Convert
      </button>
    </form>
  );
};

export default CurrencyForm;