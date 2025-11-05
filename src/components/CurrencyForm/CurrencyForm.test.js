import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';  // ← ścieżka do Twojego komponentu

describe('CurrencyForm', () => {
  const testCases = [
    { amount: '100', from: 'PLN', to: 'USD' },
    { amount: '20', from: 'USD', to: 'PLN' },
    { amount: '200', from: 'PLN', to: 'USD' },
    { amount: '345', from: 'USD', to: 'PLN' },
  ];

  for (const testObj of testCases) {
    it(`should run action callback with proper data: amount=${testObj.amount}, from=${testObj.from}, to=${testObj.to}`, () => {
      const action = jest.fn();

      render(<CurrencyForm action={action} />);

      const amountField = screen.getByTestId('amount');
      const fromSelect = screen.getByTestId('from-select');
      const toSelect = screen.getByTestId('to-select');
      const submitButton = screen.getByText('Convert');

      fireEvent.change(amountField, { target: { value: testObj.amount } });
      fireEvent.change(fromSelect, { target: { value: testObj.from } });
      fireEvent.change(toSelect, { target: { value: testObj.to } });
      fireEvent.click(submitButton);

      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({
        amount: Number(testObj.amount),
        from: testObj.from,
        to: testObj.to,
      });

      // 🧹 odmontowanie komponentu po każdym teście w pętli
      cleanup();
    });
  }
});