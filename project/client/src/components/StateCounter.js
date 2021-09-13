import React from 'react';
import { useStorageState } from 'react-storage-hooks';

function StateCounter() {
  const [count, setCount, writeError] = useStorageState(
    localStorage,
    'state-counter',
    0
  );

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      {writeError && (
        <pre>Cannot write to localStorage: {writeError.message}</pre>
      )}
    </>
  );
}
export default StateCounter;