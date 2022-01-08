import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import {SearchBar} from './SearchBar';
import {SearchResult} from './SearchResult';
export function Search() { 
  return (
    <div>
      <SearchBar/>
      <ErrorBoundary>
        <SearchResult/>
      </ErrorBoundary>
    </div>
  );
}
