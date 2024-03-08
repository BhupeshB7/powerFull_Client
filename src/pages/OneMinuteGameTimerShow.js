// Client-side code (React)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OneMinuteGameTimerShow = ({ sessionId }) => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);

  const fetchTimer = async () => {
    try {
      const response = await axios.get(`https://mlm-eo5g.onrender.com/api/user/getTimer/${sessionId}`);
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
    const intervalId = setInterval(fetchTimer, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [sessionId]); // Add sessionId as a dependency

  useEffect(() => {
    // Set isBlinking to true when remaining time is 10 seconds or less
    setIsBlinking(remainingTime <= 10);

    // Create a timer to update remaining time every second
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, [remainingTime]);
  useEffect(()=>{

  },[sessionId,remainingTime]);
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const timerStyle = {
    color: isBlinking ? 'red' : 'white',
    fontSize: '24px',
  };

  return (
    <div className='d-flex align-items-center justify-content-center  m-1'>
      <div className='align-items-center justify-content-center m-auto '>
        <p className='text-center text-light'>
         <b style={timerStyle}>{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</b> (MM:SS)
        </p>
      </div>
    </div>
  );
};

export default OneMinuteGameTimerShow;