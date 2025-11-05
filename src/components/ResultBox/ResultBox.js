import React from 'react';
import PropTypes from 'prop-types';
import styles from './ResultBox.module.scss';

const ResultBox = ({ from, to, amount }) => {
  const rateUSD = 3.5;

  // 🧩 Walidacja — jeśli amount < 0
  if (amount < 0) {
    return <div data-testid="output" className={styles.resultBox}>Wrong value...</div>;
  }

  const convert = (from, to, amount) => {
    if (from === to) return amount;
    if (from === 'PLN' && to === 'USD') return amount / rateUSD;
    if (from === 'USD' && to === 'PLN') return amount * rateUSD;
  };

  const result = convert(from, to, amount);

  const formatValue = (currency, value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div data-testid="output" className={styles.resultBox}>
      {formatValue(from, amount)} = {formatValue(to, result)}
    </div>
  );
};

ResultBox.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default ResultBox;