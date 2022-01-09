import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Div = styled('div')(({ theme }) => ({
  padding: theme.spacing(10),
}));
const IconDiv = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
}));

export default function NoRecords(props) {
  const {message}=props;
  return <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
 >
 <IconDiv><ErrorOutlineIcon style={{ fontSize: 50, padding:10 }}/></IconDiv>
 <Div>{message}</Div>
 </Grid>;
}