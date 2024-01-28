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

  const [prevDays, setPrevDays] = useState(0);
  const [prevHours, setPrevHours] = useState(0);
  const [prevMinutes, setPrevMinutes] = useState(0);
  const [prevSeconds, setPrevSeconds] = useState(0);

  const [slideDirectionDays, setSlideDirectionDays] = useState('slide-left');
  const [animationKeyDays, setAnimationKeyDays] = useState(0);

  const [slideDirectionHours, setSlideDirectionHours] = useState('slide-left');
  const [animationKeyHours, setAnimationKeyHours] = useState(0);

  const [slideDirectionMinutes, setSlideDirectionMinutes] = useState('slide-left');
  const [animationKeyMinutes, setAnimationKeyMinutes] = useState(0);

  const [slideDirectionSeconds, setSlideDirectionSeconds] = useState('slide-left');
  const [animationKeySeconds, setAnimationKeySeconds] = useState(0);

  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let timerInterval;

    const calculateTimeRemaining = () => {
      const fourDaysFromActivation = new Date(activationTime);
      fourDaysFromActivation.setDate(fourDaysFromActivation.getDate() + 4);
      const currentDate = new Date();
      const timeRemaining = fourDaysFromActivation - currentDate;

      if (timeRemaining <= 0) {
        setTimerActive(false);
        clearInterval(timerInterval);
        return;
      }

      const calculatedDays = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const calculatedHours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const calculatedMinutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const calculatedSeconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      setDays(calculatedDays);
      setHours(calculatedHours);
      setMinutes(calculatedMinutes);
      setSeconds(calculatedSeconds);

      // Slide animation based on changes in each component
      if (prevDays !== calculatedDays) {
        setSlideDirectionDays((prevDirection) => (prevDirection === 'slide-left' ? 'slide-right' : 'slide-left'));
        setPrevDays(calculatedDays);
        setAnimationKeyDays((prevKey) => prevKey + 1);
      }

      if (prevHours !== calculatedHours) {
        setSlideDirectionHours((prevDirection) => (prevDirection === 'slide-left' ? 'slide-right' : 'slide-left'));
        setPrevHours(calculatedHours);
        setAnimationKeyHours((prevKey) => prevKey + 1);
      }

      if (prevMinutes !== calculatedMinutes) {
        setSlideDirectionMinutes((prevDirection) => (prevDirection === 'slide-left' ? 'slide-right' : 'slide-left'));
        setPrevMinutes(calculatedMinutes);
        setAnimationKeyMinutes((prevKey) => prevKey + 1);
      }

      if (prevSeconds !== calculatedSeconds) {
        setSlideDirectionSeconds((prevDirection) => (prevDirection === 'slide-left' ? 'slide-right' : 'slide-left'));
        setPrevSeconds(calculatedSeconds);
        setAnimationKeySeconds((prevKey) => prevKey + 1);
      }
    };

    calculateTimeRemaining();

    timerInterval = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [activationTime, prevDays, prevHours, prevMinutes, prevSeconds, timerActive]);

  const timeHours = hours.toString().padStart(2, '0');
  const timeMinutesStr = minutes.toString().padStart(2, '0');
  const timeSecondsStr = seconds.toString().padStart(2, '0');

  return (
    <div className="timer-container">
      {days > 0 && (
        <div>
        <motion.div
          className={`timer-text ${slideDirectionDays}`}
          key={animationKeyDays}
          initial={{ opacity: 0, x: '-50%', rotateY: -90 }}
          animate={{ opacity: 1, x: '0%', rotateY: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className='timer-content'>{days}::</p>
        </motion.div>
        <h6 className='text-lightP text-center'>D</h6>
        </div>
      )}
      {hours > 0 && (
        <div className='timer-contentItem'>
        <motion.div
          className={`timer-text ${slideDirectionHours}`}
          key={animationKeyHours}
          initial={{ opacity: 0, x: '-50%', rotateY: -90 }}
          animate={{ opacity: 1, x: '0%', rotateY: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className='timer-content'>{timeHours}:</p>
        </motion.div>
        <h6 className='text-lightP text-center'>H</h6>
        </div>
      )}
      {minutes > 0 && (
        <div  className='timer-contentItem'>
        <motion.div
          className={`timer-text ${slideDirectionMinutes}`}
          key={animationKeyMinutes}
          initial={{ opacity: 0, y: '50%', rotateX: -90 }}
          animate={{ opacity: 1, y: '0%', rotateX: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
           className={`timer-content ${slideDirectionSeconds}`}
           key={timeMinutesStr}
           initial={{ opacity: 0, y: '50%', rotateX: -90 }}
           animate={{ opacity: 1, y: '0%', rotateX: 0 }}
           transition={{ duration: 0.5 }}
       >
            {timeMinutesStr}:
          </motion.p>
        </motion.div>
        <h6 className='text-lightP text-center'>M</h6>
        </div>
      )}
      {seconds > 0 && (
        <div>
        <motion.div
        className='timer-text'
        >
          <motion.p 
           className={`timer-content ${slideDirectionSeconds}`}
           key={animationKeySeconds}
           initial={{ opacity: 0, y: '50%', rotateX: 90 }}
           animate={{ opacity: 1, y: '0%', rotateX: 0 }}
           transition={{ duration: 0.5 }}
           >{timeSecondsStr}</motion.p>
        </motion.div>
        <motion.h6 
        className={`text-lightP text-center ${slideDirectionSeconds}`}
        key={animationKeySeconds}
        initial={{ opacity: 0.6, y: '0%', rotateX: 0 }}
        animate={{ opacity: 1, y: '-50%', rotateX: 90 }}
        transition={{ duration: 0.5 }}
         >S</motion.h6>
        </div>
      )}
    </div>
  );
};

export default TimerComponent;
