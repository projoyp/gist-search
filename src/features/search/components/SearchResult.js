import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectErrors,
  selectGists
} from '../searchSlice';
import Gist from './Gist';
import {Welcome} from './Welcome';
import NoRecords from './NoRecords';

export function SearchResult() {
  const gists = useSelector(selectGists);
  const errors = useSelector(selectErrors);
  
  if(errors){
    return(<NoRecords message={errors}/>);
  }
  if(gists)
  return ( gists &&
    <Gist gists={gists} /> 
  );
  return (<Welcome/>);
}
