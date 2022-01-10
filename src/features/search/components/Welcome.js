import React from 'react';
import { styled } from '@mui/material/styles';
import styles from '../style.module.css';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Div = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(20),
  paddingBottom: theme.spacing(20),
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
  textAlign: "center",
  height:"100",
  alignItems: "center",
}));

export function Welcome() {
  return (
    <Grid
    container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center">
      <Div>
      <Typography paragraph className={styles.titleWord} >
      Hi, I'm Projoy
      </Typography>
      <Typography paragraph className={styles.titleWord}>
        Welcome to gist-search application.
      </Typography>
      <Typography paragraph className={styles.titleWord}>
        You can search by username to view all their public gists.
      </Typography>
      <Typography paragraph className={styles.titleWord}>
        Happy Searching !!! 
      </Typography>
     </Div>
    </Grid>
    
  );
}
