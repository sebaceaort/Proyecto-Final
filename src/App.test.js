import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('ciudades', () => {
  render(<App />);
  const linkElement = screen.getByText(/ciudades/i);
  expect(linkElement).toBeInTheDocument();
});
