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

  describe('ResultBox2', () => {
    const testCases = [
        { amount: 100, from: 'USD', to: 'PLN', expectedText: '$100.00 = PLN 350.00' },
        { amount: 200, from: 'USD', to: 'PLN', expectedText: '$200.00 = PLN 700.00' },
        { amount: 345, from: 'USD', to: 'PLN', expectedText: '$345.00 = PLN 1,207.50' },
        { amount: 50, from: 'USD', to: 'PLN', expectedText: '$50.00 = PLN 175.00' },
    ];

    for (const testObj of testCases) {
        it(`should render proper info about conversion when USD -> PLN and amount=${testObj.amount}`, () => {
        render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(testObj.expectedText);
        cleanup();
        });
    }
  });