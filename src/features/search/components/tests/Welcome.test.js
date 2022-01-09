import React from 'react';
import { render } from '@testing-library/react';
import {Welcome} from '../Welcome';

test('renders welcome page', () => {
  const { getByText } = render(
      <Welcome />,
  );

  expect(getByText(/welcome/i)).toBeInTheDocument();
});
