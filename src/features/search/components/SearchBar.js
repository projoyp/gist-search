import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { DebounceInput } from 'react-debounce-input'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import GitHubIcon from '@mui/icons-material/GitHub';
import {
  searchGistsAsync
} from '../searchSlice';

export function SearchBar() {
  const isInitialMount = useRef(true);
  const dispatch = useDispatch();
  const [query, setQuery ]=  useState();
  useEffect(()=>{
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {
      if(query)
        dispatch(searchGistsAsync([query,1]));
   }
  },[query,dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <GitHubIcon sx={{ marginRight:3}}/>
          <DebounceInput
            className="search-bar"
            placeholder="Enter username to search..."
            debounceTimeout={500}
            onChange={event => (setQuery(event.target.value))}
            data-testid="search-bar"
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
