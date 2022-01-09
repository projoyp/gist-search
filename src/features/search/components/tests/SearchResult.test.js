import React from 'react';
import { render } from '@testing-library/react';
import { Search } from '../Search';
import { Provider } from 'react-redux';
import { store } from '../../../../app/store';

test('renders Search page', () => {
  const { getByText, getByTestId } = render(
    <Provider store={store}>
      <Search />
    </Provider>,
  );

  expect(getByText(/welcome/i)).toBeInTheDocument();
  expect(getByTestId(/search-bar/i)).toBeInTheDocument();
});
