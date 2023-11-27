import React, { useState, useEffect } from 'react';

function TimerDisplay() {
  const [showData, setShowData] = useState(false);
  const [timer, setTimer] = useState(10);
let interval;
  const startTimer = () => {
    setShowData(false); // Hide the data initially
    setTimer(10); // Reset the timer to 10 seconds
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setShowData(true); // Show the data after 10 seconds
    }, 10000);
  };

  useEffect(() => {
    if (timer === 0) {
      clearInterval(interval);
    }
  }, [timer]);

  return (
    <div>
      <button onClick={startTimer}>Start Timer</button>
      {showData && <p>Data will be displayed here after 10 seconds</p>}
      {timer > 0 && <p>Timer: {timer} seconds</p>}
    </div>
  );
}

export default TimerDisplay;
