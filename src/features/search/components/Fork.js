import React, { useEffect } from "react";
import Spinner from './Spinner';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import LaunchIcon from '@mui/icons-material/Launch'
import NoRecords from './NoRecords';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { isBrowser } from 'react-device-detect';
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
          {lastThreeForks && lastThreeForks.length > 0 ? (<Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Created At</TableCell>
                    <TableCell>User</TableCell>
                    {
                      isBrowser &&
                      <TableCell>Description</TableCell>
                    }
                    <TableCell>URL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lastThreeForks && lastThreeForks.map((fork) => (
                    <TableRow key={fork.id}>
                      <TableCell component="th" scope="row">
                        {(new Date(fork.created_at).toDateString())}
                      </TableCell>
                      <TableCell>
                        <Avatar alt={fork.owner.login.slice(0,1)} src={fork.owner.avatar_url} />
                        {fork.owner.login}
                      </TableCell>
                      {
                        isBrowser &&
                        <TableCell align="right">{fork.description}</TableCell>
                      }
                      <TableCell align="right">
                        <IconButton aria-label={fork.html_url} onClick={() => window.open(fork.html_url, "_blank")}>
                          <LaunchIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : apiStatus !== "loading-forks" && (<NoRecords message="No forks for this gist"/>)}
      </Dialog>
    )
  }
