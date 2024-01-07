// LiveGameTimerShow.js
// LiveGameTimerShow.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LiveGameTimerShow = () => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);

    const fetchTimer = async () => {
      try {
        const response = await axios.get('https://mlm-production.up.railway.app/api/user/getTimer');
        console.log(response.data);  // Log the response data
        setRemainingTime(response.data.time);
      } catch (error) {
        console.error(error);
        // Handle error (optional)
      }
    };
  useEffect(() => {
    // Fetch timer data initially
    fetchTimer();

    // Set up an interval to fetch updated data every 5 seconds (adjust as needed)
    const intervalId = setInterval(fetchTimer, 2000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Set isBlinking to true when remaining time is 10 seconds or less
    if (remainingTime <= 10) {
      setIsBlinking(true);
    } else {
      setIsBlinking(false);
    }

    // Create a timer to update remaining time every second
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, [remainingTime]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const timerStyle = {
    color: isBlinking ? 'red' : 'green', // Change color to red when blinking
    fontSize: '24px',
  };
   const sount =remainingTime/60;
  return (
    <div className='d-flex align-items-center justify-content-center  m-1'style={{flexDirection:'column'}}>
    <div className='bg-light align-items-center justify-content-center m-auto ' style={{borderRadius:'5px', width:'200px'}}>
      <h6 className='text-center '> LiveGameTimerShow</h6>
      <p className='text-center'>
        Time: <b style={timerStyle}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</b> (MM:SS)
      </p>
    </div>
    </div>
  );
};

export default LiveGameTimerShow;
