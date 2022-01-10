import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { searchGists, fetchForks } from './searchAPI';

const initialState = {
  gists: null,
  forks: null,
  status: 'idle',
};


export const searchGistsAsync = createAsyncThunk(
  '{username}/search?page={page}',
  async (username, page) => {
    const response = await searchGists(username, page);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchForksAsync = createAsyncThunk(
  '{id}/forks',
  async (id) => {
    const response = await fetchForks(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearGistsList(state) {
      state.gists = null
    },
    clearForksList(state) {
      state.forks = null
    },
    clearErrorList(state) {
      state.error = ''
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(searchGistsAsync.pending, (state) => {
        state.status = 'loading-gists';
      })
      .addCase(searchGistsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.gists = [...action.payload.data];
      })
      .addCase(searchGistsAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message === 'Not Found' ? 'User not found. Try some other username.' : action.error.message;
      })
      .addCase(fetchForksAsync.pending, (state) => {
        state.status = 'loading-forks';
      })
      .addCase(fetchForksAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.forks = [...action.payload.data];
      })
      .addCase(fetchForksAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      });
  },
});

export const { clearGistsList, clearForksList, clearErrorList } = searchSlice.actions
export const selectGists = (state) => state.search.gists;
export const selectForks = (state) => state.search.forks;
export const selectErrors = (state) => state.search.error;
export const selectStatus = (state) => state.search.status;

export default searchSlice.reducer;
