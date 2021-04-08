import React from 'react';
import _ from 'lodash';
import { render, screen } from '@testing-library/react';
import Autocomplete from './App';

// mock state
const mockOpen = true;
const mockOptions = ['The Shawshank Redemption'];

test('if autocomplete renders', () => {
  render(<Autocomplete />);
  const titleElement = screen.getByText('Movie Search');
  expect(titleElement).toBeInTheDocument();
});

test('if autocomplete dropdown and api response renders', () => {
  React.useState = jest.fn()
     .mockReturnValueOnce([mockOpen, {}])
     .mockReturnValueOnce([mockOptions, {}])
  render(<Autocomplete />);
  const movieElement = screen.getByText('The Shawshank Redemption');
  expect(movieElement).toBeInTheDocument();
});
