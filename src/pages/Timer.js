// import React, { useState, useEffect } from 'react';

// const Timer = () => {
//   const [timer, setTimer] = useState(45 * 24 * 60 * 60); // 45 days in seconds

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer(prevTimer => prevTimer - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const formatTime = time => {
//     const days = Math.floor(time / (24 * 60 * 60));
//     const hours = Math.floor((time % (24 * 60 * 60)) / (60 * 60));
//     const minutes = Math.floor((time % (60 * 60)) / 60);
//     const seconds = time % 60;

//     return `${days}d ${hours}h ${minutes}m ${seconds}s`;
//   };

//   return (
//     <div>
//       <h6>Countdown Timer</h6>
//       <h5 className='text-center text-light fw-bold'>Time Remaining: {formatTime(timer)}</h5>
//     </div>
//   );
// };

// export default Timer;



import React, { useState, useEffect } from 'react';

const Timer = () => {
  const targetStartTime = new Date('2023-07-08T12:00:00');
  const [timer, setTimer] = useState(getTimeDifference(targetStartTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function getTimeDifference(startTime) {
    const currentTime = new Date();
    const timeDifference = Math.floor((currentTime - startTime) / 1000);

    if (timeDifference < 0) {
      return 45 * 24 * 60 * 60; // 45 days in seconds
    } else {
      return 45 * 24 * 60 * 60 - timeDifference;
    }
  }

  const formatTime = time => {
    const days = Math.floor(time / (24 * 60 * 60));
    const hours = Math.floor((time % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = time % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <>
    <div className='timer'>
      
        <h6 className='text-center text-light'><b style={{fontWeight:'800', fontSize:'20px'}}>🎉🎊</b> &nbsp; Time Remaining for Achieve Goal &nbsp;<b style={{fontWeight:'800', fontSize:'20px'}}>🎊🏆</b> </h6>  
        <div class="box-3">
  <div class="taskbtn btn-three p-1">

    <h6 className='text-center fw-bold  mt-2' style={{fontSize:'21px'}}><b style={{fontWeight:'900', fontSize:'25px'}}>⏰</b> &nbsp; &nbsp;{formatTime(timer)}</h6>
  </div>
</div>
{/*  */}


    </div>


    </>
  );
};

export default Timer;















//for task page 
// import React, { useState, useEffect } from 'react';

// function TaskItem({ task, onComplete }) {
//   const [timer, setTimer] = useState(120); // Initial timer value in seconds

//   useEffect(() => {
//     let countdown;

//     if (task.status === 'pending') {
//       countdown = setInterval(() => {
//         setTimer((prevTimer) => prevTimer - 1);
//       }, 1000);
//     }

//     return () => {
//       clearInterval(countdown);
//     };
//   }, [task.status]);

//   useEffect(() => {
//     if (timer === 0 && task.status === 'pending') {
//       completeTask();
//     }
//   }, [timer, task.status]);

//   const completeTask = () => {
//     onComplete(task._id);
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div>
//       <h3>{task.title}</h3>
//       <h6>Status: {task.status === 'pending' ? 'Pending' : 'Complete'}</h6>
//       {task.status === 'pending' && (
//         <>
//           <p>Time Remaining: {formatTime(timer)}</p>
//         </>
//       )}
//     </div>
//   );
// }

// export default TaskItem;




