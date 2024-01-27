// import React, { useState, useEffect } from 'react';

// const TimerComponent = ({ activationTime }) => {
//   const [days, setDays] = useState(0);
//   const [hours, setHours] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);

//   useEffect(() => {
//     const calculateTimeRemaining = () => {
//       const threeMonthsFromActivation = new Date(activationTime);
//       threeMonthsFromActivation.setMonth(threeMonthsFromActivation.getMonth() + 3);
//       const currentDate = new Date();
//       const timeRemaining = threeMonthsFromActivation - currentDate;

//       const calculatedDays = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
//       const calculatedHours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const calculatedMinutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
//       const calculatedSeconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

//       setDays(calculatedDays);
//       setHours(calculatedHours);
//       setMinutes(calculatedMinutes);
//       setSeconds(calculatedSeconds);
//     };

//     // Call the function initially
//     calculateTimeRemaining();

//     // Update the timer every second
//     const timerInterval = setInterval(() => {
//       calculateTimeRemaining();
//     }, 1000);

//     // Clean up the interval when the component is unmounted
//     return () => clearInterval(timerInterval);
//   }, [activationTime]);
//   const date =days;
//   const timeHours = hours.toString().padStart(2, '0');
//   const timeMinutes = minutes.toString().padStart(2, '0');
//   const timeSeconds = seconds.toString().padStart(2, '0');
//   return (
//     <div className="timer-container">
//       {/* <p className='text-light timer-text'>{`${days} :: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</p> */}
//       <div className='timer-text'>
//      <p className='timer-content'>{date}</p><b>::</b> <p className='timer-content'>{timeHours}</p><b>:</b> <p className='timer-content'> {timeMinutes}</p><b>:</b><p className='timer-content'>{timeSeconds}</p>
//       </div>
//     </div>
//   );
// };

// export default TimerComponent;
// TimerComponent.js

// TimerComponent.js

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TimerComponent = ({ activationTime }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [prevMinutes, setPrevMinutes] = useState(0);
  const [slideDirection, setSlideDirection] = useState('slide-left');
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const threeMonthsFromActivation = new Date(activationTime);
      threeMonthsFromActivation.setMonth(threeMonthsFromActivation.getMonth() + 3);
      const currentDate = new Date();
      const timeRemaining = threeMonthsFromActivation - currentDate;

      const calculatedDays = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const calculatedHours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const calculatedMinutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const calculatedSeconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      setDays(calculatedDays);
      setHours(calculatedHours);
      setMinutes(calculatedMinutes);
      setSeconds(calculatedSeconds);

      if (prevMinutes !== calculatedMinutes) {
        setSlideDirection((prevDirection) => (prevDirection === 'slide-left' ? 'slide-right' : 'slide-left'));
        setPrevMinutes(calculatedMinutes);
        setAnimationKey((prevKey) => prevKey + 1);
      }
    };

    calculateTimeRemaining();

    const timerInterval = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [activationTime, prevMinutes]);

  const timeHours = hours.toString().padStart(2, '0');
  const timeMinutesStr = minutes.toString().padStart(2, '0');
  const timeSeconds = seconds.toString().padStart(2, '0');

  return (
    <div className="timer-container">
      <motion.div
        className={`timer-text ${slideDirection}`}
        key={animationKey}
        initial={{ opacity: 0, x: '-50%', rotateY: -90 }}
        animate={{ opacity: 1, x: '0%', rotateY: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className='timer-content'>{days}</p>
        <b>::</b>
        <p className='timer-content'>{timeHours}</p>
        <b>:</b>
        <motion.p className='timer-content' key={timeMinutesStr}>
          {timeMinutesStr}
        </motion.p>
        <b>:</b>
        <p className='timer-content'>{timeSeconds}</p>
      </motion.div>
    </div>
  );
};

export default TimerComponent;
