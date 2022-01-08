import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { DebounceInput } from 'react-debounce-input'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {
  searchGistsAsync
} from '../searchSlice';
//import styles from './Counter.module.css';

export function SearchBar() {
  const isInitialMount = useRef(true);
  const dispatch = useDispatch();
  const [query, setQuery ]=  useState();
  useEffect(()=>{
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {
    dispatch(searchGistsAsync([query,1]));
   }
  },[query,dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <DebounceInput
            className="search-bar"
            placeholder="Enter username to search public gists..."
            minLength={3}
            debounceTimeout={500}
            onChange={event => (setQuery(event.target.value))}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
