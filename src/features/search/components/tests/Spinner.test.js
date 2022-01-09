import React from 'react';
import { render } from '@testing-library/react';
import Spinner from '../Spinner';

test('renders Spinner page', () => {
  const { getByTestId } = render(
      <Spinner/>,
  );

  expect(getByTestId(/spinner/i)).toBeInTheDocument();
});
