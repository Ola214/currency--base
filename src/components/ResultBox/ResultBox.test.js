import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';

  describe('Component ResultBox', () => {
    it('should render proper info about conversion when PLN -> USD', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('PLN 100.00 = $28.57');
    });
    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });
  });

  describe('ResultBox', () => {
  const testCases = [
    { amount: 100, from: 'PLN', to: 'USD', expectedText: 'PLN 100.00 = $28.57' },
    { amount: 200, from: 'PLN', to: 'USD', expectedText: 'PLN 200.00 = $57.14' },
    { amount: 345, from: 'PLN', to: 'USD', expectedText: 'PLN 345.00 = $98.57' },
    { amount: 50, from: 'PLN', to: 'USD', expectedText: 'PLN 50.00 = $14.29' },
  ];

  for (const testObj of testCases) {
    it(`should render proper info about conversion when ${testObj.from} -> ${testObj.to} and amount=${testObj.amount}`, () => {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expectedText);
      cleanup();
    });
  }
});