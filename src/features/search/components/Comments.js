import React, { useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from './Spinner';
import NoRecords from './NoRecords';
import { isBrowser } from 'react-device-detect';
import {
  selectStatus,
  selectErrors,
  selectComments,
  fetchCommentsAsync,
  clearCommentList,
} from '../searchSlice';

export function Comments(props) {
  const {open, gistId, onClose} = props;
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  const errors = useSelector(selectErrors);
  const apiStatus = useSelector(selectStatus);
  const handleClose = () => {
    if(open){
      dispatch(clearCommentList());
      onClose(false);
    }
  };
  useEffect(()=>{
    dispatch(fetchCommentsAsync(gistId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[open,dispatch]);
  if(errors){
    return(<NoRecords message={errors}/>);
  }
  return (
    <Dialog  onClose={handleClose}open={open} fullWidth
      maxWidth="sm" >
      <DialogTitle>Comments</DialogTitle>
        {apiStatus === 'loading-forks' && <Spinner/>}
        {
          comments && comments.map((comment)=>(
            <Card spacing={0} >
            <CardHeader
          avatar={
            <Link href={comment.user.html_url}>
              <Avatar alt={comment.user.login.slice(0,1)} src={comment.user.avatar_url}  />
            </Link>
          }
          
            title={comment.user.login}
            subheader={
              (
                <Stack direction= {"row" } spacing={1}>
                  <Stack direction= { isBrowser ? "row" : "column" }>
                  <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                    Created:
                  </Typography>
                  <Typography sx={{ fontSize: 10 }} color="text.secondary">
                    {(new Date(comment.created_at)).toDateString()}
                  </Typography>
                  </Stack>
                  <Stack direction= { isBrowser ? "row" : "column" }>
                  <Typography sx={{ fontSize: 10 }} color="text.secondary">
                    Last updated:
                  </Typography>
                  <Typography sx={{ fontSize: 10 }} color="text.secondary">
                    {(new Date(comment.updated_at)).toDateString()}
                  </Typography>
                  </Stack>
                </Stack>
              )
            }
          /> 
          <CardContent>
                <Typography variant="body2">
                {comment.body}
                </Typography>
              </CardContent>
          </Card>
          
          )
        )
       }
      </Dialog>
  )
}
