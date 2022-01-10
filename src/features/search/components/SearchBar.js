import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { DebounceInput } from 'react-debounce-input'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import GitHubIcon from '@mui/icons-material/GitHub';
import SearchIcon from '@mui/icons-material/Search';
import {
  clearErrorList,
  clearGistsList,
  searchGistsAsync
} from '../searchSlice';

export function SearchBar() {
  const isInitialMount = useRef(true);
  const dispatch = useDispatch();
  const [query, setQuery ]=  useState();
  const [open, setOpen] = React.useState(false);

  const handleSearchClick = () => {
    if(!query){
      setOpen(true);
      return;
    }
    dispatch(searchGistsAsync([query,1]))
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  useEffect(()=>{
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {
      if(query){
        dispatch(clearErrorList());
        dispatch(searchGistsAsync([query,1]));
      }
   }
  },[query,dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <IconButton 
            color="secondary"
            onClick={()=>{dispatch(clearErrorList());dispatch(clearGistsList());}}>
            <GitHubIcon sx={{ marginRight:3}}/>
          </IconButton>
          <DebounceInput
            className="search-bar"
            placeholder="Enter username to search..."
            debounceTimeout={500}
            onChange={event => (setQuery(event.target.value))}
            data-testid="search-bar"
          />
          <IconButton 
            color="secondary"
            onClick={()=>handleSearchClick()}>
            <SearchIcon />
          </IconButton>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Username is mandatory.
        </Alert>
      </Snackbar>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
