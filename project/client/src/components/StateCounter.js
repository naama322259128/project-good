import React from 'react';
import { useStorageReducer } from 'react-storage-hooks';
 
function reducer(state, action) {
  switch (action.type) {
    case 'inc':
      return { count: state.count + 1 };
    case 'dec':
      return { count: state.count - 1 };
    default:
      return state;
  }
}
 
function StateCounter() {
  const [state, dispatch, writeError] = useStorageReducer(
    localStorage,
    'reducer-counter',
    reducer,
    { count: 0 }
  );
 
  return (
    <>
      <p>You clicked {state.count} times</p>
      <button onClick={() => dispatch({ type: 'inc' })}>+</button>
      <button onClick={() => dispatch({ type: 'dec' })}>-</button>
      {writeError && (
        <pre>Cannot write to localStorage: {writeError.message}</pre>
      )}
    </>
  );
}
export default StateCounter;