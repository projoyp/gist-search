import React from 'react';
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
}));

export function Welcome() {
  return (
    <Div>
      Welcome to gist-search. You can type any username in the text box to view all their public gists on github
    </Div>
  );
}
