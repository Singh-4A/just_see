import React, { useState, useEffect, useCallback } from 'react';

export default function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0); // time in seconds

  useEffect(() => {
    let timerId;
    if (isRunning) {
      timerId = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000); // Increment every second
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [isRunning]);

  // Convert time to hours, minutes, seconds
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (val) => String(val).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const handleStartPause = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTime(0);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 10,
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <h1>{formatTime(time)}</h1>
      <div
        style={{
          display: 'flex',
          gap: 10,
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <div onClick={handleStartPause} className="bg-blue-500 text-white p-2 rounded">
          <button>{!isRunning ? 'Start' : 'Pause'}</button>
        </div>
        <div onClick={handleReset} className="bg-red-500 text-white p-2 rounded">
          <button>Reset</button>
        </div>
      </div>
    </div>
  );
}
