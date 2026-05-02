'use client';

import { useState } from 'react';

const CounterPage = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(0);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-8'>
      <h1 className='text-3xl font-bold tracking-wide'>Counter_14 -- ltlin, 913410014</h1>

      <div
        className={`text-6xl font-bold w-40 h-40 flex items-center justify-center rounded-full border-4 ${
          count > 0
            ? 'border-green-500 text-green-600'
            : count < 0
            ? 'border-red-500 text-red-600'
            : 'border-gray-400 text-gray-600'
        }`}
      >
        {count}
      </div>

      <div className='flex gap-4'>
        <button
          onClick={decrement}
          className='px-6 py-3 text-xl font-semibold bg-red-100 text-red-700 rounded hover:bg-red-200 active:scale-95 transition-transform'
        >
          −
        </button>
        <button
          onClick={reset}
          className='px-6 py-3 text-xl font-semibold bg-gray-100 text-gray-700 rounded hover:bg-gray-200 active:scale-95 transition-transform'
        >
          Reset
        </button>
        <button
          onClick={increment}
          className='px-6 py-3 text-xl font-semibold bg-green-100 text-green-700 rounded hover:bg-green-200 active:scale-95 transition-transform'
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CounterPage;
