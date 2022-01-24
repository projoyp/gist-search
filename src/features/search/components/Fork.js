import React, { useEffect } from "react";
import Spinner from './Spinner';
import Avatar from '@mui/material/Avatar';
import LaunchIcon from '@mui/icons-material/Launch'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import NoRecords from './NoRecords';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectStatus,
  selectErrors,
  selectForks,
  fetchForksAsync,
  clearForksList,
} from '../searchSlice';

  export function Fork(props){
    const {open, gistId, onClose} = props;
    const dispatch = useDispatch();
    const forks = useSelector(selectForks);
    const errors = useSelector(selectErrors);
    const apiStatus = useSelector(selectStatus);
    const sortedForks = forks && forks.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const lastThreeForks = sortedForks && sortedForks.slice(0,3);
    const handleClose = () => {
      if(open){
        dispatch(clearForksList());
        onClose(false);
      }
    };
    useEffect(()=>{
      dispatch(fetchForksAsync(gistId));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[open,dispatch]);
    if(errors){
      return(<NoRecords message={errors}/>);
    }
    return (
      <Dialog  onClose={handleClose}open={open} fullWidth
      maxWidth="sm" >
      <DialogTitle>Forks</DialogTitle>
        {apiStatus === 'loading-forks' && <Spinner/>}
          {lastThreeForks && lastThreeForks.length > 0 ? 
          
               lastThreeForks.map((fork) => (
              <Card spacing={0} key={fork.id}>
              <CardHeader
            avatar={
              <Link href={fork.owner.html_url}>
                <Avatar alt={fork.owner.login.slice(0,1)} src={fork.owner.avatar_url}  />
              </Link>
            }
            action={
              <Stack direction="row" spacing={2}>
                <Link component="button" underline="none" onClick={() => window.open(fork.html_url, "_blank")}>
                  <Stack direction="row" spacing={1}>
                  <Typography sx={{ fontSize: 10 }} color="#0072E5">
                    <LaunchIcon />
                  </Typography>
                  </Stack>
                </Link>
                </Stack>
            }
              title={
                <Link underline="none" color="#0072E5" href={fork.owner.html_url}>
                {fork.owner.login}
              </Link>}
            /> 
            <CardContent className="dateTimeDiv">
            <Stack direction= {"row" } spacing={1}>
                    <Stack direction= "row">
                    <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                      Created:
                    </Typography>
                    <Typography sx={{ fontSize: 10 }} color="text.secondary">
                      {(new Date(fork.created_at)).toDateString()}
                    </Typography>
                    </Stack>
                    <Stack direction= "row">
                    <Typography sx={{ fontSize: 10 }} color="text.secondary">
                      Last updated:
                    </Typography>
                    <Typography sx={{ fontSize: 10 }} color="text.secondary">
                      {(new Date(fork.updated_at)).toDateString()}
                    </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
            <CardContent>
                  <Typography variant="body2">
                  {fork.description || "No description"}
                  </Typography>
                </CardContent>
            </Card>
            
            ) ): apiStatus !== "loading-forks" && (<NoRecords message="No forks for this gist"/>)}
      </Dialog>
    )
  }
