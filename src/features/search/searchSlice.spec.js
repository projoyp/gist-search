import searchReducer,
 {
    clearForksList,
} from './searchSlice';

describe('search reducer', () => {
  const initialState = {
    gists: ["someValue"],
    forks: ["someValue"],
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(searchReducer(undefined, { type: 'unknown' })).toEqual({
      gists: null,
      forks: null,
      status: 'idle',
    });
  });

  it('should handle clear fork list', () => {
    const actual = searchReducer(initialState, clearForksList());
    expect(actual.forks.length).toEqual(0);
  });
});
