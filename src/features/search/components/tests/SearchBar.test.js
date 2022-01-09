import React from 'react';
import { render } from '@testing-library/react';
import { SearchBar } from '../SearchBar';
import { Provider } from 'react-redux';
import { store } from '../../../../app/store';

test('renders SearchBar page', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <SearchBar />
    </Provider>,
  );

  expect(getByTestId(/search-bar/i)).toBeInTheDocument();
});
