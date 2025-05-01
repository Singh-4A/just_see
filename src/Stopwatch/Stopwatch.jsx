import React, { useState, useEffect } from 'react';

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl mb-4">{time}s</h1>
      <div className="flex gap-2">
        <button onClick={handleStartStop} className="bg-blue-500 text-white p-2 rounded">
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} className="bg-red-500 text-white p-2 rounded">
          Reset
        </button>
      </div>
    </div>
  );
}
