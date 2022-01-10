import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { DebounceInput } from 'react-debounce-input'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
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
            onClick={()=>dispatch(searchGistsAsync([query,1]))}>
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
