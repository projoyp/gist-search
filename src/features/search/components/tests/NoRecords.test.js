import React from 'react';
import { render } from '@testing-library/react';
import NoRecords from '../NoRecords';

test('renders NoRecords page', () => {
  const message = "test-message"
  const { getByText } = render(
      <NoRecords message={message}/>,
  );

  expect(getByText(/test-message/i)).toBeInTheDocument();
});
