import * as React from 'react';
import { styled } from '@mui/material/styles';

const Div = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
}));

export default function NoRecords(props) {
  const {message}=props;
  return <Div>{message}</Div>;
}